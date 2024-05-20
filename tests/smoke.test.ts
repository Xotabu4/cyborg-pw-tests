import { test, expect } from "@playwright/test";
import { Tag } from "../config/testAtributes";

test(
  "Store is alive",
  {
    tag: [Tag.AUTOMATED],
  },
  async ({ page }) => {
    await test.step("Open the page", async () => {
      await page.goto("/");
    });
    await expect(page).toHaveTitle(/Store/);
    await expect(page.locator("h1")).toHaveText("MERN Store");
  }
);
