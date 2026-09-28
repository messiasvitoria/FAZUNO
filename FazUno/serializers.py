from rest_framework import serializers
from .models import Solicitacao


class SolicitacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitacao
        fields = [
            'id',
            'cliente',
            'prestador',
            'servico',
            'descricao',
            'data_servico',
            'horario',
            'valor',
            'endereco',
            'status',
            'criado_em',
            'atualizado_em',
        ]