import { GalleryAlbum, GalleryPhoto } from '../../types/types';

// Photos live in Cloudinary under one root folder, with one sub-folder per
// event (for example `conference-gallery/london-2026`). Maintainers upload
// photos with the Cloudinary console; this module only reads what is there.

const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1';
const DEFAULT_ROOT_FOLDER = 'conference-gallery';
const MAX_RESULTS = 500; // Cloudinary's maximum per search request.

export const GALLERY_REVALIDATE_SECONDS = 60 * 60;

interface GalleryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  rootFolder: string;
}

interface SearchResource {
  public_id: string;
  width: number;
  height: number;
  asset_folder?: string;
  folder?: string;
  filename?: string;
  display_name?: string;
}

interface SearchResponse {
  resources: SearchResource[];
  next_cursor?: string;
}

export interface GalleryData {
  cloudName: string;
  albums: GalleryAlbum[];
}

const EMPTY_GALLERY: GalleryData = { cloudName: '', albums: [] };

// Accepts either the single `CLOUDINARY_URL` shown on the Cloudinary
// dashboard (cloudinary://<api_key>:<api_secret>@<cloud_name>) or the three
// separate variables.
export const getGalleryConfig = (): GalleryConfig | null => {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;
  const rootFolder = (
    process.env.CLOUDINARY_GALLERY_FOLDER || DEFAULT_ROOT_FOLDER
  ).replace(/^\/+|\/+$/g, '');

  if (process.env.CLOUDINARY_URL) {
    try {
      const url = new URL(process.env.CLOUDINARY_URL);

      cloudName ||= url.hostname;
      apiKey ||= decodeURIComponent(url.username);
      apiSecret ||= decodeURIComponent(url.password);
    } catch {
      // Fall through to the separate variables.
    }
  }

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret, rootFolder };
};

// `london-2026` -> `London 2026`
export const folderToTitle = (folder: string): string =>
  folder
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// `london-2026` -> 2026, `online` -> null
export const folderToYear = (folder: string): number | null => {
  const match = folder.match(/\b(19|20)\d{2}\b/);

  return match ? Number(match[0]) : null;
};

const albumSlugOf = (
  resource: SearchResource,
  rootFolder: string
): string | null => {
  // Dynamic folder mode reports `asset_folder`; the legacy fixed folder mode
  // reports `folder`. Fall back to the public ID path for safety.
  const folder =
    resource.asset_folder ??
    resource.folder ??
    resource.public_id.split('/').slice(0, -1).join('/');
  const prefix = `${rootFolder}/`;

  if (!folder.startsWith(prefix)) {
    return null;
  }

  // Only the first level below the root is an album; deeper folders are
  // flattened into it.
  return folder.slice(prefix.length).split('/')[0] || null;
};

const photoName = (resource: SearchResource): string =>
  resource.display_name ?? resource.filename ?? resource.public_id;

export const groupIntoAlbums = (
  resources: SearchResource[],
  rootFolder: string
): GalleryAlbum[] => {
  const albums = new Map<string, GalleryAlbum>();
  const names = new Map<string, string>();

  for (const resource of resources) {
    const slug = albumSlugOf(resource, rootFolder);

    if (!slug || !resource.width || !resource.height) {
      continue;
    }

    const album = albums.get(slug) ?? {
      slug,
      title: folderToTitle(slug),
      year: folderToYear(slug),
      photos: [],
    };
    const photo: GalleryPhoto = {
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
    };

    album.photos.push(photo);
    albums.set(slug, album);
    names.set(resource.public_id, photoName(resource));
  }

  const byName = (a: GalleryPhoto, b: GalleryPhoto): number =>
    (names.get(a.publicId) ?? '').localeCompare(
      names.get(b.publicId) ?? '',
      undefined,
      { numeric: true }
    );

  return Array.from(albums.values())
    .map((album) => ({ ...album, photos: album.photos.sort(byName) }))
    .sort(
      (a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title)
    );
};

const search = async (
  config: GalleryConfig,
  expression: string
): Promise<SearchResource[]> => {
  const auth = Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString(
    'base64'
  );
  const resources: SearchResource[] = [];
  let nextCursor: string | undefined;

  do {
    const params = new URLSearchParams({
      expression,
      max_results: String(MAX_RESULTS),
    });

    if (nextCursor) {
      params.set('next_cursor', nextCursor);
    }

    const response = await fetch(
      `${CLOUDINARY_API}/${config.cloudName}/resources/search?${params}`,
      {
        headers: { Authorization: `Basic ${auth}` },
        next: { revalidate: GALLERY_REVALIDATE_SECONDS },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Cloudinary search failed (${response.status}): ${await response.text()}`
      );
    }

    const data = (await response.json()) as SearchResponse;

    resources.push(...data.resources);
    nextCursor = data.next_cursor;
  } while (nextCursor);

  return resources;
};

export const fetchGallery = async (): Promise<GalleryData> => {
  const config = getGalleryConfig();

  if (!config) {
    return EMPTY_GALLERY;
  }

  // Product environments use either dynamic folders (`asset_folder`) or the
  // legacy fixed folders (`folder`). Depending on the mode, the other field
  // is either rejected or silently matches nothing, so try both.
  const expressions = [
    `resource_type:image AND asset_folder:${config.rootFolder}/*`,
    `resource_type:image AND folder:${config.rootFolder}/*`,
  ];
  let lastError: unknown;

  for (const expression of expressions) {
    try {
      const resources = await search(config, expression);

      if (resources.length === 0) {
        continue;
      }

      return {
        cloudName: config.cloudName,
        albums: groupIntoAlbums(resources, config.rootFolder),
      };
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) {
    console.error('Could not load gallery photos from Cloudinary:', lastError);
  }

  return { cloudName: config.cloudName, albums: [] };
};
