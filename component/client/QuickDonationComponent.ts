import { Locator, Page, expect } from '@playwright/test';

export class QuickDonationComponent {
    private root: Locator;
    private mainTitle: Locator;
    private amountInput: Locator;
    private currencyDropdown: Locator;
    private contributionTypeTabs: Locator;
    private presetAmountButtons: Locator;
    private makeDonationButton: Locator;
    private readonly EXPECTED_IBAN_UAH = 'UA283510050000026003879189233';
    private ibanField: Locator;
    private copyIBANButton: Locator;

    constructor(private page: Page) {
        this.root = page.locator('div.MuiBox-root.css-1txbm8g').first();

        this.mainTitle = this.root.locator('h4')
        this.amountInput = this.root.locator('input').first();
        this.contributionTypeTabs = this.root.locator('.MuiButtonGroup-root');
        this.currencyDropdown = this.root.locator('div.MuiFormControl-root')
        this.presetAmountButtons = this.root.locator('div.css-y82565')
        this.makeDonationButton = this.root.locator('button')
        this.ibanField = this.root.locator(`text=${this.EXPECTED_IBAN_UAH}`);
        this.copyIBANButton = this.page.locator('button:has(img[alt="content copy"])'); // Якщо це не спрацює, спробуйте: this.copyIBANButton = this.root.locator('[aria-label="copy"]'); this.copyIBANButton = this.ibanField.locator('..').locator('button').last();
    }


    async isMainTitleVisible(): Promise<boolean> {
        return this.mainTitle.isVisible();
    }

    async enterCustomAmount(amount: string | number): Promise<void> {
        await this.amountInput.fill(String(amount));
    }

    async clickCurrencyDropdown(): Promise<void> {
        await this.currencyDropdown.click();
    }

    async clickMakeDonationButton(): Promise<void> {
        await this.makeDonationButton.click();
    }

    async selectContributionTypeTab(type: string): Promise<void> {
        const tabToClick = this.contributionTypeTabs.locator('button', {hasText: type});
        await tabToClick.click();
    }
    
    async copyUAHIBAN(): Promise<void> {
        await expect(this.ibanField).toBeVisible();
        await expect(this.copyIBANButton).toBeVisible();
        await this.copyIBANButton.click();
    }
    
    async verifyCopiedUAHIBAN(): Promise<void> {
        const copiedText = await this.page.evaluate(() => navigator.clipboard.readText());
        expect(copiedText.trim()).toBe(this.EXPECTED_IBAN_UAH);
    }
}