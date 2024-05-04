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
    ["html"],
    ["blob", { outputDir: "blobs", fileName: `report-manual.zip` }],
  ],
  use: {
    baseURL: "https://shopdemo-alex-hot.koyeb.app",
  },
  projects: [
    {
      name: `manual-${Owner.okhotemskyi}`,
      grep: [new RegExp(Tag.MANUAL), new RegExp(Owner.okhotemskyi)],
      use: {
        headless: false,
        ...devices["Desktop Chrome"],
        trace: "on",
        video: "on",
      },
    },
    // {
    //   name: `manual-${Owner.billHerrington}`,
    //   grep: [new RegExp(Tag.MANUAL), new RegExp(Owner.billHerrington)],
    //   use: {
    //     headless: false,
    //     ...devices["Desktop Chrome"],
    //     trace: "on",
    //     video: "on",
    //   },
    // },
    // {
    //   name: "automated",
    //   grepInvert: [new RegExp("@MANUAL")],
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     screenshot: {
    //       mode: "only-on-failure",
    //       fullPage: true,
    //     },
    //   },
    // },
  ],
});
