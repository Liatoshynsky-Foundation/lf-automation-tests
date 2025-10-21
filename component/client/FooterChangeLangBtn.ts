import {expect, Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";
import {LanguageDetails} from "../../data/enums";


export class FooterChangeLangBtn extends BaseComponent {
    image: Locator;
    button: Locator;


    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.image = page.locator('img[alt="switch language"]');
        this.button = page.locator('button:has(img[alt="switch language"])');
    }

    async click(): Promise<void> {
        const currentText = (await this.button.innerText());
        await Promise.all([
            this.page.waitForLoadState('networkidle'), 
            this.button.click(),
        ]);
        await expect(this.button).not.toHaveText(currentText, { timeout: 50000 });
    }

    async getImage(): Promise<string> {
        return await this.image.getAttribute('src') || "";
    }

    async getSelectedLanguage(): Promise<string> {
        return (await this.button.innerText());
    }
}