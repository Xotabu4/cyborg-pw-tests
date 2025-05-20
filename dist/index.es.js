import { test as p } from "@playwright/test";
import { chromium as u } from "playwright";
class d extends Error {
  constructor(o) {
    super(o), this.name = "TestFailedError";
  }
}
const l = p.extend({
  testControl: async ({ page: t, context: o, browser: w }, n) => {
    const a = await u.launch({
      headless: !1
    }), e = await a.newPage({
      viewport: { width: 500, height: 700 }
    });
    await e.goto("file://" + process.cwd() + "/node_modules/@cyborgtests/test/app-build/index.html"), await e.bringToFront(), await n({
      browser: a,
      context: e.context(),
      page: e
    }), await e.close(), await e.context().close(), await a.close();
  },
  manualStep: async ({ testControl: t, page: o, browser: w, context: n }, a) => {
    await a(async (i) => await l.step(
      i,
      async () => {
        await t.page.evaluate((c) => {
          var s;
          (s = window == null ? void 0 : window.testUtils) == null || s.setTestName(c);
        }, l.info().title), await t.page.evaluate((c) => {
          var s;
          (s = window == null ? void 0 : window.testUtils) == null || s.addStep(c);
        }, i), console.log("pause", "pause"), await t.page.pause();
        const r = await t.page.locator("#stepsList li:last-of-type").textContent();
        if (console.log("lastStep", r), r.includes("❌"))
          throw new d(r);
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
  l as default
};
//# sourceMappingURL=index.es.js.map
