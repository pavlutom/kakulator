from django.urls import path

from . import views


app_name = "kakulator"

urlpatterns = [
    path("", views.BasicKakulatorView.as_view(), name="basic"),
]
