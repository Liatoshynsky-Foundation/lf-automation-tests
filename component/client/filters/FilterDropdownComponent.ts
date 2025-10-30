import {Page,Locator} from "@playwright/test";
import { BaseComponent } from '../BaseComponent';
import { FilterOptionItemComponent } from './FilterOptionItemComponent';

/**
 * Represents the dropdown inside each filter (e.g., Genre, Category, Author etc.)
 * Contains list of options and "Clear filter" button.
 */

export class FilterDropdownComponent extends BaseComponent {
    private menu: Locator;
    private clearButton: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.menu = this.parent.locator('.MuiList-root.MuiMenu-list');
        this.clearButton = this.parent.locator('[data-testid="img"]')
    }

    getOption(name: string): FilterOptionItemComponent {
        return new FilterOptionItemComponent(this.page, this.menu, name);
    }

    async clear(): Promise<void> {
        if (await this.clearButton.isVisible({ timeout: 1000 })) {
            await this.clearButton.click({ force: true });
            await this.page.waitForTimeout(300);
        } else {
            console.warn('Clear button is not visible - no filters selected.');
        }
    }
}