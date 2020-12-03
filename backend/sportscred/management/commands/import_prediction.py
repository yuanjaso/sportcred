from yaml import load

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from sportscred.models import PlayOffPrediction, Sport, MvpPrediction, RotyPrediction

YEAR = "2020"
SPORT = Sport.objects.get(pk=1)


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        mvp = MvpPrediction.objects.create(title="MVP", relates_to=SPORT, year=YEAR)
        mvp.save()
        rookie = RotyPrediction.objects.create(
            title="ROTY", relates_to=SPORT, year=YEAR
        )
        rookie.save()
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            playoffs = data["playoff"]
            for item in playoffs:
                playoff = PlayOffPrediction.objects.create(
                    title=item, relates_to=SPORT, year=YEAR
                )
                playoff.save()
