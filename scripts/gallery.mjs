import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const GALLERY_ROOT = 'conference-gallery';
const MANIFEST_PATH = 'config/gallery.json';
const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.tif',
  '.tiff',
  '.heic',
  '.heif',
]);
// Keeps uploads well under Cloudinary's per-image size limit on the free plan.
const MAX_DIMENSION = 2560;
const JPEG_QUALITY = 85;
const UPLOAD_CONCURRENCY = 4;

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

export async function writeJson(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function yearFromSlug(slug) {
  const match = String(slug || '').match(/(?:^|-)((?:19|20)\d{2})(?:-|$)/);
  return match ? Number(match[1]) : null;
}

export function titleFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseAlbumName(folderName) {
  const title = String(folderName || '')
    .replace(/\s+/g, ' ')
    .trim();
  const slug = slugify(title);

  return { slug, title, year: yearFromSlug(slug) };
}

export function buildPublicId(albumSlug, relativeFilePath) {
  const parsed = path.parse(relativeFilePath);
  const fileSlug = slugify(path.join(parsed.dir, parsed.name)) || 'photo';

  return `${GALLERY_ROOT}/${albumSlug}/${fileSlug}`;
}

/**
 * Turns the files found on disk into upload jobs, skipping anything that is
 * not an image or is already in Cloudinary.
 */
export function planUploads(albums, existingPublicIds = new Set()) {
  const uploads = [];
  const skipped = [];
  const planned = new Set();

  for (const album of albums) {
    const files = [...album.files].sort((a, b) =>
      a.localeCompare(b, 'en', { numeric: true })
    );

    for (const file of files) {
      const extension = path.extname(file).toLowerCase();

      if (!IMAGE_EXTENSIONS.has(extension)) {
        skipped.push({ album: album.title, file, reason: 'not an image' });
        continue;
      }

      const basePublicId = buildPublicId(album.slug, file);
      let publicId = basePublicId;

      for (let suffix = 2; planned.has(publicId); suffix += 1) {
        publicId = `${basePublicId}-${suffix}`;
      }
      planned.add(publicId);

      if (existingPublicIds.has(publicId)) {
        skipped.push({ album: album.title, file, reason: 'already uploaded' });
        continue;
      }

      uploads.push({
        album: album.title,
        albumSlug: album.slug,
        file,
        filePath: path.join(album.dir, file),
        publicId,
      });
    }
  }

  return { uploads, skipped };
}

/**
 * Builds the manifest the website reads from a Cloudinary resource listing.
 * Album titles come from `titles` (slug -> title) when known, so a title
 * edited by hand in the manifest survives the next sync.
 */
export function buildManifest(resources, options = {}) {
  const titles = options.titles || {};
  const albumsBySlug = new Map();

  for (const resource of resources || []) {
    const [root, albumSlug, ...rest] = String(resource.public_id || '').split(
      '/'
    );

    if (root !== GALLERY_ROOT || !albumSlug || rest.length === 0) {
      continue;
    }

    if (!albumsBySlug.has(albumSlug)) {
      albumsBySlug.set(albumSlug, {
        slug: albumSlug,
        title: titles[albumSlug] || titleFromSlug(albumSlug),
        year: yearFromSlug(albumSlug),
        photos: [],
      });
    }

    albumsBySlug.get(albumSlug).photos.push({
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
    });
  }

  const albums = [...albumsBySlug.values()]
    .map((album) => ({
      ...album,
      photos: album.photos.sort((a, b) =>
        a.publicId.localeCompare(b.publicId, 'en', { numeric: true })
      ),
    }))
    .sort(
      (a, b) =>
        (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title, 'en')
    );

  return { cloudName: options.cloudName || '', albums };
}

async function listFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath, base)));
    } else if (entry.isFile()) {
      files.push(path.relative(base, entryPath));
    }
  }

  return files;
}

export async function readAlbums(sourceDir) {
  const entries = await readdir(sourceDir, { withFileTypes: true });
  const albums = [];
  const looseFiles = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }

    if (!entry.isDirectory()) {
      looseFiles.push(entry.name);
      continue;
    }

    const album = parseAlbumName(entry.name);

    if (!album.slug) {
      continue;
    }

    const dir = path.join(sourceDir, entry.name);
    albums.push({ ...album, dir, files: await listFiles(dir) });
  }

  return { albums, looseFiles };
}

async function loadCloudinaryUrl(repoRoot) {
  if (process.env.CLOUDINARY_URL) {
    return;
  }

  for (const fileName of ['.env.local', '.env']) {
    try {
      const content = await readFile(path.join(repoRoot, fileName), 'utf8');
      const match = content.match(/^\s*CLOUDINARY_URL\s*=\s*(.+?)\s*$/m);

      if (match) {
        process.env.CLOUDINARY_URL = match[1].replace(/^["']|["']$/g, '');
        return;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
}

async function getCloudinary(repoRoot) {
  await loadCloudinaryUrl(repoRoot);

  const { v2: cloudinary } = await import('cloudinary');
  const config = cloudinary.config(true);

  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error(
      'Cloudinary credentials are missing. Set CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name> in .env.local (see example.env.local).'
    );
  }

  return cloudinary;
}

async function listGalleryResources(cloudinary) {
  const resources = [];
  let nextCursor;

  do {
    const page = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix: `${GALLERY_ROOT}/`,
      max_results: 500,
      next_cursor: nextCursor,
    });

    resources.push(...page.resources);
    nextCursor = page.next_cursor;
  } while (nextCursor);

  return resources;
}

const HEIC_EXTENSIONS = new Set(['.heic', '.heif']);

async function decodeHeic(filePath) {
  const { default: convert } = await import('heic-convert');

  return Buffer.from(
    await convert({
      buffer: await readFile(filePath),
      format: 'JPEG',
      quality: 1,
    })
  );
}

async function prepareImage(sharp, filePath) {
  // sharp's prebuilt binaries cannot read the HEVC-encoded HEIC files that
  // phones produce, so those are decoded separately first.
  const input = HEIC_EXTENSIONS.has(path.extname(filePath).toLowerCase())
    ? await decodeHeic(filePath)
    : filePath;

  // Re-encoding also drops EXIF data, including any GPS location.
  return sharp(input)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
}

function uploadBuffer(cloudinary, buffer, upload) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: upload.publicId,
          asset_folder: `${GALLERY_ROOT}/${upload.albumSlug}`,
          resource_type: 'image',
          overwrite: false,
        },
        (error, result) => (error ? reject(error) : resolve(result))
      )
      .end(buffer);
  });
}

async function runPool(items, concurrency, worker) {
  let index = 0;

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (index < items.length) {
        const item = items[index];
        index += 1;
        await worker(item);
      }
    })
  );
}

function printSkipped(skipped) {
  const worthReporting = skipped.filter(
    (item) => item.reason !== 'already uploaded'
  );

  if (worthReporting.length === 0) {
    return;
  }

  console.log(`\nSkipped ${worthReporting.length} file(s):`);
  for (const item of worthReporting) {
    console.log(`  ${item.album}/${item.file} (${item.reason})`);
  }
}

export async function syncGallery({ repoRoot, cloudinary, titles = {} }) {
  const manifestPath = path.resolve(repoRoot, MANIFEST_PATH);
  let previousTitles = {};

  try {
    const previous = await readJson(manifestPath);
    previousTitles = Object.fromEntries(
      (previous.albums || []).map((album) => [album.slug, album.title])
    );
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const resources = await listGalleryResources(cloudinary);
  const manifest = buildManifest(resources, {
    cloudName: cloudinary.config().cloud_name,
    titles: { ...titles, ...previousTitles },
  });

  await writeJson(manifestPath, manifest);

  return manifest;
}

export async function uploadGallery({
  repoRoot,
  sourceDir,
  cloudinary,
  dryRun = false,
}) {
  const { albums, looseFiles } = await readAlbums(sourceDir);

  if (looseFiles.length > 0) {
    console.log(
      `Ignoring ${looseFiles.length} file(s) directly inside ${sourceDir}: photos must be in a folder named after their album.`
    );
  }

  if (dryRun) {
    const { uploads, skipped } = planUploads(albums);

    for (const album of albums) {
      const count = uploads.filter(
        (upload) => upload.albumSlug === album.slug
      ).length;
      console.log(
        `${album.title} -> ${GALLERY_ROOT}/${album.slug} (${count} image(s))`
      );
    }
    printSkipped(skipped);
    console.log('\nDry run: nothing was uploaded.');
    return null;
  }

  const { default: sharp } = await import('sharp');
  const existing = await listGalleryResources(cloudinary);
  const { uploads, skipped } = planUploads(
    albums,
    new Set(existing.map((resource) => resource.public_id))
  );
  let uploaded = 0;

  await runPool(uploads, UPLOAD_CONCURRENCY, async (upload) => {
    try {
      const buffer = await prepareImage(sharp, upload.filePath);
      await uploadBuffer(cloudinary, buffer, upload);
      uploaded += 1;
      console.log(`[${uploaded}/${uploads.length}] ${upload.publicId}`);
    } catch (error) {
      skipped.push({
        album: upload.album,
        file: upload.file,
        reason: error.message || String(error),
      });
    }
  });

  const alreadyUploaded = skipped.filter(
    (item) => item.reason === 'already uploaded'
  ).length;
  console.log(
    `\nUploaded ${uploaded} image(s); ${alreadyUploaded} were already in Cloudinary.`
  );
  printSkipped(skipped);

  return syncGallery({
    repoRoot,
    cloudinary,
    titles: Object.fromEntries(
      albums.map((album) => [album.slug, album.title])
    ),
  });
}

function printManifestSummary(manifest) {
  const photoCount = manifest.albums.reduce(
    (total, album) => total + album.photos.length,
    0
  );

  console.log(
    `Wrote ${MANIFEST_PATH}: ${manifest.albums.length} album(s), ${photoCount} photo(s).`
  );
}

async function main() {
  const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
  );
  const [command, ...rest] = process.argv.slice(2);
  const dryRun = rest.includes('--dry-run');
  const [sourceDir] = rest.filter((arg) => !arg.startsWith('--'));

  if (command === 'upload' && sourceDir) {
    const manifest = await uploadGallery({
      repoRoot,
      sourceDir: path.resolve(sourceDir),
      cloudinary: dryRun ? null : await getCloudinary(repoRoot),
      dryRun,
    });

    if (manifest) {
      printManifestSummary(manifest);
    }
    return;
  }

  if (command === 'sync') {
    const cloudinary = await getCloudinary(repoRoot);
    printManifestSummary(await syncGallery({ repoRoot, cloudinary }));
    return;
  }

  throw new Error(
    'Usage:\n  npm run gallery:upload -- <photos-dir> [--dry-run]\n  npm run gallery:sync'
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    // Cloudinary's Admin API rejects with { error: { message } }.
    console.error(error.message || error.error?.message || error);
    process.exit(1);
  });
}
