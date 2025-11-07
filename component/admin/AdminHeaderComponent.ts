import {Locator, Page} from '@playwright/test';
import {BaseComponent} from '../client/BaseComponent';
import {step} from 'allure-js-commons';

export class AdminHeaderComponent extends BaseComponent {
    title: Locator;
    description: Locator;
    ukrainianButton: Locator;
    englishButton: Locator;
    previewButton: Locator;
    cancelButton: Locator;
    saveButton: Locator;

    constructor(page: Page) {
        super(page, page.locator('.MuiContainer-root.MuiContainer-maxWidthLg').first());
        this.title = this.parent.locator('h5.MuiTypography-h5');
        this.description = this.parent.locator('p.MuiTypography-body2');
        this.ukrainianButton = this.parent.locator('button:has-text("Українська")');
        this.englishButton = this.parent.locator('button:has-text("English")');
        this.previewButton = this.parent.locator('button:has-text("Попередній перегляд")');
        this.cancelButton = this.parent.locator('button:has-text("Скасувати зміни")');
        this.saveButton = this.parent.locator('button:has-text("Зберегти")');
    }

    async getTitle(): Promise<string> {
        return await step('Get admin header title', async () => {
            return await this.title.textContent() || '';
        });
    }

    async getDescription(): Promise<string> {
        return await step('Get admin header description', async () => {
            return await this.description.textContent() || '';
        });
    }

    async switchToUkrainian(): Promise<void> {
        await step('Switch to Ukrainian language', async () => {
            await this.ukrainianButton.click();
        });
    }

    async switchToEnglish(): Promise<void> {
        await step('Switch to English language', async () => {
            await this.englishButton.click();
        });
    }

    async clickPreview(): Promise<void> {
        await step('Click preview button', async () => {
            await this.previewButton.click();
        });
    }

    async clickCancel(): Promise<void> {
        await step('Click cancel button', async () => {
            await this.cancelButton.click();
        });
    }

    async clickSave(): Promise<void> {
        await step('Click save button', async () => {
            await this.saveButton.click();
        });
    }

    async isSaveButtonEnabled(): Promise<boolean> {
        return await step('Check if save button is enabled', async () => {
            return await this.saveButton.isEnabled();
        });
    }
}