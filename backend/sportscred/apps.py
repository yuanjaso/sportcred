from django.apps import AppConfig


class SportsCredAppConfig(AppConfig):
    name = "sportscred"
    verbose_name = "SportsCred"

    def ready(self):
        from . import signals
