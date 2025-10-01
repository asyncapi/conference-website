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
        component: 'A dropdown for selecting a city.'
      }
    }
  },
  argTypes: {
    city: { control: false },
    cities: { control: false },
    setCity: { control: false },
    handleSpeakers: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DropdownWrapper = (args: any) => {
  const [city, setCity] = useState<Partial<City>>(cities[0]);
  
  return (
    <div style={{ maxWidth: 320, height: 400 }}>
      <Dropdown 
        {...args} 
        city={city} 
        cities={cities as City[]} 
        setCity={setCity} 
        handleSpeakers={() => {}} 
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DropdownWrapper {...args} />,
};