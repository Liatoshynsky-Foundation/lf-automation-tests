import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../BaseComponent';
import { YearInputIndex } from "../../../data/filter.constants";
import { step } from 'allure-js-commons';
/**
 * Represents the "Year" filter item with range inputs ("From" / "To").
 * Allows opening, setting, clearing, and closing the dropdown.
 */
export class FilterYearItemComponent extends BaseComponent {
    private container: Locator;
    private dropdownPanel: Locator;
    private clearFilterButton: Locator;
    private fromInput: Locator;
    private toInput: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.container = this.page.locator('[data-testid="MusicTableFilters-year"]');
        this.dropdownPanel = this.page.locator('.MuiPaper-root.MuiPopover-paper');
        this.clearFilterButton = this.page.locator('div[aria-label="clear"]');
        this.fromInput = this.dropdownPanel.locator('.MuiTextField-root input').nth(YearInputIndex.FROM);
        this.toInput = this.dropdownPanel.locator('.MuiTextField-root input').nth(YearInputIndex.TO);
    }

    private async getHelperByInput(input: Locator): Promise<Locator> {
        const id = await input.getAttribute('aria-describedby');
        return this.page.locator(`#${id}`);
    }

    private async getFromHelper(): Promise<Locator> {
        return this.getHelperByInput(this.fromInput);
    }

    private async getToHelper(): Promise<Locator> {
        return this.getHelperByInput(this.toInput);
    }

    async openDropdown(): Promise<void> {
        return await step('Open Year dropdown', async () => {
            await this.container.click();
        });
    }

    async isVisible(): Promise<boolean> {
        return await step('Check if Year dropdown is visible', async () => {
            return this.dropdownPanel.isVisible();
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

    async setYearRange(from: string, to: string): Promise<void> {
        return await step(`Set Year range directly: ${from} - ${to}`, async () => {
            await this.fromInput.fill(from);
            await this.toInput.fill(to);
        });
    }

    async clickClearFilterButton(): Promise<void> {
        return await step('Click "Clear filter" button', async () => {
            await this.clearFilterButton.click();
        });
    }

    async isFromValidationMessageVisible(): Promise<boolean> {
        const helper = await this.getFromHelper();
        return await helper.isVisible();
    }

    async getFromValidationText(): Promise<string> {
        const helper = await this.getFromHelper();
        return (await helper.textContent())?.trim() || '';
    }

    async isToValidationMessageVisible(): Promise<boolean> {
        const helper = await this.getToHelper();
        return await helper.isVisible();
    }

    async getToValidationText(): Promise<string> {
        const helper = await this.getToHelper();
        return (await helper.textContent())?.trim() || '';
    }
}