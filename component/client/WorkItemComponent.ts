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

    async clickGoToButton(): Promise<void> {
        await this.goToButton.click();
    }


}