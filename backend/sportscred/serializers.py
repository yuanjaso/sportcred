from django.contrib.auth.models import User
from rest_framework import serializers
from sportscred.models import (
    Profile,
    Sport,
    Team,
    Player,
    ProfilePicture,
    QuestionaireQuestion,
    QuestionaireAnswer,
    QuestionaireUserResponse,
    ACS,
    BaseAcsHistory,
    TriviaQuestion,
    TriviaInstance,
    TriviaAnswer,
    DebatePost,
    DebateComment,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "is_superuser"]


class ProfilePictureSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProfilePicture
        fields = ["name", "content_type", "charset", "url"]

    def get_url(self, pic):
        return pic.file.url


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ["id", "name"]


# Foreign key serialization
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["id", "full_name", "short_name", "plays_sport"]
        depth = 2


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = "__all__"
        depth = 2


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionaireQuestion
        fields = "__all__"


class QuestionnaireAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionaireAnswer
        fields = "__all__"


class QuestionaireUserResponseSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    question = QuestionnaireSerializer()
    answer = serializers.SerializerMethodField()

    class Meta:
        model = QuestionaireUserResponse
        fields = ["user", "question", "answer"]

    def get_user(self, qur):
        return UserSerializer(qur.user.user).data

    def get_answer(self, qur):
        QUESTION_TYPE = {
            "QN": qur.quantitative_response,
            "QL": qur.qualitative_response,
            "S": SportSerializer(qur.sport).data,
            "T": TeamSerializer(qur.team).data,
            "P": PlayerSerializer(qur.player).data,
            "C": QuestionnaireAnswerSerializer(qur.custom_answer).data,
        }
        q_type = qur.question.question_type
        return QUESTION_TYPE[q_type]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    profilepicture = ProfilePictureSerializer()
    favourite_sports = SportSerializer(many=True)

    class Meta:
        model = Profile
        fields = ["user", "status", "favourite_sports", "about", "profilepicture"]


class ProfiletoUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ["user"]


class FollowSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["followers", "following"]

    def get_following(self, profile):

        return UserSerializer(
            User.objects.filter(profile__followers=profile), many=True
        ).data

    def get_followers(self, profile):
        return ProfiletoUserSerializer(profile.followers, many=True).data


class ACSSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = ACS
        fields = ["name", "score"]
        depth = 2

    def get_name(self, acs):
        return acs.sports.name


class TriviaAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriviaAnswer
        fields = ["content", "id"]


class TriviaQuestionsSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    class Meta:
        model = TriviaQuestion
        depth = 2
        fields = ["id", "correct_answer", "content", "answers"]

    def get_answers(self, question):
        return TriviaAnswersSerializer(
            TriviaAnswer.objects.filter(parent_question=question), many=True
        ).data


class TriviaSerializer(serializers.ModelSerializer):
    questions = TriviaQuestionsSerializer(many=True)
    user = serializers.SerializerMethodField()
    other_user = serializers.SerializerMethodField(
        allow_null=True, default=None, required=False
    )

    class Meta:
        model = TriviaInstance
        depth = 3
        fields = [
            "id",
            "user",
            "other_user",
            "score",
            "creation_date",
            "sport",
            "questions",
        ]

    def get_user(self, instance):
        if instance.user == None:
            return None
        return UserSerializer(instance.user.user).data

    def get_other_user(self, instance):
        if instance.other_user == None:
            return None
        return UserSerializer(instance.other_user.user).data


class DebateSerializer(serializers.ModelSerializer):

    num_of_comments = serializers.SerializerMethodField()

    class Meta:
        model = DebatePost
        depth = 2
        fields = [
            "id",
            "content",
            "post_date",
            "sport",
            "title",
            "num_of_comments",
            "acs_rank",
        ]

    def get_num_of_comments(self, obj):
        num = DebateComment.objects.filter(post=obj).count()
        return num