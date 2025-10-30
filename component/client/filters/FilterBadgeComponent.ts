import {Locator, Page} from "@playwright/test";
import {BaseComponent} from "../BaseComponent";

/**
 * Represents the small badge displayed on the "Filters" button.
 *
 * The badge shows the number of currently active filters.
 * If no filters are active, the badge may be hidden.
*/

export class FilterBadgeComponent extends BaseComponent {
    private badge: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.badge = this.page.locator('.MuiBadge-root .MuiBadge-badge');}


    async getCount() {
        const text = await this.badge.textContent();
        return parseInt(text || "0", 10);
    }
}