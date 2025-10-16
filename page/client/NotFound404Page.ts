import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotFound404Page extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit(): Promise<void> {
    await this.goto('/not-found-404');
  }
}

