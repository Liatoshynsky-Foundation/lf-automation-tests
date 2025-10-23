import {PageItemComponent} from '../component/client/PageItemComponent';
import {expect, test} from '../fixtures/fixturePage';
import {Language, FooterLanguage} from "../data/enums";


test.describe('UI - Home page', () => {
    test('Home page shows expected heading (using POM)', async ({aboutUsPage, baseClientURL}) => {
        await aboutUsPage.goto(baseClientURL);
        const title = await aboutUsPage.getTitleText();
        expect(title).toEqual('Фундація Лятошинського');
    });

    test('check page menu', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        const items = await aboutUsPage.header.getMenuItems();

        const itemNames: string[] = [];
        for (let i = 0; i < 4; i++) {
            itemNames.push(await items[i].getName());
        }

        expect(itemNames).toEqual([
            'Borys Liatoshynskyi',
            'Foundation',
            'Archive',
            'Cooperation'
        ]);
    });

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

    test('check Header Support Btn link', async ({aboutUsPage, supportUsPage, page}) => {
        await aboutUsPage.goto('/');

        const btnEnText = await aboutUsPage.header.supportFundBtn.getText();
        expect(btnEnText).toEqual('Support');

        await aboutUsPage.header.changeLangBtn.click();
        await aboutUsPage.header.changeLangBtn.selectLanguage(Language.Ukrainian);
        await page.waitForTimeout(5000);
        const btnUaText = await aboutUsPage.header.supportFundBtn.getText();
        expect(btnUaText).toEqual('Підтримати');

        await aboutUsPage.header.supportFundBtn.click();
        await expect(page).toHaveURL(/support-us/);
        const title = await supportUsPage.getTitleText();
        expect(title).toEqual('Create Next App');

    });

    test('check Footer Support Btn link', async ({aboutUsPage, supportUsPage, page}) => {
        await aboutUsPage.goto('/');
        const btnEnText = await aboutUsPage.footer.supportFundBtn.getText();
        expect(btnEnText).toEqual('Support the Foundation');

        await aboutUsPage.footer.changeLangBtn.click();
        const btnUaText = await aboutUsPage.footer.supportFundBtn.getText();
        expect(btnUaText).toEqual('Підтримати діяльність фундації');
        await aboutUsPage.footer.supportFundBtn.getLink();
        await aboutUsPage.footer.supportFundBtn.click();
        await expect(page).toHaveURL(/support-us/);
        const title = await supportUsPage.getTitleText();
        expect(title).toEqual('Create Next App');
    });

    test('check Header Change Language Btn', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        const button = aboutUsPage.header.changeLangBtn;
        await aboutUsPage.header.changeLangBtn.click();
        await button.selectLanguage(Language.Ukrainian);
        await aboutUsPage.header.changeLangBtn.click();

        await expect(await aboutUsPage.header.changeLangBtn.getSelectedLanguage())
            .toEqual(Language.Ukrainian.value);
        await button.selectLanguage(Language.English);
        await aboutUsPage.header.changeLangBtn.click();

        await expect(await aboutUsPage.header.changeLangBtn.getSelectedLanguage())
            .toEqual(Language.English.value);
    });

    test('check Footer Change Language Btn', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        await expect(await aboutUsPage.footer.changeLangBtn.getText())
            .toEqual(FooterLanguage.Ukrainian.value);

        await aboutUsPage.footer.changeLangBtn.click();
        await expect(await aboutUsPage.footer.changeLangBtn.getText())
            .toEqual(FooterLanguage.English.value);

        await aboutUsPage.footer.changeLangBtn.click();
        await expect(await aboutUsPage.footer.changeLangBtn.getText())
            .toEqual(FooterLanguage.Ukrainian.value);

        await aboutUsPage.footer.changeLangBtn.click();
        await expect(await aboutUsPage.footer.changeLangBtn.getText())
            .toEqual(FooterLanguage.English.value);
    });

    test('check Footer ContactUs Btn', async ({aboutUsPage, contactsPage, page}) => {
        await aboutUsPage.goto('/');

        const btnEnText = await aboutUsPage.footer.contactUsBtn.getText();
        expect(btnEnText).toEqual('Contact us');

        await aboutUsPage.footer.changeLangBtn.click();
        const btnUaText = await aboutUsPage.footer.contactUsBtn.getText();
        expect(btnUaText).toEqual('Напишіть нам');

        await aboutUsPage.footer.contactUsBtn.click();

        await expect(page).toHaveURL(/contacts/);
        const title = await contactsPage.getTitleText();
        expect(title).toEqual('Контакти');
    });

    test('check footer page menu', async ({aboutUsPage, artistryPage, page}) => {
        await aboutUsPage.goto('/');

        const items = await aboutUsPage.footer.getPageMenuHeaders();
        expect(items).toEqual([
            'BORYS LIATOSHYNSKYI',
            'FOUNDATION',
            'MUSEUM',
            'PARTNERSHIP'
        ]);
        await aboutUsPage.footer.clickPageItemByName("Artistry");
        expect(page).toHaveURL(/artistry/);
        await page.waitForTimeout(500); 
        const title = await artistryPage.getTitleText();
        expect(title).toEqual('Творчість - Фундація Лятошинського');
    });
});
