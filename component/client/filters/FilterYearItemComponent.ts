import {Locator, Page} from '@playwright/test';
import {BaseComponent} from '../BaseComponent';

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

        this.clearButton = this.page.locator('[data-testid="img"]');
    }

    async openDropdown(): Promise<void> {
        await this.dropdownIcon.click();
    }

    async closeDropdown(): Promise<void> {
        await this.dropdownIcon.click();
    }

    async isDropdownVisible(): Promise<boolean> {
        return await this.dropdownPanel.isVisible();
    }

    async setRange(from: string, to: string): Promise<void> {
        if (!(await this.isDropdownVisible())) {
            await this.openDropdown();
        }
        await this.fromInput.fill(from);
        await this.toInput.fill(to);
    }

    async getFromValue(): Promise<string> {
        return await this.fromInput.inputValue();
    }

    async getToValue(): Promise<string> {
        return await this.toInput.inputValue();
    }

    async clear(): Promise<void> {
        await this.clearButton.click();
    }
}