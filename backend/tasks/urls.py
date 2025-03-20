from django.urls import path

from . import views

app_name = "tasks"

urlpatterns = [
    path("tasks/", views.TaskListCreateView.as_view(), name="task-list"),
    path("tasks/<int:pk>/", views.TaskDetailView.as_view(), name="task-detail"),
    path(
        "tasks/priority-choices/",
        views.TaskPriorityChoicesView.as_view(),
        name="task-priority-choices",
    ),
    path(
        "tasks/status-choices/",
        views.TaskStatusChoicesView.as_view(),
        name="task-status-choices",
    ),
    path(
        "notifications/",
        views.NotificationListCreateView.as_view(),
        name="notification-list",
    ),
    path(
        "notifications/<int:pk>/",
        views.NotificationDetailView.as_view(),
        name="notification-detail",
    ),
    path(
        "notifications/type-choices/",
        views.NotificationTypeChoicesView.as_view(),
        name="notification-type-choices",
    ),
    path(
        "notifications/time-unit-choices/",
        views.NotificationTimeUnitChoicesView.as_view(),
        name="notification-time-unit-choices",
    ),
]
