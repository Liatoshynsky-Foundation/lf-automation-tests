import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { step } from 'allure-js-commons';
import {FilterOptions} from "../../../data/filter.constants";

/**
 * Represents an option item inside a filter dropdown menu
 */
export class FilterOptionItemComponent extends BaseComponent {
    private checkboxContainer: Locator;
    private checkbox: Locator;
    private labelText: Locator;

    constructor(page: Page, parent: Locator, optionName: FilterOptions) {
        super(page, parent);

        this.checkboxContainer = this.parent.locator(`p:has-text("${optionName}")`).locator('..');
        this.checkbox = this.checkboxContainer.locator('input[type="checkbox"]');
        this.labelText = this.checkbox.locator('p');
    }

    async getLabelText(): Promise<string> {
        return await step(`Get label text of filter option`, async () => {
            return (await this.labelText.textContent())?.trim() || '';
        });
    }

    async isVisible(): Promise<boolean> {
        return await step(`Check if option is visible`, async () => {
            return this.labelText.isVisible();
        });
    }

    async select(): Promise<void> {
        return await step(`Select filter option`, async () => {
            await this.checkbox.click();
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
                await this.checkbox.click();
            }
        });
    }
}