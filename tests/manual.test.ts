import { test, Browser, Page, BrowserContext, expect } from '@playwright/test';

declare const app: any
declare const ai: any

const manualTest = test.extend<{
  manualStep: (stepName: string) => Promise<void>
}>({
  page: async ({ page, context }, use) => {
    await context.addInitScript(function (opts) {
      setTimeout(() => {
        const overlayDiv = document.createElement('div');
        overlayDiv.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          background: white;
          z-index: 9999;
        `;

        const testNameElement = document.createElement('div');
        testNameElement.textContent = opts.testName;

        const stepNameElement = document.createElement('div');
        stepNameElement.id = 'PW_stepNameId';
        stepNameElement.textContent = '';

        const buttonNextStepElement = document.createElement('button');
        buttonNextStepElement.textContent = 'Next Step';
        buttonNextStepElement.onclick = function () {
          // @ts-expect-error
          playwright.resume()
        };

        const inputElement = document.createElement('input');
        inputElement.placeholder = 'Reason for failure'
        inputElement.id = 'PW_reasonInputId';

        const buttonFailTestElement = document.createElement('button');
        buttonFailTestElement.textContent = 'Fail test';
        buttonFailTestElement.onclick = function () {
          // @ts-expect-error
          window.PW_setTestAsFailed(document.getElementById('PW_reasonInputId').value);
          // @ts-expect-error
          window.PW_stepFailed = document.getElementById('PW_reasonInputId').value;
        };
        
        overlayDiv.appendChild(testNameElement);
        overlayDiv.appendChild(stepNameElement);
        overlayDiv.appendChild(buttonNextStepElement);
        overlayDiv.appendChild(inputElement);
        overlayDiv.appendChild(buttonFailTestElement);

        document.body.appendChild(overlayDiv);
      }, 1000);
    }, { testName: test.info().titlePath.join(' ') });
    await page.exposeFunction('PW_setTestAsFailed', async (reason: string) => {
      await page.evaluate(`playwright.resume();`);
    });

    await page.goto('');

    await use(page);
  },
  manualStep: async ({ page }, use) => {
    await use((stepName) => test.step(stepName, async () => {
      await page.evaluate((_stepName) => {
        // @ts-expect-error
        document.querySelector('#PW_stepNameId').textContent = _stepName;
      }, stepName);
      // TODO: Find way keep correct trace that has step name
      await page.pause();
      const shouldFailStep = await page.evaluate(`window.PW_stepFailed`);
      if (shouldFailStep) {
        throw new Error(shouldFailStep as string);
      }
    }, { box: true }))
  }
});

manualTest(
  'test something complex with steps @MANUAL',
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
  async ({ page, manualStep }) => {
    await manualStep('1 - Do something');
    await manualStep('2 - Do something MORE');
    await manualStep('3 - Assert something!');
  },
);

manualTest(
  'test something important manually @MANUAL',
  async ({ page }) => {
    throw new Error('This test is not implemented yet');
  },
);

manualTest(
  'cyborg test do mixed manual and automated steps @MANUAL',
  async ({ page }) => {
    // Automated step
    await app.signIn.signInAsNewUser();
    // Manual step
    await test.step('1 - Expect user logged in', () => page.pause());
    // Automated step
    await app.dashboard.logout();
    // Manual step
    await test.step('2 - Expect user logged out', () => page.pause());
  },
);


manualTest.skip(
  'cyborg test do mixed manual, automated and AI steps @MANUAL',
  async ({ page }) => {
    // Automated step
    await app.signIn.signInAsNewUser();
    // AI step
    await ai('Expect user logged in');
    // Automated step
    await app.dashboard.logout();
    // Manual step
    await test.step('2 - Expect user logged out', () => page.pause());
  },
);

