import {
  Browser,
  BrowserContext,
  Page,
  test as pwTest,
} from "@playwright/test";
import { chromium } from "playwright";

class TestFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TestFailedError";
  }
}

const test = pwTest.extend<{
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
      viewport: { width: 500, height: 750 },
    });

    await tcPage.goto("file://" + process.cwd() + "/node_modules/@cyborgtests/test/app-build/index.html");
    await tcPage.bringToFront();

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
    const manualStep = async (stepName: string) =>
      await test.step(
        stepName,
        async () => {
          await testControl.page.evaluate((_testName) => {
            (window as any)?.testUtils?.setTestName(_testName);
          }, test.info().title);

          // Write current step name
          await testControl.page.evaluate((_stepName) => {
            (window as any)?.testUtils?.addStep(_stepName);
          }, stepName);

          // Pause for manual step

          await testControl.page.pause();

          const lastStep = await testControl.page
            .locator("#stepsList li:last-of-type")
            .textContent();

          // If last step failed, throw error
          if (lastStep!.includes("❌")) {
            throw new TestFailedError(lastStep as string);
          }
        },
        { box: true }
      );
    await use(manualStep);
    // In case test interupted
    try {
      await testControl.page.evaluate("playwright.resume()");
    } catch (err) {
      // no-op
    }
  },
});

export default test;
