from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    status = models.CharField(max_length=100, blank=True)

    profile_picture = models.ImageField(
        upload_to="user_id/files"
    )  # Add upload argument (Make a folder named after each user)
    agree = models.ManyToManyField("DebatePost", through="Agrees")
    like = models.ManyToManyField("SocialPost", through="Likes")
    highlights = models.ManyToManyField("Sport")
    followers = models.ManyToManyField("Profile")


class Post(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
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


class DebatePost(Post):
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


class ACS(models.Model):
    score = models.FloatField(max_length=10)
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sport", on_delete=models.CASCADE)


# For trivia
class Question(models.Model):
    content = models.CharField(max_length=100, blank=False, null=False)
    correct_answer = models.ForeignKey(
        "Answer", on_delete=models.CASCADE, related_name="correct_answer"
    )
    related_to_sports = models.ManyToManyField("Sport")


# For trivia
class QuestionRelatingTo(models.Model):
    question = models.ForeignKey("Question", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sport", on_delete=models.CASCADE)


# For trivia
class Answer(models.Model):
    parent_question = models.ForeignKey("Question", on_delete=models.CASCADE)
    content = models.CharField(max_length=100, blank=False, null=False)
    # TODO: Think we should store the trivia responses in the database can be done in later sprint


class Sport(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)


class QuestionaireQuestion(models.Model):
    question_content = models.CharField(max_length=300, blank=False)
    is_quanitative = models.BooleanField(blank=False)
    max_int = models.IntegerField()
    min_int = models.IntegerField()

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(max_int__gte=models.F("min_int")), name="max_gte_min"
            )
        ]


class QuestionaireResponse(models.Model):
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    qualitative_response = models.CharField(max_length=300, blank=True)
    quantitative_response = models.IntegerField(blank=True)
    question = models.ForeignKey("QuestionaireQuestion", on_delete=models.CASCADE)


class PredictChoice(models.Model):
    # TODO:
    # Need to make sure this pulls from the database later and isnt a random string
    predicter = models.ForeignKey("Profile", on_delete=models.CASCADE)
    content = models.CharField(max_length=100, blank=True)


class Prediction(models.Model):
    title = models.CharField(max_length=100, blank=True)
    type = models.CharField(max_length=100, blank=True)
    # TODO: Change this enumerator and CharField
    deadline = models.DateTimeField(auto_now_add=False, blank=True)
    depends_on = models.ManyToManyField("Prediction")
    relates_to = models.ManyToManyField("Sport")


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
    plays_sports = models.ForeignKey("Sport", on_delete=models.CASCADE)
