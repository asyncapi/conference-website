// src/stories/Button.stories.js
import React from 'react';
import Button from '../components/Buttons/button';
import '../styles/globals.css';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    overlay: {
      control: 'boolean',
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'storybook-button--primary',
  children: 'Primary Button',
  overlay: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  className: 'storybook-button--secondary',
  children: 'Secondary Button',
  overlay: false,
};

export const Large = Template.bind({});
Large.args = {
  className: 'storybook-button--large',
  children: 'Large Button',
  overlay: false,
};

export const Small = Template.bind({});
Small.args = {
  className: 'storybook-button--small',
  children: 'Small Button',
  overlay: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  className: 'storybook-button--primary',
  children: 'Disabled Button',
  disabled: true,
  overlay: false,
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  className: 'storybook-button--primary',
  children: 'Button with Overlay',
  overlay: true,
};
