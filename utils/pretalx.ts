import { getPretalxCfpUrl } from '../config/pretalx';
import { CfpConfig } from '../types/types';

export const PRETALX_CFP_REF = 'pretalx';

export function resolveCfpUrl(cfp?: CfpConfig): string | null {
  if (!cfp) {
    return null;
  }

  if (typeof cfp === 'string') {
    return cfp === PRETALX_CFP_REF ? null : cfp;
  }

  if (cfp.provider === 'pretalx') {
    return getPretalxCfpUrl(cfp.eventSlug, cfp.path);
  }

  return null;
}

export function isExternalUrl(url?: string | null): boolean {
  return Boolean(url?.startsWith('http://') || url?.startsWith('https://'));
}
