from django.contrib.auth.models import Group
from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from guardian.shortcuts import assign_perm

from users.permissions import CustomDjangoObjectPermissions, IsAdmin

from .models import Task
from .serializers import TaskSerializer, UserTaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    """List all tasks, or create a new task."""

    queryset = Task.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            # admin groups user can view all data
            permission_classes = [CustomDjangoObjectPermissions, IsAdmin]
        else:
            permission_classes = [CustomDjangoObjectPermissions]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        user = self.request.user
        if user.is_admin_group_user:
            return TaskSerializer
        return UserTaskSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_admin_group_user:
            task_obj = serializer.save()
            # Assign object-level permissions to the assigned user
            assign_perm("view_task", task_obj.user, task_obj)
            assign_perm("change_task", task_obj.user, task_obj)
            assign_perm("delete_task", task_obj.user, task_obj)
        else:
            task_obj = serializer.save(user=user)
            # Assign object-level permissions to the request user
            assign_perm("view_task", user, task_obj)
            assign_perm("change_task", user, task_obj)
            assign_perm("delete_task", user, task_obj)

        # Assign object-level permissions to the 'Admin' group
        try:
            admin_group = Group.objects.get(name="Admin")
            assign_perm("change_task", admin_group, task_obj)
            assign_perm("view_task", admin_group, task_obj)
            assign_perm("delete_task", admin_group, task_obj)
        except Group.DoesNotExist:
            pass


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a task."""

    queryset = Task.objects.all()
    permission_classes = [CustomDjangoObjectPermissions]

    def get_serializer_class(self):
        user = self.request.user
        if user.is_admin_group_user:
            return TaskSerializer
        return UserTaskSerializer

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
