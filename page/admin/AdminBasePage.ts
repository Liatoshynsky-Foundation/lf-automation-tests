import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AdminBasePage extends BasePage {


    constructor(page: Page) {
        super(page);
    }

    // Add any admin-specific methods here
}