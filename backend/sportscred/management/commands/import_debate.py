from yaml import load

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from sportscred.models import Profile, Sport, DebatePost, DebateComment, Rate


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            debates = data["debate"]
            for item in debates:
                sport = Sport.objects.get(pk=item["sport"])
                debate = DebatePost.objects.create(
                    content=item["title"],
                    title=item["title"],
                    acs_rank=item["acs_rank"],
                )
                debate.sport = sport
                debate.save()
            comment = data["comments"]
            for item in comment:
                debate = DebatePost.objects.get(pk=item["post"])
                profile = User.objects.get(pk=item["user"]).profile
                comment = DebateComment.objects.create(
                    post=debate, content=item["content"], commenter=profile
                )
                comment.save()
            rate = data["rate"]
            for item in rate:
                profile = User.objects.get(pk=item["user"]).profile
                comment = DebateComment.objects.get(pk=item["comment"])
                rate = Rate.objects.create(
                    rater=profile, comment=comment, agreement=item["agreement"]
                )
                rate.save()
