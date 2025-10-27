import {expect, Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";


export class QuoteComponent extends BaseComponent {
    private quoteIcon: Locator;
    private quoteText: Locator;
    private quoteSource: Locator;


    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.quoteIcon = parent.locator('div svg');
        this.quoteText = parent.locator('div p').nth(0);
        this.quoteSource = parent.locator('div p').nth(1);
    }

    async getIconSource(): Promise<string | null> {
        await this.quoteIcon.scrollIntoViewIfNeeded();
        return await this.quoteIcon.getAttribute('src');
    }

    async getQuoteText(): Promise<string> {
        await this.quoteText.scrollIntoViewIfNeeded();
        return (await this.quoteText.textContent())?.trim() || '';
    }

    async getQuoteSourceText(): Promise<string> {
        await this.quoteSource.scrollIntoViewIfNeeded();
        return (await this.quoteSource.textContent())?.trim() || '';
    }
}