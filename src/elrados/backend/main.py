"""
if sys.argv[1] == "runserver":
    if os.environ.get("RUN_MAIN") == "true":
        # dispatch resources to user
        backend = rotest.backend.main.WebsocketService()
        backend.create_server(INIT_LIST)
        # register post_save signal to backend
        post_save.connect(backend.send_to_client)
"""
# pylint: disable=superfluous-parens
# pylint: disable=no-member
# pylint: disable=protected-access
# pylint: disable=invalid-name
import django
import crochet
from twisted.internet import reactor

from elrados.backend.management import BroadcastServerFactory

crochet.setup()
django.setup()
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
