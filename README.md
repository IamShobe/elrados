# elrados

Rotest Frontend application.


## How to start?
  - initialize new Django project.
  - follow [rotest guide](https://github.com/gregoil/rotest) to initialize resources.
  - add elrados.frontend to django applications in your django settings file.
  - in manage.py insert the following code:
   ```
       if sys.argv[1] == "runserver":
        if os.environ.get("RUN_MAIN") == "true":
            import elrados.backend.main
            backend = elrados.backend.main.WebsocketService()
            backend.create_server(INIT_LIST)
            post_save.connect(backend.send_to_client)
   ```