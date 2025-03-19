from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail


@shared_task
def send_registration_email(username, email):
    subject = f"Welcome to {settings.APP_NAME}"
    body = f"""
    Dear {username},

    Welcome to {settings.APP_NAME}!

    Your account has been successfully created, and you're all set to explore our features.

    Thank you for joining us—we're here to help you every step of the way!
    """

    send_mail(
        subject=subject,
        message=body,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )
