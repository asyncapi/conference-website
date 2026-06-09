# Pretalx on DigitalOcean

This directory contains the Pretalx deployment files used by the GitHub Actions workflow. It is based on the adjacent `pretalx-docker` reference, but lives in `conference-website` so this repo owns the conference integration.

## Required GitHub Secrets

- `DO_SSH_HOST`
- `DO_SSH_USER`
- `DO_SSH_PRIVATE_KEY`
- `POSTGRES_PASSWORD`
- `PRETALX_LOGGING_EMAIL`
- `PRETALX_MAIL_FROM`
- `PRETALX_MAIL_HOST`
- `PRETALX_MAIL_PORT`
- `PRETALX_MAIL_USER`
- `PRETALX_MAIL_PASSWORD`

The sync workflow also needs `PRETALX_API_TOKEN`.

For Mailjet, use:

```text
PRETALX_MAIL_FROM=cfp@asyncapi.com
PRETALX_MAIL_HOST=in-v3.mailjet.com
PRETALX_MAIL_PORT=2525
PRETALX_MAIL_USER=<mailjet-api-key>
PRETALX_MAIL_PASSWORD=<mailjet-secret-key>
```

## Optional GitHub Variables

- `DO_SSH_PORT`, defaults to `22`
- `PRETALX_SITE_URL`, defaults to the workflow input or `https://cfp.asyncapi.com`
- `PRETALX_REMOTE_PATH`, defaults to `/opt/asyncapi-pretalx`
- `PRETALX_HTTP_PORT`, defaults to `8346`
- `PRETALX_IMAGE_TAG`, defaults to `v2026.1.2`
- `PRETALX_FILE_UPLOAD_LIMIT`, defaults to `2`
- `PRETALX_MAIL_TLS`, defaults to `True`
- `PRETALX_MAIL_SSL`, defaults to `False`
- `GUNICORN_FORWARDED_ALLOW_IPS`, defaults to `127.0.0.1`

Only the Pretalx image is configurable through `PRETALX_IMAGE_TAG`. The supporting nginx, Postgres, Redis, and local Mailpit images stay defined directly in Compose so deploy configuration does not grow extra tag knobs.

## Uploaded Media

Pretalx writes media and static files to the shared `pretalx-public` volume under `/public`. The compose stack publishes the nginx container, not the Pretalx app container, so URLs such as `/media/avatars/...webp` and `/static/...` are served directly from that volume. `PRETALX_FILE_UPLOAD_LIMIT` defaults to `2` MB, and both nginx configs allow `3m` request bodies to leave room for multipart upload overhead.

## Production URL

Keep production disabled in website env until DNS and the production droplet are ready:

```env
# NEXT_PUBLIC_PRETALX_BASE_URL=https://cfp.asyncapi.com
```

Use the test droplet URL for `NEXT_PUBLIC_PRETALX_BASE_URL` while validating the setup.

## First-Time Droplet Setup

1. Install Docker and the Docker Compose plugin.
2. Configure the reverse proxy and TLS for your test domain.
3. Run the deploy workflow. The workflow builds a small custom Pretalx image from `deploy/pretalx/Dockerfile` so the `pretalx_asyncapi_cfp` plugin is installed on the droplet.
4. Initialize Pretalx on the droplet:

```bash
cd /opt/asyncapi-pretalx
docker compose exec pretalx pretalx init
```

5. Configure the event, CFP fields, deadlines, review workflow, and schedule release in Pretalx.
6. Enable the `AsyncAPI CFP API` plugin for each event.
7. Open `Event settings -> Plugins -> AsyncAPI CFP API -> Location metadata` and fill in the event city, country, address, map URL, and image URL. Saving this form also writes a managed `Location` section into Pretalx's public event landing page text. If metadata was saved before this behavior existed, save the form once again after rebuilding the image.

If you need to seed or repair the metadata from the droplet shell, write the same values directly:

```bash
docker compose --env-file .env exec -T pretalx python -m pretalx shell --event=asyncapi-india-2026 -c 'from pretalx.event.models import Event; e=Event.objects.get(slug="asyncapi-india-2026"); e.display_settings["asyncapi_location"]={"city":"Bengaluru","country":"India","address":"NIMHANS Convention Centre, Bengaluru","map_url":"https://maps.example.com/bengaluru","image_url":"https://pretalx.example.com/media/event-bengaluru.webp"}; e.save(); print(e.display_settings["asyncapi_location"])'
```

The sync endpoint returns global CFP dates and location metadata at:

```text
/api/events/{event}/p/asyncapi-cfp/event-info/
```

8. Add a host cron for periodic jobs:

```cron
15,45 * * * * cd /opt/asyncapi-pretalx && docker compose exec -T pretalx pretalx runperiodic
```

## Data Sync

The website sync workflow uses the authenticated Pretalx API. It fetches public events from `/api/events/?is_public=true`, enriches them with `/api/events/{event}/p/asyncapi-cfp/event-info/` when the plugin is enabled, then fetches `/api/events/{event}/schedules/latest/` with expanded schedule slots, submissions, speakers, proposal types, and tracks.

The workflow writes generated data to `config/pretalx/city-lists.json`, `config/pretalx/speakers.json`, and `config/pretalx/agenda.json`, then opens a PR. When the plugin endpoint is available, `city-lists.json` includes global CFP deadline, city, country, address, map URL, and image URL from Pretalx. Third-party/manual CFP systems remain in `config/third-party/` and are merged into the website by `config/conference-data.ts`.

## Local Mail Testing

Use `docker-compose.local.yml` to add Mailpit for local email testing:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env up -d
```

Configure Pretalx with `PRETALX_MAIL_HOST=mailpit`, `PRETALX_MAIL_PORT=1025`, `PRETALX_MAIL_TLS=False`, and `PRETALX_MAIL_SSL=False`. Open captured mail at `http://localhost:8025`.

To test the real Mailjet SMTP path locally, render `conf/pretalx.cfg` with these mail values instead of Mailpit:

```env
PRETALX_MAIL_FROM=cfp@asyncapi.com
PRETALX_MAIL_HOST=in-v3.mailjet.com
PRETALX_MAIL_PORT=2525
PRETALX_MAIL_USER=<mailjet-api-key>
PRETALX_MAIL_PASSWORD=<mailjet-secret-key>
PRETALX_MAIL_TLS=True
PRETALX_MAIL_SSL=False
```

Use a verified Mailjet sender/domain and do not commit the rendered `conf/pretalx.cfg`.

## DigitalOcean Mail

Run Pretalx on DigitalOcean, but do not run outbound mail delivery from the Droplet itself. DigitalOcean blocks Droplet SMTP ports `25`, `465`, and `587`, so use Mailjet as the external SMTP provider and configure the `PRETALX_MAIL_*` secrets for it. Prefer Mailjet port `2525` for the test droplet.

Kit should stay in the newsletter/broadcast path. Pretalx's built-in email delivery is SMTP-oriented, while Kit is better suited for audience broadcasts and campaigns.

## GitHub Deployments UI

The deploy workflow uses a GitHub Actions environment named `pretalx-prod` by default. GitHub creates deployment status entries for environment jobs and shows them in the repository's Deployments UI with the Pretalx URL.

When running the workflow manually, you can change `target_environment` to a different value such as `pretalx-test`.
