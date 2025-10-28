import { Page } from '@playwright/test';
import { ClientBasePage } from './ClientBasePage';

export class MediaAboutUsPage extends ClientBasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit(): Promise<void> {
    await this.goto('/media-about-us');
  }
}

