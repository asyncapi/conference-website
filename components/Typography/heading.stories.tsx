import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Heading from './heading';

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const typeStyles = [
  'heading-lg',
  'heading-md',
  'heading-md-semibold',
  'heading-sm',
  'heading-sm-semibold',
  'heading-xs',
  'heading-xs-semibold',
  'body-lg',
  'body-md',
  'body-sm',
] as const;

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: `An audit of this component confirms that the \`level\` prop is semantic only; it selects the HTML heading tag (h1–h6) and does not affect visual styling. Visual presentation is controlled by \`typeStyle\`. This separation prevents multiple props from competing over typographic scale.

To verify, change \`level\` from \`h1\` to \`h3\` or \`h4\`—the appearance remains unchanged. Adjusting \`typeStyle\` will alter the size/weight as expected. The \`level\` prop primarily serves semantic HTML, SEO, and accessibility purposes.`
      }
    }
  },
  argTypes: {
    level: {
      options: headingLevels,
      control: { type: 'select' },
      description: 'Sets the semantic HTML tag (h1–h6). Does not affect visual style; use `typeStyle` to control size/weight. Useful for SEO and accessibility.'
    },
    typeStyle: {
      options: typeStyles,
      control: { type: 'select' },
      description: 'Controls the visual style (e.g., size and weight) of the heading.'
    },
    children: {
      control: { type: 'text' },
      description: 'Heading content.'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional class names to extend/override styles.'
    },
    textColor: {
      table: {
        disable: true
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Headings: Story = {
  args: {
    level: 'h1',
    typeStyle: 'heading-lg',
    children: 'AsyncAPI Conference',
    textColor: 'text-white',
  }
};

export const HeadingsLevel = () => (
  <>
    <Heading level="h1" textColor="text-white">Heading 1</Heading>
    <Heading level="h2" textColor="text-white">Heading 2</Heading>
    <Heading level="h3" textColor="text-white">Heading 3</Heading>
    <Heading level="h4" textColor="text-white">Heading 4</Heading>
    <Heading level="h5" textColor="text-white">Heading 5</Heading>
    <Heading level="h6" textColor="text-white">Heading 6</Heading>
  </>
);

export const HeadingsTypeStyle = () => (
  <>
    <Heading typeStyle="heading-lg" textColor="text-white">Heading LG</Heading>
    <Heading typeStyle="heading-md" textColor="text-white">Heading MD</Heading>
    <Heading typeStyle="heading-md-semibold" textColor="text-white">Heading MD Semibold</Heading>
    <Heading typeStyle="heading-sm" textColor="text-white">Heading SM</Heading>
    <Heading typeStyle="heading-sm-semibold" textColor="text-white">Heading SM Semibold</Heading>
    <Heading typeStyle="heading-xs" textColor="text-white">Heading XS</Heading>
    <Heading typeStyle="heading-xs-semibold" textColor="text-white">Heading XS Semibold</Heading>
    <Heading typeStyle="body-lg" textColor="text-white">Body LG</Heading>
    <Heading typeStyle="body-md" textColor="text-white">Body MD</Heading>
    <Heading typeStyle="body-sm" textColor="text-white">Body SM</Heading>
  </>
);