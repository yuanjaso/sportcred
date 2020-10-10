from django.db import models
from django.contrib.auth.models import User

# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


class Post(models.Model):
    title = models.CharField(max_length=30, blank=True)
    subtitle = models.CharField(max_length=30, blank=True, null=True)
