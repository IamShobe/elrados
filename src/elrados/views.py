"""Global index view."""
from django.shortcuts import render


def index(request):
    """Basic view."""
    return render(request, "index.html")
