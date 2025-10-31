import {test, expect} from "../../fixtures/fixturePage";


test.describe('UI - Home page', () => {
    test('Home page shows expected heading (using POM)', async ({aboutUsPage, baseClientURL}) => {
        await aboutUsPage.goto(baseClientURL);
        const title = await aboutUsPage.getTitleText();
        expect(title).toEqual('Фундація Лятошинського');
    });


});
