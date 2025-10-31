import { test, expect } from '@playwright/test';
import { ContactsPage } from '../../page/client/ContactsPage';
import { FormData } from '../../component/client/ContactFormC';


const POSITIVE_FORM_DATA: FormData = {
    name: 'Automation Tester',
    email: 'test@liatoshynsky.org',
    phoneNumber: '380671234567',
    message: 'Це тестове повідомлення для перевірки форми контакту.',
};

test.describe('Contacts Page Tests (Контакти)', () => {
    let contactsPage: ContactsPage;

    test.beforeEach(async ({ page }) => {
        contactsPage = new ContactsPage(page);
        await page.goto('/uk/contacts'); 
    });

    test('should display main heading and verify all contact links', async ({ page }) => {
        const contactsInfo = contactsPage.getContactsInfoComponent();
      
        await expect(contactsPage.pageHeading).toBeVisible();
        await expect(contactsPage.pageHeading).toHaveText('КонТактИ');

        await expect(contactsInfo.phoneNumberLink).toHaveText('067 963 8366');
       // await expect(contactsInfo.phoneNumberLink).toHaveAttribute('href', 'tel:0679638366'); 

        await expect(contactsInfo.emailLink).toHaveText('liatoshynsky@gmail.com');
        //await expect(contactsInfo.emailLink).toHaveAttribute('href', 'mailto:liatoshynsky@gmail.com');

 
        
        const instagramLink = contactsInfo.getSocialLink('instagram');
        await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/liatoshynsky_foundation/');
        await expect(instagramLink).toHaveAttribute('target', '_blank');

        const facebookLink = contactsInfo.getSocialLink('facebook');
        await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/LiatoshynskyFoundation/');
        await expect(facebookLink).toHaveAttribute('target', '_blank');

        const youtubeLink = contactsInfo.getSocialLink('youtube');
        await expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/');
        await expect(youtubeLink).toHaveAttribute('target', '_blank');
    });


});