from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from hashlib import sha256
import os

from ..filters import UserFilter
from ..permissions import AnonCreateAndUpdateOwnerOnly
from ..serializers import *  # we literally need everything
from sportscred.models import ProfilePicture, Profile


class IndexPage(TemplateView):
    template_name = "index.html"


class ProfileViewSet(viewsets.ViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    permission_classes = [AnonCreateAndUpdateOwnerOnly]

    # Update picture
    @action(detail=False, methods=["put"])
    def picture(self, request):
        # https://stackoverflow.com/questions/44048156/django-filter-use-paginations
        try:
            profile = request.user.profile
            for pic in request.FILES:
                file = request.FILES[pic]
                break

            hash_object = sha256()

            for chunk in file.chunks():
                hash_object.update(chunk)
            hash_value = hash_object.hexdigest()
            try:
                path = profile.profilepicture.file.path
                profile.profilepicture.delete()
                if os.path.exists(path):
                    os.remove(path)
            except:
                print("No picture in database")

            profile.profilepicture = None
            profile.save()
            picture = ProfilePicture(
                name=file.name,
                size=file.size,
                content_type=file.content_type,
                charset=file.charset,
                file=file,
                hash_value=hash_value,
                profile=profile,
            )
            picture.save()

            return Response(ProfilePictureSerializer(picture).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["put"])
    def status(self, request):
        """
        This method updates the status of
        """
        try:

            profile = request.user.profile
            profile.status = request.data["status"]
            return Response()
        except Exception as e:

            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["put"])
    def about(self, request):
        """
        This method updates the about text of the user
        """
        try:

            profile = request.user.profile
            profile.about = request.data["about"]
            return Response()
        except Exception as e:

            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def list(self, request):
        """
        This method returns a profile given a username
        """
        try:
            profile = User.objects.get(username=request.data["username"]).profile
            print(ProfileSerializer(profile).data)
            return Response(ProfileSerializer(profile).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )
