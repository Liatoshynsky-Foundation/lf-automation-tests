import {Locator, Page} from "@playwright/test";

export class QuickDonationComponent {
    private root: Locator;
    private mainTitle: Locator;
    private amountInput: Locator;
    private currencyDropdown: Locator;
    private contributionTypeTabs: Locator;
    private presetAmountButtons: Locator;
    private makeDonationButton: Locator;

    constructor(private page: Page) {
        this.root = page.locator('div.MuiBox-root.css-1txbm8g').first();

        this.mainTitle = this.root.locator('h4')
        this.amountInput = this.root.locator('input').first();
        this.contributionTypeTabs = this.root.locator('.MuiButtonGroup-root');
        this.currencyDropdown = this.root.locator('div.MuiFormControl-root')
        this.presetAmountButtons = this.root.locator('div.css-y82565')
        this.makeDonationButton = this.root.locator('button')
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
}