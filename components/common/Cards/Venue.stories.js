import React from 'react';
import Venue from './venue';

export default {
  title: 'Components/Venue Card',
  component: Venue,
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
};

const Template = (args) => <Venue {...args} />;

export const UpcomingEvent = Template.bind({});
UpcomingEvent.args = {
  city: {
    name: "London",
    country: "UK",
    date: formatDate(new Date(new Date().setDate(new Date().getDate() + 5))), // 5 days later
    img: "/img/locations/singapore.jpg",
    map: "https://goo.gl/maps/xyz",
    cfp: true,
  },
};

export const OngoingEvent = Template.bind({});
OngoingEvent.args = {
  city: {
    name: "New York",
    country: "USA",
    date: formatDate(new Date()), 
    img: "/img/locations/munich.jpg",
    map: "https://goo.gl/maps/xyz",
    cfp: false,
  },
};

export const EndedEvent = Template.bind({});
EndedEvent.args = {
  city: {
    name: "Paris",
    country: "France",
    date: formatDate(new Date(new Date().setDate(new Date().getDate() - 5))), // 5 days ago
    img: "/img/locations/testMic.webp",
    map: "https://goo.gl/maps/xyz",
    cfp: false,
  },
};

export const OnlineEvent = Template.bind({});
OnlineEvent.args = {
  city: {
    name: "Online",
    country: "",
    date: formatDate(new Date()), 
    img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd24yenR4djEyZzRoeDA0ZmEyb3Y1c2F4NWVmbG13NmZwYWNhZzdnNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Tuy3QxNZF1cxG/giphy.gif",
    map: "https://example.com",
    cfp: true,
  },
};
