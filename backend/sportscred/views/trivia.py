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

import dateutil.parser as parser


class IndexPage(TemplateView):
    template_name = "index.html"


class TriviaViewSet(viewsets.ViewSet):
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
            trivia_instances = TriviaInstance.objects.filter(user=profile).union(
                TriviaInstance.objects.filter(other_user=profile)
            )

            return Response(
                TriviaSerializer(
                    trivia_instances.order_by("-creation_date"), many=True
                ).data
            )
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
        if request.data["other_user"] == None or request.data["sport"] == None:
            return Response(
                {"details": "bad input not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            other_user = User.objects.get(pk=request.data["other_user"]).profile
            sport = Sport.objects.get(pk=request.data["sport"])
            user = request.user.profile
            instance = TriviaInstance.objects.create(
                other_user=other_user, user=user, sport=sport
            )

            instance.select_questions()
            instance.save()
            return Response(TriviaSerializer(instance).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Profile not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["post"])
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
            for instance_question in instance.questions.all():
                is_question = False
                i = 0
                while i < len(questions):
                    if questions[i]["id"] == instance_question.id:
                        is_question = True
                        break
                    i += 1
                # if the instance question is not a part of the questions submitted, the request is incorrect
                if not is_question:
                    return Response(
                        {
                            "details": "Questions submitted are invalid",
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
                    start_time=parser.parse(q["start_time"]),
                    submission_time=parser.parse(q["submission_time"]),
                )
                t.save()
            # check if both users uploaded their answers
            user_response = TriviaResponse.objects.filter(
                trivia_instance=instance, user=instance.user
            )
            other_user_response = TriviaResponse.objects.filter(
                trivia_instance=instance, user=instance.other_user
            )
            # calculate score and store in trivia instance
            if user_response.exists() and other_user_response.exists():
                user_score = 0
                other_user_score = 0
                # if both are correct for the same question
                for res in user_response:
                    other_user_res = next(
                        filter(
                            lambda q: res.question.id == q.question.id,
                            other_user_response,
                        ),
                        None,
                    )
                    # if other_user's response doesnt have the same question then error
                    if other_user_res == None:
                        return Response(
                            {
                                "details": "Other_users submitted a bad submission",
                                "response": response,
                            },
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                    if res.is_correct and other_user_res.is_correct:
                        if (
                            res.start_time - res.submission_time
                            < other_user_res.start_time - other_user_res.submission_time
                        ):
                            user_score += 1
                        else:
                            other_user_score += 1
                    elif res.is_correct:
                        user_score += 1
                    elif other_user_res.is_correct:
                        other_user_score += 1
                instance.score = str(user_score) + "-" + str(other_user_score)
                instance.save()

            if instance.other_user:
                # Multiplayer return nothing
                return Response()
            else:
                # return acs average and sport
                # calculate number of correct questions
                return Response(TriviaSerializer(instance).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Bad request", "response": response},
                status=status.HTTP_400_BAD_REQUEST,
            )
