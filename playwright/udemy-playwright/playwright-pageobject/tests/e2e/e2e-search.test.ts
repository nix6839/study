import { expect, test } from '@playwright/test';
import { HomePage } from '../../pom/index.js';

test.describe('Search results', () => {
  let homePage: HomePage;

  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
  });

  test('Should find search results', async ({ page }) => {
    // await page.goto('http://zero.webappsecurity.com/index.html');
    // await page.type('#searchTerm', 'bank');
    // await page.keyboard.press('Enter');
    await homePage.visit();
    await homePage.searchFor('bank');

    const numberOfLinks = page.locator('li > a');
    await expect(numberOfLinks).toHaveCount(2);
  });
});
