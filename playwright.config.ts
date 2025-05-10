import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { Owner, Tag } from "./config/testAtributes";

export default defineConfig({
  testDir: "./tests",
  testMatch: "*.test.ts",
  fullyParallel: false,
  retries: 0,
  workers: 1, // process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    // ["blob", { outputDir: "blobs", fileName: `report-manual.zip` }],
  ],
  use: {
    baseURL: "https://shopdemo-alex-hot.koyeb.app",
  },
  projects: [
    {
      name: Owner.okhotemskyi,
      grep: new RegExp(Owner.okhotemskyi),
      grepInvert: new RegExp(Tag.AUTOMATED),
      use: {
        ...devices["Desktop Chrome"],
        headless: false,
        trace: "on",
        video: "on",
      },
    },
    {
      name: "automated",
      grepInvert: [new RegExp(Tag.CYBORG)],
      use: {
        ...devices["Desktop Chrome"],
        screenshot: {
          mode: "only-on-failure",
          fullPage: true,
        },
      },
    },
  ],
});
