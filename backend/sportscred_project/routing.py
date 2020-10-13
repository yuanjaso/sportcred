from django.conf.urls import url

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from sportscred.consumers import ChatConsumer

application = ProtocolTypeRouter(
    {
        # WebSocket chat handler
        "websocket": AuthMiddlewareStack(URLRouter([url(r"^chats/$", ChatConsumer)]))
    }
)
