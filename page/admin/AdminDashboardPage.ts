import {Page} from '@playwright/test';
import {AdminBasePage} from './AdminBasePage';

export class AdminDashboardPage extends AdminBasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }
}