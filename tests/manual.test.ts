import { test } from '@playwright/test';
import { annotations, manualTest } from '../manualFixture';

declare const ai: any

manualTest(
  'manual test @MANUAL',
  /**
  * @author: Billy Herrington
  * @summary: This test is to verify that the chat is working as expected
  * @description: Description of the test, what is being tested and why, what is the expected result, etc. 
  * 
  * @steps:
  * @step
  * 1. Do something
  * @step
  * 2. Do something MORE
  * @step
  * 3. Assert something!
  * 
  */
  async ({ manualStep }) => {
    annotations({
      owner: 'Billy Herrington',
      summary: 'This is manual test summary',
      description: 'Description of the test, what is being tested and why, what is the expected result, etc.',
      component: 'Gym'
    })

    await manualStep('1 - Do something');
    await manualStep('2 - Do something MORE');
    await manualStep('3 - Assert something!');
  },
);

manualTest(
  'cyborg test @MANUAL',
  async ({ page, manualStep }) => {
    // Automated step
    await page.goto('/');
    // Manual step
    await manualStep('1 - Expect user logged in');
    // Manual step
    await manualStep('2 - Expect user logged out');
  },
);

manualTest.skip(
  'cyborg ai test @MANUAL',
  async ({ page }) => {
    // Automated step
    await page.goto('/');
    // AI step
    await ai('Expect user logged in');
    // Manual step
    await test.step('2 - Expect user logged out', () => page.pause());
  },
);

