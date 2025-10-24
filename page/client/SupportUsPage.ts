import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { FAQComponent } from '../../component/client/FAQComponent';

export class SupportUsPage extends BasePage {

  public faqSection: FAQComponent;

  constructor(page: Page) {
    super(page);

    this.faqSection = new FAQComponent(page);

  }

  async visit(): Promise<void> {
    await this.goto('/support-us');
  }
}

