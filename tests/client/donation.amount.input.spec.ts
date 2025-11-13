import {expect, test} from '../../fixtures/fixturePage'
import {QuickDonationComponent} from '../../component/client/QuickDonationComponent';
import { Currency } from '../../data/enums';

const VALID_DONATION_AMOUNT = 1000;
const EXPECTED_CURRENCY = Currency.UAH;
    
test.beforeEach(async ({page}) => {
        await page.goto('https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us');
    });

test.describe('Supoort Us Page donation amount input functionality', () => {

    test('Check valid donation amount input', async ({ page }) => {
    const donationComponent = new QuickDonationComponent(page);

    await test.step('St1: Check default sum', async () => {
        await donationComponent.verifyAmountInputDisplays(''); 
    });

    await test.step('St2: Check input button state (disabled)', async () => {
        await donationComponent.verifyDonateButtonIsDisabled();
    });

    await test.step(`St3: Entering valid amount ${VALID_DONATION_AMOUNT}`, async () => {
        await donationComponent.enterCustomAmount(VALID_DONATION_AMOUNT);
        await donationComponent.verifyAmountInputDisplays(String(VALID_DONATION_AMOUNT));
    });

    await test.step('St4: Check input button state (enabled)', async () => {
        await donationComponent.verifyDonateButtonIsActive();
    });

    await test.step('St5: Check currency', async () => {
        await donationComponent.expectIBANText(EXPECTED_CURRENCY);
    });

});

})
