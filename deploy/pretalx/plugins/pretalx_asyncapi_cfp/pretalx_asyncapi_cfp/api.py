from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets

from pretalx.event.models import Event


class EventInfoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    plugin_required = "pretalx_asyncapi_cfp"

    def list(self, request, event=None):
        pretalx_event = get_event_for_request(request, event)
        cfp = getattr(pretalx_event, "cfp", None)
        location = pretalx_event.display_settings.get("asyncapi_location", {})

        return Response(
            {
                "event": pretalx_event.slug,
                "cfp": build_cfp_metadata(cfp),
                "location": {
                    "city": location.get("city") or "",
                    "country": location.get("country") or "",
                    "address": location.get("address") or "",
                    "map_url": location.get("map_url") or "",
                    "image_url": location.get("image_url") or "",
                },
            }
        )


def get_event_for_request(request, event):
    pretalx_event = getattr(request, "event", None) or get_object_or_404(
        Event, slug__iexact=event
    )

    if request.auth and pretalx_event not in request.auth.events.all():
        from rest_framework.exceptions import PermissionDenied

        raise PermissionDenied("This token is not scoped to this event.")

    if EventInfoViewSet.plugin_required not in pretalx_event.plugin_list:
        from rest_framework.exceptions import NotFound

        raise NotFound("The AsyncAPI CFP API plugin is not enabled for this event.")

    return pretalx_event


def build_cfp_metadata(cfp):
    if cfp is None:
        return {
            "opening": None,
            "deadline": None,
            "is_open": False,
        }

    return {
        "opening": serialize_datetime(getattr(cfp, "opening", None)),
        "deadline": serialize_datetime(getattr(cfp, "deadline", None)),
        "is_open": bool(getattr(cfp, "is_open", False)),
    }


def serialize_datetime(value):
    return value.isoformat() if value else None
