import { City } from '../types/types';
import { isCfpDeadlinePassed } from './cfp-deadline';
import { resolveCfpUrl } from './pretalx';

export function getVenueDisplayName(city: City): string {
  return city.name === 'Online' ? city.name : `${city.name}, ${city.country}`;
}

export function getVenuePageUrl(city: City): string {
  return `/venue/${encodeURIComponent(city.name)}`;
}

export function hasOpenCfp(city: City): boolean {
  const cfpUrl = resolveCfpUrl(city.cfp);

  return Boolean(cfpUrl && !isCfpDeadlinePassed(city.cfpDate));
}

export function getOpenCfpVenues(cities: City[]): City[] {
  return cities.filter(hasOpenCfp);
}
