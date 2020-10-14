from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


class SportsCredUser(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, blank=True)
    is_activated = models.BooleanField(default=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    profile_picture = models.ImageField(
        upload_to="<user_id>/files"
    )  # Add upload argument (Make a folder named after each user)
    agree = models.ManyToManyField("DebatePost", through="Agrees")
    like = models.ManyToManyField("SocialPost", through="Likes")
    highlights = models.ManyToManyField("Sports", through="Highlights")
    follow = models.ManyToManyField("SportsCredUser", through="Follows")


class Post(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
    content = models.CharField(max_length=100, blank=False, null=False)
    parent_post = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.CASCADE, default=None
    )
    user = models.ForeignKey("SportsCredUser", on_delete=models.CASCADE)
    attached_files = models.FileField(
        upload_to="<user_id>/files"
    )  # Add upload argument (Make a folder named after each user)


class Agrees(models.Model):
    agreer = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    post = models.ForeignKey("DebatePost", on_delete=models.CASCADE)
    agreement = models.IntegerField(
        validators=[MaxValueValidator(10), MinValueValidator(1)],
        blank=False,
        null=False,
    )


class DebatePost(Post):
    @property
    def agreementAverage(self):
        agreement = Agrees.objects.filter(post=self).values_list("agreement")
        if agreement:
            sum = 0
            for item in agreement:
                sum += item[1]
            return sum / len(agreement)
        else:
            return 0


class SocialPost(Post):
    @property
    def sum_likes(self):
        likes = Likes.objects.filter(post=self).values_list("liked_or_dislike")
        if likes:
            sum = 0
            for item in likes:
                sum += item[1]
            return sum
        else:
            return 0


class Likes(models.Model):
    liker = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    post = models.ForeignKey(SocialPost, on_delete=models.CASCADE)
    # Got this from
    # https://stackoverflow.com/questions/33772947/django-set-range-for-integer-model-field-as-constraint
    # A like = 1, a dislike = -1 and ignore = 0
    liked_or_dislike = models.IntegerField(
        default=0, validators=[MaxValueValidator(1), MinValueValidator(-1)]
    )


class ACS(models.Model):
    score = models.FloatField(max_length=10)
    user = models.ForeignKey(SportsCredUser, on_delete=models.CASCADE)
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)


class Sports(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    # TO DO


class Follows(models.Model):
    follower = models.ForeignKey(
        "SportsCredUser", on_delete=models.CASCADE, related_name="follower"
    )
    following = models.ForeignKey(
        "SportsCredUser", on_delete=models.CASCADE, related_name="following"
    )


class QuestionnaireResponse(models.Model):
    pass


class Highlights(models.Model):
    user = models.ForeignKey(
        SportsCredUser, on_delete=models.CASCADE, related_name="user"
    )
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)
    # TO DO

