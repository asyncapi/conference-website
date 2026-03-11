import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import PastEditionCard from './PastEditionCard';

const meta: Meta<typeof PastEditionCard> = {
  title: 'Components/Card/PastEditionCard',
  component: PastEditionCard,
  argTypes: {
    url: {
      control: { type: 'text' },
      description: 'URL of the past edition website.',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PastEditionCard>;

export const Default: Story = {
  args: {
    url: 'https://conference.2023.asyncapi.com/',
  },
};
