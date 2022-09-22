import { expect, test } from '@playwright/test';

test.describe.parallel('Visual regression testing example', () => {
  test('Full page snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });

  test('Single element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    const pageElement = page.locator('h1');
    expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png');
  });
});
