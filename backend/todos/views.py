from rest_framework import generics, permissions


from .models import Todo
from .serializers import TodoSerializer


class TodoListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)
