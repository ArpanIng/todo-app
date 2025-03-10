import copy

from rest_framework.permissions import BasePermission, DjangoObjectPermissions


class CustomDjangoObjectPermissions(DjangoObjectPermissions):
    def __init__(self):
        self.perms_map = copy.deepcopy(self.perms_map)
        self.perms_map["GET"] = ["%(app_label)s.view_%(model_name)s"]


class IsAdmin(BasePermission):
    """
    Check permission if the user has the 'can_view_all_todos' permission.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.has_perm("todos.view_all_todos"))
