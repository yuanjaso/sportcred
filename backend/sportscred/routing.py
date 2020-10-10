from django.urls import re_path
from . import consumers

# We'll probably use this when we setup the chat

websocket_urlpatterns = [re_path(r"ws/chat/$", consumers.ChatConsumer)]
