import {expect, test} from '../../fixtures/fixturePage'
import {QuickDonationComponent} from '../../component/client/QuickDonationComponent';

import {Currency} from '../../data/enums';


test.describe('Donation Page IBAN Copy Functionality', () => {

    test.beforeEach(async ({page}) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    });


    test('should copy the EUR IBAN correctly to the clipboard', async ({page}) => {
        const donationPage = new QuickDonationComponent(page);
        await page.goto('https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us');
        await expect(donationPage.ibanFieldContainer).toBeVisible();
        await donationPage.selectCurrencyTab(Currency.EUR);
        await donationPage.copyAndVerifyEURIBAN();

    });

    test('should copy the EUR IBAN correctly to the clipboard', async ({page}) => {
        const donationPage = new QuickDonationComponent(page);
        await page.goto('https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us');
        await expect(donationPage.ibanFieldContainer).toBeVisible();
        await donationPage.selectCurrencyTab(Currency.GBP);
        await donationPage.copyAndVerifyGBPIBAN();

    });

    test('should copy the USD IBAN correctly to the clipboard', async ({page}) => {
        const donationPage = new QuickDonationComponent(page);
        await page.goto('https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us');
        await expect(donationPage.ibanFieldContainer).toBeVisible();
        await donationPage.selectCurrencyTab(Currency.USD);
        await donationPage.copyAndVerifyUSDIBAN();

    });


});