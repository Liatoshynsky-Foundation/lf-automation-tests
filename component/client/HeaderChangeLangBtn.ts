import {Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";
import {LanguageDetails} from "../../data/enums";
import * as allure from "allure-js-commons";

export class HeaderChangeLangBtn extends BaseComponent {
    image: Locator;
    menuLocator: Locator;
    checkSelected: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.image = page.locator('button img[alt="select language"]');
        this.menuLocator = page.locator('ul[role="menu"]');
        this.checkSelected = page.locator('ul[role="menu"] li:has(img[alt="selected locale"])');
    }

    async click(): Promise<void> {
        await allure.step('Click Change Language Btn', async () => {
            await this.image.click();
        })
    }

    async getImage(): Promise<string> {
        let link: string = "";
        await allure.step('Get image link of Change Language Btn', async () => {
            link = await this.image.getAttribute('src') || "";
        })
        return link;
    }

    async waitForHeaderChangeLangBtnVisible(): Promise<void> {
        await allure.step(`Check if Change Language Btn is visible`, async () => {
            await this.waitIsVisible(this.menuLocator);
        })
    }

    async selectLanguage(language: LanguageDetails): Promise<void> {
        await allure.step(`Select Language ${language}`, async () => {
            await this.menuLocator.locator(`li:has-text("${language.value}")`).click();
            await this.page.waitForURL(`**/${language.shortName}/**`, {waitUntil: 'domcontentloaded'});
        })
    }

    async getSelectedLanguage(): Promise<string> {
        let language: string = '';
        await allure.step(`Get selected Language`, async () => {
            language = await this.checkSelected.innerText();
        })
        return language;
    }
}