import random
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class PasswordResetCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reset_codes")
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        now = timezone.now()
        return not self.is_used and (now - self.created_at) < timedelta(minutes=15)

    @staticmethod
    def generate_code():
        return str(random.randint(100000, 999999))

    def __str__(self):
        return f"Código {self.code} - {self.user.email}"

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20)
    telefone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.tipo}"

class DadosPrestador(models.Model):
    perfil = models.OneToOneField(
        Perfil,
        on_delete=models.CASCADE,
        related_name="dados_prestador"
    )
    area_atuacao = models.CharField(max_length=150, blank=True)
    descricao = models.TextField(blank=True)

    def __str__(self):
        return f"Dados de prestador - {self.perfil.user.username}"

class Servico(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    prestadores = models.ManyToManyField(
        Perfil,
        through="PrestadorServico",
        related_name="servicos"
    )

    def __str__(self):
        return self.nome

class PrestadorServico(models.Model):
    prestador = models.ForeignKey(
        Perfil,
        on_delete=models.CASCADE,
        related_name="servicos_oferecidos"
    )
    servico = models.ForeignKey(
        Servico,
        on_delete=models.CASCADE,
        related_name="vinculos"
    )
    valor = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["prestador", "servico"],
                name="unique_prestador_servico"
            )
        ]

    def __str__(self):
        return f"{self.prestador.user.username} - {self.servico.nome}"

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

# Modelo responsável por armazenar os agendamentos dos serviços
class Agendamento(models.Model):
    STATUS_CHOICES = [
        ('agendado', 'Agendado'),
        ('em_andamento', 'Em andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    ]

    # Cada solicitação pode ter apenas um agendamento
    solicitacao = models.OneToOneField(
        'Solicitacao',
        on_delete=models.CASCADE,
        related_name='agendamento'
    )

    data = models.DateField()
    horario = models.TimeField()
    local = models.CharField(max_length=255)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='agendado'
    )

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.data} às {self.horario} - {self.status}"
