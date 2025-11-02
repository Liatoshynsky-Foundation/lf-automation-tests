import {expect, test} from '../../fixtures/fixturePage';
import {FooterLanguage} from "../../data/enums";
import * as allure from 'allure-js-commons';
import {footerMenu} from '../../data/footerMenu'

test.describe('UI - Footer', () => {
    test('check Footer Support Btn link', async ({aboutUsPage, supportUsPage, page}) => {
        allure.description('Verify that the Footer "Support the Foundation" button works correctly in English and Ukrainian and navigates to the correct page.');
        allure.label('severity', 'critical');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify "Support the Foundation" button text in English', async () => {
            const btnEnText = await aboutUsPage.footer.supportFundBtn.getText();
            allure.parameter('Language', 'English');
            allure.parameter('Button Text', btnEnText);
            expect(btnEnText).toEqual('Support the Foundation');
        });

        await allure.step('Change language to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();
        });

        await allure.step('Verify "Support the Foundation" button text in Ukrainian', async () => {
            const btnUaText = await aboutUsPage.footer.supportFundBtn.getText();
            allure.parameter('Language', 'Ukrainian');
            allure.parameter('Button Text', btnUaText);
            expect(btnUaText).toEqual('Підтримати діяльність фундації');
        });

        await allure.step('Click on "Support the Foundation" button', async () => {
            await aboutUsPage.footer.supportFundBtn.click();
        });

        await allure.step('Verify URL of the "Support Us" page', async () => {
            await expect(page).toHaveURL(/support-us/);
        });

        await allure.step('Verify Support Us page title', async () => {
            const title = await supportUsPage.getTitleText();
            expect(title).toEqual('Create Next App');
        });

        await allure.step('Verify URL-link on "Support the Foundation" button', async () => {
            const link = await aboutUsPage.footer.supportFundBtn.getLink();
            const url = new URL(await page.url());
            const pagepath = url.pathname;
            expect(link).toEqual(pagepath);
        });
    });

    test('check Footer Change Language Btn', async ({aboutUsPage}) => {
        allure.description('Verify that the footer Change Language button correctly toggles between Ukrainian and English text on each click.');
        allure.label('feature', 'Footer');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify default language button text (Ukrainian)', async () => {
            const currentPageLang = await aboutUsPage.getCurrentPageLanguage();

            const text = await aboutUsPage.footer.changeLangBtn.getText();
            allure.parameter('Language', currentPageLang);
            allure.parameter('Button Text', text);

            expect(currentPageLang).toEqual('en');
            expect(text).toEqual(FooterLanguage.Ukrainian.value);
        });

        await allure.step('Click language button and verify it changes to English', async () => {
            await aboutUsPage.footer.changeLangBtn.click();

            const text = await aboutUsPage.footer.changeLangBtn.getText();
            const currentPageLang = await aboutUsPage.getCurrentPageLanguage();
            allure.parameter('Language', currentPageLang);
            allure.parameter('Button Text', text);

            expect(currentPageLang).toEqual('uk');
            expect(text).toEqual(FooterLanguage.English.value);
        });

        await allure.step('Click again and verify it changes back to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();

            const currentPageLang = await aboutUsPage.getCurrentPageLanguage();

            const text = await aboutUsPage.footer.changeLangBtn.getText();
            allure.parameter('Language', currentPageLang);
            allure.parameter('Button Text', text);

            expect(currentPageLang).toEqual('en');
            expect(text).toEqual(FooterLanguage.Ukrainian.value);
        });
    });

    test('check Footer ContactUs Btn', async ({aboutUsPage, contactsPage, page}) => {
        allure.description('Verify that the footer "Contact Us" button correctly displays text in both English and Ukrainian and navigates to the Contacts page.');
        allure.label('feature', 'Footer');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify Contact Us button text in English', async () => {
            const btnEnText = await aboutUsPage.footer.contactUsBtn.getText();
            allure.parameter('Language', 'English');
            allure.parameter('Button Text', btnEnText);
            expect(btnEnText).toEqual('Contact us');
        });

        await allure.step('Switch language to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();
        });

        await allure.step('Verify Contact Us button text in Ukrainian', async () => {
            const btnUaText = await aboutUsPage.footer.contactUsBtn.getText();
            allure.parameter('Language', 'Ukrainian');
            allure.parameter('Button Text', btnUaText);
            expect(btnUaText).toEqual('Напишіть нам');
        });

        await allure.step('Click Contact Us button and verify navigation to Contacts page', async () => {
            await aboutUsPage.footer.contactUsBtn.click();
            await expect(page).toHaveURL(/contacts/);
        });

        await allure.step('Verify Contacts page title', async () => {
            const title = await contactsPage.getTitleText();
            allure.parameter('Contacts Page Title', title);
            expect(title).toEqual('Контакти');
        });

        await allure.step('Verify that Contact Us button link matches current page path', async () => {
            const link = await contactsPage.footer.contactUsBtn.getLink();
            const url = new URL(await page.url());
            const pagepath = url.pathname;
            allure.parameter('Page URL Path', pagepath);
            allure.parameter('Button Link', link);
            expect(link).toEqual(pagepath);
        });
    });

    test('check footer page menu', async ({aboutUsPage, page}) => {
        allure.description('Verify footer headers, items, and navigation for both English and Ukrainian languages.');
        allure.label('feature', 'Footer Menu');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Footer');
        
        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify footer menu headers in English', async () =>{
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            expect(currentLang).toBe('en');
            allure.parameter('Language', currentLang);

            const headers = await aboutUsPage.footer.getPageMenuHeaders();
            expect(headers).toEqual(footerMenu.headers.en);
        })
        
        allure.step('Veriyf footer menu items and navigation in English', async () => {
            // for (const item of footerMenu.items){
            //     const expectedUrl = await aboutUsPage.getPathCurrentLanguage(item.url);
                
            //     await Promise.all([
            //         aboutUsPage.footer.clickPageItemByName(item.en_name),
            //         page.waitForURL(expectedUrl, { timeout: 10000 })
            //     ]);
                
                
            //     await expect(page).toHaveURL(expectedUrl);
            //     await page.waitForTimeout(500);
                
            //     const title = await page.title();
            //     expect(title).toEqual(item.title);
                
            //     await aboutUsPage.goto('/');
            // }
            
            await aboutUsPage.footer.clickPageItemByName("Artistry");
            expect(page).toHaveURL(/artistry/);
            await page.waitForTimeout(500);
            const title = await page.title();
            expect(title).toEqual('Творчість - Фундація Лятошинського');
        })
        
    });

    test('check Org Info in footer', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        await aboutUsPage.footer.checkInfoName("PUBLIC ORGANIZATION 'LYATOSHINSKY FOUNDATION'");
        await aboutUsPage.footer.checkInfoAddress("68 Bohdana Khmelnytskoho St, apt. 63, Kyiv, 1054");
        await aboutUsPage.footer.checkInfoPhone("067 963 8366");
        await aboutUsPage.footer.checkInfoEmail("liatoshynsky@gmail.com");
        await aboutUsPage.footer.checkCopyrightText("© 2025 Liatoshynsky Foundation. All rights reserved.");
    });

    test('clicking Phone in footer shows alert', async ({aboutUsPage, page}) => {
        await aboutUsPage.goto('/');

        page.on('dialog', async dialog => {
            // Assert the type of dialog (optional, but good practice)
            expect(dialog.type()).toBe('alert');
            // Assert the message displayed in the alert
            expect(dialog.message()).toContain('Phone number copied to clipboard');
            // Accept the alert (or use dialog.dismiss() to cancel)
            await dialog.accept();
        });
        await aboutUsPage.footer.clickInfoPhone();
        await page.evaluate(() => {
        })
    });

    test('clicking Email in footer has mailto', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        await aboutUsPage.footer.clickInfoEmail();

        const href = await aboutUsPage.footer.infoEmail.locator('a').getAttribute('href');
        expect(href).toBe('mailto:liatoshynsky@gmail.com');
    });
});