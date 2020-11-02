from yaml import load
from django.contrib.auth.models import User

from django.core.management.base import BaseCommand, CommandError

from sportscred.models import BaseAcsHistory, TriviaAcsHistory, Sport, Profile


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            base_acs_history = data["baseacshistory"]
            for item in base_acs_history:
                b = TriviaAcsHistory.create(  # Attach a trivia instance
                    delta=item["delta"],
                    profile=User.objects.get(pk=item["profile_id"]).profile,
                    sport=Sport.objects.get(pk=item["sport_id"]),
                )
                b.save()
