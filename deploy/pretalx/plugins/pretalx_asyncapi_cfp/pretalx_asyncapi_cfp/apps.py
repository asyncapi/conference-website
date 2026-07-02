from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AsyncApiCfpApiApp(AppConfig):
    name = "pretalx_asyncapi_cfp"
    verbose_name = _("AsyncAPI CFP API")

    class PretalxPluginMeta:
        name = _("AsyncAPI CFP API")
        author = _("AsyncAPI")
        version = "0.1.0"
        visible = True
        description = _("Exposes global CFP dates and event location metadata.")
        category = "INTEGRATION"
        settings_links = [
            (
                _("Location metadata"),
                "plugins:pretalx_asyncapi_cfp:asyncapi-cfp-location-settings",
                {},
            )
        ]
