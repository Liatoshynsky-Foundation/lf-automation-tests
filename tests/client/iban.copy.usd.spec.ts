import { test, expect} from '@playwright/test';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';
import { BASE_CLIENT_URL } from '../../config/env';
import { Currency } from '../../data/enums'; 

const SUPPORT_US_PATH = '/en/support-us';
const FULL_URL = BASE_CLIENT_URL + SUPPORT_US_PATH;

test.describe('Donation Page IBAN Copy Functionality', () => {

    test.beforeEach(async ({ page }) => {
            await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        });


      test('should copy the USD IBAN correctly to the clipboard', async ({ page }) => {
        const donationPage = new QuickDonationComponent(page);
        await page.goto('https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us');
        await expect(donationPage.ibanFieldContainer).toBeVisible();
        await donationPage.selectCurrencyTab(Currency.USD);
        await donationPage.copyAndVerifyUSDIBAN();
        
    });


});