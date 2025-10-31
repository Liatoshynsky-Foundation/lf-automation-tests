import {PageItemComponent} from '../component/client/PageItemComponent';
import {expect, test} from '../fixtures/fixturePage';
import {Language, FooterLanguage} from "../data/enums";


test.describe('UI - Home page', () => {
    test('Home page shows expected heading (using POM)', async ({aboutUsPage, baseClientURL}) => {
        await aboutUsPage.goto(baseClientURL);
        const title = await aboutUsPage.getTitleText();
        expect(title).toEqual('Фундація Лятошинського');
    });

    
});
