import { Locator, Page } from '@playwright/test';

export class FooterComponent {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('footer');
  }

  async isPresent(): Promise<boolean> {
    return (await this.root.count()) > 0;
  }

  async clickLinkByText(text: string): Promise<void> {
    if (await this.isPresent()) {
      const link = this.root.locator(`text=${text}`);
      if (await link.count()) await link.click();
    }
  }
}

