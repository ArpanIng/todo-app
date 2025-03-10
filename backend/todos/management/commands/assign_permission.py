from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand

from todos.models import Todo


class Command(BaseCommand):
    help = "Assign permissions to group"

    def handle(self, *args, **options):
        try:
            admin_group = Group.objects.get(name="Admin")
            member_group = Group.objects.get(name="Member")
        except Group.DoesNotExist:
            self.stdout.write(
                self.style.WARNING("Group matching query does not exist.")
            )

        content_type = ContentType.objects.get_for_model(Todo)
        todo_permissions = Permission.objects.filter(content_type=content_type)
        # iterate all permissions and assign respective permission to the groups
        for perm in todo_permissions:
            admin_group.permissions.add(perm)

            if perm.codename != 'view_all_todos':
                member_group.permissions.add(perm)

        self.stdout.write(self.style.SUCCESS("Permissions assigned successfully."))
