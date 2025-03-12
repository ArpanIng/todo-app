from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from .models import Task


@admin.register(Task)
class TaskAdmin(GuardedModelAdmin):
    list_display = ["name", "user", "priority", "status", "due_date", "is_completed"]
