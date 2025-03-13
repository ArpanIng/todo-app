from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.db.models.signals import post_save
from guardian.shortcuts import assign_perm


from .models import Task


@receiver(post_save, sender=Task)
def assign_task_permissions(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        # Assign object-level permissions to the assigned user
        assign_perm("view_task", user, instance)
        assign_perm("change_task", user, instance)
        assign_perm("delete_task", user, instance)

        # Assign object-level permissions to the 'Admin' group
        try:
            admin_group = Group.objects.get(name="Admin")
            assign_perm("change_task", admin_group, instance)
            assign_perm("view_task", admin_group, instance)
            assign_perm("delete_task", admin_group, instance)
        except Group.DoesNotExist:
            pass
