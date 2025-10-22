import {expect, Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";


export class FooterChangeLangBtn extends BaseComponent {
    image: Locator;
    button: Locator;


    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.image = page.locator('img[alt="switch language"]');
        this.button = page.locator('button:has(img[alt="switch language"])');
    }

    async click(): Promise<void> {
        await this.button.waitFor({ state: 'visible' });
        await this.button.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500); 

        const currentText = (await this.button.innerText());
        await Promise.all([
            this.page.waitForLoadState('networkidle'), 
            this.button.click(),
        ]);
        this.button = this.page.locator('button:has(img[alt="switch language"])');
        await expect(this.button).not.toHaveText(currentText, { timeout: 50000 });
    }

    async getImage(): Promise<string> {
        return await this.image.getAttribute('src') || "";
    }

    async getText(): Promise<string> {
        const button = this.page.locator('button:has(img[alt="switch language"])');
        await button.waitFor({ state: 'visible' });
        return (await this.button.innerText());
    }
}