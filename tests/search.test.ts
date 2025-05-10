import { ai } from "@zerostep/playwright";
import { expect } from "@playwright/test";
import { Owner, Tag, description, severity } from "../config/testAtributes";
import { test } from "../fixture/v2/test";

test(
  "Can use search bar",
  {
    tag: [Tag.CYBORG, Tag.AI, Owner.okhotemskyi],
    annotation: [
      severity.CRITICAL,
      description(`This test has mixed manual, automated and AI steps! 🤯 🤯 🤯`),
    ],
  },
  async ({ page, manualStep }) => {
    await page.goto("/register");
    await ai(`Type "CHERRY TOMATOES" in the search box`, { page, test });
    await ai(`Click first item in autosuggest`, { page, test });
    await expect(page.locator("h1.item-name")).toHaveText("CHERRY TOMATOES");
    await manualStep("All elements of details page displayed correctly");
  }
);
