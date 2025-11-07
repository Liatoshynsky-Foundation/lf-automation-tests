import {Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";

export class WorkItemComponent extends BaseComponent{
    name: Locator;
    author: Locator;
    year: Locator;
    goToButton: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.name = parent.locator("td > p").nth(0);
        this.author = parent.locator("td > p").nth(1);
        this.year = parent.locator("td > p").nth(2);
        this.goToButton = parent.locator("td button");
    }

    async getName(): Promise<string> {
        return await this.name.textContent() || '';
    }

    async getAuthor(): Promise<string> {
        return await this.author.textContent() || '';
    }

    async getYear(): Promise<string> {
        return await this.year.textContent() || '';
    }

    async getYearNormalized(): Promise<number> {
        const yearText = await this.year.textContent();
        if (!yearText) return 0;

        if (yearText.includes('-')) {
            const parts = yearText.split('-').map(p => p.trim());
            return Number(parts[1]);
        }

        return Number(yearText);
    }

    async clickGoToButton(): Promise<void> {
        await this.goToButton.click();
    }


}