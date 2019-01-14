"""Elrados web-socket server starter."""
# pylint: disable=superfluous-parens
# pylint: disable=no-member
# pylint: disable=protected-access
# pylint: disable=invalid-name
import os

import crochet
from twisted.internet import reactor
from django.db.models.signals import post_save
from django.contrib.auth.models import User, Group
from rotest.common.config import SHELL_APPS
from rotest.management.utils.resources_discoverer import get_resources

from elrados.backend.management import BroadcastServerFactory

SERVER_PORT = 9000


class WebsocketService(object):
    """Websocket service that is exposed to the user of elrados."""
    def __init__(self, settings=None):
        print("[Frontend] initializing websocket service")
        self.factory = BroadcastServerFactory(
            u'ws://0.0.0.0:{}'.format(SERVER_PORT), settings)

    @crochet.run_in_reactor
    def create_server(self, init_list):
        """Create new user and listen to the server port."""
        self.factory.initialize_resources(init_list)
        reactor.listenTCP(SERVER_PORT, self.factory)

    def send_to_client(self, sender, instance, **kwargs):
        """Send update message to client."""
        self.factory.cache.update_resource(sender, instance, **kwargs)


def setup_server():
    """Start the websocket server."""
    crochet.setup()
    resource_models = [User, Group]
    for application in SHELL_APPS:
        resource_models.extend(resource.DATA_CLASS for resource in
                               get_resources(application).values()
                               if resource.DATA_CLASS is not None)

    if os.environ.get("RUN_MAIN") == "true":
        backend = WebsocketService(settings={
            "default_resource": resource_models[-1].__name__
        })
        backend.create_server(resource_models)
        post_save.connect(backend.send_to_client,
                          sender='management.ResourceData', weak=False)
