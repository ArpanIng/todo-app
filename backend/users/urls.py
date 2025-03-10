from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("groups/", views.GroupListView.as_view()),
    path("permissions/", views.PermissionListView.as_view()),
    path("register/", views.UserRegistrationView.as_view()),
    path("users/me/todos/", views.UserTodoListView.as_view()),
    path("users/<int:user_id>/todos/", views.UserTodoListView.as_view()),
]
