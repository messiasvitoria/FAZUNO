from django.contrib import admin
from .models import Prestador, Servico

class ServicoInline(admin.TabularInline):
    model = Servico
    extra = 1

class PrestadorAdmin(admin.ModelAdmin):
    inlines = [ServicoInline]

admin.site.register(Prestador, PrestadorAdmin)