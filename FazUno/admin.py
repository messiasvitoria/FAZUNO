from django.contrib import admin
from .models import Perfil, DadosPrestador, Servico, PrestadorServico, Solicitacao, Agendamento

class DadosPrestadorInline(admin.StackedInline):
    model = DadosPrestador
    can_delete = False

class PrestadorServicoInlineForPerfil(admin.TabularInline):
    model = PrestadorServico
    fk_name = "prestador"
    extra = 1

class PerfilAdmin(admin.ModelAdmin):
    inlines = [DadosPrestadorInline, PrestadorServicoInlineForPerfil]

class PrestadorServicoInlineForServico(admin.TabularInline):
    model = PrestadorServico
    fk_name = "servico"
    extra = 1

class ServicoAdmin(admin.ModelAdmin):
    inlines = [PrestadorServicoInlineForServico]

admin.site.register(Perfil, PerfilAdmin)
admin.site.register(Servico, ServicoAdmin)
admin.site.register(Solicitacao)
admin.site.register(Agendamento)
