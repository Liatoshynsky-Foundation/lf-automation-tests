import { Locator, Page } from '@playwright/test';

export class InputFieldComponent {
    page: Page;
    input: Locator;
    label: Locator;


    constructor(page: Page, inputSelector: string, labelSelector: string) {
        this.page = page;
        this.input = page.locator(inputSelector);
        this.label = page.locator(labelSelector);
    }

    async fill(value: string) {
        await this.input.click();
        await this.input.pressSequentially(value);
    }

    async getValue(): Promise<string> {
        return await this.input.inputValue();
    }

    async isVisible(): Promise<boolean> {
        return await this.input.isVisible();
    }
}