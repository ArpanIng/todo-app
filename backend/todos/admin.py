from django.contrib import admin

from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ["name", "user", "priority", "status", "due_date", "is_completed"]
