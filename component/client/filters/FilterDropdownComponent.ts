import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../BaseComponent";
import { FilterOptionItemComponent } from "./FilterOptionItemComponent";
import { step } from "allure-js-commons";

/**
 * Represents the dropdown inside each filter (e.g., Genre, Category, Author etc.)
 * Contains list of options and "Clear filter" button.
 */
export class FilterDropdownComponent extends BaseComponent {
    private menu: Locator;
    private clearButton: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.menu = this.parent.locator(".MuiList-root.MuiMenu-list");
        this.clearButton = this.parent.locator('[data-testid="img"]');
    }

    getOption(name: string): FilterOptionItemComponent {
        return new FilterOptionItemComponent(this.page, this.menu, name);
    }

    async clear(): Promise<void> {
        return await step("Clear all filters dropdown", async () => {
            if (await this.clearButton.isVisible()) {
                await this.clearButton.click();
            } else {
                console.warn("Trash button is not visible — no filters selected.");
            }
        });
    }
}