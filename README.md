# elrados
[![PyPI](https://badge.fury.io/py/elrados.svg)](https://pypi.python.org/pypi/elrados)
[![Build Status](https://travis-ci.com/IamShobe/elrados.svg?branch=master)](https://travis-ci.com/IamShobe/elrados)
Rotest Frontend application.


## How to start?
  - initialize new Django project.
  - follow [rotest guide](https://github.com/gregoil/rotest) to initialize resources.
  - add elrados.frontend to django applications in your django settings file.
  - in manage.py insert the following code:
   ```
    INIT_LIST = [CalculatorData]  # import here any resource model data you wish.
    if sys.argv[1] == "runserver":
        if os.environ.get("RUN_MAIN") == "true":
            import elrados.backend.main
            backend = elrados.backend.main.WebsocketService(settings={
                "default_resource": "CalculatorData"
            })
            backend.create_server(INIT_LIST)
            from django.db.models.signals import post_save
            post_save.connect(backend.send_to_client)
   ```

