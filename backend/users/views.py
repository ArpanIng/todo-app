from django.contrib.auth.models import Group, Permission
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from tasks.models import Task
from tasks.serializers import TaskSerializer
from tasks.tasks import send_registration_email

from .permissions import CustomDjangoObjectPermissions, IsAdmin
from .serializers import (
    GroupSerializer,
    PermissionSerializer,
    UserRegistrationSerializer,
)


class GroupListView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PermissionListView(generics.ListAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_registration_email.delay_on_commit(user.username, user.email)

            # assign user to group
            member_group = Group.objects.get(name="Member")
            user.groups.add(member_group)

            return Response(
                {"message": "User registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTaskListView(generics.ListAPIView):
    """
    List all tasks of the request authenticated user.
    If `user_id` is passed, list all user's tasks of the ID.
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_permissions(self):
        user = self.request.user
        if "user_id" in self.kwargs:
            permission_classes = [CustomDjangoObjectPermissions, IsAdmin]
        else:
            permission_classes = [CustomDjangoObjectPermissions]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.kwargs.get("user_id", None)
        if user_id:
            queryset = queryset.filter(user=user_id)
        else:
            queryset = queryset.filter(user=self.request.user)
        return queryset
