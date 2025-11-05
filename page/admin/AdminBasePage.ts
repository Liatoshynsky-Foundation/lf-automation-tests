import {Page} from '@playwright/test';
import {BasePage} from '../BasePage';
import {AdminHeaderComponent} from '../../component/admin/AdminHeaderComponent';
import {AdminSidebarComponent} from '../../component/admin/AdminSidebarComponent';

export class AdminBasePage extends BasePage {
    header: AdminHeaderComponent;
    sidebar: AdminSidebarComponent;

    constructor(page: Page) {
        super(page);
        this.header = new AdminHeaderComponent(page);
        this.sidebar = new AdminSidebarComponent(page);
    }

}