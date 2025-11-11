import {expect, Locator, Page} from '@playwright/test';
import {ClientBasePage} from './ClientBasePage';
import { step } from 'allure-js-commons';

export class TermsPage extends ClientBasePage {
    seeMoreElement: Locator;
    sheetMusicBtn: Locator;
    archiveBtn: Locator;
    emailLink: Locator;
    privacyPolicyLink: Locator;
    contactLink: Locator;
    mainHeading: Locator;

    constructor(page: Page) {
        super(page);

        this.mainHeading = this.page.locator('main h2').first();
        this.seeMoreElement = page.locator('div:has([aria-label="arrow down"])');
        this.sheetMusicBtn = page.locator('button:has([aria-label="icon"])').nth(0);
        this.archiveBtn = page.locator('button:has([aria-label="icon"])').nth(1);
        this.emailLink = page.locator('a[href^="mailto:liatoshynsky@gmail.com"]').first();
        this.privacyPolicyLink = page.locator('a[href*="privacy-policy"]').first();
        this.contactLink = page.locator('a[href*="contacts"]').first();
    }

    async visit(): Promise<void> {
        await step('Visit Terms page', async()=>{
            await this.goto('/terms')
        });
    }
    
    async clickViewSheetMusicBtn(): Promise<void> {
        await step('Click "View the sheet music library" button',async()=>{
            await expect(this.sheetMusicBtn).toBeVisible();
            await this.sheetMusicBtn.click();
            await expect(this.page).toHaveURL(/.*\/artistry\/?$/)
        });
    } 

    async clickViewArchiveBtn(): Promise<void> {
        await step('Click "View the Archive" button',async()=>{
            await expect(this.archiveBtn).toBeVisible();
            await this.archiveBtn.click();
            await expect(this.page).toHaveURL(/.*\/archive-cabinet\/?$/);
        });
    }

    async clickEmailLink(): Promise<void> {
        await step('Click email link', async()=>{
            await expect(this.emailLink).toHaveAttribute('href', 'mailto:liatoshynsky@gmail.com');
            await this.emailLink.click();
        });
    }

    async clickPrivacyPolicyLink(): Promise<void> {
        await step('Click Privacy Policy link', async()=>{
            await expect(this.privacyPolicyLink).toBeVisible();
            await this.privacyPolicyLink.click();
            await expect(this.page).toHaveURL(/.*\/privacy-policy\/?$/);
        });
    }

    async clickContactLink(): Promise<void> {
        await step('Click Privacy Policy link', async()=>{       
            await expect(this.contactLink).toBeVisible();
            await this.contactLink.click();
            await expect(this.page).toHaveURL(/.*\/contacts\/?$/);
        });
    }

}
