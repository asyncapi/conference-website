import React from "react";
import "../styles/globals.css";
import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/blocks';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      )
    }
  }
};

export default preview;