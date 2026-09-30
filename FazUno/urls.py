from django.contrib import admin
from django.urls import path

from .views import (
    register_view,
    login_view,
    request_reset_code_view,
    verify_code_view,
    confirm_reset_password_view,
    teste_api,
    agendamentos_view,
    agendamento_detalhe_view,
    agendamento_atualizar_view,
    agendamento_cancelar_view,
    perfil_view,
    prestadores_view,
    atualizar_prestador_view,
    servicos_view,
    atualizar_servico_view,
)

urlpatterns = [
    # Painel de Administração
    path('admin/', admin.site.urls),

    # Autenticação (Registo e Login)
    path('api/register/', register_view, name='register'),
    path('api/login/', login_view, name='login'),

    # Recuperação de Palavra-passe
    path('api/password-reset/request/', request_reset_code_view, name='password_reset_request'),
    path('api/password-reset/verify/', verify_code_view, name='password_reset_verify'),
    path('api/password-reset/confirm/', confirm_reset_password_view, name='password_reset_confirm'),

    # Rota de Teste
    path('api/teste/', teste_api, name='teste_api'),

    # Minha parte de agendamentos
    path('api/agendamentos/', agendamentos_view, name='agendamentos'),
    path('api/agendamentos/<int:id>/', agendamento_detalhe_view, name='agendamento_detalhe'),
    path('api/agendamentos/<int:id>/atualizar/', agendamento_atualizar_view, name='agendamento_atualizar'),
    path('api/agendamentos/<int:id>/cancelar/', agendamento_cancelar_view, name='agendamento_cancelar'),

    # Perfil do usuario
    path('api/perfil/', perfil_view, name='perfil'),
    path('api/prestadores/', prestadores_view, name='prestadores'),
    path('api/prestadores/<int:user_id>/', atualizar_prestador_view, name='atualizar_prestador'),
    path('api/servicos/', servicos_view, name='servicos'),
    path('api/servicos/<int:servico_id>/',atualizar_servico_view,name='atualizar_servico'),
]