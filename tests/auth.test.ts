import { test } from "../fixture/test";
import { Owner, Tag, description, severity } from "../config/testAtributes";
import { expect } from "@playwright/test";

test(
  "Login should be successful",
  {
    tag: [Tag.CYBORG, Owner.okhotemskyi],
    annotation: [
      severity.CRITICAL,
      description(`In this test we will check if the user can log in. 
      User should be able to log in with the correct credentials. 
      After logging in, the user should be redirected to the dashboard`),
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
      severity.CRITICAL,
      description(
        `Verify that a new user can register, 
        but this test has mix of manual and automated steps.`
      ),
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
  "Should not be able to register with existing email",
  {
    tag: [Tag.CYBORG, Owner.okhotemskyi],
    annotation: [
      severity.CRITICAL,
      description(`This test has mixed manual, automated and AI steps! 🤯`),
    ],
  },
  async ({ page, manualStep }) => {
    await page.goto("/register");
    await manualStep("Register with existing email - xotabu4@gmail.com");
    await manualStep("Should be unable to register");
  }
);
