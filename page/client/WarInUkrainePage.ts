import { Page } from '@playwright/test';
import { ClientBasePage } from './ClientBasePage';

export class WarInUkrainePage extends ClientBasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit(): Promise<void> {
    await this.goto('/war-in-ukraine');
  }
}

