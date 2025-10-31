import {expect, Locator, Page, test} from '@playwright/test';
import {PageMenuItemComponent} from './PageMenuItemComponent';
import {HeaderChangeLangBtn} from './HeaderChangeLangBtn';
import {SupportFoundationBtn} from './SupportFundationBtn';
import {BaseComponent} from "./BaseComponent";
import * as allure from "allure-js-commons";

export class HeaderComponent extends BaseComponent {
    logo: Locator;
    pageMenu: Locator;
    playerBtn: Locator;
    changeLangBtn: HeaderChangeLangBtn;
    supportFundBtn: SupportFoundationBtn;

    constructor(page: Page) {
        super(page, page.locator('header'));
        this.logo = this.parent.locator('a svg[title="Company logo"]').first();
        this.playerBtn = page.locator('button[aria-label="Toggle audio player"]');
        this.changeLangBtn = new HeaderChangeLangBtn(this.page, this.parent);
        this.supportFundBtn = new SupportFoundationBtn(this.parent);
        this.pageMenu = this.parent.locator('div[aria-label="Button Group"]:has(button)');
    }

    async getMenuItems(): Promise<PageMenuItemComponent[]> {
        let items: PageMenuItemComponent[] = [];
        await allure.step('Get Header Btns of Page menu', async () => {
            await this.waitIsVisible(this.pageMenu, 50000);
            const buttons = await this.pageMenu.locator('button').all();
            items = buttons.map(button => new PageMenuItemComponent(button));
        })
        return items;
    }

    async getMenuByName(str: string): Promise<PageMenuItemComponent> {
        let elementFound: PageMenuItemComponent;
        await test.step(`Check if component is visible`, async () => {
            const elements = await this.getMenuItems()

            for (const element of elements) {
                const itemName: string = (await element.getName()).trim();
                if (itemName === str.trim()) {
                    elementFound = element;
                    break
                }
            }
            expect(elementFound, {message: (`Menu item not found: ${str}`)}).not.toBeNull();
        });
        return elementFound!;
    }

    async clickMenuByName(name: string) {
        await allure.step(`Click on page item: ${name}`, async () => {
            const menuItem = await this.getMenuByName(name);
            if (menuItem) {
                await test.step(`Click on menu item: ${name}`, async () => {
                    await menuItem.clickDropdown();
                });
            }
        })
    }
}

