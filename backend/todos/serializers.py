from rest_framework import serializers


from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "name", "user", "is_completed", "created_at", "updated_at"]
        extra_kwargs = {"user": {"read_only": True}}
