from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Solicitacao(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aceita', 'Aceita'),
        ('recusada', 'Recusada'),
        ('cancelada', 'Cancelada'),
        ('concluida', 'Concluída'),
    ]

    cliente = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='solicitacoes_enviadas'
    )

    prestador = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='solicitacoes_recebidas'
    )

    servico = models.CharField(max_length=150)

    descricao = models.TextField()

    data_servico = models.DateField()

    horario = models.TimeField()

    valor = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    endereco = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pendente'
    )

    criado_em = models.DateTimeField(auto_now_add=True)

    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.servico} - {self.cliente.username}"