import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../BaseComponent";
import { step } from "allure-js-commons";

/**
 * Represents the small badge displayed on the "Filters" button.
 * The badge shows the number of currently active filters.
 * If no filters are active, the badge may be hidden.
 */
export class FilterBadgeComponent extends BaseComponent {
    private badge: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.badge = this.page.locator('.MuiBadge-root .MuiBadge-badge');
    }

    async getCount(): Promise<number> {
        return await step("Get count of active filters in badge", async () => {
            const text = await this.badge.textContent();
            return parseInt(text || "0", 10);
        });
    }

    async isHidden(): Promise<boolean> {
        return await step("Check if badge is hidden", async () => {
            return this.badge.isHidden();
        });
    }

    async isVisible(): Promise<boolean> {
        return await step("Check if badge is visible", async () => {
            return this.badge.isVisible();
        });
    }
}