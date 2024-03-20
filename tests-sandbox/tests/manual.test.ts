import { manualTest } from "../fixture/manualFixture";
import { Owner, Tag, description } from "../config/testAtributes";

declare const ai: any;

manualTest(
  "user can login as admin",
  {
    tag: [Tag.MANUAL, Owner.okhotemskyi],
    annotation: [
      description(`Objective of this test is very important!
      We need to check if the admin can log in.
      Also, we need to check if the user can see the dashboard after logging in.
      `),
    ],
  },
  async ({ manualStep }) => {
    await manualStep("1 - Go to the login page");
    await manualStep("2 - Login as xotabu4@gmail.com / xotabu4@gmail.com");
    await manualStep("3 - Expected to be logged in");
  }
);

manualTest(
  "",
  {
    tag: [Tag.CYBORG, Owner.billHerrington],
  },
  async ({ page, manualStep }) => {
    // Automated step
    await page.goto("/");
    // Manual step
    await manualStep("1 - Expect user logged in");
    // Manual step
    await manualStep("2 - Expect user logged out");
  }
);

manualTest.skip(
  "cyborg ai test",
  {
    tag: [Tag.MANUAL, Owner.okhotemskyi],
  },
  async ({ page, manualStep }) => {
    // Automated step
    await page.goto("/");
    // AI step
    await ai("Expect user logged in");
    // Manual step
    await manualStep("2 - Expect user logged out");
  }
);
