import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { step } from 'allure-js-commons';

/**
 * Represents the "Year" filter item with range inputs ("From" / "To").
 * Allows opening, setting, clearing, and closing the dropdown.
 */
export class FilterYearItemComponent extends BaseComponent {
    private dropdownPanel: Locator;
    private root: Locator;
    private title: Locator;
    private dropdownIcon: Locator;
    private fromInput: Locator;
    private toInput: Locator;
    private clearButton: Locator;

    constructor(page: Page, parent: Locator, filterName: string) {
        super(page, parent);

        const filterLabel = this.parent.locator(`p:has-text("${filterName}")`);
        this.root = filterLabel.locator('xpath=ancestor::div[contains(@class, "MuiBox-root")][1]');
        this.title = this.root.locator('p');

        this.dropdownIcon = this.root.locator('img[alt="dropdown"], svg[width="16"]').first();
        this.dropdownPanel = this.page.locator('.MuiPaper-root.MuiPopover-paper');

        const inputs = this.dropdownPanel.locator('.MuiTextField-root input');
        this.fromInput = inputs.nth(0);
        this.toInput = inputs.nth(1);

        this.clearButton = this.page.locator('div[aria-label="trash"]');
    }

    async openDropdown(): Promise<void> {
        return await step('Open Year dropdown', async () => {
            await this.dropdownIcon.click();
        });
    }

    async closeDropdown(): Promise<void> {
        return await step('Close Year dropdown', async () => {
            await this.dropdownIcon.click();
        });
    }

    async isDropdownVisible(): Promise<boolean> {
        return await step('Check if Year dropdown is visible', async () => {
            return this.dropdownPanel.isVisible();
        });
    }

    async setRange(from: string, to: string): Promise<void> {
        return await step(`Set year range: From = ${from}, To = ${to}`, async () => {
            if (!(await this.isDropdownVisible())) {
                await this.openDropdown();
            }
            await this.fromInput.fill(from);
            await this.toInput.fill(to);
        });
    }

    async getFromValue(): Promise<string> {
        return await step('Get value from "From" input', async () => {
            return this.fromInput.inputValue();
        });
    }

    async getToValue(): Promise<string> {
        return await step('Get value from "To" input', async () => {
            return this.toInput.inputValue();
        });
    }

    async clear(): Promise<void> {
        return await step('Click "Clear filter" (trash) button', async () => {
            await this.clearButton.click();
        });
    }

    async isValidationMessageVisible(field: 'Від' | 'До'): Promise<boolean> {
        return await step(`Check if validation message visible for "${field}"`, async () => {
            const message = this.page.locator(`p#${field}-helper-text`);
            return message.isVisible();
        });
    }

    async setYearRange(from: string, to: string): Promise<void> {
        return await step(`Set Year range directly: ${from} - ${to}`, async () => {
            await this.openDropdown();
            await this.fromInput.fill(from);
            await this.toInput.fill(to);
        });
    }

    async updateFromInput(value: string): Promise<void> {
        await step(`Update "From" input with value "${value}"`, async () => {
            await this.fromInput.click();
            await this.fromInput.press('Backspace');
            await this.fromInput.fill(value);
        });
    }

    async updateToInput(value: string): Promise<void> {
        await step(`Update "To" input with value "${value}"`, async () => {
            await this.toInput.click();
            await this.toInput.press('Backspace');
            await this.toInput.fill(value);
        });
    }
}