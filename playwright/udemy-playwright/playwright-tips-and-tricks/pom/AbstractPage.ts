import type { Page } from '@playwright/test';

export default abstract class AbstractPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}
