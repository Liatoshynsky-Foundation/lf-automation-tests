import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterBadgeComponent } from './FilterBadgeComponent';
import { FiltersMenuComponent } from './FiltersMenuComponent';

/**
 * Represents the "Filters" button that opens the filters panel.
 */

export class FiltersButtonComponent extends BaseComponent {
    private button: Locator;
    private menuRoot: Locator;
    private badgeLocator: Locator;
    private badge: FilterBadgeComponent;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.button = this.parent.locator('button:has-text("Фільтри")');
        this.menuRoot = this.page.locator('.MuiBox-root.css-yd8sa2');
        this.badgeLocator = this.page.locator('.MuiBadge-badge');
        this.badge = new FilterBadgeComponent(page, this.button);
    }

    async openFiltersMenu(): Promise<FiltersMenuComponent> {
        await this.button.click();
        return new FiltersMenuComponent(this.page, this.menuRoot);
    }

    async closeFiltersMenu(): Promise<void> {
        await this.button.click();
    }

    async getBadgeCount(): Promise<number> {
        return this.badge.getCount();
    }

    async expectBadgeHidden(): Promise<void> {
        await expect(this.badgeLocator).toBeHidden();
    }
}