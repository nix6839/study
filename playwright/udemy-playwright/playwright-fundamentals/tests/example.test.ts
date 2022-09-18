import { expect, test } from '@playwright/test';
import { assertTitle, loadHomepage } from '../helpers';

test.describe('My first test suite', () => {
  test('Simple basic test', async ({ page }) => {
    await page.goto('https://www.example.com');
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toContainText('Example Domain');
  });

  test('Clickin on Elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');

    await page.click('text=Sign in');
    const errorMessage = page.locator('.alert.alert-error');
    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  });

  //playwright.dev/docs/selectors#selecting-visible-elements
  test.skip('Selectors', async ({ page }) => {
    // text
    await page.click('text=some text');

    // CSS Selectors
    await page.click('button');
    await page.click('#id');
    await page.click('.class');

    // Only Visible CSS Selector (JQuery Extension)
    await page.click('.submit-button:visible');

    // XPath
    await page.click('//button');
  });

  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');

    await page.type('#user_login', 'some username');
    await page.type('#user_password', 'some password');
    await page.click('text=Sign in');
    const errorMessage = page.locator('.alert.alert-error');
    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  });

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveURL('https://example.com');
    await expect(page).toHaveTitle('Example Domain');

    const element = page.locator('h1');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Example Domain');
    await expect(element).toHaveCount(1);

    const nonExistingElement = page.locator('h5');
    await expect(nonExistingElement).not.toBeVisible();
  });
});

test.describe.parallel('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('Screenshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
  });

  test('Single element screenshot', async ({ page }) => {
    const element = page.locator('h1');
    await element.screenshot({ path: 'single-element-screenshot.png' });
  });
});

test('Custom Helpers', async ({ page }) => {
  await loadHomepage(page);
  // await page.pause();
  await assertTitle(page);
});
