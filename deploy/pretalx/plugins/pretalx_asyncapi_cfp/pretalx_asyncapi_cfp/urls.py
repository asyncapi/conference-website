from rest_framework import routers
from django.urls import path
from pretalx.event.models.event import SLUG_REGEX

from .api import EventInfoViewSet
from .views import LocationSettingsView

router = routers.SimpleRouter()
router.register(
    rf"api/events/(?P<event>{SLUG_REGEX})/p/asyncapi-cfp/event-info",
    EventInfoViewSet,
    basename="asyncapi-cfp-event-info",
)

urlpatterns = [
    path(
        "orga/event/<slug:event>/p/asyncapi-cfp/location/",
        LocationSettingsView.as_view(),
        name="asyncapi-cfp-location-settings",
    ),
    *router.urls,
]
