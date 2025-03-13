import random
from faker import Faker

from django.core.management.base import BaseCommand
from django.utils import timezone

from tasks.models import Task
from users.models import CustomUser

fake = Faker()


def get_random_user():
    users = CustomUser.objects.all()
    return random.choice(users)


class Command(BaseCommand):
    help = "Generate dummy date for Task model."

    def handle(self, *args, **options):
        for _ in range(5):
            name = fake.sentence()
            description = fake.paragraph()
            priority = random.choice(
                [priority[0] for priority in Task.PriorityTextChoices.choices]
            )
            status = random.choice([status[0] for status in Task.Status.choices])
            due_date = fake.date_time_between_dates(
                datetime_start="-1y", datetime_end="now"
            )
            due_date = timezone.make_aware(due_date)
            is_completed = fake.boolean()
            Task.objects.create(
                name=name,
                description=description,
                user=get_random_user(),
                priority=priority,
                status=status,
                due_date=due_date,
                is_completed=is_completed,
            )
        self.stdout.write(self.style.SUCCESS("Data generated successfully."))
