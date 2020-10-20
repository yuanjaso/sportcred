from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ..serializers import QuestionnaireSerializer, QuestionnaireAnswerSerializer
from sportscred.models import QuestionaireQuestion, QuestionaireAnswer


class QuestionnaireViewSet(viewsets.ViewSet):

    # Queries the database for the questions.
    # For GET
    def list(self, request):
        questions = QuestionaireQuestion.objects.all()
        serializer = QuestionnaireSerializer(questions, many=True)
        return Response(serializer.data)

    # Querying for the custom answers.
    @action(detail=True, methods=["get"])
    def answers(self, request, pk=None):
        answers = QuestionaireAnswer.objects.filter(question_id=pk)
        serializer = QuestionnaireAnswerSerializer(answers, many=True)
        return Response(serializer.data)

    # For POST
    def create(self, request):
        pass
