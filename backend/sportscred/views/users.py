from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from ..filters import UserFilter
from ..permissions import AnonCreateAndUpdateOwnerOnly
from ..serializers import UserSerializer
from sportscred.models import BaseAcsHistory, TriviaAcsHistory, Sport, Profile
from .utils import filter_request


class IndexPage(TemplateView):
    template_name = "index.html"


class UserViewSet(viewsets.ViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    permission_classes = [AnonCreateAndUpdateOwnerOnly]

    # GET
    def list(self, request):
        # https://stackoverflow.com/questions/44048156/django-filter-use-paginations

        return filter_request(request, UserFilter, UserSerializer)

    # POST
    def create(self, request):
        try:
            users = User.objects.filter(email__iexact=request.data["email"])
            if users:
                raise Exception
            u = User.objects.create_user(
                username=request.data["username"],
                password=request.data["password"],
                email=request.data["email"],
            )
        except Exception as e:
            print(e)
            return Response(
                {"details": "Username or email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        profile = Profile.objects.create(user=u)
        profile.save()
        token = Token.objects.create(user=u)
        response = {
            "token": token.key,
            "user_id": u.pk,
            "username": u.username,
            "is_superuser": u.is_superuser,
            "questionaire_registered": profile.questionaire_registered,
        }

        # Sets the delta to +200 whenever a new account is created.
        history = TriviaAcsHistory.create(  # Attach a trivia instance
            delta=200,
            profile=User.objects.get(pk=u.pk).profile,
            sport=Sport.objects.get(pk=1),
        )

        return Response(response)

    @action(detail=False, methods=["post"])
    def login(self, request):
        """
        This method creates and sets a cookie for authentication and session management
        """
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        if user:
            # get or create a token
            token = Token.objects.get(user=user)
            return Response(
                {
                    "token": token.key,
                    "user_id": user.pk,
                    "is_superuser": user.is_superuser,
                    "questionaire_registered": user.profile.questionaire_registered,
                }
            )
        else:
            try:
                user = User.objects.get(email__icontains=request.data["username"])
            except:
                return Response(
                    {"details": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            username = user.username
            user = authenticate(username=username, password=request.data["password"])
            if user:
                token = Token.objects.get(user=user)
                return Response(
                    {
                        "token": token.key,
                        "user_id": user.pk,
                        "is_superuser": user.is_superuser,
                        "questionaire_registered": user.profile.questionaire_registered,
                    }
                )
            return Response(
                {"details": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
