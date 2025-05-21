import { test as p } from "@playwright/test";
import { chromium as d } from "playwright";
class u extends Error {
  constructor(o) {
    super(o), this.name = "TestFailedError";
  }
}
const w = p.extend({
  testControl: async ({ page: t, context: o, browser: l }, c) => {
    const e = await d.launch({
      headless: !1
    }), a = await e.newPage({
      viewport: { width: 500, height: 700 }
    });
    await a.goto("file://" + process.cwd() + "/node_modules/@cyborgtests/test/app-build/index.html"), await a.bringToFront(), await c({
      browser: e,
      context: a.context(),
      page: a
    }), await a.close(), await a.context().close(), await e.close();
  },
  manualStep: async ({ testControl: t, page: o, browser: l, context: c }, e) => {
    await e(async (i) => await w.step(
      i,
      async () => {
        await t.page.evaluate((r) => {
          var s;
          (s = window == null ? void 0 : window.testUtils) == null || s.setTestName(r);
        }, w.info().title), await t.page.evaluate((r) => {
          var s;
          (s = window == null ? void 0 : window.testUtils) == null || s.addStep(r);
        }, i), await t.page.pause();
        const n = await t.page.locator("#stepsList li:last-of-type").textContent();
        if (n.includes("❌"))
          throw new u(n);
      },
      { box: !0 }
    ));
    try {
      await t.page.evaluate("playwright.resume()");
    } catch {
    }
  }
});
export {
  w as default
};
//# sourceMappingURL=index.es.js.map
