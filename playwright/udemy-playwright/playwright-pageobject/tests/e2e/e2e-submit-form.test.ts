import { test } from '@playwright/test';
import { FeedbackPage, HomePage } from '../../pom/index.js';

test.describe.parallel('Feedback form', () => {
  let homePage: HomePage;
  let feedbackPage: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedbackPage = new FeedbackPage(page);

    // await page.goto('http://zero.webappsecurity.com/index.html');
    // await page.click('#feedback');
    await homePage.visit();
    await homePage.clickFeedbackLink();
  });

  test('Reset feedback form', async () => {
    // await page.type('#name', 'some name');
    // await page.type('#email', 'someemail@email.com');
    // await page.type('#subject', 'some subject');
    // await page.type('#comment', 'some nice comment about the application');
    // await page.click('input[name="clear"]');
    await feedbackPage.fillForm({
      name: 'some name',
      email: 'someemail@email.com',
      subject: 'some subject',
      comment: 'some nice comment about the application',
    });
    await feedbackPage.resetForm();

    // const nameInput = page.locator('#name');
    // const commentInput = page.locator('#comment');
    // await expect(nameInput).toBeEmpty();
    // await expect(commentInput).toBeEmpty();
    await feedbackPage.assertReset();
  });

  test('Submit feedback form', async () => {
    // await page.type('#name', 'some name');
    // await page.type('#email', 'someemail@email.com');
    // await page.type('#subject', 'some subject');
    // await page.type('#comment', 'some nice comment about the application');
    // await page.click('input[type="submit"]');
    // await page.waitForSelector('#feedback-title');
    await feedbackPage.fillForm({
      name: 'some name',
      email: 'someemail@email.com',
      subject: 'some subject',
      comment: 'some nice comment about the application',
    });
    await feedbackPage.submitForm();
    await feedbackPage.feedbackFormSent();
  });
});
