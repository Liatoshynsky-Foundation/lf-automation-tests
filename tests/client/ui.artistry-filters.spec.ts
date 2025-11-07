import { test, expect } from '../../fixtures/fixturePage';
import * as allure from 'allure-js-commons';

test.describe('UI – Artistry Page Filters', () => {

    test.beforeEach(async ({ artistryPage }) => {
        await artistryPage.visit();
    });

    test('TC001 – Open and close Filters menu', async ({ artistryPage }) => {
        allure.description('Verify that the Filters menu can be opened and closed.');
        allure.label('feature', 'Filters');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Filters Menu');

        await allure.step('Open Filters menu', async () => {
            const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
            expect(await filtersMenu.isVisible()).toBe(true);

            await allure.step('Close Filters menu', async () => {
                await artistryPage.filterButton.closeFiltersMenu();
                expect(await filtersMenu.isHidden()).toBe(true);
            });
        });
    });

    test('TC002 – Select one filter option', async ({ artistryPage }) => {
        allure.description('Verify selecting a single filter option updates chip and badge count.');
        allure.label('feature', 'Filters');
        allure.label('severity', 'normal');
        allure.parameter('Component', 'Genre Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        expect(await filtersMenu.isVisible()).toBe(true);
        const genreFilter = filtersMenu.getListFilter('Жанр');
        const dropdown = await genreFilter.openDropdown();

        const option = dropdown.getOption('Романс');
        await option.select();
        expect(await option.isSelected()).toBe(true);

        const chip = filtersMenu.getActiveChip();
        expect(await chip.isVisible()).toBe(true);
        expect(await chip.getLabel()).toContain('1 обрано');

        const badgeCount = await artistryPage.filterButton.getBadgeCount();
        expect(badgeCount).toBe(1);
    });

    test('TC003 – Select multiple filter options', async ({ artistryPage }) => {
        allure.description('Verify multiple filters update the badge count correctly.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Genre + Year Filters');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        const genreFilter = filtersMenu.getListFilter('Жанр');
        const dropdown = await genreFilter.openDropdown();
        const artSongOption = dropdown.getOption('Мистецька пісня');
        await artSongOption.select();
        expect(await artSongOption.isSelected()).toBe(true);

        const chip = filtersMenu.getActiveChip();
        expect(await chip.isVisible()).toBe(true);
        expect(await chip.getLabel()).toContain('1 обрано');

        await filtersMenu.closeOpenedDropdown();

        const yearFilter = filtersMenu.getYearFilter('Рік');
        await yearFilter.setYearRange('1918', '1950');
        await filtersMenu.closeOpenedDropdown();

        expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);
    });

    test('TC004 – Clear one selected filter', async ({ artistryPage }) => {
        allure.description('Verify clearing a single selected filter resets state.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Genre Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const genreFilter = filtersMenu.getListFilter('Жанр');
        const dropdown = await genreFilter.openDropdown();

        const romanceOption = dropdown.getOption('Романс');
        await romanceOption.select();
        expect(await romanceOption.isSelected()).toBe(true);

        await dropdown.clear();
        expect(await romanceOption.isSelected()).toBe(false);
        await filtersMenu.page.waitForTimeout(500);
        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });

    test('TC005 – Clear all selected filters', async ({ artistryPage }) => {
        allure.description('Verify clearing all filters resets all active states.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Filters Menu');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const genreFilter = filtersMenu.getListFilter('Жанр');
        const genreDropdown = await genreFilter.openDropdown();
        const romanceOption = genreDropdown.getOption('Романс');

        await romanceOption.select();
        expect(await romanceOption.isSelected()).toBe(true);
        await filtersMenu.closeOpenedDropdown();

        const yearFilter = filtersMenu.getYearFilter('Рік');
        await yearFilter.setYearRange('1950', '1975');
        await filtersMenu.closeOpenedDropdown();

        expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);

        await filtersMenu.clearAllFilters();
        await filtersMenu.page.waitForTimeout(500);

        const chip = filtersMenu.getActiveChip();
        expect(await chip.isVisible()).toBe(false);
        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });

    test('TC006 – Verify no active filters by default', async ({ artistryPage }) => {
        allure.description('Ensure that the filters badge is hidden by default.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Filter Button');

        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });

    test('TC007 – Verify badge count updates dynamically', async ({ artistryPage }) => {
        allure.description('Validate dynamic badge updates as filters are selected and deselected.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Badge Count');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const genreFilter = filtersMenu.getListFilter('Жанр');
        const genreDropdown = await genreFilter.openDropdown();
        const romanceOption = genreDropdown.getOption('Романс');

        await romanceOption.select();
        await filtersMenu.closeOpenedDropdown();

        const yearFilter = filtersMenu.getYearFilter('Рік');
        await yearFilter.setYearRange('1950', '1975');
        await filtersMenu.closeOpenDropdown();

        expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);

        await genreFilter.openDropdown();
        await romanceOption.deselect();
        await filtersMenu.closeOpenDropdown();
        expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);

        await yearFilter.openDropdown();
        await yearFilter.clear();
        await filtersMenu.closeOpenDropdown();
        await filtersMenu.page.waitForTimeout(500);

        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });

    test('TC008 – Validate chip count updates correctly', async ({ artistryPage }) => {
        allure.description('Ensure that the chip label reflects correct number of selected options.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Chip');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const genreFilter = filtersMenu.getListFilter('Жанр');
        const dropdown = await genreFilter.openDropdown();

        const romanceOption = dropdown.getOption('Романс');
        await romanceOption.select();
        expect(await romanceOption.isSelected()).toBe(true);

        const chip = genreFilter.getChip();
        expect(await chip.isVisible()).toBe(true);
        expect(await chip.getLabel()).toContain('1 обрано');

        const artSongOption = dropdown.getOption('Мистецька пісня');
        await artSongOption.select();
        expect(await artSongOption.isSelected()).toBe(true);
        expect(await chip.getLabel()).toContain('2 обрано');

        await romanceOption.deselect();
        expect(await chip.getLabel()).toContain('1 обрано');

        await artSongOption.deselect();
        expect(await chip.isVisible()).toBe(false);
    });

    test('TC009 – Year range valid', async ({ artistryPage }) => {
        allure.description('Verify valid year range values are accepted.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Year Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const yearFilter = filtersMenu.getYearFilter('Рік');
        await yearFilter.setYearRange('1919', '1997');
        await filtersMenu.closeOpenedDropdown();

        expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);
    });

    test('TC010 – Year range invalid', async ({ artistryPage }) => {
        allure.description('Verify validation messages for invalid year ranges.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Year Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const yearFilter = filtersMenu.getYearFilter('Рік');

        await yearFilter.setYearRange('1918', '1999');
        expect(await yearFilter.isValidationMessageVisible('Від')).toBe(false);
        expect(await yearFilter.isValidationMessageVisible('До')).toBe(true);

        await yearFilter.updateFromInput('1917');
        await yearFilter.updateToInput('1998');
        expect(await yearFilter.isValidationMessageVisible('Від')).toBe(true);
        expect(await yearFilter.isValidationMessageVisible('До')).toBe(false);

        await yearFilter.updateFromInput('1917');
        await yearFilter.updateToInput('1999');
        expect(await yearFilter.isValidationMessageVisible('Від')).toBe(true);
        expect(await yearFilter.isValidationMessageVisible('До')).toBe(true);

        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });

    test('TC011 – Validation: Year range accepts only numeric values', async ({ artistryPage }) => {
        allure.description('Verify year filter fields only accept numeric values.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Year Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const yearFilter = filtersMenu.getYearFilter('Рік');
        await yearFilter.setYearRange('abc', 'xyz');

        expect(await yearFilter.isValidationMessageVisible('Від')).toBe(true);
        expect(await yearFilter.isValidationMessageVisible('До')).toBe(true);

        await yearFilter.clear();
        expect(await yearFilter.getFromValue()).toBe('1918');
        expect(await yearFilter.getToValue()).toBe('1998');
        expect(await yearFilter.isValidationMessageVisible('Від')).toBe(false);
        expect(await yearFilter.isValidationMessageVisible('До')).toBe(false);
        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });

    test('TC012 – Dropdown visibility toggle', async ({ artistryPage }) => {
        allure.description('Check that dropdown opens and closes correctly.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Dropdown');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const genreFilter = filtersMenu.getListFilter('Жанр');

        await genreFilter.openDropdown();
        expect(await genreFilter.isDropdownVisible()).toBe(true);

        await filtersMenu.closeOpenedDropdown();
        expect(await genreFilter.isDropdownVisible()).toBe(false);
    });

    test('TC013 – Trash icon hidden when no filters selected', async ({ artistryPage }) => {
        allure.description('Ensure "Clear all filters" icon is hidden when no filters are active.');
        allure.label('feature', 'Filters');
        allure.parameter('Component', 'Clear All Button');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        expect(await filtersMenu.isClearAllButtonVisible()).toBe(false);
    });

    test('TC014 – Combined interaction flow', async ({ artistryPage }) => {
        allure.description('Verify full user interaction flow across multiple filters.');
        allure.label('feature', 'Filters');
        allure.label('severity', 'critical');
        allure.parameter('Component', 'Combined Filters Flow');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        const genreFilter = filtersMenu.getListFilter('Жанр');
        const genreDropdown = await genreFilter.openDropdown();
        const romanceOption = genreDropdown.getOption('Романс');

        await romanceOption.select();
        await filtersMenu.closeOpenedDropdown();

        const yearFilter = filtersMenu.getYearFilter('Рік');
        await yearFilter.setYearRange('1950', '1975');
        await filtersMenu.closeOpenedDropdown();

        expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);

        const activeChipLabel = await filtersMenu.getActiveChipLabel();
        expect(activeChipLabel).toContain('1 обрано');

        await genreFilter.openDropdown();
        await genreDropdown.clear();
        await filtersMenu.closeOpenedDropdown();

        expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);

        await yearFilter.openDropdown();
        await yearFilter.clear();
        await filtersMenu.closeOpenedDropdown();

        expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
    });
});