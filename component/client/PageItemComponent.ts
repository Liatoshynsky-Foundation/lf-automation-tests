import {Locator} from "@playwright/test";

export class PageItemComponent {
    private name: Locator;
    private link: Locator;


    constructor(parent: Locator) {
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
         await Promise.all([
            this.name.click(),
            this.name.page().waitForLoadState('networkidle'),
        ]);
        //const page = this.name.page();
        //const oldUrl = page.url();
        //await this.name.click();
        // await expect.poll(() => page.url()).not.toBe(oldUrl);
        // await expect(page.locator('main')).toBeVisible({timeout: 10000});
    }
}