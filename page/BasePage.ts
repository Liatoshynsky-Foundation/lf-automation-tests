import {Locator, Page} from '@playwright/test';

export abstract class BasePage {
    protected page: Page;
    protected title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//head/title');
    }

    async goto(path: string): Promise<void> {
        await this.page.goto(path, {waitUntil: 'domcontentloaded'});
    }

    async getTitleText(): Promise<string> {
        return await this.title.textContent() || '';
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}