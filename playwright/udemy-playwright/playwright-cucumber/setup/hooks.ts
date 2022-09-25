import { After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber';
import * as playwright from 'playwright';

BeforeAll(async () => {
  console.log('Launch browser');
  globalThis.browser = await playwright.chromium.launch({ headless: false });
});

AfterAll(async () => {
  console.log('Close browser');
  await globalThis.browser.close();
});

Before(async () => {
  console.log('Create new context and page');
  globalThis.context = await globalThis.browser.newContext();
  globalThis.page = await globalThis.context.newPage();
});

After(async () => {
  console.log('Close context and page');
  await globalThis.page.close();
  await globalThis.context.close();
});
