import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { FilterListItemComponent } from './FilterListItemComponent';
import { FilterYearItemComponent } from './FilterYearItemComponent';
import { FilterChipComponent } from './FilterChipComponent';


export class FiltersMenuComponent extends BaseComponent {
    private container: Locator;
    private filterTitles: Locator;
    readonly activeChip: FilterChipComponent;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.container = this.parent.locator('.MuiBox-root.css-1r1kccx');
        this.filterTitles = this.container.locator('.MuiTypography-root.MuiTypography-body1');
        this.activeChip = new FilterChipComponent(this.page, this.container);
    }

    async init(): Promise<this> {
        await expect(this.container).toBeVisible({ timeout: 5000 });
        return this;
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
        return this.filterTitles.allInnerTexts();
    }

    async getActiveChipLabel(): Promise<string> {
        return this.activeChip.getLabel();
    }
}