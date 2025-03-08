from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import Todo
from .serializers import TodoSerializer


class TodoListCreateView(generics.ListCreateAPIView):
    """List all todos, or create a new todo."""

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a todo."""

    permission_classes = [permissions.AllowAny]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)


class TodoPriorityChoicesView(APIView):
    """Retrieve priority choices of a Todo model."""

    def get(self, request, *args, **kwargs):
        priority_choices = [
            {"value": value, "label": label}
            for value, label in Todo.PriorityTextChoices.choices
        ]
        return Response({"choices": priority_choices})


class TodoStatusChoicesView(APIView):
    """Retrieve status choices of a Todo model."""

    def get(self, request, *args, **kwargs):
        status_choices = [
            {"value": value, "label": label} for value, label in Todo.Status.choices
        ]
        return Response({"choices": status_choices})
