import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';

export class SupportUsPage extends BasePage {

  public quickDonation: QuickDonationComponent;

  constructor(page: Page) {
    super(page);
    this.quickDonation = new QuickDonationComponent(page);
  }

  async visit(): Promise<void> {
    await this.goto('/support-us');
  }
}

