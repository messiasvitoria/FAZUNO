import json
import re

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import PasswordResetCode
from .models import Agendamento
from .models import Solicitacao
from .serializers import AgendamentoSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


def validar_senha_forte(password):
    erros = []
    
    # 1. Mínimo de 8 caracteres
    if len(password) < 8:
        erros.append("A senha deve ter pelo menos 8 caracteres.")
    
    # 2. Pelo menos uma letra maiúscula
    if not re.search(r'[A-Z]', password):
        erros.append("A senha deve conter pelo menos uma letra maiúscula.")
        
    # 3. Pelo menos uma letra minúscula
    if not re.search(r'[a-z]', password):
        erros.append("A senha deve conter pelo menos uma letra minúscula.")
        
    # 4. Pelo menos um número
    if not re.search(r'[0-9]', password):
        erros.append("A senha deve conter pelo menos um número.")
        
    # 5. Pelo menos um caractere especial (@, #, $, %, etc.)
    if not re.search(r'[@#$%^&+=!_*\-?]', password):
        erros.append("A senha deve conter pelo menos um caractere especial (ex: @, #, $, %).")
        
    return erros


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email", "")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"erro": "Nome de usuário e senha são obrigatórios."}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"erro": "Este nome de usuário já está em uso."}, status=400)

            # 🔒 Validação dos 5 critérios de segurança da senha
            erros_senha = validar_senha_forte(password)
            if erros_senha:
                return JsonResponse({"erro": erros_senha[0]}, status=400)

            # Se a senha passar em todos os critérios, salva o usuário
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({"mensagem": "Usuário cadastrado com sucesso!"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"erro": "JSON inválido enviado na requisição."}, status=400)

    return JsonResponse({"erro": "Método não permitido."}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # Aceita 'username' ou 'email' do frontend
            login_identifier = data.get("username") or data.get("email")
            password = data.get("password")

            if not login_identifier or not password:
                return JsonResponse({"erro": "Usuário/E-mail e senha são obrigatórios."}, status=400)

            # Tenta buscar o usuário pelo username ou pelo e-mail
            user_obj = User.objects.filter(username=login_identifier).first()
            if not user_obj:
                user_obj = User.objects.filter(email=login_identifier).first()

            # Se encontrou o usuário, autentica com o username correto
            username_to_auth = user_obj.username if user_obj else login_identifier
            user = authenticate(request, username=username_to_auth, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({
                    "mensagem": "Login realizado com sucesso!",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email
                    }
                }, status=200)
            else:
                return JsonResponse({"erro": "Usuário ou senha inválidos."}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"erro": "JSON inválido enviado na requisição."}, status=400)

    return JsonResponse({"erro": "Método não permitido."}, status=405)


# ── PASSO 1: Solicitar código de redefinição por e-mail ─────────────
@csrf_exempt
def request_reset_code_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"erro": "O e-mail é obrigatório."}, status=400)

            user = User.objects.filter(email=email).first()

            if user:
                # Invalida códigos anteriores ativos do usuário
                PasswordResetCode.objects.filter(user=user, is_used=False).update(is_used=True)

                # Gera e salva o novo código
                code = PasswordResetCode.generate_code()
                PasswordResetCode.objects.create(user=user, code=code)

                # Dispara o e-mail
                subject = "Código para Redefinição de Senha"
                message = f"Seu código de verificação é: {code}\nEste código expira em 15 minutos."
                send_mail(
                    subject,
                    message,
                    getattr(settings, "DEFAULT_FROM_EMAIL", "webmaster@localhost"),
                    [email],
                    fail_silently=True
                )

            # Retorna 200 independente de encontrar o usuário para evitar enumeration attacks
            return JsonResponse(
                {"mensagem": "Se o e-mail estiver cadastrado, um código foi enviado."},
                status=200
            )

        except json.JSONDecodeError:
            return JsonResponse({"erro": "JSON inválido enviado na requisição."}, status=400)

    return JsonResponse({"erro": "Método não permitido."}, status=405)


# ── PASSO 2: Validar o código digitado ──────────────────────────────
@csrf_exempt
def verify_code_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            code = data.get("code")

            if not email or not code:
                return JsonResponse({"erro": "E-mail e código são obrigatórios."}, status=400)

            reset_code = PasswordResetCode.objects.filter(
                user__email=email,
                code=code
            ).order_by('-created_at').first()

            if not reset_code or not reset_code.is_valid():
                return JsonResponse({"erro": "Código inválido ou expirado."}, status=400)

            return JsonResponse({"mensagem": "Código verificado com sucesso!"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"erro": "JSON inválido enviado na requisição."}, status=400)

    return JsonResponse({"erro": "Método não permitido."}, status=405)


# ── PASSO 3: Cadastrar a nova senha ─────────────────────────────────
@csrf_exempt
def confirm_reset_password_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            code = data.get("code")
            new_password = data.get("new_password")
            confirm_password = data.get("confirm_password")

            if not email or not code or not new_password or not confirm_password:
                return JsonResponse({"erro": "Todos os campos são obrigatórios."}, status=400)

            if new_password != confirm_password:
                return JsonResponse({"erro": "As senhas não coincidem."}, status=400)

            # Revalida a força da nova senha com a mesma função utilitária
            erros_senha = validar_senha_forte(new_password)
            if erros_senha:
                return JsonResponse({"erro": erros_senha[0]}, status=400)

            reset_code = PasswordResetCode.objects.filter(
                user__email=email,
                code=code
            ).order_by('-created_at').first()

            if not reset_code or not reset_code.is_valid():
                return JsonResponse({"erro": "Sessão expirada ou código inválido."}, status=400)

            # Atualiza a senha e invalida o código
            user = reset_code.user
            user.set_password(new_password)
            user.save()

            reset_code.is_used = True
            reset_code.save()

            return JsonResponse({"mensagem": "Senha redefinida com sucesso!"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"erro": "JSON inválido enviado na requisição."}, status=400)

    return JsonResponse({"erro": "Método não permitido."}, status=405)


def teste_api(request):
    return JsonResponse({"mensagem": "Conexão entre Django e Next.js funcionando!"})

@api_view(['GET', 'POST'])
def agendamentos_view(request):
    if request.method == 'GET':
        agendamentos = Agendamento.objects.all()
        serializer = AgendamentoSerializer(agendamentos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = AgendamentoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def agendamento_detalhe_view(request, id):
    try:
        agendamento = Agendamento.objects.get(id=id)
    except Agendamento.DoesNotExist:
        return Response(
            {"erro": "Agendamento não encontrado."},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = AgendamentoSerializer(agendamento)
    return Response(serializer.data)

@api_view(['PUT'])
def agendamento_atualizar_view(request, id):
    try:
        agendamento = Agendamento.objects.get(id=id)
    except Agendamento.DoesNotExist:
        return Response(
            {"erro": "Agendamento não encontrado."},
            status=status.HTTP_404_NOT_FOUND
        )

    if agendamento.status in ['concluido', 'cancelado']:
        return Response(
            {
                "erro": "Este agendamento não pode mais ser alterado."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = AgendamentoSerializer(
        agendamento,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['PUT'])
def agendamento_cancelar_view(request, id):
    try:
        agendamento = Agendamento.objects.get(id=id)
    except Agendamento.DoesNotExist:
        return Response(
            {"erro": "Agendamento não encontrado."},
            status=status.HTTP_404_NOT_FOUND
        )

    if agendamento.status in ['concluido', 'cancelado']:
        return Response(
            {
                "erro": "Este agendamento não pode mais ser cancelado."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    agendamento.status = 'cancelado'
    agendamento.save()

    agendamento.solicitacao.status = 'cancelada'
    agendamento.solicitacao.save()

    serializer = AgendamentoSerializer(agendamento)

    return Response(serializer.data)