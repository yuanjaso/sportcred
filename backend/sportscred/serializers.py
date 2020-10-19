from django.contrib.auth.models import User
from rest_framework import serializers
from sportscred.models import Profile, ProfilePicture


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
        fields = ["user", "status", "profilepicture"]