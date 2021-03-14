from django.urls import path

from . import views


app_name = "homepage"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("about/", views.AboutView.as_view(), name="about"),
    path("api-docs/", views.ApiDocsView.as_view(), name="api_docs"),
]
