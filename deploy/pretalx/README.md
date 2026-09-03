# Pretalx Deployment Guide

This directory contains the Pretalx deployment used for AsyncAPI CFPs. It owns the Docker Compose stack, Pretalx config template, nginx media/static proxy, custom plugin, and GitHub Actions deployment flow.

## Stack

- `pretalx`: custom image built from `pretalx/standalone:v2026.1.2` with `pretalx_asyncapi_cfp` installed.
- `nginx`: container-facing proxy that serves `/media/...` and `/static/...` from `/public` and proxies the rest to Pretalx.
- `db`: PostgreSQL 15.
- `redis`: Redis for sessions, cache, and Celery.
- Host reverse proxy: Caddy on the droplet, terminating public HTTP/TLS and forwarding to `127.0.0.1:8346`.

Only the Pretalx image tag is configurable through `PRETALX_IMAGE_TAG`. nginx, Postgres, Redis, and local Mailpit image tags stay pinned in Compose.

## Local Testing

From this directory:

```bash
cd deploy/pretalx
cp .env.example .env
mkdir -p conf
```

Create `conf/pretalx.cfg` from `pretalx.cfg.template`. For local Mailpit testing, use these values:

```ini
[filesystem]
data = /data
logs = /data/logs
media = /public/media
static = /public/static

[files]
upload_limit = 2

[site]
debug = True
url = http://localhost:8346

[database]
backend = postgresql
name = pretalx
user = pretalx
password = change-me-for-local
host = pretalx-db
port = 5432

[mail]
from = cfp@asyncapi.com
host = mailpit
port = 1025
user =
password =
tls = False
ssl = False

[redis]
location = redis://pretalx-redis/0
sessions = true

[celery]
backend = redis://pretalx-redis/1
broker = redis://pretalx-redis/2

[logging]
email = cfp@asyncapi.com
```

Start Pretalx plus Mailpit:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env up -d --build
docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env exec pretalx pretalx init
```

Open:

- Pretalx: `http://localhost:8346/orga/`
- Mailpit: `http://localhost:8025`

For local website testing, point the website at local Pretalx:

```env
NEXT_PUBLIC_PRETALX_BASE_URL=http://localhost:8346
NEXT_PUBLIC_PRETALX_CFP_PATH=cfp
```

Run the Pretalx sync tests from the repository root:

```bash
npm run test:pretalx-sync
```

To sync from a running Pretalx instance:

```bash
PRETALX_SITE_URL=http://localhost:8346 \
PRETALX_API_TOKEN=<pretalx-api-token> \
npm run sync:pretalx
```

## Mail

Use Mailpit locally. Use Mailjet for deployed droplets. DigitalOcean blocks outbound SMTP ports `25`, `465`, and `587` on droplets, so use Mailjet port `2525`.

Mailjet production values:

```env
PRETALX_MAIL_FROM=cfp@asyncapi.com
PRETALX_MAIL_HOST=in-v3.mailjet.com
PRETALX_MAIL_PORT=2525
PRETALX_MAIL_USER=<mailjet-api-key>
PRETALX_MAIL_PASSWORD=<mailjet-secret-key>
PRETALX_MAIL_TLS=True
PRETALX_MAIL_SSL=False
```

Before production, verify `cfp@asyncapi.com` or the sending domain in Mailjet and add the DNS records Mailjet gives you for SPF, DKIM, and DMARC.

## Droplet Setup

Use a 2 GB DigitalOcean droplet. The 512 MB droplet was not enough for Pretalx, Postgres, Redis, nginx, migrations, and static rebuilds together.

Create the deploy user and directory:

```bash
sudo adduser pretalx --disabled-password --home /var/pretalx
sudo usermod -aG docker pretalx
sudo mkdir -p /opt/asyncapi-pretalx
sudo chown pretalx:pretalx /opt/asyncapi-pretalx
```

Install Docker and the Docker Compose plugin, then log in as `pretalx`:

```bash
su - pretalx
cd /opt/asyncapi-pretalx
```

Create DNS first:

```text
cfp.asyncapi.com -> <droplet-public-ip>
```

In the DigitalOcean Cloud Firewall, allow public inbound `22`, `80`, and `443`. Do not expose `8346`; Compose binds it only to `127.0.0.1`.

Install Caddy on the host and configure TLS:

```bash
sudo apt update
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
```

`/etc/caddy/Caddyfile`:

```caddy
cfp.asyncapi.com {
	reverse_proxy 127.0.0.1:8346
}
```

Reload Caddy:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy can get a trusted TLS certificate only after DNS points to the droplet and ports `80` and `443` are reachable. HTTPS on the raw public IP will not work with a trusted certificate.

## First Deploy

After the workflow uploads files, or after copying `deploy/pretalx/*` manually, create the remote `.env`:

```env
POSTGRES_PASSWORD=<strong-password>
PRETALX_HTTP_PORT=8346
PRETALX_IMAGE_TAG=v2026.1.2
PRETALX_FILE_UPLOAD_LIMIT=2
GUNICORN_FORWARDED_ALLOW_IPS=127.0.0.1
```

Build and start:

```bash
cd /opt/asyncapi-pretalx
docker compose --env-file .env pull db redis nginx
docker compose --env-file .env build pretalx
docker compose --env-file .env up -d
docker compose --env-file .env run --rm pretalx rebuild --clear -v 1
docker compose --env-file .env up -d
```

Initialize Pretalx once:

```bash
docker compose --env-file .env exec pretalx pretalx init
```

If web/task processes start crashing after init or after restoring volumes, fix volume ownership once:

```bash
docker compose --env-file .env stop pretalx
docker compose --env-file .env run --rm --entrypoint sh --user root pretalx -lc '
  chown -R pretalxuser:pretalxuser /data /public
  chmod 700 /data
  [ -f /data/.secret ] && chmod 600 /data/.secret || true
'
docker compose --env-file .env up -d
```

This should not be part of every deploy. Run it only after first init, restore, or manual volume manipulation if permissions are wrong.

## Event Setup

For each event:

1. Create the event in Pretalx.
2. Configure CFP dates, proposal types, tracks, review flow, and schedule release.
3. Enable the `AsyncAPI CFP API` plugin.
4. Open `Event settings -> Plugins -> AsyncAPI CFP API`.
5. Fill city, country, address, map URL, and image URL.

The plugin exposes website metadata here:

```text
/api/events/{event}/p/asyncapi-cfp/event-info/
```

The sync workflow uses that endpoint to populate city list data, including `image_url`, then maps it into website city images.

For test data, Pretalx has a built-in command:

```bash
docker compose --env-file .env exec pretalx pretalx create_test_event --slug asyncapi-test-1 --stage accepted
```

Use four events when validating the website: two with CFP deadlines in the past and two in the future, all with the plugin enabled and location image URLs filled.

## Backups

Back up PostgreSQL and the two Pretalx volumes. Do not back up Redis; Pretalx uses it for non-critical temporary/cache data.

Back up:

- PostgreSQL database.
- `pretalx-data`, including logs and `/data/.secret`.
- `pretalx-public`, including `/public/media` uploaded files and generated static/media files.

Create `/opt/asyncapi-pretalx/bin/backup-pretalx.sh`:

```sh
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
```

Install it:

```bash
chmod +x /opt/asyncapi-pretalx/bin/backup-pretalx.sh
/opt/asyncapi-pretalx/bin/backup-pretalx.sh
find /opt/asyncapi-pretalx/backups -type f -maxdepth 3 -print
```

Add cron jobs with `crontab -e`:

```cron
15,45 * * * * cd /opt/asyncapi-pretalx && docker compose --env-file .env exec -T pretalx pretalx runperiodic
0 8 * * * /opt/asyncapi-pretalx/bin/backup-pretalx.sh >> /opt/asyncapi-pretalx/backups/backup.log 2>&1
```

Cron format is:

```text
minute hour day-of-month month day-of-week command
```

So `15,45 * * * *` runs at minute 15 and 45 every hour, and `0 8 * * *` runs every day at 08:00 UTC if the droplet timezone is UTC. `>> file 2>&1` appends both stdout and stderr to the log.

To add the same cron entries non-interactively:

```bash
(crontab -l 2>/dev/null; printf '%s\n' \
  '15,45 * * * * cd /opt/asyncapi-pretalx && docker compose --env-file .env exec -T pretalx pretalx runperiodic' \
  '0 8 * * * /opt/asyncapi-pretalx/bin/backup-pretalx.sh >> /opt/asyncapi-pretalx/backups/backup.log 2>&1') | sort -u | crontab -
```

For off-droplet backups, use DigitalOcean Spaces or another external store. Example with `rclone`:

```bash
rclone config create do-spaces s3 \
  provider DigitalOcean \
  access_key_id <spaces-access-key> \
  secret_access_key <spaces-secret-key> \
  endpoint nyc3.digitaloceanspaces.com \
  acl private

rclone sync /opt/asyncapi-pretalx/backups do-spaces:<bucket-name>/pretalx
```

Test a local backup download from your laptop:

```bash
rsync -az pretalx@<droplet-ip>:/opt/asyncapi-pretalx/backups/ ./pretalx-backups/
find ./pretalx-backups -maxdepth 3 -type f -print
gzip -t "$(find ./pretalx-backups/postgres -name 'pretalx-*.sql.gz' | tail -1)"
tar -tzf "$(find ./pretalx-backups/volumes -name 'pretalx-data-*.tgz' | tail -1)" | head
tar -tzf "$(find ./pretalx-backups/volumes -name 'pretalx-public-*.tgz' | tail -1)" | head
```

## GitHub Actions Deployment

Workflow: `.github/workflows/deploy-pretalx-digitalocean.yml`

It runs manually through `workflow_dispatch` and automatically on `master` when `deploy/pretalx/**` or the workflow file changes.

Manual inputs:

- `target_environment`: defaults to `pretalx-prod`.
- `pretalx_site_url`: defaults to `https://cfp.asyncapi.com`.

Required GitHub environment or repository secrets:

- `DO_SSH_HOST`: droplet public IP or hostname.
- `DO_SSH_USER`: usually `pretalx`.
- `DO_SSH_PRIVATE_KEY`: unencrypted private key for the deploy user. If the key has a passphrase, GitHub Actions will fail unless you add an agent/passphrase flow.
- `POSTGRES_PASSWORD`.
- `PRETALX_LOGGING_EMAIL`.
- `PRETALX_MAIL_FROM`.
- `PRETALX_MAIL_HOST`.
- `PRETALX_MAIL_PORT`.
- `PRETALX_MAIL_USER`.
- `PRETALX_MAIL_PASSWORD`.

Required for the sync workflow:

- `PRETALX_API_TOKEN`.

Optional GitHub variables:

- `DO_SSH_PORT`, default `22`.
- `PRETALX_SITE_URL`, default `https://cfp.asyncapi.com`.
- `PRETALX_REMOTE_PATH`, default `/opt/asyncapi-pretalx`.
- `PRETALX_HTTP_PORT`, default `8346`.
- `PRETALX_IMAGE_TAG`, default `v2026.1.2`.
- `PRETALX_FILE_UPLOAD_LIMIT`, default `2`.
- `PRETALX_MAIL_TLS`, default `True`.
- `PRETALX_MAIL_SSL`, default `False`.
- `GUNICORN_FORWARDED_ALLOW_IPS`, default `127.0.0.1`.

The deploy workflow:

1. Renders `conf/pretalx.cfg` from `pretalx.cfg.template`.
2. Uploads `Dockerfile`, `docker-compose.yml`, `nginx-container.conf`, `conf`, and `plugins`.
3. Writes remote `.env` with runtime Docker values.
4. Pulls `db`, `redis`, and `nginx`.
5. Builds only the custom Pretalx image.
6. Starts the stack.
7. Checks `${PRETALX_SITE_URL}/healthcheck` with redirects enabled.

Before enabling Actions on a new droplet, do the one-time droplet setup, Caddy setup, DNS setup, and backup cron setup manually. Actions deploys the application files; it does not provision the droplet OS.

## Website Sync Workflow

Workflow: `.github/workflows/sync-pretalx-schedule.yml`

It runs weekly and manually. It uses:

- `PRETALX_SITE_URL`: workflow input, GitHub variable, or `https://cfp.asyncapi.com`.
- `PRETALX_API_TOKEN`: secret.

It writes:

- `config/pretalx/city-lists.json`
- `config/pretalx/speakers.json`
- `config/pretalx/agenda.json`

Then it opens a PR with the generated data. Agenda appears on the website when the Pretalx schedule has been released and the sync data is merged.

## Operational Checks

Container state:

```bash
docker compose --env-file .env ps
docker compose --env-file .env logs --tail=100 pretalx
docker compose --env-file .env logs --tail=100 nginx
```

Pretalx worker state:

```bash
docker compose --env-file .env exec pretalx supervisorctl status
docker compose --env-file .env exec pretalx supervisorctl tail -200 pretalxweb stderr
docker compose --env-file .env exec pretalx supervisorctl tail -200 pretalxtask stderr
```

Health and public assets:

```bash
curl -I http://127.0.0.1:8346/healthcheck
curl -I https://cfp.asyncapi.com/healthcheck
curl -I http://127.0.0.1:8346/static/pretalx-manifest.json
curl -I https://cfp.asyncapi.com/static/pretalx-manifest.json
```

Media checks:

```bash
docker compose --env-file .env exec pretalx sh -lc 'find /public/media -maxdepth 3 -type f | head -20'
curl -I https://cfp.asyncapi.com/media/<path-from-pretalx>
```

If relative media URLs work but absolute media URLs include `:8346`, fix `[site] url` in `conf/pretalx.cfg` or `PRETALX_SITE_URL` to the public URL, then restart Pretalx.

If public media returns `404` with `Via: Caddy` and `Server: nginx`, Caddy reached the nginx container and nginx could not find that exact file in `/public/media`. Check the filename in the `pretalx-public` volume.

If nginx returns `502`, Pretalx web is usually crashing. Check `supervisorctl` stderr first. A common first-init issue is `PermissionError: /data/.secret`; run the one-time ownership fix above.

## Restore Notes

To restore, stop the stack, restore the Postgres dump into the database, untar `pretalx-data` into the `pretalx-data` volume, untar `pretalx-public` into the `pretalx-public` volume, run the ownership fix, then start the stack.

Keep restore testing separate from production. Download one backup locally and verify the archive structure before relying on the backup job.
