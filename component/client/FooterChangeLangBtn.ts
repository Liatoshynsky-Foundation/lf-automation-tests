import {expect, Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";
import * as allure from "allure-js-commons";

export class FooterChangeLangBtn extends BaseComponent {
    image: Locator;
    button: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.image = page.locator('img[alt="switch language"]');
        this.button = page.locator('button:has(img[alt="switch language"])');
    }

    async click(): Promise<void> {
        await allure.step('Click Change Language Btn', async () => {
            await this.button.waitFor({state: 'visible'});
            await this.button.scrollIntoViewIfNeeded();
            await expect(this.button).toBeEnabled();

            const currentText = (await this.button.innerText());
            await Promise.all([
                this.page.waitForLoadState('networkidle'),
                this.button.click(),
            ]);
            this.button = this.page.locator('button:has(img[alt="switch language"])');
            await expect(this.button).not.toHaveText(currentText, {timeout: 50000});
        })
    }

    async getImage(): Promise<string> {
        let link: string = "";
        await allure.step('Get image link of Change Language Btn', async () => {
            link = await this.image.getAttribute('src') || "";
        })
        return link;
    }

    async getText(): Promise<string> {
        let btnText: string = "";
        await allure.step('Get text on Change Language Btn', async () => {
            const button = this.page.locator('button:has(img[alt="switch language"])');
            await button.waitFor({state: 'visible'});
            btnText = await this.button.innerText();
        })
        return btnText;
    }
}