# elrados
[![PyPI](https://badge.fury.io/py/elrados.svg)](https://pypi.python.org/pypi/elrados)
[![Build Status](https://travis-ci.com/IamShobe/elrados.svg?branch=master)](https://travis-ci.com/IamShobe/elrados)
Rotest Frontend application.


## How to start?
  - initialize new Django project.
  - follow [rotest guide](https://github.com/gregoil/rotest) to initialize resources.
  - add `elrados` to django applications in your django settings file.
  - add `elrados.urls` to your urls file
    ```
    from django.conf.urls import include, url
    from django.contrib import admin

    urlpatterns = [
        url(r'^', include("elrados.urls")),
        url(r'^rotest/api/', include("rotest.api.urls")),
        url(r'^admin/', include(admin.site.urls)),
    ]
    ```
  - in your rotest.yml config file add `elrados` segment and `default_resource` segment:
    ```
    rotest:
      host: localhost
      api_base_url: rotest/api/
      django_settings: rotest_demo.settings
      shell_apps: [resources]

    elrados:
      default_resource: RulerData
    ```
    where `RulerData` is your default resource.

You are now ready to go!
