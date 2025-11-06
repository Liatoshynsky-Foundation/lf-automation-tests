import {expect, test} from '../../fixtures/fixturePage';
import * as allure from "allure-js-commons";

test.describe('Research and Academic Works Page', () => {
    test('Verify sorting functionality by Name, Author, and Year', async ({researchAndAcademicWorksPage}) => {

        await allure.step('Go to ResearchAndAcademicWorksPage', async () => {
            await researchAndAcademicWorksPage.visit();
        });

        await allure.step('Verify sorting by Name (Ascending)', async () => {
            await researchAndAcademicWorksPage.nameSortButton.sortAscending();

            const items = await researchAndAcademicWorksPage.getWorkItems();
            const names = await Promise.all(items.map(i => i.getName()));
            const sortedAscNames = [...names].sort((a, b) => a.localeCompare(b));

            await allure.parameter('Names on page', JSON.stringify(names));
            await allure.parameter('Expected sorted Names (asc)', JSON.stringify(sortedAscNames));

            expect(names).toEqual(sortedAscNames);
        });

        await allure.step('Verify sorting by Author (Descending)', async () => {
            await researchAndAcademicWorksPage.authorSortButton.sortDescending();

            const items = await researchAndAcademicWorksPage.getWorkItems();
            const authors = await Promise.all(items.map(i => i.getAuthor()));
            const sortedDescAuthors = [...authors].sort((a, b) => b.localeCompare(a));

            await allure.parameter('Authors on page', JSON.stringify(authors));
            await allure.parameter('Expected sorted Authors (desc)', JSON.stringify(sortedDescAuthors));

            expect(authors).toEqual(sortedDescAuthors);
        });

        await allure.step('Verify sorting by Year (Ascending)', async () => {
            await researchAndAcademicWorksPage.yearSortButton.sortAscending();

            const items = await researchAndAcademicWorksPage.getWorkItems();
            const years = await Promise.all(items.map(i => i.getYearNormalized()));
            const sortedAscYears = [...years].sort((a, b) => a - b);

            await allure.parameter('Years on page', JSON.stringify(years));
            await allure.parameter('Expected sorted Years (asc)', JSON.stringify(sortedAscYears));

            expect(years).toEqual(sortedAscYears);
        });

    });
});