# Put random generic utility stuff here
from rest_framework.pagination import PageNumberPagination


def filter_paginate_request(request, model_filter, model_serializer):
    paginator = PageNumberPagination()
    filtered_set = model_filter(request.GET).qs
    context = paginator.paginate_queryset(filtered_set, request)
    serializer = model_serializer(context, many=True)
    return paginator.get_paginated_response(serializer.data)
