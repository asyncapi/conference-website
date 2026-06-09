import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  mapPretalxEventsToCities,
  mapPretalxSchedule,
  mergePretalxSchedules,
  readJson,
  syncPretalxData,
  writeJson,
} from './sync-pretalx-schedule.mjs';

test('maps public Pretalx events into generated website cities', async () => {
  const events = JSON.parse(
    await readFile(new URL('./fixtures/pretalx-events.json', import.meta.url))
  );

  const cities = mapPretalxEventsToCities(events, {
    baseUrl: 'https://pretalx.test',
  });

  assert.deepEqual(
    cities.map((city) => ({
      name: city.name,
      country: city.country,
      date: city.date,
      mapUrl: city.mapUrl,
      eventSlug: city.cfp.eventSlug,
    })),
    [
      {
        name: 'Europe',
        country: 'TBA',
        date: '5 - 6 November, 2026',
        mapUrl: 'https://pretalx.test/asyncapi-europe-2026/',
        eventSlug: 'asyncapi-europe-2026',
      },
      {
        name: 'Online',
        country: ' Edition',
        date: '28 October, 2026',
        mapUrl: 'https://pretalx.test/asyncapi-online-2026/',
        eventSlug: 'asyncapi-online-2026',
      },
      {
        name: 'India',
        country: 'TBA',
        date: '22 - 23 August, 2026',
        mapUrl: 'https://pretalx.test/asyncapi-india-2026/',
        eventSlug: 'asyncapi-india-2026',
      },
      {
        name: 'US',
        country: 'TBA',
        date: '17 - 20 June, 2026',
        mapUrl: 'https://pretalx.test/asyncapi-us-conf-2026/',
        eventSlug: 'asyncapi-us-conf-2026',
      },
      {
        name: 'Democonf',
        country: 'TBA',
        date: '2 - 4 June, 2026',
        mapUrl: 'https://pretalx.test/democonf/',
        eventSlug: 'democonf',
      },
    ]
  );

  assert.deepEqual(cities[0], {
    name: 'Europe',
    country: 'TBA',
    date: '5 - 6 November, 2026',
    cfpDate: 'Not announced yet',
    description:
      'Join us for AsyncAPI Conf Europe 2026. CFP and schedule data are managed in Pretalx.',
    img: '/img/locations/teasers.webp',
    address: 'Pretalx event page',
    mapUrl: 'https://pretalx.test/asyncapi-europe-2026/',
    sponsors: {
      eventSponsors: [],
    },
    freeEntry: true,
    cfp: {
      provider: 'pretalx',
      eventSlug: 'asyncapi-europe-2026',
    },
    recordings: null,
    playlist: null,
  });
});

test('maps Pretalx event metadata into website cities', async () => {
  const events = JSON.parse(
    await readFile(new URL('./fixtures/pretalx-events.json', import.meta.url))
  );

  const cities = mapPretalxEventsToCities(events, {
    baseUrl: 'https://pretalx.test',
    metadataBySlug: new Map([
      [
        'asyncapi-us-conf-2026',
        {
          cfp: {
            opening: '2026-06-01T00:00:00+00:00',
            deadline: '2026-06-10T23:59:00+00:00',
            is_open: false,
          },
          location: {
            city: 'New York',
            country: 'United States',
            address: 'Javits Center, New York',
            map_url: 'https://maps.example.com/new-york',
            image_url: 'https://pretalx.test/media/event-new-york.webp',
          },
        },
      ],
    ]),
  });

  assert.deepEqual(
    cities.find((city) => city.cfp.eventSlug === 'asyncapi-us-conf-2026'),
    {
      name: 'New York',
      country: 'United States',
      date: '17 - 20 June, 2026',
      cfpDate: '10 June, 2026',
      description:
        'Join us for AsyncAPI US Conf. CFP and schedule data are managed in Pretalx.',
      img: 'https://pretalx.test/media/event-new-york.webp',
      address: 'Javits Center, New York',
      mapUrl: 'https://maps.example.com/new-york',
      sponsors: {
        eventSponsors: [],
      },
      freeEntry: true,
      cfp: {
        provider: 'pretalx',
        eventSlug: 'asyncapi-us-conf-2026',
      },
      recordings: null,
      playlist: null,
    }
  );
});

test('maps expanded Pretalx schedule slots into website speakers and agenda', async () => {
  const fixture = JSON.parse(
    await readFile(
      new URL('./fixtures/pretalx-schedule-latest.json', import.meta.url)
    )
  );

  const result = mapPretalxSchedule(fixture, { city: 'Online' });

  assert.deepEqual(result.speakers, [
    {
      id: 1,
      name: 'Thulie Sibasanda',
      title: 'Hello this is a test bio.',
      img: 'http://localhost:8346/media/avatars/GUKSGV_ASOxI1D.webp',
      city: ['Online'],
    },
  ]);

  assert.deepEqual(result.agenda, [
    {
      time: '09:30 - 10:00 UTC',
      session: 'Test Proposal',
      speaker: 1,
      type: 'Talk',
      city: 'Online',
      day: 'Thursday, June 18, 2026',
    },
  ]);
});

test('writeJson creates missing parent directories', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'pretalx-sync-'));
  const outputPath = join(directory, 'nested', 'speakers.json');

  try {
    await writeJson(outputPath, [{ name: 'Alice Example' }]);

    assert.deepEqual(await readJson(outputPath), [{ name: 'Alice Example' }]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('merges multiple Pretalx schedules without speaker id collisions', async () => {
  const fixture = JSON.parse(
    await readFile(
      new URL('./fixtures/pretalx-schedule-latest.json', import.meta.url)
    )
  );

  const result = mergePretalxSchedules([
    mapPretalxSchedule(fixture, { city: 'Online' }),
    mapPretalxSchedule(fixture, { city: 'Paris' }),
  ]);

  assert.equal(result.speakers.length, 2);
  assert.deepEqual(
    result.speakers.map((speaker) => speaker.id),
    [1, 2]
  );
  assert.deepEqual(result.agenda[0].speaker, 1);
  assert.deepEqual(result.agenda[1].speaker, 2);
  assert.equal(result.agenda[1].city, 'Paris');
});

test('syncPretalxData writes generated Pretalx data under config/pretalx', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'pretalx-sync-'));
  const events = JSON.parse(
    await readFile(new URL('./fixtures/pretalx-events.json', import.meta.url))
  );
  const schedule = JSON.parse(
    await readFile(
      new URL('./fixtures/pretalx-schedule-latest.json', import.meta.url)
    )
  );

  const fetchImpl = async (url, init) => {
    assert.equal(init.headers.Authorization, 'Token secret-token');

    const parsedUrl = new URL(url);

    if (parsedUrl.pathname === '/api/events/') {
      assert.equal(parsedUrl.searchParams.get('is_public'), 'true');
      return jsonResponse(events);
    }

    if (parsedUrl.pathname.endsWith('/p/asyncapi-cfp/event-info/')) {
      if (
        parsedUrl.pathname !==
        '/api/events/asyncapi-us-conf-2026/p/asyncapi-cfp/event-info/'
      ) {
        return notFoundResponse();
      }

      return jsonResponse({
        event: 'asyncapi-us-conf-2026',
        cfp: {
          opening: '2026-06-01T00:00:00+00:00',
          deadline: '2026-06-10T23:59:00+00:00',
          is_open: false,
        },
        location: {
          city: 'New York',
          country: 'United States',
          address: 'Javits Center, New York',
          map_url: 'https://maps.example.com/new-york',
          image_url: 'https://pretalx.test/media/event-new-york.webp',
        },
      });
    }

    if (parsedUrl.pathname.endsWith('/schedules/latest/')) {
      assert.deepEqual(parsedUrl.searchParams.getAll('expand'), [
        'slots.submission.speakers',
        'slots.submission.submission_type',
        'slots.submission.track',
      ]);

      if (
        parsedUrl.pathname ===
        '/api/events/asyncapi-us-conf-2026/schedules/latest/'
      ) {
        return jsonResponse(schedule);
      }

      return notFoundResponse();
    }

    throw new Error(`Unexpected URL ${url}`);
  };

  try {
    const result = await syncPretalxData({
      repoRoot: directory,
      baseUrl: 'https://pretalx.test',
      apiToken: 'secret-token',
      fetchImpl,
    });

    assert.equal(result.cities.length, 5);
    assert.equal(result.speakers.length, 1);
    assert.equal(result.agenda.length, 1);
    assert.equal(result.cities[3].name, 'New York');
    assert.equal(
      result.cities[3].img,
      'https://pretalx.test/media/event-new-york.webp'
    );

    assert.deepEqual(
      await readJson(join(directory, 'config/pretalx/city-lists.json')),
      result.cities
    );
    assert.deepEqual(
      await readJson(join(directory, 'config/pretalx/speakers.json')),
      result.speakers
    );
    assert.deepEqual(
      await readJson(join(directory, 'config/pretalx/agenda.json')),
      result.agenda
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

function jsonResponse(body) {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
  };
}

function notFoundResponse() {
  return {
    ok: false,
    status: 404,
    statusText: 'Not Found',
    json: async () => ({}),
  };
}
