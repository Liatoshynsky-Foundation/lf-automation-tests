import {PageItemComponent} from '../../component/client/PageItemComponent';
import {expect, test} from '../../fixtures/fixturePage';
import {Language, FooterLanguage} from "../../data/enums";
import * as allure from 'allure-js-commons';

test.describe('UI - Footer', () => { 
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
        const title = await page.title();
        expect(title).toEqual('Творчість - Фундація Лятошинського');
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

    test('clicking Email in footer has mailto', async ({aboutUsPage, page}) => {
        await aboutUsPage.goto('/');
        await aboutUsPage.footer.clickInfoEmail();

        const href = await aboutUsPage.footer.infoEmail.locator('a').getAttribute('href');
        expect(href).toBe('mailto:liatoshynsky@gmail.com');
    });
});