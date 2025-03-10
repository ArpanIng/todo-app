from django.contrib.auth.models import Group, UserManager


class CustomUserManager(UserManager):
    def create_user_for_admin_group(self, **kwargs):
        user = self.model.objects.create_user(**kwargs)
        admin_group = Group.objects.get(name="Admin")
        user.groups.add(admin_group)
        return user

    def create_user_for_member_group(self, **kwargs):
        user = self.model.objects.create_user(**kwargs)
        member_group = Group.objects.get(name="Member")
        user.groups.add(member_group)
        return user
