from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from . import views as mine
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r"api/v1/users", mine.UserViewSet, basename="user")
router.register(r"api/v1/profile", mine.ProfileViewSet, basename="profile")
router.register(r"api/v1/sports", mine.SportViewSet, basename="sport")
router.register(r"api/v1/teams", mine.TeamViewSet, basename="team")
router.register(r"api/v1/players", mine.PlayerViewSet, basename="player")


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
