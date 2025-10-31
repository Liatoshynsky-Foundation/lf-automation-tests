import {Locator, Page} from '@playwright/test';
import {AdminBasePage} from './AdminBasePage';
import {LoginFormComponent} from '../../component/admin/LoginFormComponent';

export class AdminLoginPage extends AdminBasePage {
    logoElement: Locator;
    loginForm: LoginFormComponent;

    constructor(page: Page) {
        super(page);
        this.logoElement = page.locator('img');
        this.loginForm = new LoginFormComponent(page);
    }

    async navigate(): Promise<void> {
        await this.goto('/login');
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.logoElement.isVisible();
    }

    async getFormTitle(): Promise<string> {
        return await this.loginForm.getTitle();
    }

    async getFormDescription(): Promise<string> {
        return await this.loginForm.getDescription();
    }

    async fillEmail(email: string): Promise<void> {
        await this.loginForm.fillEmail(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.loginForm.fillPassword(password);
    }

    async togglePasswordVisibility(): Promise<void> {
        await this.loginForm.togglePasswordVisibility();
    }

    async clickLoginButton(): Promise<void> {
        await this.loginForm.clickEnterButton();
    }

    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.loginForm.isVisible();
    }
}