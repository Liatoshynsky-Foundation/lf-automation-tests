import {expect, test} from '../../fixtures/fixturePage';
import {FooterLanguage} from "../../data/enums";
import {OrgInfo} from '../../data/orgInfo';
import * as allure from 'allure-js-commons';
import {footerMenu} from '../../data/footerMenu';

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
            // await aboutUsPage.goto('/');
            await aboutUsPage.visit();
        });

        await allure.step('Verify footer menu headers in English', async () =>{
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            expect(currentLang).toBe('en');
            allure.parameter('Language', currentLang);
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            const menuHeaders = await aboutUsPage.footer.pageMenu.getSectionHeaders();
            expect(menuHeaders).toEqual(footerMenu.headers.en);
        })

        allure.step('Verify footer menu items and navigation in English', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            const menuItems = await aboutUsPage.footer.pageMenu.getAllMenuItems();
            const names = menuItems.map(i => i.name);
            const urls = menuItems.map(i => i.href.replace('/', ''));

            expect(names).toEqual(footerMenu.items.map(i => i.en_name));
            expect(urls).toEqual(footerMenu.items.map(i =>i.url));
        });

        // aboutUsPage = new AboutUsPage(page); // re-initialize to avoid stale element references
        // await allure.step('Verify footer menu headers in English', async () =>{
        //     const currentLang = await aboutUsPage.getCurrentPageLanguage();
        //     expect(currentLang).toBe('en');
        //     allure.parameter('Language', currentLang);

        //     const headers = await aboutUsPage.footer.getPageMenuHeaders();
        //     expect(headers).toEqual(footerMenu.headers.en);
        // })

        // allure.step('Veriyf footer menu items and navigation in English', async () => {
        //     const menuItems = await aboutUsPage.footer.getMenuItems();
        //     const names: string[] = [];
        //     for (const item of menuItems){
        //         const name = await item.get_Name();
        //         allure.parameter('item', name);
        //         names.push(name); 
        //     }
        //     for (let i=0; i<footerMenu.items.length; i++){
        //     expect(names[i]).toEqual(footerMenu.items[i].en_name);}
        // });
        
        // allure.step('Veriyf footer menu items and navigation in English', async () => {
        //     for (const item of footerMenu.items){
        //         const expectedUrl = await aboutUsPage.getPathCurrentLanguage(item.url);
        //         await aboutUsPage.footer.clickPageItemByName(item.en_name);
        //         await expect(page).toHaveURL(expectedUrl);
                
        //         await aboutUsPage.goto('/');
        //     }
        //     // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        //     // await aboutUsPage.footer.clickPageItemByName("Artistry");
        //     // await expect(page).toHaveURL(/artistry/);
        // })
        
    });

    test('check Org Info in footer', async ({aboutUsPage}) => {
        allure.description('Verify that footer displays correct organization info including name, address, phone, email, and copyright (localized for English and Ukrainian).');
        allure.label('feature', 'Footer');
        allure.label('severity', 'minor');
        allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify organization information in footer in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            const expectedInfo = OrgInfo[currentLang];

            allure.parameter('Language', currentLang);
            expect(expectedInfo).toBeDefined();

            await aboutUsPage.footer.checkInfoName(expectedInfo.Name);
            await aboutUsPage.footer.checkInfoAddress(expectedInfo.Address);
            await aboutUsPage.footer.checkInfoPhone(expectedInfo.Phone, aboutUsPage);
            await aboutUsPage.footer.checkInfoEmail(expectedInfo.Email);
            await aboutUsPage.footer.checkCopyrightText(expectedInfo.Copyright);
        });

        await allure.step('Change language to Ukrainian and verify info', async () => {
            await aboutUsPage.footer.changeLangBtn.click();

            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            const expectedInfo = OrgInfo[currentLang];

            allure.parameter('Language', currentLang);
            expect(expectedInfo).toBeDefined();

            await aboutUsPage.footer.checkInfoName(expectedInfo.Name);
            await aboutUsPage.footer.checkInfoAddress(expectedInfo.Address);
            await aboutUsPage.footer.checkInfoPhone(expectedInfo.Phone, aboutUsPage);
            await aboutUsPage.footer.checkInfoEmail(expectedInfo.Email);
            await aboutUsPage.footer.checkCopyrightText(expectedInfo.Copyright);
        });
    });

    test('clicking Phone in footer shows alert', async ({aboutUsPage, page}) => {
        allure.description('Verify that clicking the phone number in the footer triggers a localized alert message in English and Ukrainian.');
        allure.label('feature', 'Footer');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });


        await allure.step('Verify alert on phone click in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            allure.parameter('Language', currentLang);
            expect(currentLang).toEqual('en');

            page.once('dialog', async dialog => {
                allure.step(`Alert appears with message: ${dialog.message()}`, async () => {
                    expect(dialog.type()).toBe('alert');
                    expect(dialog.message()).toContain('Phone number copied to clipboard');
                    await dialog.accept();
                });
            });

            await aboutUsPage.footer.clickInfoPhone();
        });

        await allure.step('Change language to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();
        });

        await allure.step('Verify alert on phone click in Ukrainian', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            allure.parameter('Language', currentLang);
            expect(currentLang).toEqual('uk');

            page.once('dialog', async dialog => {
                allure.step(`Alert appears with message: ${dialog.message()}`, async () => {
                    expect(dialog.type()).toBe('alert');
                    expect(dialog.message()).toContain('Номер телефону скопійовано до буферу обміну');
                    await dialog.accept();
                });
            });

            await aboutUsPage.footer.clickInfoPhone();
        });
    });

    test('clicking Email in footer has mailto', async ({aboutUsPage}) => {
        allure.description('Verify that clicking the email in the footer opens the default mail client using a valid "mailto" link.');
        allure.label('feature', 'Footer');
        allure.label('severity', 'minor');
        allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Click email link in footer', async () => {
            await aboutUsPage.footer.clickInfoEmail();
        });

        await allure.step('Verify email link contains correct "mailto" attribute', async () => {
            const href = await aboutUsPage.footer.infoEmail.locator('a').getAttribute('href') || '';
            await allure.parameter('Email href', href);
            expect(href).toBe('mailto:liatoshynsky@gmail.com');
        });
    });
});