from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .filters import UserFilter
from .permissions import AnonCreateAndUpdateOwnerOnly
from .serializers import *  # we literally need everything
from sportscred.models import Profile


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

        paginator = PageNumberPagination()
        filtered_set = UserFilter(request.GET, queryset=User.objects.all()).qs
        filtered_set = filtered_set.order_by("username").exclude(pk=1)
        context = paginator.paginate_queryset(filtered_set, request)
        serializer = UserSerializer(context, many=True)
        return paginator.get_paginated_response(serializer.data)

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
            "email": u.email,
        }
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
            return Response({"token": token.key, "user_id": user.pk})
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
                return Response({"token": token.key, "user_id": user.pk})
            return Response(
                {"details": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
