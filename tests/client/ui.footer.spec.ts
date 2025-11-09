import {expect, test} from '../../fixtures/fixturePage';
import {FooterLanguage} from "../../data/enums";
import {OrgInfo} from '../../data/orgInfo';
import * as allure from 'allure-js-commons';
import {footerMenu} from '../../data/footerMenu';
import {legalMenu} from '../../data/legalMenu';

test.describe('UI - Footer', () => {
    test('check Footer Support Btn link', async ({aboutUsPage, supportUsPage, page}) => {
        await allure.description('Verify that the Footer "Support the Foundation" button works correctly in English and Ukrainian and navigates to the correct page.');
        await allure.label('severity', 'critical');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify "Support the Foundation" button text in English', async () => {
            const btnEnText = await aboutUsPage.footer.supportFundBtn.getText();
            await allure.parameter('Language', 'English');
            await allure.parameter('Button Text', btnEnText);
            expect(btnEnText).toEqual('Support the Foundation');
        });

        await allure.step('Change language to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();
        });

        await allure.step('Verify "Support the Foundation" button text in Ukrainian', async () => {
            const btnUaText = await aboutUsPage.footer.supportFundBtn.getText();
            await allure.parameter('Language', 'Ukrainian');
            await allure.parameter('Button Text', btnUaText);
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
            const url = new URL(page.url());
            const pagepath = url.pathname;
            expect(link).toEqual(pagepath);
        });
    });

    test('check Footer Change Language Btn', async ({aboutUsPage}) => {
        await allure.description('Verify that the footer Change Language button correctly toggles between Ukrainian and English text on each click.');
        await allure.label('feature', 'Footer');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify default language button text (Ukrainian)', async () => {
            const currentPageLang = await aboutUsPage.getCurrentPageLanguage();

            const text = await aboutUsPage.footer.changeLangBtn.getText();
            await allure.parameter('Language', currentPageLang);
            await allure.parameter('Button Text', text);

            expect(currentPageLang).toEqual('en');
            expect(text).toEqual(FooterLanguage.Ukrainian.value);
        });

        await allure.step('Click language button and verify it changes to English', async () => {
            await aboutUsPage.footer.changeLangBtn.click();

            const text = await aboutUsPage.footer.changeLangBtn.getText();
            const currentPageLang = await aboutUsPage.getCurrentPageLanguage();
            await allure.parameter('Language', currentPageLang);
            await allure.parameter('Button Text', text);

            expect(currentPageLang).toEqual('uk');
            expect(text).toEqual(FooterLanguage.English.value);
        });

        await allure.step('Click again and verify it changes back to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();

            const currentPageLang = await aboutUsPage.getCurrentPageLanguage();

            const text = await aboutUsPage.footer.changeLangBtn.getText();
            await allure.parameter('Language', currentPageLang);
            await allure.parameter('Button Text', text);

            expect(currentPageLang).toEqual('en');
            expect(text).toEqual(FooterLanguage.Ukrainian.value);
        });
    });

    test('check Footer ContactUs Btn', async ({aboutUsPage, contactsPage, page}) => {
        await allure.description('Verify that the footer "Contact Us" button correctly displays text in both English and Ukrainian and navigates to the Contacts page.');
        await allure.label('feature', 'Footer');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify Contact Us button text in English', async () => {
            const btnEnText = await aboutUsPage.footer.contactUsBtn.getText();
            await allure.parameter('Language', 'English');
            await allure.parameter('Button Text', btnEnText);
            expect(btnEnText).toEqual('Contact us');
        });

        await allure.step('Switch language to Ukrainian', async () => {
            await aboutUsPage.footer.changeLangBtn.click();
        });

        await allure.step('Verify Contact Us button text in Ukrainian', async () => {
            const btnUaText = await aboutUsPage.footer.contactUsBtn.getText();
            await allure.parameter('Language', 'Ukrainian');
            await allure.parameter('Button Text', btnUaText);
            expect(btnUaText).toEqual('Напишіть нам');
        });

        await allure.step('Click Contact Us button and verify navigation to Contacts page', async () => {
            await aboutUsPage.footer.contactUsBtn.click();
            await expect(page).toHaveURL(/contacts/);
        });

        await allure.step('Verify Contacts page title', async () => {
            const title = await contactsPage.getTitleText();
            await allure.parameter('Contacts Page Title', title);
            expect(title).toEqual('Контакти');
        });

        await allure.step('Verify that Contact Us button link matches current page path', async () => {
            const link = await contactsPage.footer.contactUsBtn.getLink();
            const url = new URL(await page.url());
            const pagepath = url.pathname;
            await allure.parameter('Page URL Path', pagepath);
            await allure.parameter('Button Link', link);
            expect(link).toEqual(pagepath);
        });
    });

    test('check footer page menu', async ({aboutUsPage, page}) => {
        await allure.description('Verify footer headers, items, and navigation for both English and Ukrainian languages.');
        await allure.label('feature', 'Footer Menu');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.visit();
        });

        await allure.step('Verify footer menu headers in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            expect(currentLang).toBe('en');
            await allure.parameter('Language', currentLang);
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            const menuHeaders = await aboutUsPage.footer.pageMenu.getSectionHeaders();
            expect(menuHeaders).toEqual(footerMenu.headers.en);
        })

        await allure.step('Verify footer menu items and navigation in English', async () => {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            const menuItems = await aboutUsPage.footer.pageMenu.getAllMenuItems();
            const names = menuItems.map(i => i.name);
            const urls = menuItems.map(i => i.href.replace('/', ''));

            expect(names).toEqual(footerMenu.items.map(i => i.en_name));
            expect(urls).toEqual(footerMenu.items.map(i => i.url));
        });

    });

    test('check Org Info in footer', async ({aboutUsPage}) => {
        await allure.description('Verify that footer displays correct organization info including name, address, phone, email, and copyright (localized for English and Ukrainian).');
        await allure.label('feature', 'Footer');
        await allure.label('severity', 'minor');
        await allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify organization information in footer in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            const expectedInfo = OrgInfo[currentLang];

            await allure.parameter('Language', currentLang);
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

            await allure.parameter('Language', currentLang);
            expect(expectedInfo).toBeDefined();

            await aboutUsPage.footer.checkInfoName(expectedInfo.Name);
            await aboutUsPage.footer.checkInfoAddress(expectedInfo.Address);
            await aboutUsPage.footer.checkInfoPhone(expectedInfo.Phone, aboutUsPage);
            await aboutUsPage.footer.checkInfoEmail(expectedInfo.Email);
            await aboutUsPage.footer.checkCopyrightText(expectedInfo.Copyright);
        });
    });

    test('clicking Phone in footer shows alert', async ({aboutUsPage, page}) => {
        await allure.description('Verify that clicking the phone number in the footer triggers a localized alert message in English and Ukrainian.');
        await allure.label('feature', 'Footer');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });


        await allure.step('Verify alert on phone click in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            await allure.parameter('Language', currentLang);
            expect(currentLang).toEqual('en');

            page.once('dialog', async dialog => {
                await allure.step(`Alert appears with message: ${dialog.message()}`, async () => {
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
            await allure.parameter('Language', currentLang);
            expect(currentLang).toEqual('uk');

            page.once('dialog', async dialog => {
                await allure.step(`Alert appears with message: ${dialog.message()}`, async () => {
                    expect(dialog.type()).toBe('alert');
                    expect(dialog.message()).toContain('Номер телефону скопійовано до буферу обміну');
                    await dialog.accept();
                });
            });

            await aboutUsPage.footer.clickInfoPhone();
        });
    });

    test('clicking Email in footer has mailto', async ({aboutUsPage}) => {
        await allure.description('Verify that clicking the email in the footer opens the default mail client using a valid "mailto" link.');
        await allure.label('feature', 'Footer');
        await allure.label('severity', 'minor');
        await allure.parameter('Component', 'Footer');

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

    test('check footer legal menu', async ({aboutUsPage, page }) => {
        await allure.description('Verify footer Legal Menu items, and navigation for both English and Ukrainian languages.');
        await allure.label('feature', 'Footer Menu');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Footer');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.visit();
        });

        await allure.step('Verify footer legal menu item names and links in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            expect(currentLang).toBe('en');
            await allure.parameter('Language', currentLang);
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            const menuItems = await aboutUsPage.footer.legalMenu.getAllMenuItems();
            const names = menuItems.map(i => i.name);
            const urls = menuItems.map(i => i.href.replace('/', ''));

            expect(names).toEqual(legalMenu.en.map(i => i.name));
            expect(urls).toEqual(legalMenu.en.map(i => i.url));
        })

        await allure.step('Verify footer legal menu navigation in English', async () => {

            for (const item of legalMenu.en){
                await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await aboutUsPage.footer.legalMenu.clickItemByName(item.name);
                
                await expect(page).toHaveURL(new RegExp(`${item.url}$`));
                await expect(await page.title()).toEqual(item.title);

                await aboutUsPage.goto('/');
            }
        })

        

    });
});