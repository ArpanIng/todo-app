from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from .models import Notification, Task


class NotificationInline(admin.TabularInline):
    model = Notification


@admin.register(Task)
class TaskAdmin(GuardedModelAdmin):
    list_display = ["name", "user", "priority", "status", "due_date", "is_completed"]
    inlines = [NotificationInline]


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = [
        "task",
        "notification_type",
        "notification_time_value",
        "notification_time_unit",
        "notified",
        "is_read",
        "created_at",
        "updated_at",
    ]
