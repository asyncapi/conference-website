ARG PRETALX_IMAGE_TAG=v2026.1.2
FROM pretalx/standalone:${PRETALX_IMAGE_TAG}

USER root
COPY plugins/pretalx_asyncapi_cfp /opt/pretalx-plugins/pretalx_asyncapi_cfp
RUN python -m pip install /opt/pretalx-plugins/pretalx_asyncapi_cfp
