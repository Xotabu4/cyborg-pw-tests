import {
  Browser,
  BrowserContext,
  Page,
  test as pwTest,
} from "@playwright/test";
import { chromium } from "playwright";
import { config } from "./config";
import { startServer } from "./utils/server";
import open from "open";

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

    const server = await startServer(config.uiPort);

    const tcPage = await tcBrowser.newPage({
      viewport: { width: 500, height: 750 },
    });

    await tcPage.goto(`http://localhost:${config.uiPort}`);

    await tcPage.exposeFunction('openInMainBrowser', (link: string) => {
      open(link);
    });
    await tcPage.evaluate(() => {
      (window as any).testUtils.openInMainBrowser = (window as any).openInMainBrowser;
    });

    await tcPage.bringToFront();

    await use({
      browser: tcBrowser,
      context: tcPage.context(),
      page: tcPage,
    });

    // Cleanup
    await tcPage.close();
    await tcPage.context().close();
    await tcBrowser.close();
    server.kill();
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

          // If last step failed, throw error
          const hasFailed = await testControl.page.evaluate(() => {
            if ((window as any).testUtils.hasFailed) {
              delete (window as any).testUtils.hasFailed;
              return true;
            }
            return false;
          });
          if (hasFailed) {
            throw new TestFailedError(stepName as string);
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
