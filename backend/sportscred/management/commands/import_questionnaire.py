from yaml import load

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User


from sportscred.models import (
    QuestionaireAnswer,
    QuestionaireQuestion,
    QuestionaireUserResponse,
    Sport,
    Team,
)


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            questions = data["QuestionnaireQuestion"]
            custom_answers = data["QuestionnaireAnswer"]
            responses = data["QuestionnareResponse"]
            for question in questions:
                q = QuestionaireQuestion.objects.create(
                    question_content=question["content"],
                    question_type=question["question_type"],
                )
                if question["question_type"] == "QN":
                    q.max_int = question["max_int"]
                    q.min_int = question["min_int"]
                q.save()
            for answer in custom_answers:
                q = QuestionaireQuestion.objects.get(
                    question_content=answer["original_question"]
                )
                a = QuestionaireAnswer.objects.create(
                    question=q, custom_answer=answer["answer"]
                )
                a.save()
            favourite_sport = responses["favourite_sport"]
            age = responses["age"]
            play = responses["play"]
            learn = responses["learn"]
            team = responses["team"]
            tell = responses["tell"]
            answers = favourite_sport["answers"]
            sport_question = QuestionaireQuestion.objects.get(pk=favourite_sport["id"])
            for answer in answers:
                user = User.objects.get(pk=answer["user_id"]).profile
                sport = Sport.objects.get(pk=answer["sport"])
                response = QuestionaireUserResponse(
                    user=user,
                    question=sport_question,
                    sport=sport,
                )
            answers = age["answers"]
            age_question = QuestionaireQuestion.objects.get(pk=age["id"])
            for answer in answers:
                user = User.objects.get(pk=answer["user_id"]).profile
                response = QuestionaireUserResponse(
                    user=user,
                    question=age_question,
                    quantitative_response=answer["age"],
                )
            answers = play["answers"]
            play_question = QuestionaireQuestion.objects.get(pk=play["id"])
            for answer in answers:
                user = User.objects.get(pk=answer["user_id"]).profile
                sport = Sport.objects.get(pk=answer["answer"])
                response = QuestionaireUserResponse(
                    user=user,
                    question=play_question,
                    sport=sport,
                )
            answers = team["answers"]
            team_question = QuestionaireQuestion.objects.get(pk=team["id"])
            for answer in answers:
                user = User.objects.get(pk=answer["user_id"]).profile
                team = Team.objects.get(pk=answer["team"])
                response = QuestionaireUserResponse(
                    user=user,
                    question_id=team_question,
                    team_id=team,
                )
            answers = tell["answers"]
            tell_question = QuestionaireQuestion.objects.get(pk=tell["id"])
            for answer in answers:
                user = User.objects.get(pk=answer["user_id"]).profile
                response = QuestionaireUserResponse(
                    user=user,
                    question=tell_question,
                    qualitative_response=answer["answer"],
                )
