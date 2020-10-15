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
    agreer = models.ForeignKey("SportsCredUser", on_delete=models.CASCADE)
    post = models.ForeignKey("DebatePost", on_delete=models.CASCADE)
    agreement = models.IntegerField(
        validators=[MaxValueValidator(10), MinValueValidator(1)],
        blank=False,
        null=False,
    )


class DebatePost(Post):
    @property
    def agreementAverage(self):
        return Agrees.objects.filter(post=self).aggregate(Models.Avg("agreement"))


class SocialPost(Post):
    @property
    def sum_likes(self):
        return Likes.objects.filter(post=self).aggregate(Models.Sum("liked_or_dislike"))


class Likes(models.Model):
    liker = models.ForeignKey("SportsCredUser", on_delete=models.CASCADE)
    post = models.ForeignKey("SocialPost", on_delete=models.CASCADE)
    # Got this from
    # https://stackoverflow.com/questions/33772947/django-set-range-for-integer-model-field-as-constraint
    # A like = 1, a dislike = -1 and ignore = 0
    liked_or_dislike = models.IntegerField(
        default=0, validators=[MaxValueValidator(1), MinValueValidator(-1)]
    )


class ACS(models.Model):
    score = models.FloatField(max_length=10)
    user = models.ForeignKey("SportsCredUser", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)


class Question(models.Model):
    content = models.CharField(max_length=100, blank=False, null=False)
    correct_answer = models.CharField(max_length=100, blank=False, null=False)
    related_to_sports = models.ManyToManyField("Sports", through="QuestionRelatingTo")
    related_to_debate_posts = models.ManyToManyField(
        "DebatePost", through="QuestionRelatingTo"
    )
    answer = models.ForeignKey("Answer", on_delete=models.CASCADE)


class QuestionRelatingTo(models.Model):
    question = models.ForeignKey("Question", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)
    debate_post = models.ForeignKey("DebatePost", on_delete=models.CASCADE)


class Answer(models.Model):
    content = models.CharField(max_length=100, blank=False, null=False)


class Sports(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    related_to_debate_posts = models.ManyToManyField(
        "DebatePost", through="QuestionRelatingTo"
    )


class Follows(models.Model):
    follower = models.ForeignKey(
        "SportsCredUser", on_delete=models.CASCADE, related_name="follower"
    )
    following = models.ForeignKey(
        "SportsCredUser", on_delete=models.CASCADE, related_name="following"
    )


class Submits(models.Model):
    user = models.ForeignKey("SportsCredUser", on_delete=models.CASCADE)
    response = models.ForeignKey("QuestionaireResponse", on_delete=models.CASCADE)


class QuestionaireResponse(models.Model):
    question = models.CharField(max_length=300, blank=False)
    qualitative_response = models.CharField(max_length=300, blank=True)
    quantitative_response = models.CharField(max_length=300, blank=True)
    submitions = models.ManyToManyField("PredictChoice", through="Predicts")


class Predicts(models.Model):
    response = models.ForeignKey("QuestionaireResponse", on_delete=models.CASCADE)
    choice = models.ForeignKey("PredictChoice", on_delete=models.CASCADE)


class PredictChoice(models.Model):
    content = models.CharField(max_length=100, blank=True)
    predict_for = models.ManyToManyField("Prediction", through="PredictsFor")


class PredictsFor(models.Model):
    choice = models.ForeignKey("PredictChoice", on_delete=models.CASCADE)
    prediction = models.ForeignKey("Prediction", on_delete=models.CASCADE)


class Prediction(models.Model):
    title = models.CharField(max_length=100, blank=True)
    type = models.CharField(max_length=100, blank=True)
    deadline = models.DateTimeField(auto_now_add=False, blank=True)
    predicts_for = models.ManyToManyField("Prediction", through="Dependence")
    relates_to = models.ManyToManyField("Sports", through="RelatingTo")


class RelatingTo(models.Model):
    predictions = models.ForeignKey("Prediction", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)


class Dependence(models.Model):
    predictor = models.ForeignKey(
        "Prediction", on_delete=models.CASCADE, related_name="predictor"
    )
    depends = models.ForeignKey(
        "Prediction", on_delete=models.CASCADE, related_name="depends"
    )


class Player(models.Model):
    name = models.CharField(max_length=100, blank=False)
    plays_on = models.ManyToManyField("Team", through="PlaysOn")


class PlaysOn(models.Model):
    player = models.ForeignKey("Player", on_delete=models.CASCADE)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(auto_now_add=False, blank=True)


class Team(models.Model):
    name = models.CharField(max_length=100, blank=False)
    plays_sports = models.ManyToManyField("Sports", through="Plays")


class Plays(models.Model):
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)


class Highlights(models.Model):
    user = models.ForeignKey(
        "SportsCredUser", on_delete=models.CASCADE, related_name="user"
    )
    sports = models.ForeignKey("Sports", on_delete=models.CASCADE)
