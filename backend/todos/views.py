from django.contrib.auth.models import Group
from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from guardian.shortcuts import assign_perm

from users.permissions import CustomDjangoObjectPermissions, IsAdmin

from .models import Todo
from .serializers import TodoSerializer, UserTodoSerializer


class TodoListCreateView(generics.ListCreateAPIView):
    """List all todos, or create a new todo."""

    queryset = Todo.objects.all()

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
            return TodoSerializer
        return UserTodoSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_admin_group_user:
            todo_obj = serializer.save()
            # Assign object-level permissions to the assigned user
            assign_perm("view_todo", todo_obj.user, todo_obj)
            assign_perm("change_todo", todo_obj.user, todo_obj)
            assign_perm("delete_todo", todo_obj.user, todo_obj)
        else:
            todo_obj = serializer.save(user=user)
            # Assign object-level permissions to the request user
            assign_perm("view_todo", user, todo_obj)
            assign_perm("change_todo", user, todo_obj)
            assign_perm("delete_todo", user, todo_obj)

        # Assign object-level permissions to the 'Admin' group
        try:
            admin_group = Group.objects.get(name="Admin")
            assign_perm("change_todo", admin_group, todo_obj)
            assign_perm("view_todo", admin_group, todo_obj)
            assign_perm("delete_todo", admin_group, todo_obj)
        except Group.DoesNotExist:
            pass


class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a todo."""

    queryset = Todo.objects.all()
    permission_classes = [CustomDjangoObjectPermissions]

    def get_serializer_class(self):
        user = self.request.user
        if user.is_admin_group_user:
            return TodoSerializer
        return UserTodoSerializer

    def perform_update(self, serializer):
        user = self.request.user
        if user.is_admin_group_user:
            return serializer.save()
        else:
            return serializer.save(user=self.request.user)


class TodoPriorityChoicesView(APIView):
    """Retrieve priority choices of a Todo model."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        priority_choices = [
            {"value": value, "label": label}
            for value, label in Todo.PriorityTextChoices.choices
        ]
        return Response({"choices": priority_choices})


class TodoStatusChoicesView(APIView):
    """Retrieve status choices of a Todo model."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        status_choices = [
            {"value": value, "label": label} for value, label in Todo.Status.choices
        ]
        return Response({"choices": status_choices})
