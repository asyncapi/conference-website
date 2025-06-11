import React from 'react';

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

export interface Speaker {
  name: string;
  title: string;
  img: string;
  id: number;
  city: string[];
}

export interface Agenda {
  time: string;
  session: string;
  speaker: number | number[];
  type: string;
  city: string;
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

export interface ExtendedCity extends City {
  speakers: Speaker[];
  agenda: Agenda[];
  ticket?: Ticket;
}

export interface Social {
  name: string;
  href: string;
  imgUrl: string;
}

export interface CfpForm {
  Fullname: string;
  Email: string;
  Bio: string;
  Social: string;
  Title: string;
  Description: string;
  Format: string;
  Level: string;
  AdditionalInfo: string;
}

export interface CfpStepProps {
  setStep: (e: React.FormEvent<HTMLFormElement> | null, step: number) => void;
  setForm: React.Dispatch<React.SetStateAction<Partial<CfpForm>>>;
  data: Partial<CfpForm>;
}

export interface SelectOptions {
  value: string;
  label: string;
}

export type FaqTypes = {
  q: string;
  a: string;
};
