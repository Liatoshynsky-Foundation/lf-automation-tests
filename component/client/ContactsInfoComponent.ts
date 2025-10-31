import {type Locator, type Page} from '@playwright/test';

export type Platform = 'instagram' | 'facebook' | 'youtube';

export class ContactsInfoComponent {
    public mainContainer: Locator;
    public phoneNumberLink: Locator;
    public emailLink: Locator;
    private page: Page;
    private socialMediaBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContainer = page.locator('.MuiBox-root:has(h2:has-text("КонТактИ"))').first();

        this.phoneNumberLink = this.mainContainer.locator('h6:has-text("Телефон:") + a');
        this.emailLink = this.mainContainer.locator('h6:has-text("Email:") + a');

        this.socialMediaBlock = this.mainContainer.locator('h6:has-text("Ми в соцмережах:") + div');
    }

    async getPhoneNumber(): Promise<string> {
        return (await this.phoneNumberLink.textContent()) ?? '';
    }

    async clickEmail(): Promise<void> {
        await this.emailLink.click();
    }

    /**
     * @param platform ('instagram', 'facebook', 'youtube').
     */
    async clickSocialLink(platform: Platform): Promise<void> {
        const linkLocator = this.socialMediaBlock.locator(`a[href*="${platform}"]`);
        await linkLocator.click();
    }

    getSocialLink(platform: Platform): Locator {
        return this.socialMediaBlock.locator(`a[href*="${platform}"]`);
    }
}