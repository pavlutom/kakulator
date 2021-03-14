from django.views.generic import TemplateView


class DocsView(TemplateView):
    template_name = "api/docs.html"
