import {Locator, Page} from "@playwright/test";
import * as allure from "allure-js-commons";

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
        return await allure.step('Check visibility of cookies modal', async () => {
            try {
                await this.modalContainer.waitFor({state: 'visible', timeout: timeout});
                return true;
            } catch {
                return false
            }
        });
    }

    async waitUntilClosed(): Promise<void> {
        await allure.step('Wait until modal is hidden', async () => {
            await this.modalContainer.waitFor({state: 'hidden', timeout: 5000});
        });
    }

    async closeModal(timeout = 5000): Promise<void> {
        await allure.step('Close cookies modal', async () => {
            if (await this.isVisible(timeout)) {
                await allure.step('Click Close button', async () => {
                    await this.closingButton.click();
                });
                await this.waitUntilClosed();
            }
        });
    }

    async getPrivacyPolicy(timeout = 5000): Promise<void> {
        await allure.step('Get privacy policy', async () => {
            if (await this.isVisible(timeout)) {
                await allure.step('Click Privacy Policy button', async () => {
                    await this.privacyPolicy.click();
                });
            }
        });
    }

    async getCookieSettings(timeout = 5000): Promise<void> {
        await allure.step('Get Cookie Settings', async () => {
            if (await this.isVisible(timeout)) {
                await allure.step('Click Cookies Settings button', async () => {
                    await this.cookieSettingsButton.click();
                });
            }
        });
    }

    async acceptAll(timeout = 5000): Promise<void> {
        await allure.step('Accept all cookies', async () => {
            if (await this.isVisible(timeout)) {
                await allure.step('Click Accept All button', async () => {
                    await this.acceptButton.click();
                });
                await this.waitUntilClosed();
            }
        });
    }

}