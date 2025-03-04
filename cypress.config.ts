import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false, // This is needed for testing external URLs
    viewportHeight:960,
    viewportWidth:1536,
  },
});
