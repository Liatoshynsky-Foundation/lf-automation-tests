import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ArtistrySearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async search(query: string): Promise<void> {
    await this.page.fill('input[name="q"]', query).catch(() => {});
    await this.page.press('input[name="q"]', 'Enter').catch(() => {});
  }
}

