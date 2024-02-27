import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1, // process.env.CI ? 1 : undefined,
  reporter: [
    // ['html'],
    ['blob', { outputDir: 'blobs', fileName: `report-manual.zip` }]
  ],
  use: {
    baseURL: 'https://shopdemo-alex-hot.koyeb.app',
  },
  projects: [
    {
      name: 'manual',
      grep: [new RegExp('@MANUAL')],
      use: {
        headless: false,
        ...devices['Desktop Chrome'],
        trace: 'on',
        video: 'on'
      },
    },
    {
      name: 'automated',
      grepInvert: [new RegExp('@MANUAL')],
      use: {
        ...devices['Desktop Chrome'],
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        }
      },
    },
  ],
});
