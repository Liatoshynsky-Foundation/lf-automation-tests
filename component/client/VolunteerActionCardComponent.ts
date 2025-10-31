import {Locator} from '@playwright/test';

export class VolunteerActionCardComponent {
    private root: Locator;
    private mainDescription: Locator;
    private actionTitle: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.mainDescription = this.root.locator('p.css-1tm0pgl');
        this.actionTitle = this.root.locator('p.css-3gdhnp');
    }

    async getActionTitle(): Promise<string | null> {
        return this.actionTitle.textContent();
    }

    async getMainDescription(): Promise<string | null> {
        return this.mainDescription.textContent();
    }

    async isVisible(): Promise<boolean> {
        return this.root.isVisible();
    }
}