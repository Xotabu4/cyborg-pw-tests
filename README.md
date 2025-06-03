# Cyborg Test

Cyborg Test is a powerfull extension for [Playwright](https://playwright.dev/) that allows you to include manual verification steps in your automated test flow. 
When a manual step is hit, a separate window appears showing the step description that needs to be executed, so a tester can mark it as passed or failed. 
This lets you combine automated checks with human input in the same test case.

## Installation

```bash
npm install @cyborgtests/test
```

This library expects `@playwright/test` to be available in your project as peer dependency.

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

## Analytics Configuration

The package includes Google Analytics integration that is enabled by default. To turn it off, use the following configuration:

```typescript
import { config } from '@cyborgtests/test';

config.setConfig({
  analyticsEnabled: false
});
```

## UI Server Configuration

The UI server runs on port 3009 by default. To use a different port:

```typescript
import { config } from '@cyborgtests/test';

config.setConfig({
  uiPort: 3000 // Change UI server port
});
```
