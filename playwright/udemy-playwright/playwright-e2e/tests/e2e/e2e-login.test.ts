import { expect, test } from '@playwright/test';

test.describe.parallel('Login / Logout flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com');
  });

  test('Negative scenario for login', async ({ page }) => {
    await page.click('#signin_button');

    await page.type('#user_login', 'invalid username');
    await page.type('#user_password', 'invalid password');
    await page.click('text=Sign in');
    const errorMessage = page.locator('.alert-error');
    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  });

  test('Positive scenario for login + logout', async ({ page }) => {
    await page.click('#signin_button');

    await page.type('#user_login', 'username');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');

    const accountSummaryTab = page.locator('#account_summary_tab');
    await expect(accountSummaryTab).toBeVisible();

    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
  });
});
