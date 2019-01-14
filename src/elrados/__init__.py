from django.apps import AppConfig

from elrados.backend.main import setup_server


class ElradosAppConfig(AppConfig):
    name = 'elrados'

    def ready(self):
        super(ElradosAppConfig, self).ready()
        setup_server()


default_app_config = 'elrados.ElradosAppConfig'
