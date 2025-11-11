import {expect, test} from '../../fixtures/fixturePage';
import * as allure from 'allure-js-commons';

test.describe('UI – Base Page (About us)', () => {
    test('check quotes on base page', async ({aboutUsPage}) => {
        await allure.description('Verify quotes');
        await allure.label('severity', 'low');

        await allure.step('Go to homepage', async () => {
            await aboutUsPage.goto('/');
        });

        await allure.step('Verify that at least one quote is displayed', async () => {
            const count = await aboutUsPage.getQuotesCount();
            expect(count).toBeGreaterThan(0);
        });

        await allure.step('Verify that all quotes have text and source', async () => {
            const texts = await aboutUsPage.getQuotesTexts();
            const sources = await aboutUsPage.getQuotesSourcesTexts();

            expect(texts.length).toBe(sources.length);
            for (let i = 0; i < texts.length; i++) {
                expect(texts[i].trim().length).toBeGreaterThan(0);
                expect(sources[i].trim().length).toBeGreaterThan(0);
            }
        });

        await allure.step('Verify that the first quote matches the expected one', async () => {
            const firstQuoteData =
                { text: 'There will, of course, be a lot of interesting things, but you won\'t hear everything, because two concerts or operas will be held in different theaters and halls in one evening.',
                    source: 'Letter from Boris Lyatoshynsky to Margarita Tsarevich, 29 September 1957, Berlin' };

            const firstQuote = await aboutUsPage.getQuoteByOrder(0);
            expect(firstQuote).not.toBeNull();

            const text = await firstQuote!.getQuoteText();
            const source = await firstQuote!.getQuoteSourceText();

            expect(text).toEqual(firstQuoteData.text);
            expect(source).toEqual(firstQuoteData.source);
        });

        await allure.step('Verify that all quotes are unique', async () => {
            const texts = await aboutUsPage.getQuotesTexts();
            const unique = new Set(texts);

            expect(texts.length).toBe(unique.size);
        });

    });
});