# elrados

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
            backend = elrados.backend.main.WebsocketService(settings={
                "default_resource": "CalculatorData"  # here you choose the default shown data type
            })
            backend.create_server(INIT_LIST)
            post_save.connect(backend.send_to_client)
   ```

