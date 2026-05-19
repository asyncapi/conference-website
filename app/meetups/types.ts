import { MeetupCardProps } from '../../components/Cards/MeetupCard';

export interface VenueCity {
  name: string;
}

export interface Venue {
  country: string;
  cities: VenueCity[];
}

export interface MeetupItem extends MeetupCardProps {}

export interface HostingStep {
  title: string;
  description: string;
}
