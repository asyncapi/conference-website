const DEFAULT_PRETALX_BASE_URL = 'https://cfp.asyncapi.com';

const baseUrl = (
  process.env.NEXT_PUBLIC_PRETALX_BASE_URL || DEFAULT_PRETALX_BASE_URL
).replace(/\/+$/, '');
const defaultCfpPath =
  process.env.NEXT_PUBLIC_PRETALX_CFP_PATH?.replace(/^\/+|\/+$/g, '') ?? 'cfp';

export const pretalxConfig = {
  baseUrl,
  defaultCfpPath,
};

export function isPretalxConfigured(eventSlug?: string | null): boolean {
  return Boolean(pretalxConfig.baseUrl && cleanPathSegment(eventSlug));
}

export function getPretalxEventUrl(eventSlug?: string | null): string | null {
  const cleanEventSlug = cleanPathSegment(eventSlug);

  if (!isPretalxConfigured(cleanEventSlug)) {
    return null;
  }

  return `${pretalxConfig.baseUrl}/${cleanEventSlug}/`;
}

export function getPretalxCfpUrl(
  eventSlug?: string | null,
  cfpPath = defaultCfpPath
): string | null {
  const eventUrl = getPretalxEventUrl(eventSlug);
  const cleanCfpPath = cleanPathSegment(cfpPath);

  if (!eventUrl) {
    return null;
  }

  return `${eventUrl}${cleanCfpPath}`;
}

export function getPretalxPublicScheduleUrl(
  eventSlug?: string | null
): string | null {
  const eventUrl = getPretalxEventUrl(eventSlug);

  if (!eventUrl) {
    return null;
  }

  return `${eventUrl}schedule/`;
}

function cleanPathSegment(value?: string | null): string {
  return String(value || '').replace(/^\/+|\/+$/g, '');
}
