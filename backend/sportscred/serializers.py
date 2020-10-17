from rest_framework import serializers
from sportscred.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "status", "profile_picture"]
