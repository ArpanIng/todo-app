from rest_framework import serializers


from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
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
        extra_kwargs = {"user": {"read_only": True}}

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["priority"] = instance.get_priority_display()
        data["status"] = instance.get_status_display()
        return data
