import {Locator, Page} from "@playwright/test";

export class CookiesModal {
    private page: Page;
    private modalContainer: Locator;
    private closingButton: Locator;
    private privacyPolicy: Locator;
    private cookieSettingsButton: Locator;
    private acceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalContainer = page.locator('div[data-testid="modal"]');
        this.closingButton = this.modalContainer.locator('button:has(img[alt="closing modal"])');
        this.privacyPolicy = this.modalContainer.locator('a');
        this.cookieSettingsButton = this.modalContainer.locator('button').nth(1);
        this.acceptButton = this.modalContainer.locator('button').nth(2);
    }

    async isVisible(timeout = 5000): Promise<boolean> {
        try {
            await this.modalContainer.waitFor({ state: 'visible', timeout: timeout });
            return true;
        } catch {
            return false;
        }
    }

    async waitUntilClosed(): Promise<void> {
        await this.modalContainer.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async closeModal(timeout = 5000): Promise<void> {
        if (await this.isVisible(timeout)) {
            await this.closingButton.click();
            await this.waitUntilClosed();
        }
    }

    async getPrivacyPolicy(timeout = 5000): Promise<void> {
        if (await this.isVisible(timeout)) {
            await this.privacyPolicy.click();
        }
    }

    async getCookieSettings(timeout = 5000): Promise<void> {
        if (await this.isVisible(timeout)) {
            await this.cookieSettingsButton.click();
        }
    }

    async acceptAll(timeout = 5000): Promise<void> {
        if (await this.isVisible(timeout)) {
            await this.acceptButton.click();
            await this.waitUntilClosed();
        }
    }

}