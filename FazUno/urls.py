from django.contrib import admin
from django.urls import path
from .views import (
    register_view,
    login_view,
    request_reset_code_view,
    verify_code_view,
    confirm_reset_password_view,
    teste_api,
    listar_prestadores,
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

    
    # Prestadores
    path('api/prestadores/', listar_prestadores, name='listar_prestadores'),
]