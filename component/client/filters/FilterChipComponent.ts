import { Locator, Page} from '@playwright/test';
import {BaseComponent} from '../BaseComponent';

export class FilterChipComponent extends BaseComponent {
    private chip: Locator;
    private label: Locator;
    private deleteBtn: Locator;

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

    async isVisible(): Promise<boolean> {
        return await this.chip.isVisible();
    }

    async isHidden(): Promise<boolean> {
        return await this.chip.isHidden();
    }
}