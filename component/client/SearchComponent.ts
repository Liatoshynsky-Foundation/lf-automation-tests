import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { step } from 'allure-js-commons';

export class SearchComponent extends BaseComponent {
    private searchIcon: Locator;
    private input: Locator;
    private clearIcon: Locator;
    private optionList: Locator;
    private options: Locator;
    private optionItemByName: (name: string) => Locator;
    private noOptionsMessage: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.searchIcon = this.parent.locator('[data-testid="music-search"]');
        this.input = this.searchIcon.locator('input[role="combobox"]');
        this.clearIcon = this.searchIcon.locator('img[alt="close"]');
        this.optionList = this.page.locator('.MuiAutocomplete-listbox');
        this.options = this.optionList.locator('.MuiAutocomplete-option');
        this.optionItemByName = (name: string) =>
            this.optionList.locator(`.MuiAutocomplete-option:has-text("${name}")`);
        this.noOptionsMessage = this.page.locator('.MuiAutocomplete-noOptions p');
    }

    async isVisible(): Promise<boolean> {
        return await step('Check if Search is visible', async () => {
            return this.searchIcon.isVisible();
        });
    }

    async clickSearchIcon(): Promise<void> {
        await step('Click on search icon to activate search input', async () => {
            await this.searchIcon.click();
        });
    }

    async typeSearchQuery(query: string): Promise<void> {
        await step(`Type search query: "${query}"`, async () => {
            await this.input.click();
            await this.input.fill(query);
        });
    }
    async waitForOptionsVisible(): Promise<void> {
        await step('Wait for search suggestions listbox to be visible', async () => {
            await expect(this.optionList).toBeVisible();
        });
    }

    async selectOptionByName(optionName: string): Promise<void> {
        await step(`Select option "${optionName}" from dropdown`, async () => {
            const option = this.optionItemByName(optionName);
            await option.click();
        });
    }

    async clearSearch(): Promise<void> {
        await step('Clear search input field', async () => {
            if (await this.clearIcon.isVisible()) {
                await this.clearIcon.click();
            }
        });
    }

    async getOptionsText(): Promise<string[]> {
        return await step('Get text of all visible search suggestions', async () => {
            await this.waitForOptionsVisible();
            return this.options.allTextContents();
        });
    }

    async getInputValue(): Promise<string> {
        return await step('Get current search input value', async () => {
            return this.input.inputValue();
        });
    }

    async closeSearch(): Promise<void> {
        await step('Close search suggestions if visible', async () => {
            const isVisible = await this.optionList.isVisible();
            if (isVisible) {
                await this.page.mouse.click(10, 10);
                await expect(this.optionList).toBeHidden();
            }
        });
    }

    async isDropdownHidden(): Promise<boolean> {
        return await step('Check if dropdown suggestions are hidden', async () => {
            return await this.optionList.isHidden();
        });
    }

    async getNoResultsText(): Promise<string | null> {
        return await step('Get text of "no results" message', async () => {
            if (await this.noOptionsMessage.isVisible()) {
                return this.noOptionsMessage.textContent();
            }
            return null;
        });
    }
}