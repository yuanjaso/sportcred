from yaml import load

from django.core.management.base import BaseCommand, CommandError

from sportscred.models import Profile


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            profile = data["profile"]
            for item in profile:
                p = Profile.objects.create(
                    user_id=item["user_id"], status=item["status"], about=item["about"]
                )
                p.save()
