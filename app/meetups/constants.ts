import { MeetupItem, HostingStep } from './types';

export const ITEM_WIDTH = 400;
export const GAP = 30;

export const HOSTING_STEPS: HostingStep[] = [
  {
    title: 'Open a Discussion',
    description:
      'Start a discussion thread on the conference-website outlining your meetup proposal. Tag the @asyncapi/conference_coordination_wg members.',
  },
  {
    title: 'Share on Slack',
    description:
      'After opening the discussion with the details of your meetup, share your proposal in the #wg-conference-coordination Slack channel. It will help gather feedback and support from community members.',
  },
  {
    title: 'Coordinate with the Working Group',
    description:
      'Start a discussion thread on the conference-website outlining your meetup proposal. Tag the @asyncapi/conference_coordination_wg members.',
  },
  {
    title: 'Talk about it in Community Meeting',
    description:
      'Make it an agenda in the community meeting that happens bi-weekly to gather interest of community members.',
  },
];

export const MEETUP_ITEMS: MeetupItem[] = [
  {
    id: 1,
    color: '#ff0088',
    label: 'Creative Sessions',
    description:
      'Engage in hands-on sessions designed to spark creativity, foster collaboration, and inspire new ways of thinking about event-driven systems.',
    image: '/img/meetup/creative-sessions.webp',
  },
  {
    id: 2,
    color: '#dd00ee',
    label: 'Small Groups',
    description:
      'Work in intimate groups to maximize learning, encourage open discussions, and ensure everyone has a chance to contribute their ideas and experiences.',
    image: '/img/meetup/small-groups.webp',
  },
  {
    id: 3,
    color: '#9911ff',
    label: 'Real Connections',
    description:
      'Build meaningful relationships with fellow community members, exchange knowledge, and discover potential collaborations that go beyond the meetup.',
    image: '/img/meetup/real-connections.webp',
  },
  {
    id: 4,
    color: '#0d63f8',
    label: 'Surprises',
    description:
      'Experience unexpected moments, fun activities, and special announcements that make each meetup unique and memorable.',
    image: '/img/meetup/surprises.webp',
  },
  {
    id: 5,
    color: '#0cdcf7',
    label: 'Optional Challenges',
    description:
      'Participate in optional challenges designed to test your skills, encourage creative problem-solving, and push the boundaries of what you can achieve.',
    image: '/img/meetup/optional.webp',
  },
];

export const GITHUB_DISCUSSION_URL =
  'https://github.com/asyncapi/conference-website/discussions/new/choose';
export const MEETUP_GUIDELINES_URL =
  'https://github.com/asyncapi/conference-website/blob/master/docs/meetup/GUIDELINE.md';
