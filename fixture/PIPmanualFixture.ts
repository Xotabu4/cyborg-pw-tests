import { BrowserContext, Page, test } from "@playwright/test";

export const manualTest = test.extend<{
  pipControl: {
    pipPage: Page;
  };
  manualStep: (stepName: string) => Promise<void>;
}>({
  pipControl: [
    async ({ page, context }, use) => {
      // const pipContext = await browser.newContext({
      //   viewport: { width: 1, height: 1 },
      // });

      const pipPage = await context.newPage();
      pipPage.setViewportSize({ width: 1, height: 1 });
      // PIP can be requested only from secure contexts or file://
      await pipPage.goto(
        "file:///Users/xotabu4/Documents/GitHub/cyborg-pw-tests/index.html"
      );
      await pipPage.evaluate(async () => {
        const container = document.querySelector("#container");
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: container?.clientWidth,
          height: container?.clientHeight,
        });

        pipWindow.document.body.append(container);
        // testNameElement.textContent = "Hello from PIP!";
        // pipWindow.document.body.append(testNameElement);
      });
      await page.bringToFront();
      await use({
        pipPage,
      });
    },
    { auto: true },
  ],
  manualStep: [
    async ({ page, browser, context }, use) => {
      await use(
        async (stepName) =>
          await test.step(
            stepName,
            async () => {
              // TODO: Find way keep correct trace that has step name
              await page.pause();
              // const shouldFailStep = await controlPanelPage.evaluate(
              //   `window.PW_stepFailed`
              // );
              // if (shouldFailStep) {
              //   throw new Error(shouldFailStep as string);
              // }
            },
            { box: true }
          )
      );
    },
    { auto: false },
  ],
});
