import linksJson from './links.json';
import { cities } from './conference-data';
import { LinkItem } from '../types/types';
import { getEventStatus } from '../utils/status';

export const links: LinkItem[] = (linksJson as LinkItem[]).map((link) => {
  if (link.title !== 'Venue') {
    return link;
  }

  return {
    ...link,
    subMenu: cities.map((city) => ({
      title:
        city.name === 'Online' ? city.name : `${city.name}, ${city.country}`,
      ref: `/venue/${encodeURIComponent(city.name)}`,
      status: getEventStatus(city.date),
    })),
  };
});
