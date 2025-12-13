import type { Meta } from '@storybook/nextjs';
import React from 'react';

import Speaker from './SpeakerCard';
import { Speaker as SpeakerTypes } from '../../../types/types';

const meta: Meta = {
  title: 'Components/Card/SpeakerCard',
  component: Speaker,
  argTypes: {
    speakerName: {
      control: { type: 'text' },
      description: 'Speaker name',
    },
    speakerTitle: {
      control: { type: 'text' },
      description: 'Speaker job title',
    },
    speakerImage: {
      control: { type: 'text' },
      description: 'Speaker image URL',
    },
    hasLocation: {
      control: { type: 'boolean' },
      description: 'Toggle to show/hide location',
    },
    locationText: {
      control: { type: 'text' },
      description: 'Location text to display',
      if: { arg: 'hasLocation', eq: true },
    }
  },
  decorators: [
    (Story) => (
      <div >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryArgs = {
  speakerName: string;
  speakerTitle: string;
  speakerImage: string;
  hasLocation: boolean;
  locationText: string;
};

export const Default = {
  args: {
    speakerName: 'Łukasz Górnicki',
    speakerTitle: 'Open Source Fanatic at BrainFart',
    speakerImage: '/img/speaker-images/online-conf/Lukasz.webp',
    hasLocation: true,
    locationText: 'Bangalore',
  },
  render: ({ speakerName, speakerTitle, speakerImage, hasLocation, locationText }: StoryArgs) => {
    const speakerDetails: SpeakerTypes = {
      name: speakerName,
      title: speakerTitle,
      img: speakerImage,
      id: 1,
      city: ['Bangalore']
    };

    return (
      <Speaker
        details={speakerDetails}
        location={hasLocation ? locationText : undefined}
      />
    );
  },
};
