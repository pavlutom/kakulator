from django.urls import path, include

from .v0 import urlpatterns as v0_urlpatterns


app_name = "api"

urlpatterns = [path("v0/", include((v0_urlpatterns, "v0"), namespace="v0"))]
