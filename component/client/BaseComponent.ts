import {expect, Locator, Page, test} from '@playwright/test';

export class BaseComponent {
    page: Page;
    parent: Locator;

    constructor(page: Page, parent: Locator) {
        this.page = page;
        this.parent = parent;
    }

    async shouldBeVisible(): Promise<void> {
        await test.step(`Check if component is visible`, async () => {
            await expect(this.parent, {message: ("is not visible")}).toBeVisible();
        });
    }

    async waitIsVisible(locator: Locator, timeout = 5000): Promise<void> {
        await test.step(`Wait for locator to be visible`, async () => {
            // let elemet = await locator.waitFor({state: 'visible', timeout});
            await expect(locator, {message: ("Locator is not visible")}).toBeVisible({timeout});
        });
    }
    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
