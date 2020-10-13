from django.db import models
from django.contrib.auth.models import User


# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


class SportsCredUser(User):
    status = models.CharField(max_length=30, blank=False)
    isActivated = models.BooleanField(default=False)
    isAdmin = models.BooleanField(default=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    profilePicture = models.ImageField(max_lengt=30)
    posts = models.ManyToManyField(Post, through="Posts")
    agrees = models.ManyToManyField(DebatePost, through="Agrees")
    likes = models.ManyToManyField(SocialPost, through="Likes")
    submit = models.ManyToManyField(QuestionnaireResponse, through="Submit")
    highlights = models.ManyToManyField(Sports, through="Highlights")
    follows = models.ManyToManyField(SportsCredUser, through="Follows")
    acsScore = models.OneToManyField()

    class Meta:
        indexes = [models.Index(fields=["username"])]


class Post(models.Model):
    title = models.CharField(max_length=30, blank=True)
    subtitle = models.CharField(max_length=30, blank=True, null=True)


class Follows(models.Model):
    pass


class Posts(Post):
    pass


class DebatePost(Post):
    pass


class Agrees(Post):
    pass


class SocialPost(Post):
    pass


class Likes(Post):
    pass


class QuestionnaireResponse(models.Model):
    pass


class Submit(models.Model):
    pass


class Sports(models.Model):
    pass


class Highlights(models.Model):
    pass
