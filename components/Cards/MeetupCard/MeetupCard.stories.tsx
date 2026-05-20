import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import MeetupCard from './MeetupCard';

const meta: Meta<typeof MeetupCard> = {
  title: 'Components/Card/MeetupCard',
  component: MeetupCard,
  argTypes: {
    id: {
      control: { type: 'number' },
      description: 'Unique identifier for the meetup card',
    },
    label: {
      control: { type: 'text' },
      description: 'The title/label of the meetup card',
    },
    description: {
      control: { type: 'text' },
      description: 'Description of the meetup activity',
    },
    image: {
      control: { type: 'text' },
      description: 'Image URL for the card background',
    },
    color: {
      control: { type: 'color' },
      description: 'Gradient color overlay for the image',
    },
    isDesktop: {
      control: { type: 'boolean' },
      description: 'Toggle between desktop and mobile layouts',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MeetupCard>;

export const CreativeSessions: Story = {
  args: {
    id: 1,
    color: '#ff0088',
    label: 'Creative Sessions',
    description:
      'Engage in hands-on sessions designed to spark creativity, foster collaboration, and inspire new ways of thinking about event-driven systems.',
    image: '/img/meetup/creative-sessions.webp',
    isDesktop: true,
  },
};

export const SmallGroups: Story = {
  args: {
    id: 2,
    color: '#dd00ee',
    label: 'Small Groups',
    description:
      'Work in intimate groups to maximize learning, encourage open discussions, and ensure everyone has a chance to contribute their ideas and experiences.',
    image: '/img/meetup/small-groups.webp',
    isDesktop: true,
  },
};

export const RealConnections: Story = {
  args: {
    id: 3,
    color: '#9911ff',
    label: 'Real Connections',
    description:
      'Build meaningful relationships with fellow community members, exchange knowledge, and discover potential collaborations that go beyond the meetup.',
    image: '/img/meetup/real-connections.webp',
    isDesktop: true,
  },
};

export const Surprises: Story = {
  args: {
    id: 4,
    color: '#0d63f8',
    label: 'Surprises',
    description:
      'Experience unexpected moments, fun activities, and special announcements that make each meetup unique and memorable.',
    image: '/img/meetup/surprises.webp',
    isDesktop: true,
  },
};

export const OptionalChallenges: Story = {
  args: {
    id: 5,
    color: '#0cdcf7',
    label: 'Optional Challenges',
    description:
      'Participate in optional challenges designed to test your skills, encourage creative problem-solving, and push the boundaries of what you can achieve.',
    image: '/img/meetup/optional.webp',
    isDesktop: true,
  },
};

export const MobileLayout: Story = {
  args: {
    id: 1,
    color: '#ff0088',
    label: 'Creative Sessions',
    description:
      'Engage in hands-on sessions designed to spark creativity, foster collaboration, and inspire new ways of thinking about event-driven systems.',
    image: '/img/meetup/creative-sessions.webp',
    isDesktop: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <MeetupCard
        id={1}
        color="#ff0088"
        label="Creative Sessions"
        description="Engage in hands-on sessions designed to spark creativity, foster collaboration, and inspire new ways of thinking about event-driven systems."
        image="/img/meetup/creative-sessions.webp"
        isDesktop={true}
      />
      <MeetupCard
        id={2}
        color="#dd00ee"
        label="Small Groups"
        description="Work in intimate groups to maximize learning, encourage open discussions, and ensure everyone has a chance to contribute their ideas and experiences."
        image="/img/meetup/small-groups.webp"
        isDesktop={true}
      />
      <MeetupCard
        id={3}
        color="#9911ff"
        label="Real Connections"
        description="Build meaningful relationships with fellow community members, exchange knowledge, and discover potential collaborations that go beyond the meetup."
        image="/img/meetup/real-connections.webp"
        isDesktop={true}
      />
    </div>
  ),
};
