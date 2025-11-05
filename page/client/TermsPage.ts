import {expect, Locator, Page} from '@playwright/test';
import {ClientBasePage} from './ClientBasePage';

export class TermsPage extends ClientBasePage {
    seeMoreBtn: Locator;
    sheetMusicBtn: Locator;
    archiveBtn: Locator;
    emailLink: Locator;
    privacyPolicyLink: Locator;
    contactLink: Locator;
    mainHeading: Locator;

    constructor(page: Page) {
        super(page);

        this.mainHeading = this.page.locator('main h2').first();
        this.seeMoreBtn = page.locator('main button').nth(0);
        this.sheetMusicBtn = page.locator('main button').nth(1);
        this.archiveBtn = page.locator('main button').nth(2);
        this.emailLink = page.locator('a[href^="mailto:liatoshynsky@gmail.com"]').first();
        this.privacyPolicyLink = page.locator('a[href*="privacy-policy"]').first();
        this.contactLink = page.locator('a[href*="contacts"]').first();
    }

    async visit(): Promise<void> {
        await this.goto('/terms');
    }

    async clickViewArchiveBtn(): Promise<void> {
        await expect(this.archiveBtn).toBeVisible();
        await this.archiveBtn.click();
        await expect(this.page).toHaveURL(/archive-cabinet/);
    }

    async clickEmailLink(): Promise<void> {
        await expect(this.emailLink).toHaveAttribute('href', 'mailto:liatoshynsky@gmail.com');
        await this.emailLink.click();
    }

    async clickPrivacyPolicyLink(): Promise<void> {
        await expect(this.privacyPolicyLink).toBeVisible();
        await this.privacyPolicyLink.click();
        await expect(this.page).toHaveURL(/privacy-policy/);
    }

    async clickContactLink(): Promise<void> {
        await expect(this.contactLink).toBeVisible();
        await this.contactLink.click();
        await expect(this.page).toHaveURL(/contacts/);
    }

}
