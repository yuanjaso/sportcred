from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from hashlib import sha256
import os

from ..filters import UserFilter
from ..permissions import AnonCreateAndUpdateOwnerOnly
from ..serializers import *  # we literally need everything
from sportscred.models import ProfilePicture, Profile, TriviaInstance, TriviaResponse


class IndexPage(TemplateView):
    template_name = "index.html"


class ProfileViewSet(viewsets.ViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    permission_classes = [AnonCreateAndUpdateOwnerOnly]

    def list(self, request):
        """
        This method returns a list of the logged in user's trivia instances
        """
        try:
            profile = request.user.profile
            trivia_instances = TriviaInstance.objects.filter(user=profile)
            return Response(TriviaSerializer(trivia_instances, many=True).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def create(self, request):
        """
        This method creates a trivia instance
        """
        try:
            other_user = User.objects.get(pk=request.data["other_user"]).profile
            sport = Sport.object.get(pk=request.data["sport"])
            user = request.user.profile
            instance = TriviaInstance.objects.create(
                other_user=other_user, user=user, sport=sport
            )
            TriviaResponse.save()
            return Response(TriviaSerializer(instance).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["put"])
    def answers(self, request):
        """
        This method adds answer to existing trivia instance
        """

        response = {}
        try:
            instance_id = request.data["trivia_instance"]
            user = request.user.profile
            instance = TriviaInstance.objects.get(id=instance_id)
            is_other_user = instance.other_user == user
            if not is_other_user and not instance.user == user:
                return Response(
                    {
                        "details": "Not one of the users in the instance",
                        "response": response,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # validate response questions
            questions = request.data["questions"]
            for instance_question in instance.questions.id:
                is_question = False
                i = 0
                while i < len(questions):
                    if questions[i]["id"] == instance_question.id:
                        is_question = True
                        break
                    i += 1
                if not is_question:
                    return Response(
                        {
                            "details": "Not one of the users in the instance",
                            "response": response,
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            # create response
            for q in questions:
                question_model = TriviaQuestion.objects.get(id=q["id"])
                answer_model = TriviaAnswer.objects.get(id=q["submission_answer"])
                t = TriviaResponse.objects.create(
                    trivia_instance=instance,
                    question=question_model,
                    answer=answer_model,
                    user=user,
                )
                t.save()
            # check if both users uploaded their answers
            user_response = TriviaResponse.object.filter(
                trivia_instance=instance, user=instance.user
            )
            other_user_response = TriviaResponse.object.filter(
                trivia_instance=instance, user=instance.other_user
            )
            # calculate score and store in trivia instance
            if user_response.exists() and other_user_response.exists():
                user_score = 0
                other_user_score = 0
                for res in user_response:
                    if res.is_correct:
                        user_score += 1
                for res in other_user_response:
                    if res.is_correct:
                        other_user_score += 1
                instance.is_completed = str(user_score) + "-" + str(other_user_score)
                instance.save()
            if instance.other_user:
                return Response()
            else:
                # return acs average and sport
                return Response()
        except TriviaInstance.DoesNotExist:
            return Response(
                {"details": "TriviaInstance not found", "response": response},
                status=status.HTTP_400_BAD_REQUEST,
            )
