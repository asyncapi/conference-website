from django import forms
from django.utils.translation import gettext_lazy as _
from i18nfield.strings import LazyI18nString


LOCATION_SETTINGS_KEY = "asyncapi_location"
LOCATION_BLOCK_START = "<!-- asyncapi-cfp-location:start -->"
LOCATION_BLOCK_END = "<!-- asyncapi-cfp-location:end -->"


class LocationSettingsForm(forms.Form):
    city = forms.CharField(
        label=_("City"),
        required=False,
        help_text=_('Use "Online" for virtual events.'),
    )
    country = forms.CharField(
        label=_("Country"),
        required=False,
        help_text=_('Use "Edition" or leave empty for virtual events.'),
    )
    address = forms.CharField(
        label=_("Address"),
        required=False,
        widget=forms.Textarea(attrs={"rows": 3}),
    )
    map_url = forms.URLField(
        label=_("Map URL"),
        required=False,
        help_text=_("This link is used on the conference website venue page."),
    )
    image_url = forms.URLField(
        label=_("Image URL"),
        required=False,
        help_text=_(
            "This image is used as the conference city image on the website."
        ),
    )

    def __init__(self, *args, event, **kwargs):
        super().__init__(*args, **kwargs)
        self.event = event
        location = event.display_settings.get(LOCATION_SETTINGS_KEY, {})

        for field_name in [
            "city",
            "country",
            "address",
            "map_url",
            "image_url",
        ]:
            self.fields[field_name].initial = location.get(field_name, "")

    def save(self):
        location = {
            "city": self.cleaned_data.get("city", "").strip(),
            "country": self.cleaned_data.get("country", "").strip(),
            "address": self.cleaned_data.get("address", "").strip(),
            "map_url": self.cleaned_data.get("map_url", "").strip(),
            "image_url": self.cleaned_data.get("image_url", "").strip(),
        }
        self.event.display_settings[LOCATION_SETTINGS_KEY] = location
        self.event.landing_page_text = update_landing_page_location_block(
            self.event.landing_page_text,
            location,
            locales=getattr(self.event, "locales", None),
            default_locale=getattr(self.event, "locale", None),
        )
        self.event.save(update_fields=["display_settings", "landing_page_text"])
        return location


def update_landing_page_location_block(
    current_text, location, locales=None, default_locale=None
):
    text_by_locale = get_landing_page_text_by_locale(
        current_text, locales=locales, default_locale=default_locale
    )
    location_block = build_landing_page_location_block(location)

    for locale, text in text_by_locale.items():
        base_text = remove_landing_page_location_block(str(text or "")).strip()
        text_by_locale[locale] = (
            f"{base_text}\n\n{location_block}".strip()
            if location_block
            else base_text
        )

    return LazyI18nString(text_by_locale)


def get_landing_page_text_by_locale(current_text, locales=None, default_locale=None):
    if hasattr(current_text, "data") and isinstance(current_text.data, dict):
        text_by_locale = dict(current_text.data)
    else:
        text_by_locale = {}

    configured_locales = [locale for locale in locales or [] if locale]
    fallback_locale = default_locale or (
        configured_locales[0] if configured_locales else "en"
    )

    if not text_by_locale:
        text_by_locale[fallback_locale] = str(current_text or "")

    for locale in configured_locales:
        text_by_locale.setdefault(locale, text_by_locale.get(fallback_locale, ""))

    return text_by_locale


def remove_landing_page_location_block(text):
    start = text.find(LOCATION_BLOCK_START)
    end = text.find(LOCATION_BLOCK_END)

    if start == -1 or end == -1 or end < start:
        return text

    return f"{text[:start]}{text[end + len(LOCATION_BLOCK_END):]}".strip()


def build_landing_page_location_block(location):
    city = location.get("city") or ""
    country = location.get("country") or ""
    address = location.get("address") or ""
    map_url = location.get("map_url") or ""
    image_url = location.get("image_url") or ""

    lines = [
        LOCATION_BLOCK_START,
        "## Location",
    ]

    city_country = ", ".join([value for value in [city, country] if value])
    if city_country:
        lines.append(f"**City:** {city_country}")

    if address and map_url:
        lines.append(f"**Address:** [{address}]({map_url})")
    elif address:
        lines.append(f"**Address:** {address}")
    elif map_url:
        lines.append(f"**Map:** {map_url}")

    if image_url:
        lines.append(f"**Image:** {image_url}")

    lines.append(LOCATION_BLOCK_END)

    if len(lines) <= 3:
        return ""

    return "\n\n".join(lines)
