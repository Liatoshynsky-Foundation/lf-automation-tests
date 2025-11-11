import { test, expect } from '@playwright/test';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';
import { VolunteerActionComponent } from '../../component/client/VolunteerActionComponent';
import { FAQComponent } from '../../component/client/FAQComponent';

const SUPPORT_US_URL = 'https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/en/support-us';

test.describe('Components visibility check  [Page]SupportUs', () => {
    let quickDonation: QuickDonationComponent;
    let volunteerAction: VolunteerActionComponent;
    let faqComponent: FAQComponent;

    test.beforeEach(async ({ page }) => {
        await page.goto(SUPPORT_US_URL); 
        
        quickDonation = new QuickDonationComponent(page);
        volunteerAction = new VolunteerActionComponent(page);
        faqComponent = new FAQComponent(page);
    });

    test('All major components and their key elements should be visible', async () => {
        
        await test.step('1. Перевірка QuickDonationComponent', async () => {
            await expect(quickDonation.mainTitle).toBeVisible({ timeout: 10000 }); 
            await expect(quickDonation.amountInput).toBeVisible(); 
            await expect(quickDonation.currencyDropdown).toBeVisible(); 
            await expect(quickDonation.presetAmountButtons.first()).toBeVisible(); 
            await expect(quickDonation.makeDonationButton).toBeVisible(); 
            await expect(quickDonation.ibanFieldContainer).toBeVisible();
        });

        await test.step('2. Перевірка VolunteerActionComponent', async () => {
            await expect(volunteerAction.mainTitle).toBeVisible(); 
            await expect(volunteerAction.offerHelpButton).toBeVisible();
            const cards = await volunteerAction.getCards();
            if (cards.length > 0) {
                await expect(cards[0].getActionTitle()).not.toBeNull(); 
                await expect(cards[0].getMainDescription()).not.toBeNull();
            }
        });

        await test.step('3. Перевірка FAQComponent', async () => {
            await expect(faqComponent.mainTitle).toBeVisible();
            const sections = await faqComponent.getFAQSections();
            await expect(sections[0].questionTitle).toBeVisible();
        });
    });
});