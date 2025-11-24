import {type Locator, type Page} from '@playwright/test';

export type Platform = 'instagram' | 'facebook' | 'youtube';

export class ContactsInfoComponent {
    public mainContainer: Locator;
    public phoneNumberLink: Locator;
    public emailLink: Locator;
    private page: Page;
    private socialMediaBlock: Locator;
    public copyPhoneButton: Locator;
    public copyEmailButton: Locator;
    public copySuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContainer = page.locator('.MuiBox-root').filter({ has: page.getByTestId('ContactsInfo-title') }).first();

        this.phoneNumberLink = page.getByTestId('ContactsInfo-phoneSection').locator('a').first();
        this.emailLink = page.getByTestId('ContactsInfo-emailSection').locator('a').first();

        this.copyPhoneButton = page.getByTestId('ContactsInfo-phoneSection').locator('button[aria-label="Copy content"]');
        this.copyEmailButton = page.getByTestId('ContactsInfo-emailSection').locator('button[aria-label="Copy content"]');

        this.copySuccessMessage = page.getByText(/Copied|Скопійовано/i);

        this.socialMediaBlock = page.getByTestId('ContactsInfo-socialMediaSection');
        const titleLocator = page.getByTestId('ContactsInfo-title');
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
    async clickCopyPhone(): Promise<void> {
        await this.copyPhoneButton.click();
    }

    async clickCopyEmail(): Promise<void> {
        await this.copyEmailButton.click();
    }
}