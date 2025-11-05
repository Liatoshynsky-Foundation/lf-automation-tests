import { test } from '@playwright/test';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';
import { BASE_CLIENT_URL } from '../../config/env';
const SUPPORT_US_PATH = '/en/support-us';

test.describe('Donation Page IBAN Copy Functionality (Clean POM)', () => {

    test('should copy the UAH IBAN correctly to the clipboard', async ({ page }) => {
        //const fullUrl = BASE_CLIENT_URL + SUPPORT_US_PATH;
        const donationPage = new QuickDonationComponent(page);
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        await page.goto('https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us');
        await donationPage.copyUAHIBAN();
        await donationPage.verifyCopiedUAHIBAN();
    });
});

