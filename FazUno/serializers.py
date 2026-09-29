from rest_framework import serializers
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import Agendamento

User = get_user_model()

# Passo 1: Solicitar o e-mail
class RequestResetCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()

# Passo 2: Validar o código digitado
class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6, min_length=6)

# Passo 3: Cadastrar a nova senha
class ConfirmResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6, min_length=6)
    new_password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "As senhas não coincidem."})
        return data

class AgendamentoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agendamento
        fields = [
            'id',
            'solicitacao',
            'data',
            'horario',
            'local',
            'status',
            'criado_em',
            'atualizado_em',
        ]

    def validate(self, data):
        solicitacao = data.get('solicitacao')

        if solicitacao.status != 'aceita':
            raise serializers.ValidationError({
                'solicitacao': 'Só é possível criar um agendamento para uma solicitação aceita.'
            })

        if data['data'] < timezone.now().date():
            raise serializers.ValidationError({
                'data': 'A data do agendamento não pode ser anterior à data atual.'
            })

        return data