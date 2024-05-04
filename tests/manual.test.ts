import { test } from "../fixture/v2/test";
import { Owner, Tag, description, severity } from "../config/testAtributes";
import { expect } from "@playwright/test";
import { ai } from "@zerostep/playwright";

test(
  "Login should be successful",
  {
    tag: [Tag.MANUAL, Owner.okhotemskyi],
    annotation: [
      description(`
      In this test we will check if the user can log in. 
      User should be able to log in with the correct credentials. 
      After logging in, the user should be redirected to the dashboard.
      `),
      severity("CRITICAL"),
    ],
  },
  async ({ manualStep }) => {
    await manualStep("Go to the login page");
    await manualStep("Login as xotabu4@gmail.com / xotabu4@gmail.com");
    await manualStep("Expected to be logged in");
  }
);

test(
  "Can register new user",
  {
    tag: [Tag.CYBORG, Owner.okhotemskyi],
    annotation: [
      description(`
      Verify that a new user can register, but this test has mix of manual and automated steps.
      `),
    ],
  },
  async ({ page, manualStep }) => {
    await page.goto("/register");

    await manualStep("Register with valid credentials");
    await expect(page).toHaveURL(/.*dashboard/);
    await manualStep("Expect user registered");
  }
);

test(
  "Should not register with existing email",
  {
    tag: [Tag.AI, Owner.okhotemskyi],
    annotation: [
      description(`
    This test has mixed manual, automated and AI steps! 🤯
    `),
    ],
  },
  async ({ page, manualStep }) => {
    await page.goto("/register");
    await ai(
      "Assert body contains text 'HELLO WORLD!' ",
      { page, test },
      { debug: true, type: "assert" }
    );
    await manualStep("Register with existing email - xotabu4@gmail.com");
  }
);
