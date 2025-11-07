import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterBadgeComponent } from './FilterBadgeComponent';
import { FiltersMenuComponent } from './FiltersMenuComponent';
import { step } from 'allure-js-commons';

/**
 * Represents the "Filters" button that opens the filters panel.
 */
export class FilterButtonComponent extends BaseComponent {
    private button: Locator;
    private menuContainer: Locator;
    private badgeLocator: Locator;
    private badge: FilterBadgeComponent;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.button = this.parent.locator('button:has-text("Фільтри")');
        this.menuContainer = this.page.locator('.MuiBox-root.css-yd8sa2');
        this.badgeLocator = this.page.locator('.MuiBadge-badge');
        this.badge = new FilterBadgeComponent(page, this.button);
    }

    async openFiltersMenu(): Promise<FiltersMenuComponent> {
        return await step("Open Filters menu", async () => {
            await this.button.click();
            return new FiltersMenuComponent(this.page, this.menuContainer);
        });
    }

    async closeFiltersMenu(): Promise<void> {
        return await step("Close Filters menu", async () => {
            await this.button.click();
        });
    }

    async getBadgeCount(): Promise<number> {
        return await step("Get Filters badge count", async () => {
            return this.badge.getCount();
        });
    }

    async isBadgeHidden(): Promise<boolean> {
        return await step("Check if Filters badge is hidden", async () => {
            return this.badge.isHidden();
        });
    }

    async isBadgeVisible(): Promise<boolean> {
        return await step("Check if Filters badge is visible", async () => {
            return this.badge.isVisible();
        });
    }
}