from django.contrib import admin
from .models import League, Team


class TeamAdminInLine(admin.TabularInline):

    model = Team

    extra = 1


@admin.register(League)
class LigaAdmin(admin.ModelAdmin):

    list_display = ['id', 'name']

    inlines = [TeamAdminInLine]


@admin.register(Team)
class TimeAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'name', 'league']