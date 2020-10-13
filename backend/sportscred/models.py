from django.db import models
from django.contrib.auth.models import User


# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


class SportsCredUser(User):
    status = models.CharField(max_length=100, blank=False)
    isActivated = models.BooleanField(default=False)
    isAdmin = models.BooleanField(default=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    profilePicture = models.ImageField(
        max_length=30
    )  # Add upload argument (Make a folder named after each user)
    agrees = models.ManyToManyField(DebatePost, through="Agrees")
    likes = models.ManyToManyField(SocialPost, through="Likes")
    highlights = models.ManyToManyField(Sports, through="Highlights")
    follows = models.ManyToManyField(SportsCredUser, through="Follows")

    class Meta:
        indexes = [models.Index(fields=["username"])]


class Post(models.Model):
    title = models.CharField(max_length=100, blank=True)
    subtitle = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class ACS(models.Model):
    pass


class Follows(models.Model):
    pass


class DebatePost(Post):
    pass


class Agrees(models.Model):
    pass


class SocialPost(Post):
    pass


class Likes(models.Model):
    pass


class QuestionnaireResponse(models.Model):
    pass


class Sports(models.Model):
    pass


class Highlights(models.Model):
    pass

class 