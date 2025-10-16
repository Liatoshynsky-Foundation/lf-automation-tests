import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('header');
  }

  async isPresent(): Promise<boolean> {
    return (await this.root.count()) > 0;
  }

  async clickFirstLink(): Promise<void> {
    if (await this.isPresent()) {
      const link = this.root.locator('a').first();
      if (await link.count()) await link.click();
    }
  }
}

