import {expect, test} from '../../fixtures/fixturePage';
import * as allure from "allure-js-commons";

test.describe('Research and Academic Works Page', () => {
    test('Verify sorting functionality by Name, Author, and Year', async ({researchAndAcademicWorksPage}) => {
        await allure.description('Checks that sorting buttons correctly arrange items by Name, Author, and Year.');
        await allure.label('epic', 'Research and Academic Works Page');
        await allure.label('feature', 'Sorting');
        await allure.label('severity', 'critical');

        await allure.step('Go to ResearchAndAcademicWorksPage', async () => {
            await researchAndAcademicWorksPage.visit();
        });

        await allure.step('Verify sorting by Name (Ascending)', async () => {
            await researchAndAcademicWorksPage.nameSortButton.sortAscending();

            const items = await researchAndAcademicWorksPage.getWorkItems();
            const names = await Promise.all(items.map(i => i.getName()));
            const sortedAscNames = [...names].sort((a, b) => a.localeCompare(b));

            await allure.attachment('Names on page', JSON.stringify(names, null, 2), 'application/json');
            await allure.attachment('Expected sorted Names (asc)', JSON.stringify(sortedAscNames, null, 2), 'application/json');

            expect(names).toEqual(sortedAscNames);
        });

        await allure.step('Verify sorting by Author (Descending)', async () => {
            await researchAndAcademicWorksPage.authorSortButton.sortDescending();

            const items = await researchAndAcademicWorksPage.getWorkItems();
            const authors = await Promise.all(items.map(i => i.getAuthor()));
            const sortedDescAuthors = [...authors].sort((a, b) => b.localeCompare(a));

            await allure.attachment('Authors on page', JSON.stringify(authors, null, 2), 'application/json');
            await allure.attachment('Expected sorted Authors (desc)', JSON.stringify(sortedDescAuthors, null, 2), 'application/json');

            expect(authors).toEqual(sortedDescAuthors);
        });

        await allure.step('Verify sorting by Year (Ascending)', async () => {
            await researchAndAcademicWorksPage.yearSortButton.sortAscending();

            const items = await researchAndAcademicWorksPage.getWorkItems();
            const years = await Promise.all(items.map(i => i.getYearNormalized()));
            const sortedAscYears = [...years].sort((a, b) => a - b);

            await allure.attachment('Years on page', JSON.stringify(years, null, 2), 'application/json');
            await allure.attachment('Expected sorted Years (asc)', JSON.stringify(sortedAscYears, null, 2), 'application/json');

            expect(years).toEqual(sortedAscYears);
        });

    });

    test('Verify sorting buttons states order', async ({researchAndAcademicWorksPage}) => {
        await allure.description('Ensures that each sorting button cycles through states in the correct order');
        await allure.label('epic', 'Research and Academic Works Page');
        await allure.label('feature', 'Sorting');
        await allure.label('severity', 'high');

        await allure.step('Go to ResearchAndAcademicWorksPage', async () => {
            await researchAndAcademicWorksPage.visit();
        });

        await allure.step('Verify nameSortButton sorting states order)', async () => {
            await researchAndAcademicWorksPage.nameSortButton.verifyOrderCycle([
                'default',
                'ascending',
                'descending',
                'default']);
        });

        await allure.step('Verify authorSortButton sorting states order)', async () => {
            await researchAndAcademicWorksPage.authorSortButton.verifyOrderCycle([
                'default',
                'ascending',
                'descending',
                'default']);
        });

        await allure.step('Verify yearSortButton sorting states order)', async () => {
            await researchAndAcademicWorksPage.yearSortButton.verifyOrderCycle([
                'default',
                'ascending',
                'descending',
                'default']);
        });
    });
});