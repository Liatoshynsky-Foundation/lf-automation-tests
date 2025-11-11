import {expect, Locator} from "@playwright/test";
import {PageItemComponent} from './PageItemComponent';

export class PageMenuItemComponent {

    name: Locator;
    dropdownBtn: Locator;
    link: Locator;
    menuLocator: Locator;
    pages: PageItemComponent[];

    constructor(parent: Locator, pages: PageItemComponent[] = []) {
        this.name = parent;
        this.dropdownBtn = parent.locator('button');
        this.link = parent.locator('xpath=ancestor::a[1]');
        this.menuLocator = parent.page().locator('ul[role="menu"]:visible');
        this.pages = pages;
    }

    async getName(): Promise<string> {
        return await this.name.textContent() || '';
    }

    async getLink(): Promise<string> {
        const hasLink = await this.link.count();
        if (hasLink === 0) return '';
        const href = await this.link.getAttribute('href') ?? '';
        return href;
    }


    async clickDropdown(): Promise<void> {

        await this.name.click({force: true});
    }

    async subMenuIsVisible(): Promise<boolean> {
        try {
            await this.menuLocator.waitFor({state: 'visible', timeout: 5000});
            return true;
        } catch {
            return false;
        }
    }

    async getSubMenu(): Promise<void> {
        if (!(await this.subMenuIsVisible())) {
            await this.clickDropdown();
            await expect(this.menuLocator).toBeVisible({timeout: 10000});
        }
    }

    async getSubPages(): Promise<PageItemComponent[]> {
        await this.getSubMenu();

        const pages: PageItemComponent[] = [];
        const count = await this.menuLocator.locator('li').count();


        for (let i = 0; i < count; i++) {
            const li = this.menuLocator.locator('li').nth(i);
            pages.push(new PageItemComponent(this.name.page(), li));
        }

        this.pages = pages;
        return pages;
    }

    async clickSubPageByName(str: string): Promise<void> {
        const subPages = await this.getSubPages();

        for (const page of subPages) {
            const pageName = (await page.get_Name()).trim();
            if (pageName === str.trim()) {
                await page.headerclick();
                return;
            }
        }
        throw new Error(`No such subpage: ${str}`);
    }
}