import random
from django.db import models
from django.contrib.auth import get_user_model
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

class Agendamento(models.Model):
    STATUS_CHOICES = [
        ('agendado', 'Agendado'),
        ('em_andamento', 'Em andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    ]

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

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.username} - {self.tipo}"

class Servico(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    prestadores = models.ManyToManyField(
        Perfil,
        related_name="servicos"
    )

    def __str__(self):
        return self.nome
