import { expect, test } from '@playwright/test';

test.describe.parallel('Feedback form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#feedback');
  });

  test('Reset feedback form', async ({ page }) => {
    await page.type('#name', 'some name');
    await page.type('#email', 'someemail@email.com');
    await page.type('#subject', 'some subject');
    await page.type('#comment', 'some nice comment about the application');
    await page.click('input[name="clear"]');

    const nameInput = page.locator('#name');
    const commentInput = page.locator('#comment');
    await expect(nameInput).toBeEmpty();
    await expect(commentInput).toBeEmpty();
  });

  test('Submit feedback form', async ({ page }) => {
    await page.type('#name', 'some name');
    await page.type('#email', 'someemail@email.com');
    await page.type('#subject', 'some subject');
    await page.type('#comment', 'some nice comment about the application');
    await page.click('input[type="submit"]');
    await page.waitForSelector('#feedback-title');
  });
});
