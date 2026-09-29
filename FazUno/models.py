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
        # O código expira após 15 minutos e não pode ter sido utilizado
        now = timezone.now()
        return not self.is_used and (now - self.created_at) < timedelta(minutes=15)

    @staticmethod
    def generate_code():
        # Gera um código numérico aleatório de 6 dígitos
        return str(random.randint(100000, 999999))

    def __str__(self):
        return f"Código {self.code} - {self.user.email}"

    
class Prestador(models.Model):
    nome = models.CharField(max_length=150)
    telefone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    area_atuacao = models.CharField(max_length=150)
    descricao = models.TextField(blank=True)
    avaliacao = models.DecimalField(max_digits=3, decimal_places=1, default=0)

    def __str__(self):
        return self.nome


class Servico(models.Model):
    prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE, related_name="servicos")
    nome = models.CharField(max_length=150)
    descricao = models.TextField(blank=True)
    valor = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.nome} ({self.prestador.nome})"