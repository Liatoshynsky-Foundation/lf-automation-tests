import { Locator, Page } from '@playwright/test';
import { InputFieldComponent } from './InputFieldComponent';
import { InputFieldPassComponent } from './InputFieldPassComponent';

export class LoginFormComponent {
    protected page: Page;
    container: Locator;
    title: Locator;
    description: Locator;
    emailField: InputFieldComponent;
    passwordField: InputFieldPassComponent;
    errorMessage: Locator;
    enterButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator('.MuiBox-root.css-16x26qu');
        this.title = this.container.locator('h5');
        this.description = this.container.locator('h6');
        this.emailField = new InputFieldComponent(page, '#_R_ajl5fivb_', 'label[for="_R_ajl5fivb_"]');
        this.passwordField = new InputFieldPassComponent(page, 'outlined-adornment-password');
        this.errorMessage = this.container.locator('p.MuiTypography-body2');
        this.enterButton = this.container.locator('button.MuiButton-root');
    }

    async getTitle(): Promise<string> {
        return await this.title.textContent() || '';
    }

    async getDescription(): Promise<string> {
        return await this.description.textContent() || '';
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async togglePasswordVisibility() {
        await this.passwordField.toggleVisibility();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickEnterButton();
    }
    
    async isVisible(): Promise<boolean> {
        return await this.container.isVisible();
    }

    async clickEnterButton() {
        await this.enterButton.waitFor({ state: 'visible' });
        await this.enterButton.click({ force: true });
    }
}