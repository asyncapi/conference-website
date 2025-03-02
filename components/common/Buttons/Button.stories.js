import React from 'react';
import Button  from './button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
    overlay: { control: 'boolean' },
    onClick: { action: 'clicked' },
    type: { control: { type: 'select', options: ['button', 'submit', 'reset'] } },
    disabled: { control: 'boolean' },
    test: { control: 'text' },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me',
  overlay: false,
  type: 'button',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  ...Default.args,
  overlay: true,
};

