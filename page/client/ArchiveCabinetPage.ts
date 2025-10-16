import {Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';
import {AboutUsPage} from "./AboutUsPage";

export class ArchiveCabinetPage extends BasePage {
  readonly returnToHomeBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.returnToHomeBtn = page.locator('xpath=/html/body/div[2]/div/div/a/button');
  }

  async visit(): Promise<void> {
    await this.goto('/archive-cabinet');
  }

  async clickReturnToHome(): Promise<AboutUsPage> {
    await this.returnToHomeBtn.click();
    const aboutUsPage = new AboutUsPage(this.page);
    await aboutUsPage.waitForAboutFoundationLabelVisible();
    return aboutUsPage;
  }

  async getTextReturnToHomeBtn(): Promise<string> {
    return (await this.returnToHomeBtn.textContent())?.trim() ?? '';
  }
}
