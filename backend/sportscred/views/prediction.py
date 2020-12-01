from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest
from sportscred.permissions import DebateSuper
from django.db.models import Count
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from sportscred.models import (
    Prediction,
    PredictionChoice,
    User,
    Player,
    MvpPredictionChoice,
    RookiePredictionChoice,
    PlayOffPredictionChoice,
    MvpPrediction,
    RotyPrediction,
    PlayOffPrediction,
    Team,
)


class PredictionViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, DebateSuper]

    def list(self, request):

        # Checks if the year and user_id are both given.
        if "year" not in request.query_params or "user_id" not in request.query_params:
            return Response(
                {"details": "You did not give either the user id or the year."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        year = request.query_params["year"]
        user_id = request.query_params["user_id"]

        # Checks if the user is in the db
        try:
            User.objects.filter(id=user_id).values()[0]["id"]
        except:
            return Response(
                {"details": "The user does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        item = Prediction.prediction_response(year, user_id)
        if item == 400:
            return Response(
                {"details": "The inputted year is not in the database."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(item)

    def update(self, request):
        keys = list(request.data.keys())

        # Checks if year is in the keys given.
        if "year" not in keys:
            return Response(
                {"details": "You did not give the year."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        year = request.data["year"]

        # Checks if sport is in the keys given.
        if "sport" not in keys:
            return Response(
                {"details": "You did not give the sport."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        sport = request.data["sport"]

        if "mvp" in keys:

            mvp_keys = list(request.data["mvp"].keys())
            if "id" not in mvp_keys or "player" not in mvp_keys:
                return Response(
                    {"details": "You did not give the id or player for mvp."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            id = request.data["mvp"]["id"]
            player = request.data["mvp"]["player"]

            # We need to check if the player is in the database.
            check_player = self.check_player(player)
            if not check_player:
                return Response(
                    {
                        "details": "The player id you gave for mvp is not in the database."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # We need to check if the id is in the db.
            check_id = self.check_id("M", id)
            if not check_id:
                return Response(
                    {"details": "The id you gave for mvp is not in the database."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Saves the prediction in the database.
            get_parent_id = MvpPredictionChoice.objects.filter(
                predictionchoice_ptr_id=id
            )
            if len(get_parent_id) == 0:
                mvp_prediction = MvpPredictionChoice.objects.create(
                    predictionchoice_ptr_id=id,
                    player_id=player,
                    predicter_id=request.user.id,
                    predicting_for_id=id,
                )
                mvp_prediction.save()
            else:
                get_parent_id.update(player_id=player)

        # Checks if the user passed in information for rookie.
        if "rookie" in keys:
            rookie_keys = list(request.data["rookie"].keys())
            if "id" not in rookie_keys or "player" not in rookie_keys:
                return Response(
                    {"details": "You did not give the id or player for rookie."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            id = request.data["rookie"]["id"]
            player = request.data["rookie"]["player"]

            # We need to check if the player is in the database.
            check_player = self.check_player(player)
            if not check_player:
                return Response(
                    {
                        "details": "The player id you gave for rookie is not in the database."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # We need to check if the id is in the db.
            check_id = self.check_id("R", id)
            if not check_id:
                return Response(
                    {"details": "The id you gave for rookie is not in the database."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Checks if the given player is a rookie.
            rookie_status = Player.objects.filter(id=player).values()[0]["is_rookie"]
            if not rookie_status:
                return Response(
                    {"details": "The player is not a rookie."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Saves the prediction in the database.
            get_parent_id = RookiePredictionChoice.objects.filter(
                predictionchoice_ptr_id=id
            )
            if len(get_parent_id) == 0:
                rookie_prediction = RookiePredictionChoice.objects.create(
                    predictionchoice_ptr_id=id,
                    player_id=player,
                    predicter_id=request.user.id,
                    predicting_for_id=id,
                )
                rookie_prediction.save()
            else:
                get_parent_id.update(player_id=player)

        # Checks if the user passed in information for playoff.
        if "playoff" in keys:
            for item in request.data["playoff"]:
                playoff_keys = list(item.keys())
                if "id" not in playoff_keys or "team" not in playoff_keys:
                    return Response(
                        {"details": "You did not give the id or team for playoff."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                id = item["id"]
                team = item["team"]

                # Checks if the team id given is valid.
                check_team = Team.objects.filter(id=team)
                if len(check_team) == 0:
                    return Response(
                        {
                            "details": "A team you provided for playoffs is not in the database."
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Checks if the id given is valid.
                check_id = self.check_id("P", id)
                if not check_id:
                    return Response(
                        {
                            "details": "A id you gave for playoff is not in the database."
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Saves the prediction in the database.
                get_parent_id = PlayOffPredictionChoice.objects.filter(
                    predictionchoice_ptr_id=id
                )
                if len(get_parent_id) == 0:
                    playoff_prediction = PlayOffPredictionChoice.objects.create(
                        predictionchoice_ptr_id=id,
                        team_id=team,
                        predicter_id=request.user.id,
                        predicting_for_id=id,
                    )
                    playoff_prediction.save()
                else:
                    get_parent_id.update(team_id=team)

        item = Prediction.prediction_response(year, request.user.id)
        if item == 400:
            return Response(
                {"details": "The inputted year is not in the database."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(item)

    def check_player(self, player_id):
        # This function checks if the player ids are in the db.

        valid_player = False

        # Checks if the player id exists.
        check_player = Player.objects.filter(id=player_id)
        if len(check_player) != 0:
            valid_player = True

        return valid_player

    def check_id(self, type, id):
        # This functions checks if the ids are in the db.

        valid_mvp_id = False
        valid_rookie_id = False
        valid_playoff_id = False

        if type == "M":
            if len(MvpPrediction.objects.filter(prediction_ptr_id=id)) > 0:
                valid_mvp_id = True
            return valid_mvp_id
        elif type == "R":
            if len(RotyPrediction.objects.filter(prediction_ptr_id=id)) > 0:
                valid_rookie_id = True
            return valid_rookie_id
        elif type == "P":
            if len(PlayOffPrediction.objects.filter(prediction_ptr_id=id)) > 0:
                valid_playoff_id = True
            return valid_playoff_id

    # Got this from https://stackoverflow.com/questions/56417126/method-put-not-allowed-in-resquest-without-id/56417226
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

