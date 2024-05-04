import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  test as pwTest,
  mergeTests,
} from "@playwright/test";

export const test = pwTest.extend<{
  testControl: {
    page: Page;
    browser: Browser;
    context: BrowserContext;
  };
  manualStep: (stepName: string) => Promise<void>;
}>({
  testControl: async ({ page, context, browser }, use) => {
    const tcBrowser = await chromium.launch({
      headless: false,
    });

    const tcPage = await tcBrowser.newPage({
      viewport: { width: 500, height: 700 },
    });

    await tcPage.goto(
      "file:///Users/xotabu4/Documents/GitHub/cyborg-pw-tests/index.html"
    );
    await page.bringToFront();
    await use({
      browser: tcBrowser,
      context: tcPage.context(),
      page: tcPage,
    });
    await tcPage.close();
    await tcPage.context().close();
    await tcBrowser.close();
  },
  manualStep: async ({ testControl, page, browser, context }, use) => {
    const manualStep = async (stepName) =>
      await test.step(
        stepName,
        async () => {
          // TODO: Find way keep correct trace that has step name
          await testControl.page.evaluate((_stepName) => {
            const newStep = window.document.createElement("li");
            newStep.textContent = _stepName;
            window.document.body
              .querySelector("#stepsList")
              ?.appendChild(newStep);
          }, stepName);
          await testControl.page.pause();
          const lastStep = await testControl.page
            .locator("#stepsList li:last-of-type")
            .textContent();

          if (lastStep!.includes("❌")) {
            throw new Error(lastStep as string);
          }
        },
        { box: true }
      );
    await use(manualStep);
    // In case test interupted
    await testControl.page.evaluate("playwright.resume()");
  },
});
