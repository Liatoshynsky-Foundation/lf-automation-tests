import {expect, Locator, Page} from '@playwright/test';
import {BaseComponent} from '../BaseComponent';

export class FilterChipComponent extends BaseComponent {
    private readonly chip: Locator;
    private readonly label: Locator;
    private readonly deleteBtn: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.chip = this.parent.locator('.MuiChip-root');
        this.label = this.chip.locator('.MuiChip-label');
        this.deleteBtn = this.chip.locator('[data-testid="delete-icon"]');
    }

    async getLabel(): Promise<string> {
        return (await this.label.textContent())?.trim() || '';
    }

    async clickDelete(): Promise<void> {
        await this.deleteBtn.click();
    }

    async expectVisible(): Promise<void> {
        await expect(this.chip).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.chip).toBeHidden();
    }
}