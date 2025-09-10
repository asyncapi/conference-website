import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'dark',
  brandTitle: 'AsyncAPI Conference',
  brandUrl: 'https://conference.asyncapi.com/',
  brandImage: '/img/logos/2025-logo.png',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
}); 