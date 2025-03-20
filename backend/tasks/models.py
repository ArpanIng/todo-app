from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models

from .utils import NOTIFICATION_TIME_VALUE_RANGES


class Task(models.Model):
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
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks"
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
            ("view_all_tasks", "Can view all tasks"),
        ]

    def __str__(self):
        return self.name


class Notification(models.Model):
    class NotificationTypeChoices(models.TextChoices):
        EMAIL = "EMAIL", "Email"
        NOTIFICATION = "NOTIF", "Notification"

    class NotificationTimeUnitChoices(models.TextChoices):
        MINUTE = "MIN", "Minutes"
        HOURS = "HRS", "Hours"
        DAYS = "DAYS", "Days"
        WEEKS = "WKS", "Weeks"

    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="notifications"
    )
    notification_type = models.CharField(
        max_length=5, choices=NotificationTypeChoices.choices, blank=True
    )
    notification_time_value = models.PositiveIntegerField(null=True, blank=True)
    notification_time_unit = models.CharField(
        max_length=5, choices=NotificationTimeUnitChoices.choices, blank=True
    )
    notified = models.BooleanField(
        default=False, db_index=True, help_text="Track if notification is sent."
    )
    is_read = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            # Check if the notification_time_value is within a valid range for each unit type
            models.CheckConstraint(
                check=models.Q(
                    notification_time_unit="MIN",
                    notification_time_value__gte=0,
                    notification_time_value__lte=59,
                )
                | models.Q(
                    notification_time_unit="HRS",
                    notification_time_value__gte=0,
                    notification_time_value__lte=24,
                )
                | models.Q(
                    notification_time_unit="DAYS",
                    notification_time_value__gte=0,
                    notification_time_value__lte=28,
                )
                | models.Q(
                    notification_time_unit="WKS",
                    notification_time_value__gte=0,
                    notification_time_value__lte=4,
                )
                | models.Q(
                    notification_time_unit__exact="",
                    notification_time_value__isnull=True,
                ),
                name="valid_notification_time_range",
            ),
        ]

    def __str__(self):
        return f"Notification for task: {self.task}"

    def clean(self):
        # If notification_time_unit is provided
        if self.notification_time_unit:
            min_val, max_val = NOTIFICATION_TIME_VALUE_RANGES.get(
                self.notification_time_unit
            )
            unit_label = self.get_notification_time_unit_display().lower()
            # notification_time_value is not provided
            if self.notification_time_value is None:
                raise ValidationError(
                    {
                        "notification_time_value": f"Must be between {min_val} and {max_val} {unit_label}"
                    }
                )
            # If both notification_time_unit and notification_time_value are provided
            elif self.notification_time_value is not None:
                # value must be between min and max value
                if not (min_val <= self.notification_time_value <= max_val):
                    raise ValidationError(
                        {
                            "notification_time_value": f"Must be between {min_val} and {max_val} {unit_label}"
                        }
                    )
        # If notification_time_unit is not provided, notification_time_value should be None
        elif self.notification_time_value is not None:
            raise ValidationError(
                {
                    "notification_time_value": "Notification time value cannot be set without specifying a time unit."
                }
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
