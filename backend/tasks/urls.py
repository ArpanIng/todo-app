from django.urls import path

from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreateView.as_view()),
    path("tasks/<int:pk>/", views.TaskDetailView.as_view()),
    path("tasks/priority-choices/", views.TaskPriorityChoicesView.as_view()),
    path("tasks/status-choices/", views.TaskStatusChoicesView.as_view()),
]
