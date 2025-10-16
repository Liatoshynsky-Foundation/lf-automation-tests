import {Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class AboutUsPage extends BasePage {
    private aboutFoundationLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.aboutFoundationLabel = this.page.locator('xpath=/html/body/div[2]/div/div/div[2]/p');
    }

    async visit(): Promise<void> {
        await this.goto('/about');
    }

    async waitForAboutFoundationLabelVisible(timeout = 5000): Promise<void> {
        await this.aboutFoundationLabel.waitFor({ state: 'visible', timeout });
    }
}
