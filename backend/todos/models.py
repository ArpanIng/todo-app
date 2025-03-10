from django.conf import settings
from django.db import models


class Todo(models.Model):
    class PriorityTextChoices(models.TextChoices):
        LOW = "L", "Low"
        MEDIUM = "M", "Medium"
        HIGH = "H", "High"

    class Status(models.TextChoices):
        PENDING = "P", "Pending"
        COMPLETED = "C", "Completed"
        IN_PROGRESS = "I", "In progress"

    name = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="todos"
    )
    priority = models.CharField(
        max_length=1,
        choices=PriorityTextChoices.choices,
        default=PriorityTextChoices.LOW,
    )
    status = models.CharField(
        max_length=1, choices=Status.choices, default=Status.PENDING
    )
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        permissions = [
            ("view_all_todos", "Can view all todos"),
        ]

    def __str__(self):
        return self.name
