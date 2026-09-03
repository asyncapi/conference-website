from django.contrib import messages
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import FormView

from pretalx.common.views.mixins import EventPermissionRequired

from .forms import LocationSettingsForm


class LocationSettingsView(EventPermissionRequired, FormView):
    form_class = LocationSettingsForm
    permission_required = "event.update_event"
    template_name = "pretalx_asyncapi_cfp/location_settings.html"

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["event"] = self.request.event
        return kwargs

    def get_success_url(self):
        return reverse(
            "plugins:pretalx_asyncapi_cfp:asyncapi-cfp-location-settings",
            kwargs={"event": self.request.event.slug},
        )

    def form_valid(self, form):
        form.save()
        messages.success(self.request, _("The location metadata has been saved."))
        return super().form_valid(form)
