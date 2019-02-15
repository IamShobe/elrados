"""Global index view."""
import pkg_resources

from django.shortcuts import render


def index(request):
    """Basic view."""
    return render(request, "index.html", {
        "plugins": pkg_resources.iter_entry_points(group='elrados.plugins')
    })
