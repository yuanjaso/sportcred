from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ..filters import PlayerFilter
from ..serializers import PlayerSerializer

# from ..permissions import AnonCreateAndUpdateOwnerOnly
from sportscred.models import Profile
from .utils import filter_request


class PlayerViewSet(viewsets.ViewSet):
    """
    Everything relating to Sports
    """

    # GET
    def list(self, request):
        return filter_request(request, PlayerFilter, PlayerSerializer)
