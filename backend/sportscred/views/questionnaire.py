import numbers

from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ..serializers import (
    QuestionnaireSerializer,
    QuestionnaireAnswerSerializer,
    QuestionaireUserResponseSerializer,
)
from sportscred.models import (
    QuestionaireQuestion,
    QuestionaireAnswer,
    QuestionaireUserResponse,
    Profile,
    Sport,
    Player,
    Team,
)


class QuestionnaireViewSet(viewsets.ViewSet):

    # Queries the database for the questions.
    # For GET
    def list(self, request):
        questions = QuestionaireQuestion.objects.all()
        serializer = QuestionnaireSerializer(questions, many=True)

        # Gets the custom answers
        for item in serializer.data:
            if item["question_type"] == "C":
                options = []
                for item2 in QuestionaireAnswer.objects.all().values():
                    options.append(item2)
                item["options"] = options
        return Response(serializer.data)

    # Querying for the custom answers.
    @action(detail=True, methods=["get"])
    def answers(self, request, pk=None):
        answers = QuestionaireAnswer.objects.filter(question_id=pk)
        serializer = QuestionnaireAnswerSerializer(answers, many=True)
        return Response(serializer.data)

    # For POST
    # Gets the answers the user gave
    def create(self, request):
        # Have to catch handler and send bad request
        handlers = []
        user_responses = []

        # Checks if the input is an array.
        if not isinstance(request.data, list):
            return Response(
                {"details": "The input is not an array."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        for response_data in request.data:  # validation step

            # Checks if the key is question_id
            try:
                question_id = response_data["question_id"]
            except:
                return Response(
                    {"details": "The key is not question_id."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                question = QuestionaireQuestion.objects.get(pk=question_id)
            except:
                return Response(
                    {"details": f"The question_id {question_id} does not exist."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            try:
                q_handler = QuestionnaireHandler(
                    question, response_data["answer"], request.user
                )

            # Checks if the user gave an answer.
            except:
                return Response(
                    {"details": "You didn't provide an answer."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            handler = getattr(q_handler, "handle_" + question.question_type)

            result = handler()
            if isinstance(result, Response):
                return result
            else:
                handlers.append(q_handler)

        for handler in handlers:
            try:
                user_response = handler.update_DB()
                user_responses.append(user_response)
            except:
                return Response(
                    {"details": "You have already answered this question."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        serializer = QuestionaireUserResponseSerializer(user_responses, many=True)
        return Response(serializer.data)


class QuestionnaireHandler:
    def __init__(self, question, answer, user):
        self.question = question
        self.user = Profile.objects.get(pk=user)
        self.answer = answer

        if self.question.question_type == "QN":
            self.attr = "quantitative_response"
        elif self.question.question_type == "QL":
            self.attr = "qualitative_response"
        elif self.question.question_type == "S":
            self.attr = "sport"
        elif self.question.question_type == "T":
            self.attr = "team"
        elif self.question.question_type == "P":
            self.attr = "player"
        else:
            self.attr = "custom_answer"

    def handle_QN(self):
        if not isinstance(self.answer, int):
            return Response(
                {"details": "The answer is not an integer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if self.answer < self.question.min_int or self.answer > self.question.max_int:
            return Response(
                {"details": "The answer is not within the specified range."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def handle_QL(self):
        if not isinstance(self.answer, str):
            return Response(
                {"details": "The answer is not a string."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def handle_S(self):
        try:
            sport = Sport.objects.get(pk=self.answer)
        except:
            return Response(
                {"details": "The answer is not from the list."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.answer = sport

    def handle_P(self):
        try:
            player = Player.objects.get(pk=self.answer)
        except:
            return Response(
                {"details": "The answer is not from the list."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.answer = player

    def handle_T(self):
        try:
            team = Team.objects.get(pk=self.answer)
        except:
            return Response(
                {"details": "The answer is not from the list."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.answer = team

    def handle_C(self):
        try:
            custom_question = QuestionaireAnswer.objects.get(pk=self.answer)
        except:
            return Response(
                {"details": "The answer is not from the list."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.answer = custom_question

    def update_DB(self):
        user_response = QuestionaireUserResponse.objects.create(
            question=self.question, user=self.user
        )

        setattr(user_response, self.attr, self.answer)
        user_response.save()
        return user_response
