# Pretalx CFP Development Guide

This guide covers the local and personal-droplet flow before opening a PR.

## Mail Server Setup

Pretalx sends CFP confirmations, speaker notifications, password resets, and organizer emails through SMTP. The deploy template already has a `[mail]` section in `deploy/pretalx/pretalx.cfg.template`, rendered from these values:

```env
PRETALX_MAIL_FROM=cfp@asyncapi.com
PRETALX_MAIL_HOST=smtp.asyncapi.com
PRETALX_MAIL_PORT=587
PRETALX_MAIL_USER=cfp@asyncapi.com
PRETALX_MAIL_PASSWORD=your-smtp-password
PRETALX_MAIL_TLS=True
PRETALX_MAIL_SSL=False
```

Do not plan to run the outbound mail server directly from the DigitalOcean droplet. DigitalOcean blocks SMTP ports `25`, `465`, and `587` on Droplets, so Pretalx should connect to an external transactional SMTP provider instead. Use a provider that supports a non-blocked submission port such as `2525`, or use the provider/API path recommended for your mail vendor.

Use Mailjet for Pretalx. Pretalx expects SMTP settings, and Mailjet provides an SMTP relay. Kit is useful for newsletters/broadcasts and audience workflows, but it is not the right integration point for Pretalx's transactional CFP mail unless you build a custom mail bridge.

Recommended Mailjet values for a DigitalOcean droplet:

```env
PRETALX_MAIL_FROM=cfp@asyncapi.com
PRETALX_MAIL_HOST=in-v3.mailjet.com
PRETALX_MAIL_PORT=2525
PRETALX_MAIL_USER=<mailjet-api-key>
PRETALX_MAIL_PASSWORD=<mailjet-secret-key>
PRETALX_MAIL_TLS=True
PRETALX_MAIL_SSL=False
```

Use the same values for local Mailjet testing when you want Pretalx to send real email instead of capturing messages in Mailpit. The sender address or domain must be verified in Mailjet.

Use only one encryption mode:

- Port `587`: `PRETALX_MAIL_TLS=True`, `PRETALX_MAIL_SSL=False`
- Port `465`: `PRETALX_MAIL_TLS=False`, `PRETALX_MAIL_SSL=True`
- Port `2525`: follow the SMTP provider's TLS/SSL instructions; many providers use STARTTLS-style TLS here.
- Local Mailpit: `PRETALX_MAIL_HOST=mailpit`, `PRETALX_MAIL_PORT=1025`, `PRETALX_MAIL_TLS=False`, `PRETALX_MAIL_SSL=False`

For GitHub deployment, add the mail values as repository secrets or variables listed in `deploy/pretalx/README.md`.

## Local Website Test

1. Create `conference-website/.env.local`.

```env
NEXT_PUBLIC_PRETALX_BASE_URL=http://localhost:8346
NEXT_PUBLIC_PRETALX_CFP_PATH=cfp
```

2. Run the website.

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000` and verify:

- The nav shows `CFP`.
- The hero shows `Submit a Talk`.
- The Online venue card shows `cfp is open` only when the Pretalx URL is configured.
- The old `/venue/online/register` form route is gone.

## Local Pretalx Test

Use the local compose override with Mailpit when you want to capture outgoing mail at `http://localhost:8025`.

1. Create local deployment files.

```bash
cd deploy/pretalx
mkdir -p conf
cp .env.example .env
```

2. Render `conf/pretalx.cfg`.

```bash
PRETALX_SITE_URL=http://localhost:8346 \
POSTGRES_PASSWORD=change-me-for-local \
PRETALX_MAIL_FROM=cfp@localhost \
PRETALX_MAIL_HOST=mailpit \
PRETALX_MAIL_PORT=1025 \
PRETALX_MAIL_USER= \
PRETALX_MAIL_PASSWORD= \
PRETALX_MAIL_TLS=False \
PRETALX_MAIL_SSL=False \
PRETALX_FILE_UPLOAD_LIMIT=2 \
PRETALX_LOGGING_EMAIL=admin@localhost \
python3 - <<'PY'
from pathlib import Path
from string import Template
import os

template = Template(Path('pretalx.cfg.template').read_text())
Path('conf/pretalx.cfg').write_text(template.safe_substitute(os.environ))
PY
```

For local Mailjet testing, render the same config with Mailjet SMTP values instead of Mailpit:

```bash
PRETALX_SITE_URL=http://localhost:8346 \
POSTGRES_PASSWORD=change-me-for-local \
PRETALX_MAIL_FROM=cfp@asyncapi.com \
PRETALX_MAIL_HOST=in-v3.mailjet.com \
PRETALX_MAIL_PORT=2525 \
PRETALX_MAIL_USER=<mailjet-api-key> \
PRETALX_MAIL_PASSWORD=<mailjet-secret-key> \
PRETALX_MAIL_TLS=True \
PRETALX_MAIL_SSL=False \
PRETALX_FILE_UPLOAD_LIMIT=2 \
PRETALX_LOGGING_EMAIL=admin@localhost \
python3 - <<'PY'
from pathlib import Path
from string import Template
import os

template = Template(Path('pretalx.cfg.template').read_text())
Path('conf/pretalx.cfg').write_text(template.safe_substitute(os.environ))
PY
```

Do not commit `deploy/pretalx/conf/pretalx.cfg`; it contains rendered secrets.

3. Start Pretalx, Postgres, Redis, and Mailpit. The local image build installs the `pretalx_asyncapi_cfp` plugin, which exposes global CFP dates and event location metadata for the website sync.

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env up -d --build
```

4. Initialize Pretalx.

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env exec pretalx pretalx init
```

5. Open:

- Pretalx organizer UI: `http://localhost:8346/orga/`
- Mailpit inbox: `http://localhost:8025`

6. Create the event with slug `asyncapi-online-2026`, configure CFP fields/deadlines/review workflow, and submit a test proposal from the website CFP link.

7. Enable `AsyncAPI CFP API` in each event's plugin settings. After the plugin is enabled, open `Event settings -> Plugins -> AsyncAPI CFP API -> Location metadata` and fill in:

- City
- Country
- Address
- Map URL
- Image URL

The endpoint reads these values from `event.display_settings["asyncapi_location"]`. Saving the form also writes a managed `Location` section into Pretalx's event landing page text, so the public Pretalx conference homepage shows the city, country, address, map link, and image URL. If the location was saved before this plugin behavior existed, open the form and save it once again after rebuilding the Pretalx image.

If you need to seed test events quickly, you can also write the same values from the shell:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env exec -T pretalx python -m pretalx shell --event=asyncapi-online-2026 -c 'from pretalx.event.models import Event; e=Event.objects.get(slug="asyncapi-online-2026"); e.display_settings["asyncapi_location"]={"city":"Online","country":" Edition","address":"AsyncAPI YouTube Channel","map_url":"https://www.youtube.com/@AsyncAPI","image_url":"http://localhost:8346/media/event-online.webp"}; e.save(); print(e.display_settings["asyncapi_location"])'

docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env exec -T pretalx python -m pretalx shell --event=asyncapi-india-2026 -c 'from pretalx.event.models import Event; e=Event.objects.get(slug="asyncapi-india-2026"); e.display_settings["asyncapi_location"]={"city":"Bengaluru","country":"India","address":"NIMHANS Convention Centre, Bengaluru","map_url":"https://maps.asyncapi.com/bengaluru","image_url":"http://localhost:8346/media/event-bengaluru.webp"}; e.save(); print(e.display_settings["asyncapi_location"])'

docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env exec -T pretalx python -m pretalx shell --event=asyncapi-europe-2026 -c 'from pretalx.event.models import Event; e=Event.objects.get(slug="asyncapi-europe-2026"); e.display_settings["asyncapi_location"]={"city":"Amsterdam","country":"Netherlands","address":"Tolhuistuin, Amsterdam","map_url":"https://maps.asyncapi.com/amsterdam","image_url":"http://localhost:8346/media/event-amsterdam.webp"}; e.save(); print(e.display_settings["asyncapi_location"])'
```

Test the custom endpoint:

```bash
curl -H "Authorization: Token $PRETALX_API_TOKEN" \
  "http://localhost:8346/api/events/asyncapi-india-2026/p/asyncapi-cfp/event-info/"
```

## Local Pretalx API Sync Test

The sync script uses the authenticated Pretalx API. It fetches public events from `/api/events/?is_public=true`, enriches them with `/api/events/{event}/p/asyncapi-cfp/event-info/` when the plugin is enabled, then reads the latest released schedule for each event from `/api/events/{event}/schedules/latest/` with expanded submissions, speakers, proposal types, and tracks.

```bash
npm run test:pretalx-sync
```

To test the mapper without touching real website JSON:

```bash
PRETALX_SCHEDULE_FILE=scripts/fixtures/pretalx-schedule-latest.json \
PRETALX_SPEAKERS_OUTPUT=tmp/speakers.json \
PRETALX_AGENDA_OUTPUT=tmp/agenda.json \
npm run sync:pretalx
```

After scheduled talks are visible through the local Pretalx API, run the full API sync. This writes generated Pretalx data into `config/pretalx/city-lists.json`, `config/pretalx/speakers.json`, and `config/pretalx/agenda.json`. If the custom plugin is enabled, `city-lists.json` also gets global CFP deadline, city, country, address, map URL, and image URL from Pretalx.

```bash
PRETALX_SITE_URL=http://localhost:8346 \
PRETALX_API_TOKEN=<pretalx-api-token> \
npm run sync:pretalx
```

For multiple Pretalx-backed conferences, create each public event in Pretalx. The sync discovers them from the API; do not add per-event GitHub variables for slug, city, timezone, or event JSON.

Third-party/manual conference data lives in `config/third-party/`. Generated Pretalx data lives in `config/pretalx/`. The website imports `config/conference-data.ts`, which merges both sources and remaps generated speaker IDs so agenda references do not collide.

Review the generated changes in `config/pretalx/`.

## Seed Four Droplet Test Events

Use this on a personal droplet after Pretalx is running. Pretalx's own `create_test_event` command creates realistic test content, including submissions, speakers, reviews, and schedules depending on the selected stage. This section then applies only the AsyncAPI-specific metadata: public event details, plugin enablement, location fields, CFP deadlines, and `image_url`.

If `create_test_event` complains about missing dependencies, install its test-only dependencies in the container first:

```bash
cd /opt/asyncapi-pretalx
docker compose --env-file .env exec -T pretalx python -m pip install freezegun Faker
```

As of June 7, 2026, these deadlines produce the intended states:

- Expired: `asyncapi-europe-2026`, `asyncapi-online-2026`
- Open: `asyncapi-india-2026`, `asyncapi-us-conf-2026`

Create the four events with Pretalx test data:

```bash
cd /opt/asyncapi-pretalx

docker compose --env-file .env exec -T pretalx python -m pretalx create_test_event --slug asyncapi-europe-2026 --stage over
docker compose --env-file .env exec -T pretalx python -m pretalx create_test_event --slug asyncapi-online-2026 --stage over
docker compose --env-file .env exec -T pretalx python -m pretalx create_test_event --slug asyncapi-india-2026 --stage cfp
docker compose --env-file .env exec -T pretalx python -m pretalx create_test_event --slug asyncapi-us-conf-2026 --stage schedule
```

Then apply AsyncAPI metadata:

```bash
cd /opt/asyncapi-pretalx
docker compose --env-file .env exec -T pretalx python -m pretalx shell --unsafe-disable-scopes <<'PY'
from datetime import date, datetime
from zoneinfo import ZoneInfo

from i18nfield.strings import LazyI18nString
from pretalx.event.models.event import Event
from pretalx.event.models.organiser import Organiser

from pretalx_asyncapi_cfp.forms import update_landing_page_location_block


PLUGIN = "pretalx_asyncapi_cfp"
ORGANISER_SLUG = "asyncapi"

organiser, _ = Organiser.objects.get_or_create(
    slug=ORGANISER_SLUG,
    defaults={"name": "AsyncAPI"},
)

events = {
    "asyncapi-europe-2026": {
        "name": "AsyncAPI Conf Europe 2026",
        "date_from": date(2026, 11, 5),
        "date_to": date(2026, 11, 6),
        "timezone": "Europe/Rome",
        "email": "cfp@asyncapi.com",
        "city": "Italy",
        "country": "Europe",
        "address": "Test",
        "map_url": "https://maps.google.com/",
        "image_url": "https://conference.asyncapi.com/img/locations/paris.webp",
        "cfp_deadline": datetime(2026, 4, 3, 23, 59, tzinfo=ZoneInfo("Europe/Rome")),
    },
    "asyncapi-online-2026": {
        "name": "AsyncAPI Conf Online 2026",
        "date_from": date(2026, 10, 28),
        "date_to": date(2026, 10, 28),
        "timezone": "UTC",
        "email": "cfp@asyncapi.com",
        "city": "Online",
        "country": "Edition",
        "address": "AsyncAPI YouTube Channel",
        "map_url": "https://www.youtube.com/@AsyncAPI",
        "image_url": "https://conference.asyncapi.com/img/CFS-Banner.png",
        "cfp_deadline": datetime(2026, 4, 3, 23, 59, tzinfo=ZoneInfo("UTC")),
    },
    "asyncapi-india-2026": {
        "name": "AsyncAPI Conf India 2026",
        "date_from": date(2026, 8, 22),
        "date_to": date(2026, 8, 23),
        "timezone": "Asia/Kolkata",
        "email": "cfp@asyncapi.com",
        "city": "Bengaluru",
        "country": "India",
        "address": "TBA",
        "map_url": "https://maps.google.com/",
        "image_url": "https://conference.asyncapi.com/img/locations/bangalore.webp",
        "cfp_deadline": datetime(2026, 6, 30, 23, 59, tzinfo=ZoneInfo("Asia/Kolkata")),
    },
    "asyncapi-us-conf-2026": {
        "name": "AsyncAPI US Conf 2026",
        "date_from": date(2026, 6, 17),
        "date_to": date(2026, 6, 20),
        "timezone": "America/New_York",
        "email": "cfp@asyncapi.com",
        "city": "New York",
        "country": "USA",
        "address": "New York City",
        "map_url": "https://maps.google.com/",
        "image_url": "https://conference.asyncapi.com/img/locations/san-jose.webp",
        "cfp_deadline": datetime(2026, 6, 30, 23, 59, tzinfo=ZoneInfo("America/New_York")),
    },
}

for slug, metadata in events.items():
    event = Event.objects.get(slug=slug)
    event.name = LazyI18nString({"en": metadata["name"]})
    event.organiser = organiser
    event.is_public = True
    event.date_from = metadata["date_from"]
    event.date_to = metadata["date_to"]
    event.timezone = metadata["timezone"]
    event.email = metadata["email"]
    event.locale = "en"
    event.locale_array = "en"
    event.content_locale_array = "en"

    event.enable_plugin(PLUGIN)

    event.display_settings = event.display_settings or {}
    existing_location = event.display_settings.get("asyncapi_location", {})
    location = {
        "city": metadata["city"],
        "country": metadata["country"],
        "address": metadata["address"],
        "map_url": metadata["map_url"],
        # Keep uploaded Pretalx image URLs if they already exist.
        "image_url": existing_location.get("image_url") or metadata["image_url"],
    }
    event.display_settings["asyncapi_location"] = location
    event.landing_page_text = update_landing_page_location_block(
        event.landing_page_text,
        location,
        locales=getattr(event, "locales", None),
        default_locale=getattr(event, "locale", None),
    )

    cfp = event.cfp
    cfp.deadline = metadata["cfp_deadline"]
    cfp.save(update_fields=["deadline"])
    event.save()

    print(
        f"updated {slug}: "
        f"plugin={PLUGIN in event.plugin_list}, "
        f"deadline={cfp.deadline.isoformat()}, "
        f"image_url={location['image_url']}"
    )
PY
```

Verify the four events and plugin metadata:

```bash
docker compose --env-file .env exec -T pretalx python -m pretalx shell --unsafe-disable-scopes -c '
from pretalx.event.models.event import Event

for event in Event.objects.filter(slug__in=[
    "asyncapi-europe-2026",
    "asyncapi-online-2026",
    "asyncapi-india-2026",
    "asyncapi-us-conf-2026",
]).order_by("slug"):
    location = event.display_settings.get("asyncapi_location", {})
    print(event.slug, event.is_public, "pretalx_asyncapi_cfp" in event.plugin_list, event.cfp.deadline, location)
'
```

The website will show agenda when a schedule exists; otherwise it shows CFP guidelines while the CFP deadline is still open. In the test setup above, `asyncapi-us-conf-2026` has a generated schedule, while `asyncapi-india-2026` is still in CFP mode.

## Stage 1: Fresh 2 GB Droplet

Use this stage to restart the personal droplet from a clean Pretalx deploy. The destructive cleanup commands below are for a fresh test droplet only. Do not run them on a droplet with data you need unless Stage 2 backups are already verified.

Install Docker and create a host `pretalx` user:

```bash
apt update
apt install -y ca-certificates curl git rsync cron
curl -fsSL https://get.docker.com | sh

adduser --disabled-password --gecos "" pretalx
usermod -aG docker pretalx
install -d -o pretalx -g pretalx /opt/asyncapi-pretalx

install -d -m 700 -o pretalx -g pretalx /home/pretalx/.ssh
cp /root/.ssh/authorized_keys /home/pretalx/.ssh/authorized_keys
chown pretalx:pretalx /home/pretalx/.ssh/authorized_keys
chmod 600 /home/pretalx/.ssh/authorized_keys
```

Keep swap enabled even on the 2 GB droplet so migrations, rebuilds, and image processing have headroom:

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
printf '%s\n' '/swapfile none swap sw 0 0' >> /etc/fstab
```

Start fresh on the droplet:

```bash
su - pretalx
cd /opt/asyncapi-pretalx
if [ -f .env ] && [ -f docker-compose.yml ]; then
  docker compose --env-file .env down -v --remove-orphans
fi
find /opt/asyncapi-pretalx -mindepth 1 -maxdepth 1 -exec rm -rf {} +
```

Upload the deploy folder from your laptop:

```bash
rsync -az deploy/pretalx/ pretalx@<droplet-ip>:/opt/asyncapi-pretalx/
ssh pretalx@<droplet-ip>
cd /opt/asyncapi-pretalx
cp .env.example .env
```

Edit `.env`:

```env
POSTGRES_PASSWORD=<strong-password>
PRETALX_HTTP_PORT=8346
PRETALX_IMAGE_TAG=v2026.1.2
PRETALX_FILE_UPLOAD_LIMIT=2
GUNICORN_FORWARDED_ALLOW_IPS=127.0.0.1
```

Render `conf/pretalx.cfg`:

```bash
mkdir -p conf

PRETALX_SITE_URL='http://localhost:8346' \
POSTGRES_PASSWORD='<same-password-as-env>' \
PRETALX_MAIL_FROM='cfp@asyncapi.com' \
PRETALX_MAIL_HOST='in-v3.mailjet.com' \
PRETALX_MAIL_PORT='587' \
PRETALX_MAIL_USER='<mailjet-api-key>' \
PRETALX_MAIL_PASSWORD='<mailjet-secret-key>' \
PRETALX_MAIL_TLS='True' \
PRETALX_MAIL_SSL='False' \
PRETALX_FILE_UPLOAD_LIMIT='2' \
PRETALX_LOGGING_EMAIL='<your-email>' \
python3 - <<'PY'
from pathlib import Path
from string import Template
import os

template = Template(Path("pretalx.cfg.template").read_text())
Path("conf/pretalx.cfg").write_text(template.safe_substitute(os.environ))
PY
```

Start Pretalx cleanly:

```bash
docker compose --env-file .env build pretalx
docker compose --env-file .env up -d db redis
docker compose --env-file .env run --rm pretalx init
docker compose --env-file .env run --rm pretalx rebuild --clear -v 1
docker compose --env-file .env up -d
docker compose --env-file .env ps
curl -I http://localhost:8346/orga/
```

The `rebuild` command is mainly a first-run fix for the shared `/public` volume. The Pretalx image contains static assets, but a new named Docker volume mounted at `/public` starts empty and hides those image files. Once `/public/static/pretalx-manifest.json` exists, normal restarts and deploys do not need a rebuild unless the volume is recreated, the static files are stale, or the Pretalx image/static assets changed.

For private testing from your laptop, tunnel the local port:

```bash
ssh -L 8346:127.0.0.1:8346 pretalx@<droplet-ip>
```

Then open `http://localhost:8346/orga/`.

Add the periodic task cron as the `pretalx` user:

```cron
15,45 * * * * cd /opt/asyncapi-pretalx && docker compose --env-file .env exec -T pretalx pretalx runperiodic
```

This runs Pretalx periodic jobs twice per hour, at minute `15` and minute `45`. Pretalx uses `runperiodic` for recurring maintenance work such as queued mail and scheduled background tasks.

## DigitalOcean Public Access

Keep the Docker nginx service private on `127.0.0.1:8346`. For DigitalOcean, expose Pretalx through the droplet's public network with a host reverse proxy instead of publishing the container port directly.

In the DigitalOcean dashboard, attach a Cloud Firewall to the droplet with inbound rules:

- SSH: TCP `22`, ideally from your IP only.
- HTTP: TCP `80`, from all IPv4/IPv6.
- HTTPS: TCP `443`, from all IPv4/IPv6.

Do not open `8346` in the DigitalOcean firewall for the normal setup.

For a domain, create an `A` record pointing to the droplet public IPv4 address:

```text
cfp.asyncapi.com -> <droplet-ip>
```

Install Caddy on the droplet:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
```

Configure Caddy:

```bash
sudo tee /etc/caddy/Caddyfile >/dev/null <<'EOF'
cfp.asyncapi.com {
  reverse_proxy 127.0.0.1:8346
}
EOF

sudo systemctl reload caddy
```

Caddy gets and renews the TLS certificate automatically after DNS points to the droplet and ports `80` and `443` are reachable. Trigger and verify certificate issuance:

```bash
curl -I http://cfp.asyncapi.com
curl -I https://cfp.asyncapi.com/orga/
sudo journalctl -u caddy -n 120 --no-pager
```

Expected: the HTTPS request succeeds and Caddy logs do not show ACME/permission errors. If certificate issuance fails, check the DigitalOcean `A` record, Cloud Firewall rules for `80/443`, and that no host nginx process is already bound to those ports:

```bash
sudo ss -ltnp | grep -E ':80|:443'
```

For temporary public-IP-only testing without a domain, use HTTP only:

```bash
sudo tee /etc/caddy/Caddyfile >/dev/null <<'EOF'
http://<droplet-ip> {
  reverse_proxy 127.0.0.1:8346
}
EOF

sudo systemctl reload caddy
```

Then open:

```text
http://<droplet-ip>/orga/
```

After the public URL is ready, re-render `conf/pretalx.cfg` with the real URL and restart Pretalx:

```bash
cd /opt/asyncapi-pretalx
PRETALX_SITE_URL='https://cfp.asyncapi.com' \
POSTGRES_PASSWORD='<same-password-as-env>' \
PRETALX_MAIL_FROM='cfp@asyncapi.com' \
PRETALX_MAIL_HOST='in-v3.mailjet.com' \
PRETALX_MAIL_PORT='587' \
PRETALX_MAIL_USER='<mailjet-api-key>' \
PRETALX_MAIL_PASSWORD='<mailjet-secret-key>' \
PRETALX_MAIL_TLS='True' \
PRETALX_MAIL_SSL='False' \
PRETALX_FILE_UPLOAD_LIMIT='2' \
PRETALX_LOGGING_EMAIL='<your-email>' \
python3 - <<'PY'
from pathlib import Path
from string import Template
import os

template = Template(Path("pretalx.cfg.template").read_text())
Path("conf/pretalx.cfg").write_text(template.safe_substitute(os.environ))
PY

docker compose --env-file .env up -d
```

## Stage 2: Backups

Back up PostgreSQL and the persistent Pretalx volumes. Redis does not need a backup because it is only used for temporary and cached data. Media does need backup: uploaded avatars, event logos, generated thumbnails, and other user-uploaded files live in the `pretalx-public` volume under `/public/media`.

Create `/opt/asyncapi-pretalx/bin/backup-pretalx.sh` as the `pretalx` user:

```bash
mkdir -p /opt/asyncapi-pretalx/bin /opt/asyncapi-pretalx/backups/postgres /opt/asyncapi-pretalx/backups/volumes
cat > /opt/asyncapi-pretalx/bin/backup-pretalx.sh <<'SH'
#!/usr/bin/env sh
set -eu

cd /opt/asyncapi-pretalx
stamp="$(date +%F-%H%M%S)"

mkdir -p backups/postgres backups/volumes

docker compose --env-file .env exec -T db pg_dump -U pretalx -d pretalx | gzip > "backups/postgres/pretalx-${stamp}.sql.gz"

data_volume="$(docker compose --env-file .env config --format json | python3 -c 'import json,sys; print(json.load(sys.stdin)["volumes"]["pretalx-data"]["name"])')"
public_volume="$(docker compose --env-file .env config --format json | python3 -c 'import json,sys; print(json.load(sys.stdin)["volumes"]["pretalx-public"]["name"])')"

docker run --rm -v "${data_volume}:/data:ro" -v "/opt/asyncapi-pretalx/backups/volumes:/backup" alpine tar -czf "/backup/pretalx-data-${stamp}.tgz" -C /data .
docker run --rm -v "${public_volume}:/public:ro" -v "/opt/asyncapi-pretalx/backups/volumes:/backup" alpine tar -czf "/backup/pretalx-public-${stamp}.tgz" -C /public .

find backups/postgres backups/volumes -type f -mtime +14 -delete
SH
chmod +x /opt/asyncapi-pretalx/bin/backup-pretalx.sh
```

Run one backup manually and verify files were created:

```bash
/opt/asyncapi-pretalx/bin/backup-pretalx.sh
find /opt/asyncapi-pretalx/backups -type f -maxdepth 3 -print
```

Add the cron job:

```cron
0 8 * * * /opt/asyncapi-pretalx/bin/backup-pretalx.sh >> /opt/asyncapi-pretalx/backups/backup.log 2>&1
```

This runs the backup script every day at `08:00 UTC` and appends output/errors to `/opt/asyncapi-pretalx/backups/backup.log`. Cron uses the server timezone; set the droplet timezone to UTC or adjust the hour accordingly.

Cron fields are:

```text
minute hour day-of-month month day-of-week command
```

For the cron entries above:

- `15,45 * * * *` means minute `15` and `45` of every hour, every day.
- `0 8 * * *` means `08:00` every day.
- `>> file 2>&1` appends normal output and errors to the same log file.

Keep three copies for anything important:

- On the droplet in `/opt/asyncapi-pretalx/backups/` for quick local restore.
- Off the droplet on your laptop or another server.
- In object storage. For this DigitalOcean setup, use a private DigitalOcean Spaces bucket as the main off-droplet backup target.

For a simple off-droplet copy to your laptop:

```bash
rsync -az pretalx@<droplet-ip>:/opt/asyncapi-pretalx/backups/ ./pretalx-backups/
```

Test the downloaded backup locally once:

```bash
find ./pretalx-backups -type f -maxdepth 3 -print
gzip -t ./pretalx-backups/postgres/pretalx-*.sql.gz
tar -tzf "$(find ./pretalx-backups/volumes -name 'pretalx-data-*.tgz' | tail -1)" | head
tar -tzf "$(find ./pretalx-backups/volumes -name 'pretalx-public-*.tgz' | tail -1)" | head
```

This does not restore anything. It only verifies that the PostgreSQL gzip file and volume tarballs can be read after download.

For DigitalOcean Spaces, create a private bucket, create Spaces access keys, and configure `rclone`:

```bash
rclone config create do-spaces s3 \
  provider DigitalOcean \
  access_key_id <spaces-access-key> \
  secret_access_key <spaces-secret-key> \
  endpoint nyc3.digitaloceanspaces.com \
  acl private
```

Then sync backups off the droplet:

```bash
rclone sync /opt/asyncapi-pretalx/backups do-spaces:<bucket-name>/pretalx
```

Restore PostgreSQL from a backup:

```bash
cd /opt/asyncapi-pretalx
docker compose --env-file .env up -d db

gunzip -c backups/postgres/pretalx-<timestamp>.sql.gz > /tmp/pretalx-restore.sql
docker compose --env-file .env exec -T db psql -U pretalx -d postgres -c 'DROP DATABASE IF EXISTS pretalx WITH (FORCE);'
docker compose --env-file .env exec -T db psql -U pretalx -d postgres -c 'CREATE DATABASE pretalx OWNER pretalx;'
docker compose --env-file .env exec -T db psql -U pretalx -d pretalx < /tmp/pretalx-restore.sql
rm /tmp/pretalx-restore.sql
```

Restore Pretalx data and public files:

```bash
cd /opt/asyncapi-pretalx
docker compose --env-file .env down

data_volume="$(docker compose --env-file .env config --format json | python3 -c 'import json,sys; print(json.load(sys.stdin)["volumes"]["pretalx-data"]["name"])')"
public_volume="$(docker compose --env-file .env config --format json | python3 -c 'import json,sys; print(json.load(sys.stdin)["volumes"]["pretalx-public"]["name"])')"

docker run --rm -v "${data_volume}:/data" alpine sh -c 'rm -rf /data/* /data/.[!.]* /data/..?*'
docker run --rm -v "${public_volume}:/public" alpine sh -c 'rm -rf /public/* /public/.[!.]* /public/..?*'

docker run --rm -v "${data_volume}:/data" -v "/opt/asyncapi-pretalx/backups/volumes:/backup:ro" alpine tar -xzf "/backup/pretalx-data-<timestamp>.tgz" -C /data
docker run --rm -v "${public_volume}:/public" -v "/opt/asyncapi-pretalx/backups/volumes:/backup:ro" alpine tar -xzf "/backup/pretalx-public-<timestamp>.tgz" -C /public

docker compose --env-file .env up -d
```

## Stage 3: GitHub Actions Deploy

Use GitHub Actions only after the droplet has the host setup, public proxy, periodic tasks, and backups in place. The workflow deploys the Pretalx containers; it does not provision the DigitalOcean droplet, DNS, firewall, Caddy, cron, or Spaces backup target.

Run this as `root` on a fresh droplet if Stage 1 was not already completed:

```bash
apt update
apt install -y ca-certificates curl git rsync cron
curl -fsSL https://get.docker.com | sh

adduser --disabled-password --gecos "" pretalx
usermod -aG docker pretalx
install -d -o pretalx -g pretalx /opt/asyncapi-pretalx

install -d -m 700 -o pretalx -g pretalx /home/pretalx/.ssh
cp /root/.ssh/authorized_keys /home/pretalx/.ssh/authorized_keys
chown pretalx:pretalx /home/pretalx/.ssh/authorized_keys
chmod 600 /home/pretalx/.ssh/authorized_keys
```

After the first `pretalx init`, run this once if Pretalx cannot read `/data/.secret`, or after restoring the `pretalx-data` volume from backup. This is not a per-deploy command:

```bash
su - pretalx
cd /opt/asyncapi-pretalx
docker compose --env-file .env run --rm --entrypoint sh --user root pretalx -lc '
  chown pretalxuser:pretalxuser /data
  chmod 700 /data
  [ -f /data/.secret ] && chown pretalxuser:pretalxuser /data/.secret && chmod 600 /data/.secret || true
'
```

The host `pretalx` Linux user owns `/opt/asyncapi-pretalx`. Inside the container, Pretalx reads `/data/.secret` as `pretalxuser`, so that file must be readable by `pretalxuser`.

In DigitalOcean:

- Point the domain `A` record to the droplet public IPv4 address.
- Attach a Cloud Firewall to the droplet.
- Allow SSH `22/tcp` from your IP.
- Allow HTTP `80/tcp` from all IPv4/IPv6.
- Allow HTTPS `443/tcp` from all IPv4/IPv6.
- Do not open `8346`; Docker nginx stays private on `127.0.0.1:8346`.

Install Caddy as the host reverse proxy:

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install -y caddy
```

Configure Caddy:

```bash
cat > /etc/caddy/Caddyfile <<'EOF'
cfp.asyncapi.com {
  reverse_proxy 127.0.0.1:8346
}
EOF

systemctl reload caddy
```

Caddy gets and renews the TLS certificate automatically. Before enabling the GitHub Action, verify HTTPS from outside the droplet:

```bash
curl -I https://cfp.asyncapi.com/orga/
journalctl -u caddy -n 120 --no-pager
```

If certificate issuance fails, check DigitalOcean DNS, Cloud Firewall ports `80/443`, and whether another host service is already using those ports:

```bash
ss -ltnp | grep -E ':80|:443'
```

Create the backup script and verify it once before enabling Actions. Use the Stage 2 script exactly. Then install both cron jobs as the `pretalx` user.

```bash
su - pretalx
```

Interactive option:

```bash
crontab -e
```

Paste:

```cron
15,45 * * * * cd /opt/asyncapi-pretalx && docker compose --env-file .env exec -T pretalx pretalx runperiodic
0 8 * * * /opt/asyncapi-pretalx/bin/backup-pretalx.sh >> /opt/asyncapi-pretalx/backups/backup.log 2>&1
```

Non-interactive option:

```bash
(crontab -l 2>/dev/null; printf '%s\n' \
  '15,45 * * * * cd /opt/asyncapi-pretalx && docker compose --env-file .env exec -T pretalx pretalx runperiodic' \
  '0 8 * * * /opt/asyncapi-pretalx/bin/backup-pretalx.sh >> /opt/asyncapi-pretalx/backups/backup.log 2>&1') | sort -u | crontab -
```

Verify cron was installed:

```bash
crontab -l
```

Cron format is `minute hour day-of-month month day-of-week command`. Here, `runperiodic` runs at minute `15` and `45` of every hour, and backups run every day at `08:00 UTC` if the droplet timezone is UTC. The backup command appends both normal output and errors to `backup.log`.

Backups should be stored in three places:

- Local quick-restore copy on the droplet: `/opt/asyncapi-pretalx/backups/`.
- A laptop or another server via `rsync`.
- A private DigitalOcean Spaces bucket via `rclone sync /opt/asyncapi-pretalx/backups do-spaces:<bucket-name>/pretalx`.

Recommended repository secrets:

```text
DO_SSH_HOST=<droplet-ip-or-hostname>
DO_SSH_USER=pretalx
DO_SSH_PRIVATE_KEY=<private-key-that-can-ssh-as-pretalx>
POSTGRES_PASSWORD=<same-password-used-on-droplet>
PRETALX_LOGGING_EMAIL=<admin-email>
PRETALX_MAIL_FROM=cfp@asyncapi.com
PRETALX_MAIL_HOST=in-v3.mailjet.com
PRETALX_MAIL_PORT=587
PRETALX_MAIL_USER=<mailjet-api-key>
PRETALX_MAIL_PASSWORD=<mailjet-secret-key>
PRETALX_API_TOKEN=<pretalx-api-token>
```

Recommended repository variables:

```text
DO_SSH_PORT=22
PRETALX_SITE_URL=https://your-pretalx-domain.asyncapi.com
PRETALX_REMOTE_PATH=/opt/asyncapi-pretalx
PRETALX_HTTP_PORT=8346
PRETALX_IMAGE_TAG=v2026.1.2
PRETALX_MAIL_TLS=True
PRETALX_MAIL_SSL=False
PRETALX_FILE_UPLOAD_LIMIT=2
GUNICORN_FORWARDED_ALLOW_IPS=127.0.0.1
PRETALX_REBUILD_STATIC=false
```

Only `PRETALX_IMAGE_TAG` controls the custom Pretalx image version. The Compose file keeps nginx, Postgres, Redis, and local Mailpit on fixed image references.

Run `Deploy Pretalx to DigitalOcean` manually first. The workflow uploads `deploy/pretalx`, writes `.env`, builds the custom Pretalx image, starts Postgres and Redis, checks whether `/public/static/pretalx-manifest.json` exists, and only rebuilds Pretalx static files if the manifest is missing or `rebuild_static=true` is selected in workflow dispatch.

After the first workflow deploy, verify:

```bash
ssh pretalx@<droplet-ip>
cd /opt/asyncapi-pretalx
docker compose --env-file .env ps
curl -I http://localhost:8346/orga/
find /opt/asyncapi-pretalx/backups -type f -maxdepth 3 -print
```

Then set the website env to the deployed Pretalx URL:

```env
NEXT_PUBLIC_PRETALX_BASE_URL=https://your-pretalx-domain.asyncapi.com
NEXT_PUBLIC_PRETALX_CFP_PATH=cfp
```

Run:

```bash
npm run test:pretalx-sync
npm run build
```

After you release a public schedule in Pretalx, run the `Sync Pretalx Schedule` workflow manually using the same Pretalx URL.

## PR Questions

- Digitalocean spaces required?
