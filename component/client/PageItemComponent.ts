import {Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";

export class PageItemComponent extends BaseComponent{
    private name: Locator;
    private link: Locator;


    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.name = parent;
        this.link = parent.locator('..');
    }

    async get_Name(): Promise<string> {
        return await this.name.innerText() || '';
    }

    async getLink(): Promise<string> {
        const href = await this.link.getAttribute('href') ?? '';
        return href;
    }

    async headerclick(): Promise<void> {
        await this.link.click();
    }

    async footerclick(): Promise<void> {
        await this.name.click();
        await this.sleep(1000);
    }
}