import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Solicitacao


@csrf_exempt
def solicitacoes_view(request):

    # LISTAR SOLICITAÇÕES
    if request.method == "GET":

        solicitacoes = Solicitacao.objects.all()

        dados = []

        for solicitacao in solicitacoes:

            dados.append({
                "id": solicitacao.id,
                "cliente": solicitacao.cliente.username,
                "prestador": solicitacao.prestador.username,
                "servico": solicitacao.servico,
                "descricao": solicitacao.descricao,
                "data_servico": solicitacao.data_servico,
                "horario": solicitacao.horario,
                "valor": solicitacao.valor,
                "endereco": solicitacao.endereco,
                "status": solicitacao.status,
                "criado_em": solicitacao.criado_em,
                "atualizado_em": solicitacao.atualizado_em,
            })

        return JsonResponse(dados, safe=False)


    # CRIAR SOLICITAÇÃO
    if request.method == "POST":

        try:
            data = json.loads(request.body)

            cliente_id = data.get("cliente_id")
            prestador_id = data.get("prestador_id")
            servico = data.get("servico")
            descricao = data.get("descricao")
            data_servico = data.get("data_servico")
            horario = data.get("horario")
            valor = data.get("valor")
            endereco = data.get("endereco")

            if not cliente_id or not prestador_id or not servico:

                return JsonResponse(
                    {
                        "erro": "Cliente, prestador e serviço são obrigatórios."
                    },
                    status=400
                )

            solicitacao = Solicitacao.objects.create(
                cliente_id=cliente_id,
                prestador_id=prestador_id,
                servico=servico,
                descricao=descricao,
                data_servico=data_servico,
                horario=horario,
                valor=valor,
                endereco=endereco
            )

            return JsonResponse(
                {
                    "mensagem": "Solicitação criada com sucesso!",

                    "solicitacao": {
                        "id": solicitacao.id,
                        "cliente": solicitacao.cliente.username,
                        "prestador": solicitacao.prestador.username,
                        "servico": solicitacao.servico,
                        "descricao": solicitacao.descricao,
                        "data_servico": solicitacao.data_servico,
                        "horario": solicitacao.horario,
                        "valor": solicitacao.valor,
                        "endereco": solicitacao.endereco,
                        "status": solicitacao.status
                    }
                },
                status=201
            )

        except json.JSONDecodeError:

            return JsonResponse(
                {
                    "erro": "JSON inválido enviado na requisição."
                },
                status=400
            )


    return JsonResponse(
        {
            "erro": "Método não permitido."
        },
        status=405
    )


@csrf_exempt
def alterar_status_solicitacao(request, id):

    # SOMENTE PATCH
    if request.method != "PATCH":

        return JsonResponse(
            {
                "erro": "Método não permitido."
            },
            status=405
        )


    # BUSCAR SOLICITAÇÃO
    try:

        solicitacao = Solicitacao.objects.get(id=id)

    except Solicitacao.DoesNotExist:

        return JsonResponse(
            {
                "erro": "Solicitação não encontrada."
            },
            status=404
        )


    # LER JSON
    try:

        data = json.loads(request.body)

        novo_status = data.get("status")

    except json.JSONDecodeError:

        return JsonResponse(
            {
                "erro": "JSON inválido enviado na requisição."
            },
            status=400
        )


    # STATUS EXISTENTES
    status_validos = [
        "pendente",
        "aceita",
        "recusada",
        "cancelada",
        "concluida"
    ]


    # VERIFICAR SE O STATUS EXISTE
    if novo_status not in status_validos:

        return JsonResponse(
            {
                "erro": "Status inválido."
            },
            status=400
        )


    # REGRAS DE TRANSIÇÃO
    transicoes_permitidas = {

        "pendente": [
            "aceita",
            "recusada",
            "cancelada"
        ],

        "aceita": [
            "concluida",
            "cancelada"
        ],

        "recusada": [],

        "cancelada": [],

        "concluida": []
    }


    # VERIFICAR SE A MUDANÇA É PERMITIDA
    if novo_status not in transicoes_permitidas[solicitacao.status]:

        return JsonResponse(
            {
                "erro": (
                    f"Não é possível alterar de "
                    f"'{solicitacao.status}' para "
                    f"'{novo_status}'."
                )
            },
            status=400
        )


    # ALTERAR STATUS
    solicitacao.status = novo_status

    solicitacao.save()


    # RETORNAR RESULTADO
    return JsonResponse(
        {
            "mensagem": "Status atualizado com sucesso!",

            "solicitacao": {
                "id": solicitacao.id,
                "status": solicitacao.status
            }
        }
    )