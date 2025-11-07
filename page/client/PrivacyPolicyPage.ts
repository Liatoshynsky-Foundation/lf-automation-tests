import {Locator, Page} from '@playwright/test';
import {ClientBasePage} from './ClientBasePage';

export class PrivacyPolicyPage extends ClientBasePage {
    pageTitle: Locator;
    contactLink: Locator;
    emailLink: Locator;
    sectionTitles: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('p.MuiTypography-root.css-1ogm0dh');
        this.contactLink = page.locator('a[href="/contacts"]');
        this.emailLink = page.locator('a[href^="mailto:"]');
        this.sectionTitles = page.locator('h2.MuiTypography-root');
    }

    async visit(): Promise<void> {
        await this.goto('/privacy-policy');
    }

    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    async getSectionTitle(titleText: string): Promise<Locator> {
        return this.page.locator(`h2:has-text("${titleText}")`);
    }

    async getTextBlock(text: string): Promise<Locator> {
        return this.page.locator(`div.MuiTypography-root:has-text("${text}")`);
    }

    async clickContactLink(): Promise<void> {
        await this.contactLink.click();
    }

    async getContactLinkHref(): Promise<string> {
        return await this.contactLink.getAttribute('href') || '';
    }

    async getEmailLinkHref(): Promise<string> {
        return await this.emailLink.getAttribute('href') || '';
    }

    async getAllSectionTitles(): Promise<string[]> {
        return await this.sectionTitles.allTextContents();
    }

    async getBulletPoints(sectionTitle: string): Promise<string[]> {
        const section = await this.getSectionTitle(sectionTitle);
        const bulletContainer = section.locator('xpath=ancestor::div[contains(@class, "css-t21q12")]');
        return await bulletContainer.locator('div.css-1fecjwp').allTextContents();
    }
}

