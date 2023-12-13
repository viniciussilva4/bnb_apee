from django.contrib import admin
from .models import League, UpdateVerify


@admin.register(UpdateVerify)
class UpdateVerifyAdmin(admin.ModelAdmin):

    list_display = ['date']


@admin.register(League)
class LigaAdmin(admin.ModelAdmin):

    list_display = ['id', 'name']