import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterDropdownComponent } from './FilterDropdownComponent';
import { FilterChipComponent } from './FilterChipComponent';
import { step } from 'allure-js-commons';
import {FilterNames} from "../../../data/filter.constants";

/**
 * Represents a single filter item in the Filters menu (e.g., Genre, Category, Author).
 * Supports opening and closing dropdowns and retrieving related components.
 */
export class FilterListItemComponent extends BaseComponent {
    private readonly testId: string;
    private container: Locator;
    private title: Locator;
    private dropdown: Locator;

    constructor(page: Page, parent: Locator, filter: FilterNames) {
        super(page, parent);
        this.testId = filter;
        this.container = this.page.locator(`[data-testid="${this.testId}"]`);
        this.title = this.container.locator('p');
        this.dropdown = this.page.locator('.MuiPaper-root.MuiPopover-paper');
    }

    async getTitleText(): Promise<string> {
        return await step(`Get title of filter`, async () => {
            return (await this.title.textContent())?.trim() || '';
        });
    }

    async openDropdown(): Promise<FilterDropdownComponent> {
        return await step('Open dropdown for filter', async () => {
            await this.container.click();
            return new FilterDropdownComponent(this.page, this.dropdown);
        });
    }

    getChip(): FilterChipComponent {
        return new FilterChipComponent(this.page, this.container);
    }

    async isDropdownVisible(): Promise<boolean> {
        return await step(`Check if dropdown is visible`, async () => {
            return this.dropdown.isVisible();
        });
    }
}