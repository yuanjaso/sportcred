from django_filters.rest_framework import FilterSet
from django.contrib.auth.models import User
from sportscred.models import Sport, Team, Player


class UserFilter(FilterSet):
    class Meta:
        model = User
        fields = {"username": ["icontains", "exact"]}


class SportFilter(FilterSet):
    class Meta:
        model = Sport
        fields = {"name": ["icontains", "exact"]}


class TeamFilter(FilterSet):
    class Meta:
        model = Team
        fields = {
            "full_name": ["icontains", "exact"],
            "short_name": ["icontains", "exact"],
        }


class PlayerFilter(FilterSet):
    class Meta:
        model = Player
        fields = {
            "first_name": ["icontains", "exact"],
            "last_name": ["icontains", "exact"],
        }
