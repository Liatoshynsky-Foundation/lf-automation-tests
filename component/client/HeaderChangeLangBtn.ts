import {Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";
import {LanguageDetails} from "../../data/enums";


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
        await this.image.click();
    }

    async getImage(): Promise<string> {
        return await this.image.getAttribute('src') || "";
    }

    async waitForHeaderChangeLangBtnVisible(): Promise<void> {
        await this.waitIsVisible(this.menuLocator);
    }

    async selectLanguage(language: LanguageDetails): Promise<void> {

        await this.menuLocator.locator(`li:has-text("${language.value}")`).click();
        await this.page.waitForURL(`**/${language.shortName}/**`, { waitUntil: 'domcontentloaded' });
    }

    async getSelectedLanguage(): Promise<string> {
        return (await this.checkSelected.innerText());
    }
}