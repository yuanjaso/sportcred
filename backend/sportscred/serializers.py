from django.contrib.auth.models import User
from rest_framework import serializers
from sportscred.models import (
    Profile,
    Sport,
    Team,
    Player,
    QuestionaireQuestion,
    QuestionaireAnswer,
    QuestionaireUserResponse,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user", "status", "profile_picture"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_superuser"]


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
        field = "__all__"
        depth = 2

