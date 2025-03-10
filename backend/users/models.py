from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    objects = UserManager()
    assign = CustomUserManager()

    @property
    def is_admin_group_user(self):
        return self.has_perm("todos.view_all_todos")
