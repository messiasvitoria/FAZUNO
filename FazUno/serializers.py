from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Perfil, Servico

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
    
class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['id', 'user', 'tipo']

class PrestadorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Perfil
        fields = ['id', 'user', 'username', 'email', 'tipo']

class PrestadorUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False, write_only=True)

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = ['id', 'nome', 'descricao','prestadores']    