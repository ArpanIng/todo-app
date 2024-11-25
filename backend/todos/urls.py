from django.urls import path


from . import views

urlpatterns = [
    path("todos/", views.TodoListCreateView.as_view()),
    path("todos/<int:pk>/", views.TodoDetailView.as_view()),
]
