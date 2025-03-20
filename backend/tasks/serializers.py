from rest_framework import serializers

from .models import Notification, Task


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "name",
            "description",
            "user",
            "priority",
            "status",
            "due_date",
            "is_completed",
            "created_at",
            "updated_at",
        ]

    def get_fields(self):
        fields = super().get_fields()
        # serializer context
        request = self.context.get("request")
        user = request.user
        if not user.is_admin_group_user:
            if "user" in fields:
                del fields["user"]
        return fields

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["priority"] = instance.get_priority_display()
        data["status"] = instance.get_status_display()
        return data
