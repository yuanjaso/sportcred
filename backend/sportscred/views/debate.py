from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from sportscred.permissions import DebateSuper
from django.db.models import Count

from ..serializers import (
    QuestionnaireSerializer,
    QuestionnaireAnswerSerializer,
    QuestionaireUserResponseSerializer,
    DebateSerializer,
)
from sportscred.models import (
    DebateComment,
    DebatePost,
    Rate,
    ACS,
    DebateAcsHistory,
    Sport,
)


class DebateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, DebateSuper]

    def create(self, request):
        try:
            body = {
                "title": request.data["title"],
                "sport": request.data["sport"],
                "content": request.data["content"],
                "acs_rank": request.data["acs_rank"].upper(),
            }
            for x in body:
                if body[x] == None:
                    return Response(
                        {"details": " Invalid input"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            sport = Sport.objects.get(pk=body["sport"])
            post = DebatePost.objects.create(
                title=body["title"], content=body["content"], acs_rank=body["acs_rank"]
            )
            post.related_to_debate_posts.add(sport)
            post.save()
            return Response(DebateSerializer(post).data)
        except Exception as e:
            print(e)
            return Response(
                {"details": "Failed to create a debate post"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def list(self, request):
        # Gets the comment id and rating
        posts = DebatePost.objects.all()
        if "sport_id" in request.query_params:
            sport = Sport.objects.get(pk=request.query_params["sport_id"])
            posts = posts.filter(related_to_debate_posts=sport)
        elif "sport_name" in request.query_params:
            try:
                sport = Sport.objects.get(
                    name__iexact=request.query_params["sport_name"]
                )
            except:
                return Response(
                    {"details": "thats not a sport"}, status=status.HTTP_400_BAD_REQUEST
                )
            posts = posts.filter(related_to_debate_posts=sport)
        if "acs_rank" in request.query_params:
            posts.filter(acs_rank=request.query_params["acs_rank"])
        return Response(DebateSerializer(posts, many=True).data)

    # Updates the ratings for the comments.
    @action(detail=False, methods=["put"])
    def comments(self, request):
        # Gets the comment id and rating
        try:
            comment_id = request.data["comment_id"]
            rating = int(request.data["rating"])
            if rating < 0 or rating > 10:
                return Response(
                    {"details": "The rating is not between 0 and 10, inclusively."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            print(e)
            return Response(
                {"details": "You didn't give a comment id and/or a rating."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Creates or updates the rating
        try:
            rate = Rate.objects.get(rater_id=request.user.id, comment_id=comment_id)
            rate.agreement = rating
            rate.save()
        except Exception as e:
            print(e)
            rate = Rate.objects.create(
                rater_id=request.user.id, comment_id=comment_id, agreement=rating
            )
            rate.save()

        # Gets the response info
        num_ratings = Rate.objects.filter(comment_id=comment_id).aggregate(
            Count("comment_id")
        )["comment_id__count"]
        result = {}
        result["comment_id"] = comment_id  # Gets the comment_id

        comment_info = DebateComment.objects.filter(id=comment_id).values()
        comment_info2 = DebateComment.objects.filter(id=comment_id)
        rating_avg = comment_info2[0].ratingAverage["agreement__avg"]

        result["debate_id"] = comment_info[0]["post_id"]
        result["commenter_id"] = comment_info[0]["commenter_id"]
        result["content"] = comment_info[0]["content"].strip()
        result["comment_date"] = comment_info[0]["time"]
        result["average_rating"] = rating_avg
        result["number_of_ratings"] = num_ratings
        result["user"] = {"id": request.user.id, "username": request.user.username}

        # Updates the user's ACS score.
        try:
            if num_ratings > 3 and rating_avg < 4:
                debate = DebateAcsHistory.create(  # Attach a trivia instance
                    delta=-5,
                    profile=User.objects.get(
                        pk=comment_info[0]["commenter_id"]
                    ).profile,
                    sport=Sport.objects.get(
                        pk=DebatePost.objects.first().related_to_debate_posts.values()[
                            0
                        ]["id"]
                    ),
                )
                debate.debate_comment = DebateComment.objects.get(id=comment_id)
                debate.save()
            elif num_ratings > 3 and rating_avg > 6:
                debate = DebateAcsHistory.create(  # Attach a trivia instance
                    delta=5,
                    profile=User.objects.get(
                        pk=comment_info[0]["commenter_id"]
                    ).profile,
                    sport=Sport.objects.get(
                        pk=DebatePost.objects.first().related_to_debate_posts.values()[
                            0
                        ]["id"]
                    ),
                )
                debate.debate_comment = DebateComment.objects.get(id=comment_id)
                debate.save()
        except Exception as e:
            print(e)
            return Response(
                {"details": "Error with updating ACS score."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(result)

    @comments.mapping.post
    def post_comments(self, request):
        # Gets the comment id and rating
        try:
            debate_id = request.data["debate_id"]
            content = request.data["content"]
        except Exception as e:
            print(e)
            return Response(
                {"details": "You didn't give a comment id and/or any content."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Gets the ACS score of the user for the same sport as the debate.
        user_id = request.user.id

        # Checks if the given debate_id is in the db
        try:
            debate_acs_rank = DebatePost.objects.filter(id=debate_id).values()[0][
                "acs_rank"
            ]  # Gets the acs rank
            debate_acs_sport_id = DebatePost.objects.first().related_to_debate_posts.values()[
                0
            ][
                "id"
            ]  # Gets the sport id
        except Exception as e:
            print(e)
            return Response(
                {"details": "You debate id does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Gets the ACS score of the user for the same sport.
        user_acs_score = ACS.objects.filter(
            profile_id=user_id, sports_id=debate_acs_sport_id
        ).values()[0]["score"]

        # Gets the user's ACS tier for that sport.
        user_acs_tier = ""
        if 100 <= user_acs_score <= 300:
            user_acs_tier = "F"
        elif user_acs_score <= 600:
            user_acs_tier = "A"
        elif user_acs_score <= 900:
            user_acs_tier = "P"
        else:
            user_acs_tier = "E"

        if not (user_acs_tier == debate_acs_rank):
            return Response(
                {
                    "details": "Your ACS tier is not the same as this debate forum's. You may not post any comments."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Adds the comment to the db
        comment = DebateComment.objects.create(
            post_id=debate_id, commenter_id=user_id, content=content
        )
        comment.save()

        # Gets the response info
        result = {}
        result["comment_id"] = comment.pk  # Gets the comment_id

        comment_info = DebateComment.objects.filter(id=comment.pk).values()
        comment_info2 = DebateComment.objects.filter(id=comment.pk)
        result["debate_id"] = debate_id
        result["commenter_id"] = user_id
        result["content"] = content
        result["comment_date"] = comment_info[0]["time"]
        result["average_rating"] = comment_info2[0].ratingAverage["agreement__avg"]
        result["number_of_ratings"] = Rate.objects.filter(
            comment_id=comment.pk
        ).aggregate(Count("comment_id"))["comment_id__count"]
        result["user"] = {"id": request.user.id, "username": request.user.username}
        return Response(result)

    @comments.mapping.get
    def get_comments(self, request):
        try:
            debate_id = request.query_params["debate_id"]
            # Gets the response info
            result = {}
            result["debate_id"] = debate_id  # Gets the debate_id

            debate_info = DebateComment.objects.filter(post_id=debate_id).values()
            debate_info2 = DebateComment.objects.filter(post_id=debate_id)
            result["comment_id"] = debate_info[0]["id"]
            result["commenter_id"] = debate_info[0]["commenter_id"]
            result["content"] = debate_info[0]["content"].strip()
            result["comment_date"] = debate_info[0]["time"]
            result["average_rating"] = debate_info2[0].ratingAverage["agreement__avg"]
            result["number_of_ratings"] = Rate.objects.filter(
                comment_id=debate_info[0]["id"]
            ).aggregate(Count("comment_id"))["comment_id__count"]
            result["user"] = {"id": request.user.id, "username": request.user.username}
            return Response(result)
        except Exception as e:
            print(e)
            return Response(
                {"details": "The id is invalid."}, status=status.HTTP_400_BAD_REQUEST
            )
