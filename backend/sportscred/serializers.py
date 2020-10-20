from django.contrib.auth.models import User
from rest_framework import serializers
from sportscred.models import Profile, Sport, Team, Player, ProfilePicture


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class ProfilePictureSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProfilePicture
        fields = ["name", "content_type", "charset", "url"]

    def get_url(self, pic):
        return pic.file.url


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    profilepicture = ProfilePictureSerializer()

    class Meta:
        model = Profile
        fields = ["user", "status", "about", "profilepicture"]


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
