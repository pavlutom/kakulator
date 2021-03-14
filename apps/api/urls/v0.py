from django.urls import path, include


app_name = "v0"

urlpatterns = [
    path("kakulate/", include("apps.kakulator.api.v0.urls", namespace="kakulator"))
]
