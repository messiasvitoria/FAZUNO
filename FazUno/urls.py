from django.contrib import admin
from django.urls import path
from .views import solicitacoes_view, alterar_status_solicitacao


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/solicitacoes/', solicitacoes_view, name='solicitacoes'),

    path(
    'api/solicitacoes/<int:id>/status/',
    alterar_status_solicitacao,
    name='alterar_status_solicitacao'
),
]