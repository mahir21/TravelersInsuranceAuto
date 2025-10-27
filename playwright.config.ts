import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 60000, // Increase timeout to 60 seconds
  use: {
    headless: false, // Set to false to see the browser
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure', // Options: 'off', 'on', 'retain-on-failure'
  },
});
