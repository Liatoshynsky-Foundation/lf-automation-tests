import {expect, test} from '../../fixtures/fixturePage';

const POSITIVE_FORM_DATA = {
    name: 'Automation Tester',
    email: 'test@liatoshynsky.org',
    phoneNumber: '380671234567',
    message: 'Це тестове повідомлення для перевірки форми контакту.',
};

test.describe('Contacts Page Tests (Контакти)', () => {

    test.beforeEach(async ({contactsPage}) => {
        await contactsPage.visit();
    });

    test.only('should display main heading and verify all contact links', async ({contactsPage}) => {
        const contactsInfo = contactsPage.getContactsInfoComponent();

        await expect(contactsPage.pageHeading).toBeVisible();
        await expect(contactsPage.pageHeading).toHaveText(/КонТактИ|Contacts/);

        await expect(contactsInfo.phoneNumberLink).toHaveText('067 963 8366');
        //await expect(contactsInfo.phoneNumberLink).toHaveAttribute('href', 'tel:0679638366');

        await expect(contactsInfo.emailLink).toHaveText('liatoshynsky@gmail.com');
        await expect(contactsInfo.emailLink).toHaveAttribute('href', 'mailto:liatoshynsky@gmail.com');


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

    test('should fill all required fields and enable the submit button', async ({contactsPage}) => {
        const contactForm = contactsPage.getContactFormC();
        const submitButton = contactForm.submitButton; 

        //await test.step('1. Перевірка початкового стану кнопки', async () => {
        //    await expect(submitButton).toBeDisabled();
        //});

        await test.step('2. Filling in form fields with valid data', async () => {
            await contactForm.nameField.fill(POSITIVE_FORM_DATA.name);
           await contactForm.emailField.fill(POSITIVE_FORM_DATA.email);
           await contactForm.phoneField.fill(POSITIVE_FORM_DATA.phoneNumber!);
           await contactForm.messageField.fill(POSITIVE_FORM_DATA.message);
        });
        
        await test.step('3. Activation of the consent checkbox', async () => {
            await contactForm.checkPolicyCheckbox();
        });


        await test.step('4. Checking the activation of the “Send” button', async () => {
            await expect(submitButton).toBeEnabled();
        });
        
        // await contactForm.clickSubmit(); 
    });
   
    test('should display validation error when submitting with an invalid email format', async ({contactsPage}) => {
        const contactForm = contactsPage.getContactFormC();
        
        await test.step('1. Filling in valid fields', async () => {
            await contactForm.nameField.fill(POSITIVE_FORM_DATA.name);
            await contactForm.phoneField.fill(POSITIVE_FORM_DATA.phoneNumber!); 
            await contactForm.messageField.fill(POSITIVE_FORM_DATA.message);
        });

        await test.step('2. Invalid email address', async () => {
            await contactForm.emailField.fill('invalidemail.com');
        });
        
        await test.step('3. Check the box and click “Send.”', async () => {
            await contactForm.checkPolicyCheckbox();
            await contactForm.clickSubmit(); 
        });

        // 4. Checking the error message
        await test.step('4. Email validation error check', async () => {
            const emailErrorLocator = contactForm.emailField.errorText; 

            await expect(emailErrorLocator).toBeVisible();
            await expect(emailErrorLocator).toHaveText(/Введіть коректну email-адресу|Please enter a valid email address/i);
        });
    });

    test('T04: Should copy phone and email and verify "Copied" message appears and disappears', async ({contactsPage}) => {
        const contactsInfo = contactsPage.getContactsInfoComponent();
        
        await test.step('1. Copy Phone Number and verify success message lifecycle', async () => {

            await contactsInfo.clickCopyPhone();
        

            await expect(contactsInfo.copySuccessMessage).toBeVisible({ timeout: 5000 });
            
            await expect(contactsInfo.copySuccessMessage).not.toBeVisible();
        });

        await test.step('2. Copy Email and verify success message lifecycle', async () => {

            await contactsInfo.clickCopyEmail();

            await expect(contactsInfo.copySuccessMessage).toBeVisible({ timeout: 5000 });
            
            await expect(contactsInfo.copySuccessMessage).not.toBeVisible();
        });
        
        // 💡 Додатковий крок: Перевірка вмісту буфера обміну (Advanced)
        // Цей крок може вимагати спеціальних налаштувань браузера або дозволів.
       /* await test.step('3. Verify email content in clipboard (Advanced)', async () => {
             await contactsInfo.clickCopyEmail(); // Повторний клік, щоб переконатися, що email останній у буфері

             const expectedEmail = await contactsInfo.emailLink.textContent(); // 'liatoshynsky@gmail.com'

             // Використовуємо page.evaluate для доступу до Clipboard API
             const clipboardContent = await contactsPage.page.evaluate(() => navigator.clipboard.readText());
             
             // Перевірка: що ми скопіювали
             expect(clipboardContent).toBe(expectedEmail); 
         });*/
    });
});