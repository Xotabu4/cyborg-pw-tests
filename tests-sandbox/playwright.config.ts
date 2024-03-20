import { defineConfig, devices } from '@playwright/test';
import { Owners } from './config/tags';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.test.ts',
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
      name: `manual-${Owners.okhotemskyi}`,
      grep: [new RegExp('@MANUAL'), new RegExp(Owners.okhotemskyi)],
      use: {
        headless: false,
        ...devices['Desktop Chrome'],
        trace: 'on',
        video: 'on'
      },
    },
    {
      name: `manual-${Owners.billHerrington}`,
      grep: [new RegExp('@MANUAL'), new RegExp(Owners.billHerrington)],
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
