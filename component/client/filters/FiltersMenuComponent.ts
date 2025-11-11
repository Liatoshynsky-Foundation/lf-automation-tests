import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterListItemComponent } from './FilterListItemComponent';
import { FilterYearItemComponent } from './FilterYearItemComponent';
import { FilterChipComponent } from './FilterChipComponent';
import { step } from 'allure-js-commons';
import {FilterNames} from "../../../data/filter.constants";

export class FiltersMenuComponent extends BaseComponent {
    activeChip: FilterChipComponent;
    private container: Locator;
    private filterTitles: Locator;
    private clearAllFiltersButton: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.container = this.page.locator('[data-testid="ControlPanel-controlsColumn"]');
        this.filterTitles = this.container.locator('[data-testid^="MusicTableFilters-"]');
        this.activeChip = new FilterChipComponent(this.page, this.container);
        this.clearAllFiltersButton = this.container.locator('[data-testid="MusicTableFilters-clear"]');
    }

    getListFilter(filterName: FilterNames | string): FilterListItemComponent {
        return new FilterListItemComponent(this.page, this.container, filterName as FilterNames);
    }

    getYearFilter(): FilterYearItemComponent {
        return new FilterYearItemComponent(this.page, this.container);
    }

    getActiveChip(): FilterChipComponent {
        return new FilterChipComponent(this.page, this.container);
    }

    async getAllFilterNames(): Promise<string[]> {
        return await step('Get all filter names', async () => {
            return this.filterTitles.allInnerTexts();
        });
    }

    async getActiveChipLabel(): Promise<string> {
        return await step('Get active chip label', async () => {
            return this.activeChip.getLabel();
        });
    }

    async isVisible(): Promise<boolean> {
        return await step('Check if Filters menu is visible', async () => {
            return this.container.isVisible();
        });
    }

    async isHidden(): Promise<boolean> {
        return await step('Check if Filters menu is hidden', async () => {
            return this.container.isHidden();
        });
    }

    async clearAllFilters(): Promise<void> {
        return await step('Clear all selected filters', async () => {
            if (await this.clearAllFiltersButton.isVisible()) {
                await this.clearAllFiltersButton.click();
            }
        });
    }

    async isClearAllButtonVisible(): Promise<boolean> {
        return await step('Check if Clear All button is visible', async () => {
            return await this.clearAllFiltersButton.isVisible().catch(() => false);
        });
    }

    async closeOpenedDropdown(): Promise<void> {
        return await step('Close open dropdown (click outside)', async () => {
            await this.page.mouse.click(10, 10);
        });
    }
}