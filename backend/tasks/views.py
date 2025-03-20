from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.permissions import CustomDjangoObjectPermissions, IsAdmin

from .models import Notification, Task
from .serializers import NotificationSerializer, TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    """List all tasks, or create a new task."""

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            # admin groups user can view all data
            permission_classes = [CustomDjangoObjectPermissions, IsAdmin]
        else:
            permission_classes = [CustomDjangoObjectPermissions]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_admin_group_user:
            serializer.save()
        else:
            serializer.save(user=user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a task."""

    queryset = Task.objects.all()
    permission_classes = [CustomDjangoObjectPermissions]
    serializer_class = TaskSerializer

    def perform_update(self, serializer):
        user = self.request.user
        if user.is_admin_group_user:
            return serializer.save()
        else:
            return serializer.save(user=self.request.user)


class TaskPriorityChoicesView(APIView):
    """Retrieve priority choices of a Task model."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        priority_choices = [
            {"value": value, "label": label}
            for value, label in Task.PriorityTextChoices.choices
        ]
        return Response({"choices": priority_choices})


class TaskStatusChoicesView(APIView):
    """Retrieve status choices of a Task model."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        status_choices = [
            {"value": value, "label": label} for value, label in Task.Status.choices
        ]
        return Response({"choices": status_choices})


class NotificationListCreateView(generics.ListCreateAPIView):
    """List all notifications, or create a new notification."""

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a notification."""

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotificationTypeChoicesView(APIView):
    """Retrieve type choices of a Notification model."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        choices = [
            {"value": value, "label": label}
            for value, label in Notification.NotificationTypeChoices.choices
        ]
        return Response({"choices": choices})


class NotificationTimeUnitChoicesView(APIView):
    """Retrieve time unit choices of a Notification model."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        choices = [
            {"value": value, "label": label}
            for value, label in Notification.NotificationTimeUnitChoices.choices
        ]
        return Response({"choices": choices})
