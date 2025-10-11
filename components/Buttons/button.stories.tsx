import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './button';
import Download from '../illustration/download';

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button content (alternative to text prop)',
      defaultValue: 'Button',
    },
    text: {
      control: { type: 'text' },
      description: 'Button text (alternative to children)',
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
      defaultValue: 'button',
    },
    className: {
      control: { type: 'text' },
      description: 'Custom CSS classes',
    },
    overlay: {
      control: { type: 'boolean' },
      description: 'Remove gradient background if true',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
    test: {
      control: { type: 'text' },
      description: 'Test attribute',
    },
    icon: {
      control: { type: 'object' },
      description: 'Icon component to display',
    },
    iconPosition: {
      options: ['left', 'right', 'center'],
      control: { type: 'select' },
      description: 'Position of the icon relative to text',
      defaultValue: 'right',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Default Button',
    type: 'button',
  },
};

export const WithOverlay: Story = {
  args: {
    text: 'Overlay Button',
    overlay: true,
    className: 'border',
    type: 'button',
  },
};

export const Submit: Story = {
  args: {
    text: 'Submit Button',
    type: 'submit',
  },
};

export const Reset: Story = {
  args: {
    text: 'Reset Button',
    type: 'reset',
  },
};

export const WithIconRight: Story = {
  args: {
    text: 'Download File',
    icon: <Download />,
    iconPosition: 'right',
    type: 'button',
  },
};

export const WithIconLeft: Story = {
  args: {
    text: 'Download File',
    icon: <Download />,
    iconPosition: 'left',
    type: 'button',
  },
};

export const WithIconOnly: Story = {
  args: {
    icon: <Download />,
    iconPosition: 'left',
    type: 'button',
  },
};

export const IconWithOverlay: Story = {
  args: {
    text: 'Sponsorship Prospectus',
    icon: <Download />,
    iconPosition: 'left',
    overlay: true,
    className: 'w-[240px] border',
    type: 'button',
  },
};