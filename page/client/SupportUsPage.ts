import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { VolunteerActionComponent } from '../../component/client/VolunteerActionComponent';

export class SupportUsPage extends BasePage {
  public readonly volunteerAction: VolunteerActionComponent;

  constructor(page: Page) {
    super(page);
    this.volunteerAction = new VolunteerActionComponent(page);
  }

  async visit(): Promise<void> {
    await this.goto('/support-us');
  }
}

