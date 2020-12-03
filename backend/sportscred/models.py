from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
import os
import random

# https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User
# using default user class


def hash_directory(instance, filename):
    x, file_extension = os.path.splitext(filename)
    return (
        f"user/pictures/{instance.hash_value[0:2]}/{instance.hash_value[2:4]}/{instance.hash_value}"
        + file_extension
    )


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    status = models.CharField(max_length=100, blank=True)
    about = models.CharField(max_length=300, blank=True)
    agree = models.ManyToManyField("DebateComment", through="Rate")
    favourite_sports = models.ManyToManyField("Sport")
    followers = models.ManyToManyField("Profile")

    @property
    def questionaire_registered(self):
        qs = QuestionaireUserResponse.objects.filter(user=self)
        return len(qs) != 0

    @property
    def average_acs(self):
        return ACS.objects.filter(profile=self).aggregate(models.Avg("score"))


class ProfilePicture(models.Model):
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=100)
    content_type = models.CharField(max_length=100, blank=True)
    charset = models.CharField(max_length=100, blank=True, null=True)
    file = models.ImageField(upload_to=hash_directory, null=True)
    hash_value = models.CharField(max_length=64)
    profile = models.OneToOneField("Profile", on_delete=models.CASCADE, blank=True)


# class Post(models.Model):
#     content = models.CharField(max_length=100, blank=False, null=False)
#     user = models.ForeignKey("Profile", on_delete=models.CASCADE)
#     attached_files = models.FileField(
#         upload_to="user_id/files"
#     )  # Add upload argument (Make a folder named after each user)


class DebatePost(models.Model):
    content = models.CharField(max_length=500, blank=False, null=False)
    title = models.CharField(max_length=100, unique=True)
    post_date = models.DateTimeField(auto_now_add=True)
    sport = models.ForeignKey("Sport", on_delete=models.CASCADE, blank=True, null=True)
    EXPERT_ANALYST = "E"
    PRO_ANALYST = "P"
    ANALYST = "A"
    FANALYST = "F"
    ACS_RANK = [
        (EXPERT_ANALYST, "Expert Analyst"),
        (PRO_ANALYST, "Pro Analyst"),
        (ANALYST, "Analyst"),
        (FANALYST, "Fanalyst"),
    ]
    acs_rank = models.CharField(
        max_length=1, choices=ACS_RANK, default=FANALYST
    )  #     attached_files = models.FileField(
    #         upload_to="user_id/files"
    #     )  # Add upload argument (Make a folder named after each user)
    # its not an actual requirement so we'll try to make it for another sprint


class DebateComment(models.Model):
    post = models.ForeignKey("DebatePost", on_delete=models.CASCADE)
    commenter = models.ForeignKey("Profile", on_delete=models.CASCADE)
    content = models.CharField(max_length=500, blank=False, null=False)
    time = models.DateTimeField(auto_now_add=True)

    @property
    def ratingAverage(self):
        return Rate.objects.filter(comment=self).aggregate(models.Avg("agreement"))


class Rate(models.Model):
    rater = models.ForeignKey("Profile", on_delete=models.CASCADE)
    comment = models.ForeignKey("DebateComment", on_delete=models.CASCADE)
    agreement = models.IntegerField(
        validators=[MaxValueValidator(10), MinValueValidator(1)],
        blank=False,
        null=False,
    )

    class Meta:
        unique_together = ["rater", "comment", "agreement"]


class ACS(models.Model):
    score = models.IntegerField()
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    sports = models.ForeignKey("Sport", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["profile", "sports"]


# For trivia
class TriviaQuestion(models.Model):
    content = models.CharField(max_length=100, blank=False, null=False)
    correct_answer = models.ForeignKey(
        "TriviaAnswer", on_delete=models.CASCADE, related_name="correct_answer"
    )
    related_to_sport = models.ManyToManyField("Sport")


# For trivia
class TriviaAnswer(models.Model):
    parent_question = models.ForeignKey(
        "TriviaQuestion", on_delete=models.CASCADE, null=True
    )
    content = models.CharField(max_length=100, blank=False, null=False)
    # TODO: Think we should store the trivia responses in the database can be done in later sprint


class TriviaInstance(models.Model):
    # represents an instance of trivia for a user
    # basically this is trivia_history
    questions = models.ManyToManyField("TriviaQuestion")
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    sport = models.ForeignKey("Sport", on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    score = models.CharField(max_length=100, blank=True)
    other_user = models.ForeignKey(
        "Profile",
        related_name="other_user",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def select_questions(self):
        questions = TriviaQuestion.objects.filter(related_to_sport=self.sport)
        random_questions = random.sample(list(questions), 11)
        for q in random_questions:
            self.questions.add(q)
            self.save()


class TriviaResponse(models.Model):
    trivia_instance = models.ForeignKey("TriviaInstance", on_delete=models.CASCADE)
    question = models.ForeignKey("TriviaQuestion", on_delete=models.CASCADE)
    answer = models.ForeignKey("TriviaAnswer", on_delete=models.CASCADE, null=True)
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    start_time = models.DateTimeField(blank=False)
    submission_time = models.DateTimeField(blank=False)

    @property
    def is_correct(self):
        # case where there was no answer provideded
        if self.answer == None:
            return False
        return self.question.correct_answer == self.answer


class BaseAcsHistory(models.Model):
    # you never actually call this this is just the abstract class
    delta = models.IntegerField()
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    sport = models.ForeignKey("Sport", on_delete=models.CASCADE)
    score = models.IntegerField(null=True)

    def update_acs(self):
        # updates actual acs score from ACS table
        # either implement a generic function here
        # or override it in the subclass

        # Check whether or not the combination or user & sport is in the table.
        try:
            acs = ACS.objects.get(profile=self.profile, sports=self.sport)
            acs.score = acs.score + self.delta
            if acs.score < 100:
                acs.score = 100
            acs.save()
            self.score = acs.score
            self.save()
        except:
            acs = ACS.objects.create(
                profile=self.profile, sports=self.sport, score=self.delta
            )
            if acs.score < 100:
                acs.score = 100
            acs.save()
            self.score = acs.score
            self.save()

    @classmethod
    # Note: profile is a profile object and sport is a sport object.
    def create(cls, delta, profile, sport):
        acs_history = cls.objects.create(delta=delta, profile=profile, sport=sport)
        acs_history.update_acs()
        return acs_history


class TriviaAcsHistory(BaseAcsHistory):
    source_type = "T"
    trivia_instance = models.ForeignKey(
        "TriviaInstance", on_delete=models.CASCADE, null=True
    )


class DebateAcsHistory(BaseAcsHistory):
    source_type = "D"
    debate_comment = models.ForeignKey(
        "DebateComment", on_delete=models.CASCADE, null=True
    )


class PredictionAcsHistory(BaseAcsHistory):
    source_type = "P"
    prediction = models.ForeignKey("Prediction", on_delete=models.CASCADE, null=True)


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
    qualitative_response = models.CharField(max_length=300, blank=True, null=True)
    quantitative_response = models.IntegerField(blank=True, null=True)
    sport = models.ForeignKey("Sport", on_delete=models.CASCADE, blank=True, null=True)
    team = models.ForeignKey("Team", on_delete=models.CASCADE, blank=True, null=True)
    player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, blank=True, null=True
    )
    custom_answer = models.ForeignKey(
        "QuestionaireAnswer", on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        unique_together = ["user", "question"]


class PredictionChoice(models.Model):
    predicter = models.ForeignKey("Profile", on_delete=models.CASCADE)
    predicting_for = models.ForeignKey("Prediction", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["predicter", "predicting_for"]


class MvpPredictionChoice(PredictionChoice):
    player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, null=True, blank=True
    )


class RookiePredictionChoice(PredictionChoice):
    player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, null=True, blank=True
    )


class PlayOffPredictionChoice(PredictionChoice):
    team = models.ForeignKey("Team", on_delete=models.CASCADE, null=True, blank=True)


class Prediction(models.Model):
    title = models.CharField(max_length=100, blank=True)
    relates_to = models.ForeignKey("Sport", on_delete=models.CASCADE)
    year = models.CharField(
        max_length=4
    )  # this is the year in YYYY format. so 2020 for example
    is_locked = models.BooleanField(default=False)

    @staticmethod
    def prediction_response(year, user):
        # This should be a dictionary of the json response
        result = {}
        result["year"] = year
        # Check if year is in the db or not.
        given_year = Prediction.objects.filter(year=year)
        if len(given_year) == 0:
            return 400
        result["sport"] = "Basketball"
        mvp = {}
        roty = {}
        playoff = []

        # Gets MVP information
        mvp_id = MvpPrediction.objects.filter(year=year).values()
        mvp["title"] = mvp_id[0]["title"]
        mvp["id"] = mvp_id[0]["id"]
        mvp["is_locked"] = mvp_id[0]["is_locked"]
        mvp["correct_player"] = mvp_id[0]["correct_player_id"]
        if mvp["correct_player"] is None:
            mvp["correct_player_name"] = None
        else:
            mvp["corect_player_name"] = (
                Player.objects.filter(id=mvp["correct_player"]).values()[0][
                    "first_name"
                ]
                + " "
                + Player.objects.filter(id=mvp["correct_player"]).values()[0][
                    "last_name"
                ]
            )

        if (
            len(
                MvpPredictionChoice.objects.filter(
                    predicter=user, predicting_for_id=mvp_id[0]["id"]
                )
            )
            == 0
        ):
            mvp["player"] = None
            mvp["player_name"] = None
        else:
            print(
                MvpPredictionChoice.objects.filter(
                    predicter=user, predicting_for_id=mvp_id[0]["id"]
                ).values()
            )
            mvp["player"] = MvpPredictionChoice.objects.filter(
                predicter=user, predicting_for_id=mvp_id[0]["id"]
            ).values()[0]["player_id"]
            mvp["player_name"] = (
                Player.objects.filter(id=mvp["player"]).values()[0]["first_name"]
                + " "
                + Player.objects.filter(id=mvp["player"]).values()[0]["last_name"]
            )

        result["mvp"] = mvp

        # Gets Rookie information
        rookie_id = RotyPrediction.objects.filter(year=year).values()
        roty["title"] = rookie_id[0]["title"]
        roty["id"] = rookie_id[0]["id"]
        roty["is_locked"] = rookie_id[0]["is_locked"]
        roty["correct_player"] = rookie_id[0]["correct_player_id"]
        if roty["correct_player"] is None:
            roty["correct_player_name"] = None
        else:
            roty["corect_player_name"] = (
                Player.objects.filter(id=roty["correct_player"]).values()[0][
                    "first_name"
                ]
                + " "
                + Player.objects.filter(id=roty["correct_player"]).values()[0][
                    "last_name"
                ]
            )

        if (
            len(
                RookiePredictionChoice.objects.filter(
                    predicter=user, predicting_for_id=rookie_id[0]["id"]
                )
            )
            == 0
        ):
            roty["player"] = None
            roty["player_name"] = None
        else:
            roty["player"] = RookiePredictionChoice.objects.filter(
                predicter=user, predicting_for_id=rookie_id[0]["id"]
            ).values()[0]["player_id"]
            roty["player_name"] = (
                Player.objects.filter(id=roty["player"]).values()[0]["first_name"]
                + " "
                + Player.objects.filter(id=roty["player"]).values()[0]["last_name"]
            )
        result["rookie"] = roty

        # Gets the playoff information.
        playoff_id = PlayOffPrediction.objects.filter(year=year).values()
        for item in playoff_id:
            individual_playoff = {}
            individual_playoff["title"] = item["title"]
            individual_playoff["id"] = item["id"]
            individual_playoff["is_locked"] = item["is_locked"]
            individual_playoff["correct_team"] = item["correct_team_id"]
            if individual_playoff["correct_team"] is None:
                individual_playoff["correct_team_name"] = None
            else:
                individual_playoff["correct_team_name"] = Team.objects.filter(
                    id=individual_playoff["correct_team"]
                ).values()[0]["full_name"]

            if (
                len(
                    PlayOffPredictionChoice.objects.filter(
                        predicter=user, predicting_for_id=item["id"]
                    ).values()
                )
                == 0
            ):
                individual_playoff["team"] = None
                individual_playoff["team_name"] = None
            else:
                individual_playoff["team"] = PlayOffPredictionChoice.objects.filter(
                    predicter=user, predicting_for_id=item["id"]
                ).values()[0]["team_id"]
                individual_playoff["team_name"] = Team.objects.filter(
                    id=individual_playoff["team"]
                ).values()[0]["full_name"]
            playoff.append(individual_playoff)

        result["playoff"] = playoff
        return result


class MvpPrediction(Prediction):
    type = "mvp"  # don't know if we'll need this
    correct_player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, null=True, blank=True
    )


class RotyPrediction(Prediction):
    type = "rookie"  # don't know if we'll need this
    correct_player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, null=True, blank=True
    )


class PlayOffPrediction(Prediction):
    correct_team = models.ForeignKey(
        "Team", on_delete=models.CASCADE, null=True, blank=True
    )


class Player(models.Model):
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    plays_on = models.ManyToManyField("Team", through="PlaysOn")
    is_rookie = models.BooleanField(default=False)


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
