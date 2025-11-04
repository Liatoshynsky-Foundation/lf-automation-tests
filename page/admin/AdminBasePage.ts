import {Page} from '@playwright/test';
import {BasePage} from '../BasePage';
import {AdminHeaderComponent} from '../../component/admin/AdminHeaderComponent';

export class AdminBasePage extends BasePage {
    header: AdminHeaderComponent;

    constructor(page: Page) {
        super(page);
        this.header = new AdminHeaderComponent(page);
    }

}