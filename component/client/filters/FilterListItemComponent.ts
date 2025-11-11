import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterDropdownComponent } from './FilterDropdownComponent';
import { FilterChipComponent } from './FilterChipComponent';
import { step } from 'allure-js-commons';

/**
 * Represents a single filter item in the Filters menu (e.g., Genre, Category, Author).
 * Supports opening and closing dropdowns and retrieving related components.
 */
export class FilterListItemComponent extends BaseComponent {
    private filterLabel: Locator;
    private root: Locator;
    private title: Locator;
    private dropdownIcon: Locator;
    private popup: Locator;

    constructor(page: Page, parent: Locator, filterName: string) {
        super(page, parent);
        this.filterLabel = this.parent.locator(`p:has-text("${filterName}")`);
        this.root = this.filterLabel.locator('xpath=ancestor::div[contains(@class, "MuiBox-root")][1]');
        this.title = this.root.locator('p');
        this.dropdownIcon = this.root.locator('img[alt="dropdown"], svg[width="16"]').first();
        this.popup = this.page.locator('.MuiPaper-root.MuiPopover-paper');
    }

    async getTitle(): Promise<string> {
        return await step(`Get title of filter`, async () => {
            return (await this.title.textContent())?.trim() || '';
        });
    }

    async openDropdown(): Promise<FilterDropdownComponent> {
        return await step(`Open dropdown for filter`, async () => {
            await this.dropdownIcon.click({ force: true });
            return new FilterDropdownComponent(this.page, this.popup);
        });
    }

    getChip(): FilterChipComponent {
        return new FilterChipComponent(this.page, this.root);
    }

    async isDropdownVisible(): Promise<boolean> {
        return await step(`Check if dropdown is visible`, async () => {
            return this.popup.isVisible();
        });
    }
}