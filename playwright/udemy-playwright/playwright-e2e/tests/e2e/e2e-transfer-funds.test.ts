import { expect, test } from '@playwright/test';

test.describe('Transfer funds and make payments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');
    await page.type('#user_login', 'username');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Transfer funds', async ({ page }) => {
    await page.click('#transfer_funds_tab');
    await page.selectOption('#tf_fromAccountId', '2');
    await page.selectOption('#tf_toAccountId', '3');
    await page.type('#tf_amount', '500');
    await page.type('#tf_description', 'Test message');
    await page.click('#btn_submit');

    const boardHeader = page.locator('h2.board-header');
    await expect(boardHeader).toContainText('Verify');
    await page.click('#btn_submit');

    const message = page.locator('.alert-success');
    await expect(message).toContainText(
      'You successfully submitted your transaction',
    );
  });
});
