import {Locator, Page} from '@playwright/test';
import {BaseComponent} from '../client/BaseComponent';
import {step} from 'allure-js-commons';
import {AdminMenuItemComponent} from './AdminMenuItemComponent';

export class AdminSidebarComponent extends BaseComponent {
    logoButton: Locator;
    closeButton: Locator;
    menuList: Locator;

    constructor(page: Page) {
        super(page, page.locator('.MuiDrawer-paper.MuiDrawer-paperAnchorLeft'));
        this.logoButton = this.parent.locator('button img[alt="logo"]').locator('..');
        this.closeButton = this.parent.locator('button img[alt="close button"]').locator('..');
        this.menuList = this.parent.locator('ul.MuiList-root');
    }

    async expandSidebar(): Promise<void> {
        await step('Expand sidebar', async () => {
            await this.logoButton.click();
        });
    }

    async collapseSidebar(): Promise<void> {
        await step('Collapse sidebar', async () => {
            await this.closeButton.click();
        });
    }

    getMenuItem(menuText: string): AdminMenuItemComponent {
        return new AdminMenuItemComponent(this.page, this.menuList, menuText);
    }

    async getAllMenuItems(): Promise<AdminMenuItemComponent[]> {
        return await step('Get all menu items', async () => {
            const items = await this.menuList.locator('.MuiListItemButton-root').all();
            return items.map((_, index) => 
                new AdminMenuItemComponent(this.page, this.menuList, index)
            );
        });
    }

    getSectionHeader(headerText: string): Locator {
        return this.menuList.locator(`li.MuiListSubheader-root:has-text("${headerText}")`);
    }
}