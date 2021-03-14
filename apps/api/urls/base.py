from django.urls import path, include

from .. import views
from .v0 import urlpatterns as v0_urlpatterns


app_name = "api"

urlpatterns = [
    path("docs/", views.DocsView.as_view(), name="docs"),
    path("v0/", include((v0_urlpatterns, "v0"), namespace="v0")),
]
