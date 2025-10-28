import { Locator, Page } from '@playwright/test';

export class InputFieldPassComponent {
    page: Page;
    input: Locator;
    toggleButton: Locator;
    label: Locator;

    constructor(page: Page, inputId: string) {
        this.page = page;
        this.input = page.locator(`#${inputId}`);
        this.toggleButton = page.locator(`#${inputId} + div button[aria-label*="password"]`);
        this.label = page.locator(`label[for="${inputId}"]`);
    }

    async fill(value: string) {
        await this.input.pressSequentially(value, { delay: 100 });
    }

    async toggleVisibility() {
        await this.toggleButton.click();
    }

    async getValue(): Promise<string> {
        return await this.input.inputValue();
    }

    async isVisible(): Promise<boolean> {
        return await this.input.isVisible();
    }
}