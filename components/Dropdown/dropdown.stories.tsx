import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import Dropdown from './dropdown';

import { City } from '../../types/types';

import cities from '../../config/city-lists.json';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: 'A generic dropdown component for selecting items from a list.'
      }
    }
  },
  argTypes: {
    selectedItem: { control: false },
    items: { control: false },
    onSelect: { control: false },
    getDisplayValue: { control: false },
    placeholder: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DropdownWrapper = (args: any) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div style={{ maxWidth: 320, height: 400 }}>
      <Dropdown<City>
        {...args}
        selectedItem={selectedCity}
        items={cities as City[]}
        onSelect={setSelectedCity}
        getDisplayValue={(city) => city ? `${city.name}, ${city.country}` : ''}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DropdownWrapper {...args} />,
  args: {
    placeholder: "Select a city",
  },
};

export const WithCustomPlaceholder: Story = {
  render: (args) => <DropdownWrapper {...args} />,
  args: {
    placeholder: "Choose your conference location",
  },
};
