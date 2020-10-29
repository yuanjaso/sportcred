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
    TriviaQuestion,
    TriviaInstance,
    TriviaAnswer,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user", "status", "profile_picture"]


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
    class Meta:
        model = QuestionaireUserResponse
        fields = "__all__"
        depth = 2


class FollowSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["followers", "following"]

    def get_following(self, profile):
        return Profile.objects.filter(followers=profile).values_list(
            "user__pk", flat=True
        )


class TriviaAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["content", "id"]


class TriviaQuestionsSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    class Meta:
        model = TriviaQuestion
        fields = ["id", "correct_answer", "content", "answers"]

    def get_answers(self, question):
        return TriviaAnswersSerializer(
            TriviaAnswer.objects.filter(parent_question=question), many=True
        ).data


class TriviaSerializer(serializers.ModelSerializer):
    questions = TriviaQuestionsSerializer(many=True)
    user = UserSerializer()
    other_user = UserSerializer()

    class Meta:
        model = TriviaInstance
        fields = ["id", "user", "other_user", "is_completed", "creation_date", "sport"]
