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
from django.db.models import Avg, Sum
import os

from ..filters import UserFilter
from ..permissions import AnonCreateAndUpdateOwnerOnly
from ..serializers import *  # we literally need everything
from sportscred.models import (
    ProfilePicture,
    Profile,
    Sport,
    ACS,
    BaseAcsHistory,
    TriviaAcsHistory,
)


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
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    def patch(self, request):
        """
        This method updates the status, about and highlight of profile
        """
        try:
            update = ["status", "about"]
            profile = request.user.profile
            for item in update:
                if item in request.data.keys():
                    setattr(profile, item, request.data[item])
                    profile.save()
            if "favourite_sports" in request.data.keys():
                # expecting a list
                # highlights is also known as favourite_sports
                highlights = request.data["favourite_sports"]
                try:
                    for highlight in highlights:
                        try:
                            s = Sport.objects.get(id=highlight)
                            profile.favourite_sports.add(s)
                            profile.save()
                        except:
                            return Response(
                                {"details": "The id does not exist."},
                                status=status.HTTP_400_BAD_REQUEST,
                            )
                except:
                    return Response(
                        {"details": "You did not give an array."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            # Don't need query params.
            profile = User.objects.get(pk=request.user.id).profile
            acs_info = ACS.objects.filter(profile_id=request.user.id)

            # Gets the ACS average of the user.
            acs_avg = acs_info.aggregate(Avg("score"))

            # Keeps track of the user's acs average score and scores for each sport.
            ACS_Score = {}
            ACS_Score["average"] = acs_avg["score__avg"]

            # Gets the ACS Score for each sport.
            for item in ACSSerializer(acs_info, many=True).data:
                ACS_Score[item["name"]] = item["score"]

            profile_info = ProfileSerializer(profile).data
            profile_info["favourite_sports"] = profile_info["favourite_sports"]
            profile_info["ACS"] = ACS_Score

            return Response(profile_info)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=["get"])
    def acs_history(self, request, pk=None):
        """
        This method is responsible for returning the ACS history of a user.
        """
        if pk == None:
            return Response(
                {"details": "User id not inputted."}, status=status.HTTP_400_BAD_REQUEST
            )
        profile = request.user.profile
        try:
            acs = BaseAcsHistory.objects.filter(profile_id=pk).order_by("date")
            try:
                group_by_date = request.query_params["group_by_date"]
            except:
                return Response(
                    {"details": "You did not enter a value for group_by_date"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return_list = []
            if group_by_date.lower() == "true":
                history = acs.values("date", "sport").annotate(delta=Sum("delta"))
                result = []
                for acs in history:
                    qs = (
                        BaseAcsHistory.objects.filter(
                            date=acs["date"], profile_id=pk, sport_id=acs["sport"]
                        )
                        .order_by("-id")
                        .values()
                    )
                    print(qs)
                    acs["score"] = qs[0]["score"]
                    result.append(acs)
                return Response(result)
            elif group_by_date.lower() == "false":
                for item in acs.values():
                    item.pop("id")  # Removes id
                    item[
                        "source_type"
                    ] = TriviaAcsHistory.source_type  # Adds source type
                    sports_id = item.pop("sport_id")

                    item["sport"] = {
                        "id": sports_id,
                        "name": Sport.objects.filter(id=sports_id).values("name")[0][
                            "name"
                        ],
                    }
                    return_list.append(item)
            else:
                return Response(
                    {"details": "You did not enter true or false for group_by_date"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(return_list)
        except User.DoesNotExist:
            return Response(
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=["put"])
    def radar(self, request, pk=None):
        """
        This method is responsible for allowing users follow each other
        """
        if pk == None:
            return Response(
                {"details": "Profile of followee not found, bad pk"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if request.user.id == int(pk):
            return Response(
                {"details": "Cannot follow yourself"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            profile = request.user.profile

        try:
            followe = User.objects.get(pk=pk).profile
            followe.followers.add(profile)
            followe.save()
            data = FollowSerializer(profile).data
            data["id"] = profile.user.pk
            return Response(data)
        except User.DoesNotExist:

            return Response(
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    @radar.mapping.delete
    def unfollows(self, request, pk=None):
        """Unfollow"""
        if pk == None:
            return Response(
                {"details": "Profile of followee not found, bad pk"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        profile = request.user.profile
        try:
            followe = User.objects.get(pk=pk).profile

            followe.followers.remove(profile)
            profile.save()
            data = FollowSerializer(profile).data
            data["id"] = profile.user.pk
            return Response(data)
        except User.DoesNotExist:
            return Response(
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    @radar.mapping.get
    def get_followers(self, request, pk=None):
        """Unfollow"""
        if pk == None:
            return Response(
                {"details": "Profile of followee not found, bad pk"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            followe = User.objects.get(pk=pk).profile
            data = FollowSerializer(followe).data
            data["id"] = pk
            return Response(data)
        except User.DoesNotExist:
            return Response(
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    def list(self, request):
        """
        This method returns a profile given a username
        """
        try:
            profile = User.objects.get(pk=request.query_params["user_id"]).profile
            acs_info = ACS.objects.filter(profile_id=request.query_params["user_id"])

            # Gets the ACS average of the user.
            acs_avg = acs_info.aggregate(Avg("score"))

            # Keeps track of the user's acs average score and scores for each sport.
            ACS_Score = {}
            ACS_Score["average"] = acs_avg["score__avg"]

            # Gets the ACS Score for each sport.
            for item in ACSSerializer(acs_info, many=True).data:
                ACS_Score[item["name"]] = item["score"]

            profile_info = ProfileSerializer(profile).data
            profile_info["favourite_sports"] = profile_info["favourite_sports"]
            profile_info["ACS"] = ACS_Score
            return Response(profile_info)

        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )
