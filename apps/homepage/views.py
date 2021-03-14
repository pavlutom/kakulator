from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = "homepage/home.html"


class AboutView(TemplateView):
    template_name = "homepage/about.html"


class ApiDocsView(TemplateView):
    template_name = "homepage/api.html"
