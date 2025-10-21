import {PageItemComponent} from '../component/client/PageItemComponent';
import {expect, test} from '../fixtures/fixturePage';
import Language from "../data/enums";

test.describe('UI - Home page', () => {
    test('Home page shows expected heading (using POM)', async ({aboutUsPage, baseClientURL}) => {
        await aboutUsPage.goto(baseClientURL);
        const title = await aboutUsPage.getTitleText();
        // If tests point at example.com assert the known Example Domain heading.
        expect(title).toEqual('Фундація Лятошинського');
    });

    test('check page menu', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        let items = await aboutUsPage.header.getMenuItems();

        const itemNames: string[] = [];
        for (let i = 0; i < 4; i++) {
            itemNames.push(await items[i].getName());
        }

        expect(itemNames).toEqual([
            'Borys Liatoshynskyi',
            'Foundation',
            'Archive Cabinet',
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
        let link = await artistry.getLink();
        const currentUrl = page.url();
        const langPrefixMatch = currentUrl.match(/\/(en|ua)(\/|$)/);
        const langPrefix = langPrefixMatch ? `/${langPrefixMatch[1]}` : '';

        const linkWithLang = link.startsWith(langPrefix)
            ? link
            : `${langPrefix}${link}`;

        await artistry.click();

        await expect(page).toHaveURL(new RegExp(`${linkWithLang}$`));

        await artistryPage.header.logo.click();
        await aboutUsPage.waitForAboutFoundationLabelVisible();
        const title = await aboutUsPage.getTitleText();
        expect(title).toEqual('Фундація Лятошинського');
    });
    test('check goto Artistry page', async ({aboutUsPage, artistryPage, page}) => {
        await aboutUsPage.goto('/');
        let menuItem = await aboutUsPage.header.getMenuByName("Borys Liatoshynskyi");
        await aboutUsPage.header.clickMenuByName("Borys Liatoshynskyi");
        await menuItem.subMenuIsVisible();
        await menuItem.clickSubPageByName("Artistry");
        await expect(page).toHaveURL(/artistry/);
        const title = await artistryPage.getTitleText();
        expect(title).toEqual('Творчість - Фундація Лятошинського');
    });

    test('check Support Btn link', async ({aboutUsPage}) => {
        await aboutUsPage.goto('/');
        await aboutUsPage.header.supportFundBtn.click();

    });

    test('check Change Language Btn', async ({aboutUsPage}) => {
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
});
