from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from .models import Todo


@admin.register(Todo)
class TodoAdmin(GuardedModelAdmin):
    list_display = ["name", "user", "priority", "status", "due_date", "is_completed"]
