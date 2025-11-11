import {PageItemComponent} from '../../component/client/PageItemComponent';
import {expect, test} from '../../fixtures/fixturePage';
import {Language} from "../../data/enums";
import * as allure from 'allure-js-commons';
import {pageMenu} from '../../data/pageMenu';

test.describe('UI - Header', () => {
    test('check goto Artistry page by menu and return to Home by logo', async ({aboutUsPage, artistryPage, page}) => {
        await aboutUsPage.goto('/');
        const menuItems = await aboutUsPage.header.getMenuItems();

        let borysMenu;
        for (const item of menuItems) {
            const name = await item.getName();
            if (name === 'Borys Liatoshynskyi') {
                borysMenu = item;
                break;
            }
        }
        if (!borysMenu) throw new Error('Menu item not found');

        await borysMenu.clickDropdown();
        const subPages = await borysMenu.getSubPages();
        let artistry: PageItemComponent | undefined;

        for (const pageItem of subPages) {
            const name = await pageItem.get_Name();
            if (name.trim() === 'Artistry') {
                artistry = pageItem;
                break;
            }
        }
        if (!artistry) throw new Error('Artistry page not found');
        const link = await artistry.getLink();
        const currentUrl = page.url();
        const langPrefixMatch = currentUrl.match(/\/(en|ua)(\/|$)/);
        const langPrefix = langPrefixMatch ? `/${langPrefixMatch[1]}` : '';

        const linkWithLang = link.startsWith(langPrefix)
            ? link
            : `${langPrefix}${link}`;

        await artistry.headerclick();

        await expect(page).toHaveURL(new RegExp(`${linkWithLang}$`));

        await artistryPage.header.logo.click();
        await aboutUsPage.waitForAboutFoundationLabelVisible();
        const title = await aboutUsPage.getTitleText();
        expect(title).toEqual('Фундація Лятошинського');
    });

    test('check goto Artistry page', async ({aboutUsPage, artistryPage, page}) => {
        await aboutUsPage.goto('/');
        const menuItem = await aboutUsPage.header.getMenuByName("Borys Liatoshynskyi");
        await aboutUsPage.header.clickMenuByName("Borys Liatoshynskyi");
        await menuItem.subMenuIsVisible();
        await menuItem.clickSubPageByName("Artistry");
        await expect(page).toHaveURL(/artistry/);
        const title = await artistryPage.getTitleText();
        expect(title).toEqual('Творчість - Фундація Лятошинського');
    });

    test('check Header Support Btn link', async ({aboutUsPage, page}) => {
        allure.description('Verify that the header "Support" button navigates correctly and displays proper localization both in English and Ukrainian');
        allure.label('feature', 'Header');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Header Support Button');

        allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });
        
        allure.step('Verify Support button text in English', async () =>{
            const btnEnText = await aboutUsPage.header.supportFundBtn.getText();
            expect(btnEnText).toEqual('Support');
        })
        
        allure.step('Change language to Ukrainian', async() =>{
            await aboutUsPage.header.changeLangBtn.click();
            await aboutUsPage.header.changeLangBtn.selectLanguage(Language.Ukrainian);
            await page.waitForTimeout(5000);
        })
        
        allure.step('Verify Support button text in Ukrainian', async () =>{
            const btnUaText = await aboutUsPage.header.supportFundBtn.getText();
        expect(btnUaText).toEqual('Підтримати');
        })
        
        allure.step('Verify Support button text navigation', async () =>{
            await aboutUsPage.header.supportFundBtn.click();
            await expect(page).toHaveURL(/support-us/);
        });
    });

    test('check Header Change Language Btn', async ({aboutUsPage}) => {
        allure.description('Verify that the header language change button correctly switches between English and Ukrainian.');
        allure.label('feature', 'Header');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Header Language Switch');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Open language selector and change to Ukrainian', async () => {
            const button = aboutUsPage.header.changeLangBtn;
            await aboutUsPage.header.changeLangBtn.click();
            await button.selectLanguage(Language.Ukrainian);
        });

        await allure.step('Verify selected language is Ukrainian', async () => {
            await aboutUsPage.header.changeLangBtn.click();
            allure.parameter('Language', 'Ukrainian');
            await expect(await aboutUsPage.header.changeLangBtn.getSelectedLanguage()).toEqual(Language.Ukrainian.value);
        });

        await allure.step('Switch back to English', async () => {
            const button = aboutUsPage.header.changeLangBtn;
            await button.selectLanguage(Language.English);
            await aboutUsPage.header.changeLangBtn.click();
        });

        await allure.step('Verify selected language is English', async () => {
            allure.parameter('Language', 'English');
            await expect(await aboutUsPage.header.changeLangBtn.getSelectedLanguage())
            .toEqual(Language.English.value);
        });
    });

    test('test header visibility', async ({aboutUsPage}) => {
        await allure.description('Test header visibility when scrolling down hides the header, scrolling up shows it again.');
        await allure.label('severity', 'high');

        await allure.step('Go to About Us page', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Check header is initially visible', async () => {
            expect((await aboutUsPage.header.isHeaderVisible())).toBeTruthy();
        });

        await allure.step('Scroll down to hide header', async () => {
            await aboutUsPage.header.hideHeader();
            expect(await (aboutUsPage.header.isHeaderVisible())).toBeFalsy();
        });

        await allure.step('Scroll up to show header again', async () => {
            await aboutUsPage.header.callHeader();
            expect((await aboutUsPage.header.isHeaderVisible())).toBeTruthy();
        });
    });

    test('check Header Page Menu', async ({aboutUsPage, page}) => {
        await allure.description('Verify header menu button names, submenu items, and navigation links for both English and Ukrainian languages.');
        await allure.label('feature', 'Header Menu');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Header');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.visit();
        });

        await allure.step('Verify header menu button names in English', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            expect(currentLang).toBe('en');
            await allure.parameter('Language', currentLang);

            const menuButtons = await aboutUsPage.header.getMenuItems();
            const menuNames = [];

            for (const item of menuButtons) {
                menuNames.push(await item.getName());
            }
            expect(menuNames).toEqual(pageMenu.headerButtons.en);
        });

        await allure.step('Verify header submenu items and links in English', async () => {
            const menuHeaders = await aboutUsPage.header.getMenuItems();
            const names: string[] = [];
            const urls: string[] = [];

            for (const button of menuHeaders){
                const buttonName = await button.getName();
                await allure.parameter('Header button:', buttonName);

                await allure.step(`Check header button: ${buttonName}`, async () => {
                    const hasLink = await button.getLink();

                    if (!hasLink) {
                        await allure.step(`Open dropdown for ${buttonName}`, async () => {
                            await button.clickDropdown();
                            await page.waitForTimeout(1000);
                        });

                        if (await button.subMenuIsVisible()) {
                            const subMenu = await button.getSubPages();

                            for (const item of subMenu){
                                const name = await item.get_Name();
                                const url = await item.getLink();
                                names.push(name);
                                urls.push(url.replace(/^\//, ''));
                            }
                            await button.clickDropdown();
                        }
                    }
                    else {
                        await allure.step(`Header button has direct link: ${buttonName}`, async () => {
                            const name = await button.getName();
                            const url = await button.getLink();
                            names.push(name);
                            urls.push(url.replace(/^\/en\//, ''));
                        });
                    }
                });
            }
            expect(names).toEqual(pageMenu.items.map(i => i.en_name));
            expect(urls).toEqual(pageMenu.items.map(i => i.url));
        });

        await allure.step('Change language to Ukrainian', async () => {
            const button = aboutUsPage.header.changeLangBtn;
            await button.click();
            await button.selectLanguage(Language.Ukrainian);
        });

        await allure.step('Verify header menu button names in Ukrainian', async () => {
            const currentLang = await aboutUsPage.getCurrentPageLanguage();
            expect(currentLang).toBe('uk');
            await allure.parameter('Language', currentLang);

            const menuButtons = await aboutUsPage.header.getMenuItems();
            const menuNames = [];

            for (const item of menuButtons) {
                menuNames.push(await item.getName());
            }
            expect(menuNames).toEqual(pageMenu.headerButtons.uk);
        });

        await allure.step('Verify header submenu items and links in Ukrainian', async () => {
            const menuHeaders = await aboutUsPage.header.getMenuItems();
            const names: string[] = [];
            const urls: string[] = [];

            for (const button of menuHeaders){
                const buttonName = await button.getName();
                await allure.parameter('Header button:', buttonName);

                await allure.step(`Check header button: ${buttonName}`, async () => {
                    const hasLink = await button.getLink();

                    if (!hasLink) {
                        await allure.step(`Open dropdown for ${buttonName}`, async () => {
                            await button.clickDropdown();
                            await page.waitForTimeout(1000);
                        });

                        if (await button.subMenuIsVisible()) {
                            const subMenu = await button.getSubPages();

                            for (const item of subMenu){
                                const name = await item.get_Name();
                                const url = await item.getLink();
                                names.push(name);
                                urls.push(url.replace(/^\//, ''));
                            }
                            await button.clickDropdown();
                        }
                    }
                    else {
                        await allure.step(`Header button has direct link: ${buttonName}`, async () => {
                            const name = await button.getName();
                            const url = await button.getLink();
                            names.push(name);
                            urls.push(url.replace(/^\/uk\//, ''));
                        });
                    }
                });
            }
            expect(names).toEqual(pageMenu.items.map(i => i.uk_name));
            expect(urls).toEqual(pageMenu.items.map(i => i.url));
        });
    });
});