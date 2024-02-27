import { test } from '@playwright/test';

export const manualTest = test.extend<{
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

type ManualTestCaseProperties = {
  owner?: string;
  summary?: string;
  description?: string;
  component?: string;
  [key: string]: string | undefined;
}

export function annotations(properties: ManualTestCaseProperties) {
  const props = Object.entries(properties)
    .map(([key, value]) => ({type: key, description: value}));
  props.forEach(prop => test.info().annotations.push(prop));
}