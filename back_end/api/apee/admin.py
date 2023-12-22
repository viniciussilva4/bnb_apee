from django.contrib import admin
from .models import League, UpdateVerify, Game, Team


@admin.register(UpdateVerify)
class UpdateVerifyAdmin(admin.ModelAdmin):

    list_display = ['date']


@admin.register(League)
class LigaAdmin(admin.ModelAdmin):

    list_display = ['id', 'name']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):

    list_display = ['id']


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):

    list_display = ['id']