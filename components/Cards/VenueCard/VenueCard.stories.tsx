import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import Venue from './VenueCard';
import { City } from '../../../types/types';

const meta: Meta<typeof Venue> = {
  title: 'Components/Card/VenueCard',
  component: Venue,
  argTypes: {
    city: {
      control: { type: 'object' },
      description: 'City object containing venue information',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Venue>;

const upcomingCity: City = {
  name: 'Singapore',
  country: 'Singapore',
  date: '9 - 11 December, 2026',
  cfpDate: '5 October 2026',
  description: "Let's talk event-driven architecture at the AsyncAPI Conference in Singapore! Join the open-source community and learn how to speak fluent API.",
  img: '/img/locations/singapore.webp',
  address: 'Marina Bay Sands, Singapore',
  mapUrl: 'https://maps.app.goo.gl/9fG91E7Y24zmWSqP9',
  sponsors: {
    eventSponsors: [
      {
        image: '/img/logos/apidays.png',
        websiteUrl: 'https://www.apidays.global/'
      }
    ]
  },
  freeEntry: true,
  cfp: null,
  recordings: null,
  playlist: null
};

const pastEventCity: City = {
  name: 'London',
  country: 'UK',
  date: '24 September, 2023',
  cfpDate: '27 July 2023',
  description: 'API enthusiasts in London! Join the AsyncAPI Conference for deep dives into event-driven architecture and open-source collaboration.',
  img: '/img/locations/london.webp',
  address: '155 Bishopsgate, London EC2M 3YD',
  mapUrl: 'https://maps.app.goo.gl/b2Vb5H2mM41F9nQA6',
  sponsors: {
    eventSponsors: [
      {
        image: '/img/logos/apidays.png',
        websiteUrl: 'https://www.apidays.global/'
      }
    ]
  },
  freeEntry: true,
  cfp: null,
  recordings: 'https://youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS',
  playlist: 'https://youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS'
};

const cfpOpenCity: City = {
  name: 'Paris',
  country: 'France',
  date: '9 - 11 December, 2026',
  cfpDate: '5 October 2026',
  description: 'Join us at apidays Paris for the AsyncAPI Conference and explore event-driven architecture with the global open-source community',
  img: '/img/locations/paris.webp',
  address: 'CNIT (Centre des Nouvelles Industries et Technologies), Paris 2 Place de la Défense, 92092 Puteaux',
  mapUrl: 'https://maps.app.goo.gl/5te8WRM9Rb8B6vNd9',
  sponsors: {
    eventSponsors: [
      {
        image: '/img/logos/apidays.png',
        websiteUrl: 'https://www.apidays.global/'
      }
    ]
  },
  freeEntry: true,
  cfp: 'https://apidays.typeform.com/to/ILJeAaV8?typeform-source=www.apidays.global#event_name=xxxxx',
  recordings: null,
  playlist: null
};

export const UpcomingEvent: Story = {
  args: {
    city: upcomingCity,
  },
};

export const PastEvent: Story = {
  args: {
    city: pastEventCity,
  },
};

export const CFPOpen: Story = {
  args: {
    city: cfpOpenCity,
  },
};
