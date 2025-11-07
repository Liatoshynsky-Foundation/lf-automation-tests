import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterListItemComponent } from './FilterListItemComponent';
import { FilterYearItemComponent } from './FilterYearItemComponent';
import { FilterChipComponent } from './FilterChipComponent';
import { step } from 'allure-js-commons';

export class FiltersMenuComponent extends BaseComponent {
    activeChip: FilterChipComponent;
    private container: Locator;
    private filterTitles: Locator;
    private clearAllButton: Locator;
    private backdrop: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.container = this.page.locator('.MuiBox-root.css-yd8sa2');
        this.filterTitles = this.container.locator('.MuiTypography-root.MuiTypography-body1');
        this.activeChip = new FilterChipComponent(this.page, this.container);
        this.clearAllButton = this.page.locator('button:has(svg path[d*="M3 6h18"])');
        this.backdrop = this.page.locator('.MuiBackdrop-root.MuiModal-backdrop');
    }

    getListFilter(name: string): FilterListItemComponent {
        return new FilterListItemComponent(this.page, this.container, name);
    }

    getYearFilter(name: string): FilterYearItemComponent {
        return new FilterYearItemComponent(this.page, this.container, name);
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
            if (await this.clearAllButton.isVisible()) {
                await this.clearAllButton.click();
            }
        });
    }

    async isClearAllButtonVisible(): Promise<boolean> {
        return await step('Check if Clear All button is visible', async () => {
            return await this.clearAllButton.isVisible().catch(() => false);
        });
    }

    async closeOpenedDropdown(): Promise<void> {
        return await step('Close open dropdown (click outside)', async () => {
            if (await this.backdrop.isVisible()) {
                await this.backdrop.click();
            } else {
                await this.page.mouse.click(10, 10);
            }
        });
    }
}