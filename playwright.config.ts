import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: false,
  workers: 1, // Run tests sequentially for cleaner local debugging
  reporter: [['html', { open: 'always' }], ['list']],
  use: {
    baseURL: 'https://www.amazon.com',
    headless: false, // Run in headed mode to visually observe test execution
    launchOptions: {
      slowMo: 800, // Slow down actions slightly to make manual inspection easier
    },
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-US',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});