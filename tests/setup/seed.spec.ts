import { test, expect } from './fixture';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto(process.env.URL!);
  });
});
