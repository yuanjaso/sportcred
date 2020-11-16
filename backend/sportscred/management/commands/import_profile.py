from yaml import load

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from sportscred.models import Profile, TriviaAcsHistory, Sport


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            super_user = Profile.objects.create(
                user_id=1, status="not much", about="not much"
            )
            with open(input_file, "r") as f:
                data = load(f.read())
            profile = data["profile"]
            for item in profile:
                user = User.objects.create(
                    username=item["username"], email=item["email"], password="."
                )
                Token.objects.create(user=user)
                p = Profile.objects.create(
                    user=user, status=item["status"], about=item["about"]
                )
                p.save()
                history = TriviaAcsHistory.create(  # Attach a trivia instance
                    delta=200,
                    profile=p,
                    sport=Sport.objects.get(pk=1),
                )
                history.save()
