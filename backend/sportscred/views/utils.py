# Put random generic utility stuff here
from rest_framework.response import Response


def filter_request(request, model_filter, model_serializer):
    filtered_set = model_filter(request.GET).qs
    serializer = model_serializer(filtered_set, many=True)
    return Response(serializer.data)
