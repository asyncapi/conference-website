import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_SPEAKER_IMAGE = '/img/speaker-images/paris/TBA.webp';
const DEFAULT_LOCATION_IMAGE = '/img/locations/teasers.webp';
const SCHEDULE_EXPANDS = [
  'slots.submission.speakers',
  'slots.submission.submission_type',
  'slots.submission.track',
];

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

export async function writeJson(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function mapPretalxEventsToCities(events, options = {}) {
  const baseUrl = trimTrailingSlash(options.baseUrl || '');
  const metadataBySlug = options.metadataBySlug || new Map();

  return (events || [])
    .filter((event) => event?.is_public === true)
    .map((event) => {
      const metadata = metadataBySlug.get(event.slug) || {};
      const location = metadata.location || {};
      const cfp = metadata.cfp || {};
      const eventName = localizedText(event.name) || event.slug;
      const cityName = location.city || deriveCityName(event);
      const eventUrl =
        event.urls?.base ||
        (baseUrl ? `${baseUrl}/${trimSlashes(event.slug)}/` : '');

      return {
        name: cityName,
        country:
          location.country ||
          (normalize(cityName) === 'online' ? ' Edition' : 'TBA'),
        date: formatEventDateRange(event.date_from, event.date_to),
        cfpDate: cfp.deadline
          ? formatEventDateRange(cfp.deadline, cfp.deadline)
          : 'Not announced yet',
        description: `Join us for ${eventName}. CFP and schedule data are managed in Pretalx.`,
        img:
          location.image_url ||
          event.header_image ||
          event.logo ||
          DEFAULT_LOCATION_IMAGE,
        address: location.address || 'Pretalx event page',
        mapUrl: location.map_url || eventUrl || undefined,
        cfp: {
          provider: 'pretalx',
          eventSlug: event.slug,
        },
      };
    });
}

export function mapPretalxSchedule(schedule, options = {}) {
  const city = options.city || 'Online';
  const timezoneLabel = options.timezoneLabel || 'UTC';
  const speakerIds = new Map();
  const speakers = [];
  const agenda = [];

  for (const slot of schedule?.slots || []) {
    if (
      !slot?.start ||
      !slot?.submission ||
      typeof slot.submission !== 'object'
    ) {
      continue;
    }

    const submission = slot.submission;

    if (
      ['canceled', 'draft', 'rejected', 'withdrawn'].includes(
        String(submission.state || '')
      )
    ) {
      continue;
    }

    const slotSpeakers = (submission.speakers || []).map((person) => {
      const stableKey = String(
        person.code || person.id || person.public_name || person.name
      );

      if (!speakerIds.has(stableKey)) {
        const speakerId = speakers.length + 1;
        speakerIds.set(stableKey, speakerId);
        speakers.push({
          id: speakerId,
          name: person.public_name || person.name || 'Speaker',
          title: person.biography || 'Speaker',
          img:
            person.avatar_url ||
            person.avatar ||
            person.image ||
            DEFAULT_SPEAKER_IMAGE,
          city: [city],
        });
      }

      return speakerIds.get(stableKey);
    });

    agenda.push({
      time: formatApiSlotTime(slot, timezoneLabel),
      session: submission.title,
      speaker: slotSpeakers.length === 1 ? slotSpeakers[0] : slotSpeakers,
      type:
        localizedText(submission.submission_type?.name) ||
        localizedText(submission.track?.name) ||
        'Session',
      city,
      day: formatSlotDay(slot.start),
    });
  }

  return { speakers, agenda };
}

export function mergePretalxSchedules(mappedSchedules) {
  const speakers = [];
  const agenda = [];

  for (const mappedSchedule of mappedSchedules) {
    const speakerIdMap = new Map();

    for (const speaker of mappedSchedule.speakers) {
      const nextSpeakerId = speakers.length + 1;
      speakerIdMap.set(speaker.id, nextSpeakerId);
      speakers.push({
        ...speaker,
        id: nextSpeakerId,
      });
    }

    for (const item of mappedSchedule.agenda) {
      agenda.push({
        ...item,
        speaker: remapSpeakerReference(item.speaker, speakerIdMap),
      });
    }
  }

  return { speakers, agenda };
}

export async function syncPretalxData({
  repoRoot,
  baseUrl = process.env.PRETALX_SITE_URL,
  apiToken = process.env.PRETALX_API_TOKEN,
  fetchImpl = globalThis.fetch,
  outputPaths = {},
} = {}) {
  const cleanBaseUrl = trimTrailingSlash(baseUrl || '');

  if (!repoRoot) {
    throw new Error('syncPretalxData needs a repoRoot.');
  }

  const events = await fetchPretalxEvents(
    buildEventsApiUrl(cleanBaseUrl),
    apiToken,
    fetchImpl
  );
  const metadataBySlug = await fetchPretalxEventMetadataBySlug({
    events,
    baseUrl: cleanBaseUrl,
    apiToken,
    fetchImpl,
  });
  const cities = mapPretalxEventsToCities(events, {
    baseUrl: cleanBaseUrl,
    metadataBySlug,
  });
  const publicEventsBySlug = new Map(
    events
      .filter((event) => event?.is_public === true)
      .map((event) => [event.slug, event])
  );
  const mappedSchedules = [];

  for (const city of cities) {
    const event = publicEventsBySlug.get(city.cfp.eventSlug);
    const schedule = await fetchPretalxSchedule(
      buildScheduleApiUrlForEvent({
        baseUrl: cleanBaseUrl,
        eventSlug: city.cfp.eventSlug,
      }),
      apiToken,
      fetchImpl
    );

    if (!schedule) {
      continue;
    }

    mappedSchedules.push(
      mapPretalxSchedule(schedule, {
        city: city.name,
        timezoneLabel: event?.timezone || 'UTC',
      })
    );
  }

  const { speakers, agenda } = mergePretalxSchedules(mappedSchedules);

  await writeJson(
    path.resolve(
      repoRoot,
      outputPaths.cities || 'config/pretalx/city-lists.json'
    ),
    cities
  );
  await writeJson(
    path.resolve(
      repoRoot,
      outputPaths.speakers || 'config/pretalx/speakers.json'
    ),
    speakers
  );
  await writeJson(
    path.resolve(repoRoot, outputPaths.agenda || 'config/pretalx/agenda.json'),
    agenda
  );

  return { cities, speakers, agenda };
}

function remapSpeakerReference(speakerReference, speakerIdMap) {
  if (Array.isArray(speakerReference)) {
    return speakerReference.map((speakerId) => speakerIdMap.get(speakerId));
  }

  return speakerIdMap.get(speakerReference);
}

function buildEventsApiUrl(baseUrl = process.env.PRETALX_SITE_URL || '') {
  const cleanBaseUrl = trimTrailingSlash(baseUrl);

  if (!cleanBaseUrl) {
    throw new Error('Set PRETALX_SITE_URL to sync from the Pretalx API.');
  }

  const url = new URL(`${cleanBaseUrl}/api/events/`);
  url.searchParams.set('is_public', 'true');
  return url.toString();
}

function buildScheduleApiUrlForEvent(eventConfig) {
  const baseUrl = trimTrailingSlash(
    eventConfig.baseUrl || process.env.PRETALX_SITE_URL || ''
  );
  const eventSlug = trimSlashes(eventConfig.eventSlug || '');

  if (!baseUrl || !eventSlug) {
    throw new Error(
      'Each discovered Pretalx event needs a slug and PRETALX_SITE_URL.'
    );
  }

  const url = new URL(`${baseUrl}/api/events/${eventSlug}/schedules/latest/`);

  for (const expand of SCHEDULE_EXPANDS) {
    url.searchParams.append('expand', expand);
  }

  return url.toString();
}

function buildEventInfoApiUrlForEvent(eventConfig) {
  const baseUrl = trimTrailingSlash(
    eventConfig.baseUrl || process.env.PRETALX_SITE_URL || ''
  );
  const eventSlug = trimSlashes(eventConfig.eventSlug || '');

  if (!baseUrl || !eventSlug) {
    throw new Error(
      'Each discovered Pretalx event needs a slug and PRETALX_SITE_URL.'
    );
  }

  return `${baseUrl}/api/events/${eventSlug}/p/asyncapi-cfp/event-info/`;
}

async function fetchPretalxEvents(
  apiUrl,
  apiToken,
  fetchImpl = globalThis.fetch
) {
  const response = await fetchPretalx(apiUrl, apiToken, fetchImpl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pretalx events from ${apiUrl}: ${response.status} ${response.statusText}`
    );
  }

  const payload = await response.json();
  const events = Array.isArray(payload) ? payload : payload.results || [];

  return events.filter((event) => event?.is_public === true);
}

async function fetchPretalxEventMetadataBySlug({
  events,
  baseUrl,
  apiToken,
  fetchImpl,
}) {
  const metadataBySlug = new Map();

  for (const event of events || []) {
    const metadata = await fetchPretalxEventMetadata(
      buildEventInfoApiUrlForEvent({
        baseUrl,
        eventSlug: event.slug,
      }),
      apiToken,
      fetchImpl
    );

    if (metadata) {
      metadataBySlug.set(event.slug, metadata);
    }
  }

  return metadataBySlug;
}

async function fetchPretalxEventMetadata(
  apiUrl,
  apiToken,
  fetchImpl = globalThis.fetch
) {
  const response = await fetchPretalx(apiUrl, apiToken, fetchImpl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pretalx event metadata from ${apiUrl}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function fetchPretalxSchedule(
  apiUrl,
  apiToken,
  fetchImpl = globalThis.fetch
) {
  const response = await fetchPretalx(apiUrl, apiToken, fetchImpl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pretalx schedule from ${apiUrl}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function fetchPaginatedPretalxResource(
  apiUrl,
  apiToken,
  fetchImpl,
  resourceName
) {
  let nextUrl = apiUrl;
  const resources = [];

  while (nextUrl) {
    const response = await fetchPretalx(nextUrl, apiToken, fetchImpl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pretalx ${resourceName} from ${nextUrl}: ${response.status} ${response.statusText}`
      );
    }

    const page = await response.json();
    resources.push(...(page.results || []));
    nextUrl = page.next;
  }

  return resources;
}

async function fetchPretalx(apiUrl, apiToken, fetchImpl) {
  if (!apiToken) {
    throw new Error('Set PRETALX_API_TOKEN to read the Pretalx API.');
  }

  if (!fetchImpl) {
    throw new Error('This Node.js runtime does not provide fetch.');
  }

  return fetchImpl(apiUrl, {
    headers: {
      Authorization: `Token ${apiToken}`,
    },
  });
}

function deriveCityName(event) {
  const eventName = localizedText(event.name);
  const candidates = [eventName, event.slug]
    .filter(Boolean)
    .map((candidate) =>
      String(candidate)
        .replace(/\bAsyncAPI\b/gi, '')
        .replace(/\bConference\b/gi, '')
        .replace(/\bConf\b/gi, '')
        .replace(/\b20\d{2}\b/g, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean);

  if (candidates.length > 0) {
    return titleCase(candidates[0]);
  }

  return titleCase(event.slug || 'Pretalx Event');
}

function localizedText(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return value.en || Object.values(value).find(Boolean) || '';
}

function formatEventDateRange(dateFrom, dateTo) {
  const start = parsePretalxDate(dateFrom);
  const end = parsePretalxDate(dateTo);

  if (!start) {
    return 'Date to be announced';
  }

  if (!end || sameUtcDay(start, end)) {
    return formatDate(start);
  }

  if (
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth()
  ) {
    return `${start.getUTCDate()} - ${formatDate(end)}`;
  }

  return `${formatDate(start)} - ${formatDate(end)}`;
}

function parsePretalxDate(value) {
  if (!value) {
    return null;
  }

  const datePart = String(value).slice(0, 10);
  const [year, month, day] = datePart.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(Date.UTC(year, month - 1, day));
}

function sameUtcDay(first, second) {
  return (
    first.getUTCFullYear() === second.getUTCFullYear() &&
    first.getUTCMonth() === second.getUTCMonth() &&
    first.getUTCDate() === second.getUTCDate()
  );
}

function formatDate(value) {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(value);

  return formatted.replace(/(\w+) (\d{4})$/, '$1, $2');
}

function formatApiSlotTime(slot, timezoneLabel) {
  return `${formatIsoTime(slot.start)} - ${formatIsoTime(slot.end)} ${timezoneLabel}`;
}

function formatIsoTime(value) {
  if (!value) {
    return '00:00';
  }

  const match = String(value).match(/T(\d{2}:\d{2})/);
  return match ? match[1] : '00:00';
}

function formatSlotDay(value) {
  const datePart = String(value || '').slice(0, 10);
  const [year, month, day] = datePart.split('-').map(Number);

  if (!year || !month || !day) {
    return 'Agenda';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function titleCase(value) {
  return String(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word.length <= 3 && word === word.toUpperCase()
        ? word
        : `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join(' ');
}

function trimTrailingSlash(value) {
  return String(value).replace(/\/+$/, '');
}

function trimSlashes(value) {
  return String(value).replace(/^\/+|\/+$/g, '');
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

async function main() {
  const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
  );

  if (process.env.PRETALX_SCHEDULE_FILE) {
    const schedule = await readJson(
      path.resolve(repoRoot, process.env.PRETALX_SCHEDULE_FILE)
    );
    const mappedSchedule = mapPretalxSchedule(schedule, {
      city: process.env.PRETALX_FIXTURE_CITY || 'Online',
      timezoneLabel: process.env.PRETALX_FIXTURE_TIMEZONE_LABEL || 'UTC',
    });

    await writeJson(
      path.resolve(
        repoRoot,
        process.env.PRETALX_SPEAKERS_OUTPUT || 'config/pretalx/speakers.json'
      ),
      mappedSchedule.speakers
    );
    await writeJson(
      path.resolve(
        repoRoot,
        process.env.PRETALX_AGENDA_OUTPUT || 'config/pretalx/agenda.json'
      ),
      mappedSchedule.agenda
    );

    console.log(
      `Mapped ${mappedSchedule.speakers.length} speakers and ${mappedSchedule.agenda.length} agenda items from Pretalx fixture.`
    );
    return;
  }

  const result = await syncPretalxData({
    repoRoot,
    outputPaths: {
      cities: process.env.PRETALX_CITIES_OUTPUT,
      speakers: process.env.PRETALX_SPEAKERS_OUTPUT,
      agenda: process.env.PRETALX_AGENDA_OUTPUT,
    },
  });

  console.log(
    `Synced ${result.cities.length} events, ${result.speakers.length} speakers, and ${result.agenda.length} agenda items from Pretalx.`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
