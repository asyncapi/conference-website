import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  buildManifest,
  buildPublicId,
  parseAlbumName,
  planUploads,
  readAlbums,
} from './gallery.mjs';

test('derives album slug, title and year from a folder name', () => {
  assert.deepEqual(parseAlbumName('Bangalore 2025'), {
    slug: 'bangalore-2025',
    title: 'Bangalore 2025',
    year: 2025,
  });
  assert.deepEqual(parseAlbumName('  AsyncAPI  Conf Pics '), {
    slug: 'asyncapi-conf-pics',
    title: 'AsyncAPI Conf Pics',
    year: null,
  });
  assert.equal(parseAlbumName('São Paulo 2024').slug, 'sao-paulo-2024');
});

test('builds public ids inside the album folder', () => {
  assert.equal(
    buildPublicId('paris-2025', 'IMG_0042.JPG'),
    'conference-gallery/paris-2025/img-0042'
  );
  assert.equal(
    buildPublicId('paris-2025', join('Day 1', 'Keynote (1).jpeg')),
    'conference-gallery/paris-2025/day-1-keynote-1'
  );
});

test('plans uploads, skipping non-images and photos already uploaded', () => {
  const albums = [
    {
      slug: 'lagos-2025',
      title: 'Lagos 2025',
      dir: '/photos/Lagos 2025',
      files: ['b.jpg', 'a.png', 'talk.mp4', 'A.jpg', 'done.webp'],
    },
  ];

  const { uploads, skipped } = planUploads(
    albums,
    new Set(['conference-gallery/lagos-2025/done'])
  );

  assert.deepEqual(
    uploads.map((upload) => [upload.file, upload.publicId]),
    [
      ['A.jpg', 'conference-gallery/lagos-2025/a'],
      ['a.png', 'conference-gallery/lagos-2025/a-2'],
      ['b.jpg', 'conference-gallery/lagos-2025/b'],
    ]
  );
  assert.equal(uploads[0].filePath, join('/photos/Lagos 2025', 'A.jpg'));
  assert.deepEqual(
    skipped.map((item) => [item.file, item.reason]),
    [
      ['done.webp', 'already uploaded'],
      ['talk.mp4', 'not an image'],
    ]
  );
});

test('builds a manifest grouped by album, newest year first', () => {
  const manifest = buildManifest(
    [
      {
        public_id: 'conference-gallery/paris-2025/img-10',
        width: 2560,
        height: 1707,
      },
      {
        public_id: 'conference-gallery/paris-2025/img-2',
        width: 1707,
        height: 2560,
      },
      {
        public_id: 'conference-gallery/london-2026/stage',
        width: 2000,
        height: 1500,
      },
      {
        public_id: 'conference-gallery/asyncapi-conf-pics/group',
        width: 1200,
        height: 800,
      },
      { public_id: 'conference-gallery/loose-file', width: 1, height: 1 },
      { public_id: 'other-folder/paris-2025/img-1', width: 1, height: 1 },
    ],
    {
      cloudName: 'demo',
      titles: { 'asyncapi-conf-pics': 'AsyncAPI Conf Pics' },
    }
  );

  assert.deepEqual(manifest, {
    cloudName: 'demo',
    albums: [
      {
        slug: 'london-2026',
        title: 'London 2026',
        year: 2026,
        photos: [
          {
            publicId: 'conference-gallery/london-2026/stage',
            width: 2000,
            height: 1500,
          },
        ],
      },
      {
        slug: 'paris-2025',
        title: 'Paris 2025',
        year: 2025,
        photos: [
          {
            publicId: 'conference-gallery/paris-2025/img-2',
            width: 1707,
            height: 2560,
          },
          {
            publicId: 'conference-gallery/paris-2025/img-10',
            width: 2560,
            height: 1707,
          },
        ],
      },
      {
        slug: 'asyncapi-conf-pics',
        title: 'AsyncAPI Conf Pics',
        year: null,
        photos: [
          {
            publicId: 'conference-gallery/asyncapi-conf-pics/group',
            width: 1200,
            height: 800,
          },
        ],
      },
    ],
  });
});

test('reads albums from subfolders, including nested photos', async () => {
  const sourceDir = await mkdtemp(join(tmpdir(), 'gallery-'));

  try {
    await mkdir(join(sourceDir, 'Singapore 2025', 'Day 2'), {
      recursive: true,
    });
    await writeFile(join(sourceDir, 'Singapore 2025', 'one.jpg'), '');
    await writeFile(join(sourceDir, 'Singapore 2025', 'Day 2', 'two.jpg'), '');
    await writeFile(join(sourceDir, 'Singapore 2025', '.DS_Store'), '');
    await writeFile(join(sourceDir, 'stray.jpg'), '');

    const { albums, looseFiles } = await readAlbums(sourceDir);

    assert.deepEqual(looseFiles, ['stray.jpg']);
    assert.equal(albums.length, 1);
    assert.equal(albums[0].slug, 'singapore-2025');
    assert.deepEqual(albums[0].files.sort(), [
      join('Day 2', 'two.jpg'),
      'one.jpg',
    ]);
  } finally {
    await rm(sourceDir, { recursive: true, force: true });
  }
});
