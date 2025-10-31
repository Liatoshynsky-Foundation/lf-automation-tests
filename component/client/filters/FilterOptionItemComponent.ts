import {expect, Locator, Page} from '@playwright/test';
import {BaseComponent} from '../BaseComponent';

/**
 * Represents an option item inside a filter dropdown menu
 */

export class FilterOptionItemComponent extends BaseComponent {
    private checkbox: Locator;
    private label: Locator;

    constructor(page: Page, parent: Locator, optionName: string) {
        super(page, parent);

        const root = this.parent.locator(`.MuiBox-root.css-b82atk:has-text("${optionName}")`);
        this.checkbox = root.locator('input[type="checkbox"]');
        this.label = root.locator('p');
    }

    async getLabelText() {
        return (await this.label.textContent())?.trim() || '';
    }

    async expectVisible() {
        await expect(this.label).toBeVisible();
    }

    async select() {
        await this.label.click();
    }

    async isSelected() {
        return await this.checkbox.isChecked();
    }

    async deselect() {
        if (await this.checkbox.isChecked()) {
            await this.label.click();
        }
    }
}