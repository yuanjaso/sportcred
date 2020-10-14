from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django import forms


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
    content = models.CharField(max_length=100, blank=True, null=True)
    parentPostURL = models.URLField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)

    # Got the form part from here https://docs.djangoproject.com/en/3.1/topics/http/file-uploads/
    class UploadFile(forms.Form):
        fileName = forms.CharField(max_length=100)
        file = forms.FileField()


class DebatePost(Post):
    @property
    def agreementAverage(self):
        return Agrees.objects.filter(post=self).annotate(
            agreementAvg=Count("agreement")
        )


class Agrees(models.Model):
    agreer = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    post = models.ForeignKey(DebatePost, on_delete=models.CASCADE)
    agreement = models.IntegerField(max_length=10, blank=False, null=False)


class SocialPost(Post):
    @property
    def usersWhoLikedThisPost(self):
        return Likes.objects.filter(post=self, likedOrDislike=1).values(liker)


class Likes(models.Model):
    liker = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    post = models.ForeignKey(DebatePost, on_delete=models.CASCADE)
    # Got this from https://stackoverflow.com/questions/33772947/django-set-range-for-integer-model-field-as-constraint
    # A like = 1, a dislike = -1 and ignore = 0
    likedOrDislike = models.IntegerField(
        default=0, validators=[MaxValueValidator(1), MinValueValidator(-1)]
    )


class ACS(models.Model):
    score = models.FloatField(max_length=10)
    user = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    sports = models.ForeignKey(Sports, on_delete=models.CASCADE)


class Sports(models.Model):
    name = models.CharField(max_length=100, blank=False)
    # TO DO


class Follows(models.Model):
    follower = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    following = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)


class QuestionnaireResponse(models.Model):
    pass


class Highlights(models.Model):
    pass

