import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button label',
      defaultValue: 'Button',
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
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    type: 'button',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className: 'bg-blue-600 hover:bg-blue-700',
    type: 'button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    type: 'button',
  },
};

export const WithOverlay: Story = {
  args: {
    children: 'Overlay Button',
    overlay: true,
    className: 'bg-gray-500',
    type: 'button',
  },
};

export const Submit: Story = {
  args: {
    children: 'Submit Button',
    type: 'submit',
  },
};

export const Reset: Story = {
  args: {
    children: 'Reset Button',
    type: 'reset',
  },
};