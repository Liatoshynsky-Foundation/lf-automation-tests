import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResearchAndAcademicWorksPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async visit(): Promise<void> {
    await this.goto('/research-and-academic-works');
  }
}

