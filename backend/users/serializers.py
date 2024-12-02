from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=get_user_model().objects.all(),
                message="A user with that email already exists.",
            )
        ]
    )
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = get_user_model()
        fields = ["username", "email", "password", "password2"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = get_user_model().objects.create_user(**validated_data)
        return user
