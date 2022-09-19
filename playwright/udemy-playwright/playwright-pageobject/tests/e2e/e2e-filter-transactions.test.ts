import { expect, test } from '@playwright/test';

test.describe('Filter transactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/login.html');
    await page.type('#user_login', 'username');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Verify the results for each account', async ({ page }) => {
    await page.click('#account_activity_tab');

    await page.selectOption('#aa_accountId', '2');
    const checkingAccount = page.locator(
      '#all_transactions_for_account tbody > tr',
    );
    await expect(checkingAccount).toHaveCount(3);

    await page.selectOption('#aa_accountId', '4');
    const loanAccount = page.locator(
      '#all_transactions_for_account tbody > tr',
    );
    await expect(loanAccount).toHaveCount(2);

    await page.selectOption('#aa_accountId', '6');
    const noResults = page.locator('#all_transactions_for_account > .well');
    await expect(noResults).toBeVisible();
  });
});
