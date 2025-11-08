import {Locator, Page, expect} from "@playwright/test";
import { Currency, OrgIBAN } from "../../data/enums";
type AllowedCurrency = (typeof Currency)[keyof typeof Currency];

export class QuickDonationComponent {
    private root: Locator;
    private mainTitle: Locator;
    private amountInput: Locator;
    private currencyDropdown: Locator;
    private contributionTypeTabs: Locator;
    private presetAmountButtons: Locator;
    private makeDonationButton: Locator;
    public ibanFieldContainer: Locator; 

    private ibanMap: Record<AllowedCurrency, string> = {
        [Currency.UAH]: OrgIBAN.UAH,
        [Currency.USD]: OrgIBAN.USD,
        [Currency.EUR]: OrgIBAN.EUR,
        [Currency.GBP]: OrgIBAN.GBP,
    };
    public readonly EXPECTED_IBAN_USD = OrgIBAN.USD;
    

    public get EXPECTED_IBAN_UAH(): string {
        return OrgIBAN.UAH;
    }
    public get EXPECTED_IBAN_EUR(): string {
        return OrgIBAN.EUR;
    }
    public get EXPECTED_IBAN_GBP(): string {
        return OrgIBAN.GBP;
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

    constructor(private page: Page) {
        this.root = page.locator('div.MuiBox-root.css-1txbm8g').first();

        this.mainTitle = this.root.locator('h4')
        this.amountInput = this.root.locator('input').first();
        this.contributionTypeTabs = this.root.locator('.MuiButtonGroup-root');
        this.currencyDropdown = this.root.locator('div.MuiFormControl-root')
        this.presetAmountButtons = this.root.locator('div.css-y82565')
        this.makeDonationButton = this.root.locator('button')
        this.ibanFieldContainer = this.page.locator('p:has-text("UA28351005")').first();
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
    
    async selectCurrencyTab(currency: AllowedCurrency): Promise<void> {
        await this.page.getByRole('button', { name: currency, exact: true }).click({ force: true });
        await expect(this.ibanFieldContainer).toContainText(currency, { timeout: 5000 });
    }
    
    async copyAndVerifyIBAN(expectedIban: string): Promise<void> {
        const dynamicIbanField = this.getIBANField(expectedIban);
        await expect(dynamicIbanField).toBeVisible({ timeout: 5000 }); 
        const ibanContainer = dynamicIbanField.locator('..'); 

        const dynamicCopyButton = this.getCopyIBANButton(ibanContainer);

        await expect(dynamicCopyButton).toBeVisible();
        await dynamicCopyButton.click();

        const copiedText = await this.page.evaluate(() => { return navigator.clipboard.readText();});
        
        expect(copiedText.trim()).toBe(expectedIban);
        expect(copiedText).not.toContain(' ');
    }
    
    async copyAndVerifyEURIBAN(): Promise<void> {
        await this.copyAndVerifyIBAN(this.EXPECTED_IBAN_EUR);
    }
}