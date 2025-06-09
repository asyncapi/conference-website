export interface SVGTypes {
  className?: string;
  fill?: string;
}

export interface LinkItem {
  title: string;
  ref: string;
  subMenu?: LinkItem[];
}

export interface EventSponsor {
  image: string;
  websiteUrl: string;
}

export interface Sponsors {
  eventSponsors: EventSponsor[];
}

export interface City {
  name: string;
  country: string;
  date: string;
  cfpDate: string;
  description: string;
  img: string;
  address: string;
  mapUrl: string | undefined;
  sponsors: Sponsors;
  freeEntry: boolean;
  cfp: string | null;
  recordings: string | null;
  playlist: string | null;
}

export enum ConferenceStatus {
  UPCOMING = 'Upcoming',
  ONGOING = 'Ongoing',
  ENDED = 'Ended',
}

export interface SpeakerTypes {
  name: string;
  title: string;
  img: string;
  id: number;
  city: string[];
}

export interface Agenda {
  time: string;
  session: string;
  speaker: number;
}

export interface Ticket {
  id: number;
  type: string;
  price: number;
  url: string | null;
  description: string;
  status: string;
  available: number;
  eventDate: string;
  benefits: string[];
}
