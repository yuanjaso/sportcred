from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
import os

# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


def hash_directory(instance, filename):
    x, file_extension = os.path.splitext(filename)
    return (
        f"user/pictures/{instance.hash_value[0:2]}/{instance.hash_value[2:4]}/{instance.hash_value}"
        + file_extension
    )


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    status = models.CharField(max_length=100, blank=True)
    about = models.CharField(max_length=300, blank=True)
    agree = models.ManyToManyField("DebatePost", through="Agrees")
    like = models.ManyToManyField("SocialPost", through="Likes")
    highlights = models.ManyToManyField("Sport")
    followers = models.ManyToManyField("Profile")


class ProfilePicture(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=100)
    content_type = models.CharField(max_length=100, blank=True)
    charset = models.CharField(max_length=100, blank=True, null=True)
    file = models.ImageField(upload_to=hash_directory, null=True)
    hash_value = models.CharField(max_length=64)
    profile = models.OneToOneField("Profile", on_delete=models.CASCADE, blank=True)


class Post(models.Model):
    content = models.CharField(max_length=100, blank=False, null=False)
    parent_post = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.CASCADE, default=None
    )
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    attached_files = models.FileField(
        upload_to="user_id/files"
    )  # Add upload argument (Make a folder named after each user)


class Agrees(models.Model):
    agreer = models.ForeignKey("Profile", on_delete=models.CASCADE)
    post = models.ForeignKey("DebatePost", on_delete=models.CASCADE)
    agreement = models.IntegerField(
        validators=[MaxValueValidator(10), MinValueValidator(1)],
        blank=False,
        null=False,
    )

    class Meta:
        unique_together = ["agreer", "post"]


class DebatePost(Post):
    title = models.CharField(max_length=300, unique=True)
    related_to_debate_posts = models.ManyToManyField("Sport")

    @property
    def agreementAverage(self):
        return Agrees.objects.filter(post=self).aggregate(Models.Avg("agreement"))


class SocialPost(Post):
    @property
    def sum_likes(self):
        return Likes.objects.filter(post=self).aggregate(Models.Sum("liked_or_dislike"))


class Likes(models.Model):
    liker = models.ForeignKey("Profile", on_delete=models.CASCADE)
    post = models.ForeignKey("SocialPost", on_delete=models.CASCADE)
    # Got this from
    # https://stackoverflow.com/questions/33772947/django-set-range-for-integer-model-field-as-constraint
    # A like = 1, a dislike = -1 and ignore = 0
    liked_or_dislike = models.IntegerField(
        default=0, validators=[MaxValueValidator(1), MinValueValidator(-1)]
    )

    class Meta:
        unique_together = ["liker", "post"]


class ACS(models.Model):
    score = models.FloatField(max_length=10)
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sport", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["user", "sports", "score"]


# For trivia
class TriviaQuestion(models.Model):
    content = models.CharField(max_length=100, blank=False, null=False)
    correct_answer = models.ForeignKey(
        "TriviaAnswer", on_delete=models.CASCADE, related_name="correct_answer"
    )
    related_to_sport = models.ManyToManyField("Sport")


# For trivia
class TriviaAnswer(models.Model):
    parent_question = models.ForeignKey("TriviaQuestion", on_delete=models.CASCADE)
    content = models.CharField(max_length=100, blank=False, null=False)
    # TODO: Think we should store the trivia responses in the database can be done in later sprint


class Sport(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False, unique=True)


class QuestionaireQuestion(models.Model):
    QUANTITATIVE = "QN"
    QUALITATIVE = "QL"
    SPORT = "S"
    TEAM = "T"
    PLAYER = "P"
    CUSTOM = "C"  # Pulls from a QuestionaireAnswer
    QUESTION_TYPE = [
        (QUANTITATIVE, "Quantitative"),
        (QUALITATIVE, "Qualitative"),
        (SPORT, "Sport"),
        (TEAM, "Team"),
        (PLAYER, "Player"),
        (CUSTOM, "Custom"),
    ]
    question_content = models.CharField(max_length=300, blank=False, unique=True)
    question_type = models.CharField(
        max_length=2, choices=QUESTION_TYPE, default=QUANTITATIVE
    )
    max_int = models.IntegerField(blank=True, null=True)
    min_int = models.IntegerField(blank=True, null=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(max_int__gte=models.F("min_int")), name="max_gte_min"
            )
        ]


class QuestionaireAnswer(models.Model):
    # This represents a custom enumeration of values for a specific QuestionanaireQuestion
    question = models.ForeignKey("QuestionaireQuestion", on_delete=models.CASCADE)
    custom_answer = models.CharField(max_length=300, blank=False)

    class Meta:
        unique_together = ["question", "custom_answer"]


class QuestionaireUserResponse(models.Model):
    # was not able to get proper constraints for this
    # will need to do the check at the viewset level
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    question = models.ForeignKey("QuestionaireQuestion", on_delete=models.CASCADE)
    qualitative_response = models.CharField(max_length=300, blank=True)
    quantitative_response = models.IntegerField(blank=True)
    sport = models.ForeignKey("Sport", on_delete=models.CASCADE, blank=True)
    team = models.ForeignKey("Team", on_delete=models.CASCADE, blank=True)
    custom_answer = models.ForeignKey(
        "QuestionaireAnswer", on_delete=models.CASCADE, blank=True
    )

    class Meta:
        unique_together = ["user", "question"]


class PredictChoice(models.Model):
    # TODO:
    # Need to make sure this pulls from the database later and isnt a random string
    predicter = models.ForeignKey("Profile", on_delete=models.CASCADE)
    predicting_for = models.ForeignKey("Prediction", on_delete=models.CASCADE)
    content = models.CharField(max_length=100, blank=True)

    class Meta:
        unique_together = ["predicter", "predicting_for"]


class Prediction(models.Model):
    title = models.CharField(max_length=100, blank=True)
    type = models.CharField(max_length=100, blank=True)
    # TODO: Change this enumerator and CharField
    deadline = models.DateTimeField(auto_now_add=False, blank=True)
    depends_on = models.ManyToManyField("Prediction")
    relates_to = models.ManyToManyField("Sport")

    class Meta:
        constraints = [models.UniqueConstraint(fields=["title"], name="unique_name")]


class Player(models.Model):
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    plays_on = models.ManyToManyField("Team", through="PlaysOn")


class PlaysOn(models.Model):
    player = models.ForeignKey("Player", on_delete=models.CASCADE)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(auto_now_add=False, blank=True, null=True)


class Team(models.Model):
    full_name = models.CharField(max_length=100, blank=False)
    short_name = models.CharField(max_length=100, blank=False)
    plays_sport = models.ForeignKey("Sport", on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["full_name"], name="unique_name")
        ]
