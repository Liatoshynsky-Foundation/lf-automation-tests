import { Locator, Page } from '@playwright/test';

export class InputFieldComponent {
    page: Page;
    input: Locator;
    label: Locator;

    constructor(page: Page, inputId: string) {
        this.page = page;
        this.input = page.locator(`#${inputId}`);
        this.label = page.locator(`label[for="${inputId}"]`);
    }

    async fill(value: string) {
        await this.input.focus();
        await this.page.waitForLoadState('networkidle');
        await this.input.pressSequentially(value, { delay: 100 });
    }

    async getValue(): Promise<string> {
        return await this.input.inputValue();
    }

    async isVisible(): Promise<boolean> {
        return await this.input.isVisible();
    }
}