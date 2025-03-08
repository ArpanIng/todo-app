from django.urls import path


from . import views

urlpatterns = [
    path("todos/", views.TodoListCreateView.as_view()),
    path("todos/<int:pk>/", views.TodoDetailView.as_view()),
    path("todos/priority-choices/", views.TodoPriorityChoicesView.as_view()),
    path("todos/status-choices/", views.TodoStatusChoicesView.as_view()),
]
