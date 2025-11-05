import {Locator, Page} from '@playwright/test';
import {BaseComponent} from '../client/BaseComponent';
import {step} from 'allure-js-commons';

export class AdminMenuItemComponent extends BaseComponent {
    icon: Locator;
    text: Locator;
    expandIcon: Locator;

    constructor(page: Page, menuItemLocator: Locator) {
        super(page, menuItemLocator);
        this.icon = this.parent.locator('.MuiListItemIcon-root img');
        this.text = this.parent.locator('.MuiListItemText-primary');
        this.expandIcon = this.parent.locator('.MuiBox-root img[alt="close list"]');
    }

    async click(): Promise<void> {
        await step('Click menu item', async () => {
            await this.parent.click();
        });
    }

    async getText(): Promise<string> {
        return await step('Get menu item text', async () => {
            return await this.text.textContent() || '';
        });
    }

    async isSelected(): Promise<boolean> {
        return await step('Check if menu item is selected', async () => {
            const className = await this.parent.getAttribute('class');
            return className?.includes('Mui-selected') || false;
        });
    }

    async hasExpandIcon(): Promise<boolean> {
        return await step('Check if menu item has expand icon', async () => {
            return await this.expandIcon.isVisible();
        });
    }

    async expand(): Promise<void> {
        await step('Expand menu item', async () => {
            const hasIcon = await this.hasExpandIcon();
            if (hasIcon) {
                await this.expandIcon.click();
            }
        });
    }

    async getIconAlt(): Promise<string> {
        return await step('Get menu item icon alt text', async () => {
            return await this.icon.getAttribute('alt') || '';
        });
    }
}