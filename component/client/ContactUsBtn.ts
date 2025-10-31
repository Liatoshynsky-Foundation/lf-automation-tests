import {Locator} from "@playwright/test";
import * as allure from "allure-js-commons";

export class ContactUsBtn {
    button: Locator;
    link: Locator;
    image: Locator;

    constructor(parent: Locator) {
        this.button = parent.locator('a[href*="/contacts"] > button')
        this.link = parent.locator('a[href*="/contacts"]:has(button)');
        this.image = parent.locator('img[alt="Contact Us Button"]');
    }

    async click(): Promise<void> {
        await allure.step('Click Contact Us Btn', async () => {
            await this.button.click();
        })
    }

    async getText(): Promise<string> {
        let btnText: string = "";
        await allure.step('Get text on Contact Us Btn', async () => {
            btnText = await this.button.innerText();
        })
        return btnText.trim();
    }

    async getLink(): Promise<string> {
        let link: string = "";
        await allure.step('Get link of Contact Us Btn', async () => {
            link = await this.link.getAttribute('href') ?? '';
        })
        return link;
    }
}