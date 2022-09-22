import { test } from '@playwright/test';
import { getRandomNumber, getRandomString } from '../../utils/index.js';

test.describe.parallel('Tips & Tricks section', () => {
  test('TestInfo object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com');
    // console.log(testInfo.title);
    // console.log(testInfo.expectedStatus);
    const newNumber = getRandomNumber();
    const newString = getRandomString();
    // console.log(newNumber);
    // console.log(newString);
  });

  test('Test skip browser', async ({ page, browserName }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'chromium',
      'Feature not ready in Chrome browser',
    );

    await page.goto('https://www.example.com');
  });

  test('Test fixme annotation', async ({ page, browserName }) => {
    test.fixme(
      browserName === 'chromium',
      'Test is not stable, needs revision',
    );

    await page.goto('https://www.example.com');
  });

  const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Alice'];
  for (const name of people) {
    test(`Running test for ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html');
      await page.type('#searchTerm', name);
    });
  }

  test('Mouse movement simulation', async ({ page }) => {
    await page.goto('https://www.example.com');
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.move(0, 100);
    await page.mouse.up();
  });

  test('Multiple browser tabs inside 1 browser', async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();
    await page1.goto('https://www.example.com');
    await page2.goto('https://www.example.com');
    await page3.goto('https://www.example.com');
    await page1.waitForTimeout(5000);
  });
});
