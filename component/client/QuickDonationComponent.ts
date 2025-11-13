import {expect, Locator, Page} from "@playwright/test";
import {Currency, OrgIBAN} from "../../data/enums";

type AllowedCurrency = (typeof Currency)[keyof typeof Currency];

export class QuickDonationComponent {
    public root: Locator;
    public mainTitle: Locator;
    public amountInput: Locator;
    public currencyDropdown: Locator; 
    public contributionTypeTabs: Locator;
    public presetAmountButtons: Locator;
    public makeDonationButton: Locator;
    public ibanFieldContainer: Locator;

    private ibanMap: Record<AllowedCurrency, string> = {
        [Currency.UAH]: OrgIBAN.UAH,
        [Currency.USD]: OrgIBAN.USD,
        [Currency.EUR]: OrgIBAN.EUR,
        [Currency.GBP]: OrgIBAN.GBP,
    };

    constructor(private page: Page) {
        this.root = page.locator('h4:has-text("QUICK DONATION:")').locator('xpath=..').first();
        this.mainTitle = this.root.locator('h4');
        this.amountInput = this.root.locator('input').first();
        this.contributionTypeTabs = this.root.locator('.MuiButtonGroup-root');
        this.currencyDropdown = this.root.locator('div.MuiFormControl-root');
        this.presetAmountButtons = this.root.locator('div.css-y82565')
        this.makeDonationButton = page.getByTestId('DonationForm-donateButton');
        this.ibanFieldContainer = this.page.locator('p:has-text("UA28351005")').first();
    }

    public get EXPECTED_IBAN_UAH(): string {
        return OrgIBAN.UAH;
    }

    public get EXPECTED_IBAN_EUR(): string {
        return OrgIBAN.EUR;
    }

    public get EXPECTED_IBAN_GBP(): string {
        return OrgIBAN.GBP;
    }
    public get EXPECTED_IBAN_USD(): string {
        return OrgIBAN.USD;
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

    public async verifyPresetButtonsVisible(expectedCurrencies: string[]): Promise<void> {
        await expect(this.presetAmountButtons.first()).toBeVisible();
        for (const currency of expectedCurrencies) {
            await expect(this.presetAmountButtons.filter({hasText: currency})).toHaveCount(1, {timeout: 5000});
        }
    }

    public async expectIBANText(currency: AllowedCurrency): Promise<void> {
        const expectedIban = this.getExpectedIban(currency);
        const dynamicIbanField = this.getIBANField(expectedIban);
        await expect(dynamicIbanField).toBeVisible({timeout: 10000}); // Сильне очікування
    }

    async selectContributionTypeTab(type: string): Promise<void> {
        const tabToClick = this.contributionTypeTabs.locator('button', {hasText: type});
        await tabToClick.click();
    }

    async selectCurrencyTab(currency: AllowedCurrency): Promise<void> {
        await this.page.getByRole('button', {name: currency, exact: true}).click({force: true});
        await expect(this.ibanFieldContainer).toContainText(currency, {timeout: 5000});
    }

    async copyAndVerifyIBAN(expectedIban: string): Promise<void> {
        const dynamicIbanField = this.getIBANField(expectedIban);
        await expect(dynamicIbanField).toBeVisible({timeout: 5000});
        const ibanContainer = dynamicIbanField.locator('..');

        const dynamicCopyButton = this.getCopyIBANButton(ibanContainer);

        await expect(dynamicCopyButton).toBeVisible();
        await dynamicCopyButton.click();

        const copiedText = await this.page.evaluate(() => {
            return navigator.clipboard.readText();
        });

        expect(copiedText.trim()).toBe(expectedIban);
        expect(copiedText).not.toContain(' ');
    }

    async copyAndVerifyGBPIBAN(): Promise<void> {
        await this.copyAndVerifyIBAN(this.EXPECTED_IBAN_GBP);
    }

    private getCopyIBANButton(context: Locator): Locator {
        return context.locator('button:has(img[alt="content copy"])');
    }

    private getIBANField(ibanValue: string): Locator {
        return this.page.locator(`text=${ibanValue}`);
    }

    private getExpectedIban(currency: AllowedCurrency): string {
        return this.ibanMap[currency];
    }

    async copyAndVerifyEURIBAN(): Promise<void> {
        await this.copyAndVerifyIBAN(this.EXPECTED_IBAN_EUR);
    }

    async copyAndVerifyUSDIBAN(): Promise<void> {
        await this.copyAndVerifyIBAN(this.EXPECTED_IBAN_USD);
    }

    async verifyAmountInputDisplays(expectedValue: string) {
        const actualValue = await this.amountInput.inputValue(); 
        expect(actualValue).toBe(expectedValue);
    }

    async verifyDonateButtonIsDisabled() {
        await expect(this.makeDonationButton).toBeDisabled();
    }

    async verifyDonateButtonIsActive() {
        await expect(this.makeDonationButton).toBeEnabled();
    }
}