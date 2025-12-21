import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import Speaker from './SpeakerCard';

const meta: Meta<typeof Speaker> = {
  title: 'Components/Card/SpeakerCard',
  component: Speaker,
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Speaker name',
    },
    title: {
      control: { type: 'text' },
      description: 'Speaker job title',
    },
    image: {
      control: { type: 'text' },
      description: 'Speaker image URL',
    },
    location: {
      control: { type: 'text' },
      description: 'Speaker location',
    }
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Speaker>;

export const Default: Story = {
  args: {
    name: 'Łukasz Górnicki',
    title: 'Open Source Fanatic at BrainFart',
    image: '/img/speaker-images/online-conf/Lukasz.webp',
    location: 'Bangalore',
  },
};

export const WithoutLocation: Story = {
  args: {
    name: 'Łukasz Górnicki',
    title: 'Open Source Fanatic at BrainFart',
    image: '/img/speaker-images/online-conf/Lukasz.webp',
  },
};

export const LongName: Story = {
  args: {
    name: 'Łukasz Górnicki',
    title: 'Open Source Fanatic at BrainFart',
    image: '/img/speaker-images/online-conf/Lukasz.webp',
    location: 'San Francisco',
  },
};
