import {type Locator, type Page} from '@playwright/test';
import {InputFieldC} from './InputFieldC';

export interface FormData {
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
}

export class ContactFormC {
    public readonly formContainer: Locator;
    public readonly nameField: InputFieldC;
    public readonly emailField: InputFieldC;
    public readonly phoneField: InputFieldC;
    public readonly messageField: InputFieldC;
    public readonly policyCheckbox: Locator;
    public readonly submitButton: Locator;
    public readonly policyLink: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.formContainer = page.locator('form:has(button:has-text("Надіслати запит"))');

        this.nameField = new InputFieldC(page, 'name');
        this.emailField = new InputFieldC(page, 'email');
        this.phoneField = new InputFieldC(page, 'phoneNumber');
        this.messageField = new InputFieldC(page, 'message');

        this.policyCheckbox = this.formContainer.locator('input[type="checkbox"][name="policy"]');
        this.policyLink = this.formContainer.locator('p:has(a[href="#"]) > a');
        this.submitButton = this.formContainer.locator('button').last();
    }

    async submitForm(data: FormData, agreeToPolicy: boolean = true): Promise<void> {
        await this.nameField.fill(data.name);
        await this.emailField.fill(data.email);
        await this.messageField.fill(data.message);

        if (data.phoneNumber) {
            await this.phoneField.fill(data.phoneNumber);
        }

        if (agreeToPolicy) {
            await this.checkPolicyCheckbox();
        }

        await this.clickSubmit();
    }

    async checkPolicyCheckbox(): Promise<void> {
        await this.policyCheckbox.check();
    }


    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }

    getValidationField(fieldName: 'name' | 'email' | 'phoneNumber' | 'message'): InputFieldC {
        switch (fieldName) {
            case 'name':
                return this.nameField;
            case 'email':
                return this.emailField;
            case 'phoneNumber':
                return this.phoneField;
            case 'message':
                return this.messageField;
        }
    }
}