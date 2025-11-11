import { test, expect } from '../../fixtures/fixturePage';
import { SearchOptions } from '../../data/search.constants';
import { Language } from '../../data/enums';
import * as allure from 'allure-js-commons';

test.describe('UI – Artistry Page Search', () => {
    const currentLanguage = 'Ukrainian';

    test.beforeEach(async ({ artistryPage }) => {
        await artistryPage.visit();
        await artistryPage.header.changeLangBtn.waitForHeaderChangeLangBtnVisible();
        await artistryPage.header.changeLangBtn.selectLanguage(Language[currentLanguage]);
    });

    test('TC001 – Type query and see suggestions', async ({ artistryPage }) => {

        await allure.step('Verify search input is visible', async () => {
            expect(await artistryPage.search.isVisible()).toBe(true);
        });

        await allure.step('Type partial query into search input', async () => {
            await artistryPage.search.typeSearchQuery('Си');
        });

        await allure.step('Wait for dropdown suggestions to appear', async () => {
            await artistryPage.search.waitForOptionsVisible();
        });

        await allure.step('Verify dropdown contains exactly expected compositions', async () => {
            const options = await artistryPage.search.getOptionsText();

            const expectedOptions = [
                SearchOptions.Ukrainian.SYMPHONY_3,
                SearchOptions.Ukrainian.SYMPHONY_1,
                SearchOptions.Ukrainian.SYMPHONY_2,
                SearchOptions.Ukrainian.SYMPHONIC_WORK
            ];
            expect(options.length).toBe(expectedOptions.length);
            expect(options.sort()).toEqual(expectedOptions.sort());
        });
    });

    test('TC002 – Select composition from dropdown', async ({ artistryPage }) => {
        const expectedComposition = SearchOptions.Ukrainian.SYMPHONY_1;

        await allure.step('Verify search input is visible', async () => {
            expect(await artistryPage.search.isVisible()).toBe(true);
        });

        await allure.step('Type partial query into search input', async () => {
            await artistryPage.search.typeSearchQuery('Си');
        });

        await allure.step('Wait for dropdown suggestions to appear', async () => {
            await artistryPage.search.waitForOptionsVisible();
        });

        await allure.step(`Select "${expectedComposition}" from dropdown`, async () => {
            await artistryPage.search.selectOptionByName(expectedComposition);
        });

        await allure.step('Verify search input is updated with selected composition', async () => {
            const inputValue = await artistryPage.search.getInputValue();
            expect(inputValue).toBe(expectedComposition);
        });
    });

    test('TC003 – Clear search input', async ({ artistryPage }) => {
        const testQuery = SearchOptions.Ukrainian.SONG;

        await allure.step('Verify search input is visible', async () => {
            expect(await artistryPage.search.isVisible()).toBe(true);
        });

        await allure.step(`Type full query "${testQuery}" into search input`, async () => {
            await artistryPage.search.typeSearchQuery(testQuery);
        });

        await allure.step('Verify input value contains typed text', async () => {
            const valueBeforeClear = await artistryPage.search.getInputValue();
            expect(valueBeforeClear).toBe(testQuery);
        });

        await allure.step('Click the clear (×) icon to clear search input', async () => {
            await artistryPage.search.clearSearch();
        });

        await allure.step('Verify search input is cleared after clicking ×', async () => {
            const valueAfterClear = await artistryPage.search.getInputValue();
            expect(valueAfterClear).toBe('');
        });
    });

    test('TC004 – Close search suggestions', async ({ artistryPage }) => {
        const testQuery = 'Соната';

        await allure.step('Type partial query into search input', async () => {
            await artistryPage.search.typeSearchQuery(testQuery);
        });

        await allure.step('Wait for dropdown suggestions to appear', async () => {
            await artistryPage.search.waitForOptionsVisible();
        });

        await allure.step('Click outside search area to close suggestions', async () => {
            await artistryPage.search.closeSearch();
        });

        await allure.step('Verify dropdown is closed after clicking outside', async () => {
            expect(await artistryPage.search.isDropdownHidden()).toBe(true);
        });

        await allure.step('Click on search icon to reopen search field', async () => {
            await artistryPage.search.clickSearchIcon();
        });

        await allure.step('Verify input value remains unchanged after closing dropdown', async () => {
            const inputValue = await artistryPage.search.getInputValue();
            expect(inputValue).toBe(testQuery);
        });
    });

    test('TC005 – No results found', async ({ artistryPage }) => {
        const currentLanguage = 'Ukrainian';
        const invalidQuery = 'test';
        const expectedText = SearchOptions[currentLanguage].NO_RESULTS;

        await allure.step('Type invalid query into search input', async () => {
            await artistryPage.search.typeSearchQuery(invalidQuery);
        });

        await allure.step('Wait for "no results" message to appear', async () => {
            const message = await artistryPage.search.getNoResultsText();
            expect(message?.trim()).toBe(expectedText);
        });

        await allure.step('Close search suggestions', async () => {
            await artistryPage.search.closeSearch();
            expect(await artistryPage.search.isDropdownHidden()).toBe(true);
        });
    });

    test('TC006 – Select correct composition from multiple "Symphony" suggestions', async ({ artistryPage }) => {
        const query = 'Симфонія';
        const expectedComposition = SearchOptions.Ukrainian.SYMPHONY_2;

        await allure.step(`Type partial query "${query}" into search input`, async () => {
            await artistryPage.search.typeSearchQuery(query);
        });

        await allure.step('Wait for "${query}" suggestions to appear', async () => {
            await artistryPage.search.waitForOptionsVisible();
        });

        await allure.step('Verify dropdown contains exactly 3 symphony options', async () => {
            const options = await artistryPage.search.getOptionsText();
            const expectedOptions = [
                SearchOptions.Ukrainian.SYMPHONY_1,
                SearchOptions.Ukrainian.SYMPHONY_2,
                SearchOptions.Ukrainian.SYMPHONY_3,
            ];
            expect(options.length).toBe(expectedOptions.length);
            expect(options.sort()).toEqual(expectedOptions.sort());
        });

        await allure.step(`Select composition "${expectedComposition}" from dropdown`, async () => {
            await artistryPage.search.selectOptionByName(expectedComposition);
        });

        await allure.step('Verify search input displays the selected composition', async () => {
            const inputValue = await artistryPage.search.getInputValue();
            expect(inputValue).toBe(expectedComposition);
        });
    });

    test('TC007 – Search, select, clear and re-search another composition', async ({ artistryPage }) => {
        const firstQuery = 'Соната';
        const firstExpected = SearchOptions.Ukrainian.VIOLIN_SONATA;
        const secondQuery = 'Етюд';
        const secondExpected = SearchOptions.Ukrainian.ETUDE;

        await allure.step(`Type first query "${firstQuery}" into search input`, async () => {
            await artistryPage.search.typeSearchQuery(firstQuery);
        });

        await allure.step('Wait for dropdown and select the first expected composition', async () => {
            await artistryPage.search.waitForOptionsVisible();
            await artistryPage.search.selectOptionByName(firstExpected);
        });

        await allure.step('Verify input value equals selected composition', async () => {
            const inputValue = await artistryPage.search.getInputValue();
            expect(inputValue).toBe(firstExpected);
        });

        await allure.step('Clear the search input', async () => {
            await artistryPage.search.clearSearch();
            const valueAfterClear = await artistryPage.search.getInputValue();
            expect(valueAfterClear).toBe('');
        });

        await allure.step(`Type second query "${secondQuery}" into search input`, async () => {
            await artistryPage.search.typeSearchQuery(secondQuery);
        });

        await allure.step('Wait for dropdown and select the second expected composition', async () => {
            await artistryPage.search.waitForOptionsVisible();
            await artistryPage.search.selectOptionByName(secondExpected);
        });

        await allure.step('Verify input value equals the second selected composition', async () => {
            const inputValue = await artistryPage.search.getInputValue();
            expect(inputValue).toBe(secondExpected);
        });
    });
});