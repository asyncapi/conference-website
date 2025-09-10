import type { Meta, StoryObj } from '@storybook/nextjs';
import Paragraph from './paragraph';

const typeStyles = ['body-lg', 'body-md', 'body-sm'] as const;

const meta: Meta<typeof Paragraph> = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  argTypes: {
    typeStyle: {
      options: typeStyles,
      control: { type: 'select' },
    },
    textColor: {
      control: { type: 'text' },
    },
    fontWeight: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    typeStyle: 'body-lg',
    textColor: 'text-gray-400',
    fontWeight: '',
    className: '',
    children: 'Join us for the AsyncAPI Conference, bringing the latest in AsyncAPI technology to locations worldwide!',
  },
};

export const AllTypeStyles = () => (
  <>
    <Paragraph typeStyle="body-lg" textColor="text-gray-400">Body Large Paragraph</Paragraph>
    <Paragraph typeStyle="body-md" textColor="text-gray-400">Body Medium Paragraph</Paragraph>
    <Paragraph typeStyle="body-sm" textColor="text-gray-400">Body Small Paragraph</Paragraph>
  </>
);