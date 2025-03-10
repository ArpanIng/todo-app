# Generated by Django 4.2.16 on 2025-03-06 16:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("todos", "0002_todo_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="todo",
            name="description",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="todo",
            name="due_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="todo",
            name="priority",
            field=models.CharField(
                choices=[("L", "Low"), ("M", "Medium"), ("H", "High")],
                default="L",
                max_length=1,
            ),
        ),
        migrations.AddField(
            model_name="todo",
            name="status",
            field=models.CharField(
                choices=[("P", "Pending"), ("C", "Completed"), ("I", "In progress")],
                default="P",
                max_length=1,
            ),
        ),
        migrations.AlterField(
            model_name="todo",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="todos",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
