import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { step } from 'allure-js-commons';

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

    async getLabelText(): Promise<string> {
        return await step(`Get label text of filter option`, async () => {
            return (await this.label.textContent())?.trim() || '';
        });
    }

    async isVisible(): Promise<boolean> {
        return await step(`Check if option is visible`, async () => {
            return this.label.isVisible();
        });
    }

    async select(): Promise<void> {
        return await step(`Select filter option`, async () => {
            await this.label.click();
        });
    }

    async isSelected(): Promise<boolean> {
        return await step(`Check if option is selected`, async () => {
            return this.checkbox.isChecked();
        });
    }

    async deselect(): Promise<void> {
        return await step(`Deselect filter option`, async () => {
            if (await this.checkbox.isChecked()) {
                await this.label.click();
            }
        });
    }
}