from rest_framework import serializers

from .models import Todo


class UserTodoSerializer(serializers.ModelSerializer):
    """Serializer for regular user."""

    class Meta:
        model = Todo
        fields = [
            "id",
            "name",
            "description",
            "priority",
            "status",
            "due_date",
            "is_completed",
            "created_at",
            "updated_at",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["priority"] = instance.get_priority_display()
        data["status"] = instance.get_status_display()
        return data


class TodoSerializer(serializers.ModelSerializer):
    """Serializer for admin group user."""

    class Meta:
        model = Todo
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

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["priority"] = instance.get_priority_display()
        data["status"] = instance.get_status_display()
        return data
