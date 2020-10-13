from django_filters.rest_framework import FilterSet
from django.contrib.auth.models import User


class UserFilter(FilterSet):
    class Meta:
        model = User
        fields = {"username": ["icontains", "exact"]}
