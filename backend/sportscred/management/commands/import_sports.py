from yaml import load

from django.core.management.base import BaseCommand, CommandError

from sportscred.models import Sport, Team, Player, PlaysOn


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            sports = data["Sports"]
            teams = data["Teams"]
            players = data["Players"]
            for sport in sports:
                s = Sport.objects.create(
                    name=sport["name"],
                )
                s.save()
            for team in teams:
                s = Sport.objects.get(name=team["sport"])
                t = Team.objects.create(
                    plays_sport=s,
                    full_name=team["full_name"],
                    short_name=team["short_name"],
                )
                t.save()
            for player in players:
                t = Team.objects.get(full_name=player["team"])
                p = Player.objects.create(
                    first_name=player["first_name"],
                    last_name=player["last_name"],
                )
                p.save()
                plays_on = PlaysOn.objects.create(
                    player=p,
                    team=t,
                )
                plays_on.save()
            p = Player.objects.create(
                first_name="Ja", last_name="Morant", is_rookie=True
            )
            p.save()
            plays_on = PlaysOn.objects.create(
                player=p,
                team=t,
            )
            plays_on.save()
            p = Player.objects.create(
                first_name="Brandon", last_name="Clarke", is_rookie=True
            )
            p.save()
            plays_on = PlaysOn.objects.create(
                player=p,
                team=t,
            )
            plays_on.save()
            p = Player.objects.create(
                first_name="Kendrick", last_name="Nunn", is_rookie=True
            )
            p.save()
            plays_on = PlaysOn.objects.create(
                player=p,
                team=t,
            )
            plays_on.save()
            p = Player.objects.create(
                first_name="Tyler", last_name="Herro", is_rookie=True
            )
            p.save()
            plays_on = PlaysOn.objects.create(
                player=p,
                team=t,
            )
            plays_on.save()