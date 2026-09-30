from rest_framework import serializers
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import Perfil, Servico, DadosPrestador, PrestadorServico
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

class DadosPrestadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DadosPrestador
        fields = ['area_atuacao', 'descricao']

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['id', 'user', 'tipo', 'telefone']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        dados_prestador = getattr(instance, 'dados_prestador', None)

        if dados_prestador:
            data['dados_prestador'] = DadosPrestadorSerializer(dados_prestador).data

        return data

class ServicoOferecidoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='servico.id')
    nome = serializers.CharField(source='servico.nome')
    descricao = serializers.CharField(source='servico.descricao')

    class Meta:
        model = PrestadorServico
        fields = ['id', 'nome', 'descricao', 'valor']

class PrestadorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    area_atuacao = serializers.SerializerMethodField()
    descricao = serializers.SerializerMethodField()
    servicos = ServicoOferecidoSerializer(source='servicos_oferecidos', many=True, read_only=True)

    class Meta:
        model = Perfil
        fields = [
            'id', 'user', 'username', 'email', 'tipo', 'telefone',
            'area_atuacao', 'descricao', 'servicos',
        ]

    def get_area_atuacao(self, obj):
        dados_prestador = getattr(obj, 'dados_prestador', None)
        return dados_prestador.area_atuacao if dados_prestador else ""

    def get_descricao(self, obj):
        dados_prestador = getattr(obj, 'dados_prestador', None)
        return dados_prestador.descricao if dados_prestador else ""

class PrestadorUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False, write_only=True)
    telefone = serializers.CharField(required=False, allow_blank=True)
    area_atuacao = serializers.CharField(required=False, allow_blank=True)
    descricao = serializers.CharField(required=False, allow_blank=True)

class PrestadorVinculoSerializer(serializers.ModelSerializer):
    prestador = serializers.PrimaryKeyRelatedField(
        queryset=Perfil.objects.filter(tipo="prestador"),
        error_messages={'does_not_exist': 'Perfil de prestador {pk_value} não encontrado.'}
    )
    username = serializers.CharField(source='prestador.user.username', read_only=True)

    class Meta:
        model = PrestadorServico
        fields = ['prestador', 'username', 'valor']

class ServicoSerializer(serializers.ModelSerializer):
    prestadores = PrestadorVinculoSerializer(many=True, source='vinculos', required=False)

    class Meta:
        model = Servico
        fields = ['id', 'nome', 'descricao', 'prestadores']

    def to_internal_value(self, data):
        data = dict(data)
        prestadores = data.get('prestadores')

        if prestadores is not None:
            data['prestadores'] = [
                item if isinstance(item, dict) else {'prestador': item}
                for item in prestadores
            ]

        return super().to_internal_value(data)

    def validate_prestadores(self, value):
        ids = [item['prestador'].pk for item in value]

        if len(ids) != len(set(ids)):
            raise serializers.ValidationError("Prestador repetido na lista de prestadores.")

        return value

    def create(self, validated_data):
        vinculos = validated_data.pop('vinculos', [])
        servico = Servico.objects.create(**validated_data)
        self._salvar_vinculos(servico, vinculos)
        return servico

    def update(self, instance, validated_data):
        vinculos = validated_data.pop('vinculos', None)

        instance.nome = validated_data.get('nome', instance.nome)
        instance.descricao = validated_data.get('descricao', instance.descricao)
        instance.save()

        if vinculos is not None:
            instance.vinculos.all().delete()
            self._salvar_vinculos(instance, vinculos)

        return instance

    def _salvar_vinculos(self, servico, vinculos):
        for item in vinculos:
            PrestadorServico.objects.create(
                servico=servico,
                prestador=item['prestador'],
                valor=item.get('valor')
            )

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
