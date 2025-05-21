# Cyborg Test

Cyborg Test is a small extension for [Playwright](https://playwright.dev/) that allows you to include manual verification steps in your test flow. When a manual step is hit, a separate window appears showing the step description so a tester can mark it as passed or failed. This lets you combine automated checks with human input in the same test suite.

## Installation

```bash
npm install @cyborgtests/test
```

This library expects `@playwright/test`, `react` and `react-dom` to be available in your project as peer dependencies.

## Usage

```ts
import test from '@cyborgtests/test';

// Regular Playwright test syntax with additional `manualStep` helper
// that pauses execution until the tester confirms the step.
test('example with manual step', async ({ page, manualStep }) => {
  await page.goto('https://example.com');

  await manualStep('Verify the login screen is displayed correctly');

  // continue with the rest of your automated script
});
```

When `manualStep` is called the test pauses and the Cyborg Test UI window appears. Use the `✅ Step passed` or `❌ Step failed` buttons to resume the test. Failing a step throws an error so your CI can detect it.

## License

MIT
