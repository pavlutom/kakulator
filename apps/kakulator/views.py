from django.contrib import messages
from django.views.generic import TemplateView

from .exceptions import KakulationError
from .forms import BasicKakulatorForm
from .kakulate import kakulate


class BasicKakulatorView(TemplateView):
    template_name = "kakulator/basic.html"

    form = None

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.form = BasicKakulatorForm(request.GET or None)

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["kakulated_result"] = self.kakulate()
        return ctx

    def kakulate(self):
        if not (query := self.request.GET.get("query")):
            return None

        try:
            kakulated_result = kakulate(query)
        except KakulationError as e:
            messages.error(self.request, e)
            return None

        messages.success(self.request, "Success! Your request has been kakulated.")
        return kakulated_result
