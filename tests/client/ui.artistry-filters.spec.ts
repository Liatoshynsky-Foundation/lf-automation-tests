import {expect, test} from '../../fixtures/fixturePage';
import {Language} from "../../data/enums";
import {FilterNames, FilterOptions, ChipText, ValidationMessages } from "../../data/filter.constants";
import * as allure from 'allure-js-commons';
import {FilterYearItemComponent} from "../../component/client/filters/FilterYearItemComponent";
import {FilterDropdownComponent} from "../../component/client/filters/FilterDropdownComponent";
import {FilterOptionItemComponent} from "../../component/client/filters/FilterOptionItemComponent";
import {FilterListItemComponent} from "../../component/client/filters/FilterListItemComponent";


test.describe('UI – Artistry Page Filters', () => {

    const currentLanguage = 'Ukrainian';

    test.beforeEach(async ({artistryPage}) => {
        await artistryPage.visit();
        await artistryPage.header.changeLangBtn.waitForHeaderChangeLangBtnVisible();
        await artistryPage.header.changeLangBtn.selectLanguage(Language[currentLanguage]);
    });

    test('TC001 – Open and close Filters menu', async ({artistryPage}) => {
        await allure.description('Verify that the Filters menu can be opened and closed.');
        await allure.label('feature', 'Filters');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Filters Menu');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Close Filters menu', async () => {
            await artistryPage.filterButton.closeFiltersMenu();
            expect(await filtersMenu.isHidden()).toBe(true);
        });
    });

    test('TC002 – Select one filter option', async ({ artistryPage }) => {
        await allure.description('Verify selecting a single filter option updates chip and badge count.');
        await allure.label('feature', 'Filters');
        await allure.label('severity', 'normal');
        await allure.parameter('Component', 'Genre Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let filterDropdown: FilterDropdownComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Open Genre filter dropdown', async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            filterDropdown = await genreFilter.openDropdown();
        });

        await allure.step('Select "Romance" option', async () => {
            const option = filterDropdown.getOption(FilterOptions.ROMANCE);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Verify chip label shows correct selection count', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(true);
            expect(await chip.getLabel()).toContain(ChipText[currentLanguage].oneSelected);
        });

        await allure.step('Verify badge count is updated to 1', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);
        });
    });

    test('TC003 – Select multiple filter options', async ({ artistryPage }) => {
        await allure.description('Verify multiple filters update the badge count correctly.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Genre + Year Filters');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Select option from Genre filter', async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            const dropdown = await genreFilter.openDropdown();
            const option = dropdown.getOption(FilterOptions.ART_SONG);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Verify chip label shows correct selection count', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(true);
            expect(await chip.getLabel()).toContain(ChipText[currentLanguage].oneSelected);
        });

        await allure.step('Close Genre dropdown', async () => {
             await filtersMenu.closeOpenedDropdown();
             expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Set year range in Year filter', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            await yearFilter.setYearRange('1918', '1950');
            await filtersMenu.closeOpenedDropdown();
        });

        await allure.step('Verify badge count is updated to 2', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);
        });
    });

    test('TC004 – Clear one selected filter', async ({ artistryPage }) => {
        await allure.description('Verify clearing a single selected filter resets state.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Genre Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let option: FilterOptionItemComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Select option from Genre filter', async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            const dropdown = await genreFilter.openDropdown();
            option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Clear selected option from dropdown', async () => {
            await option.deselect();
            expect(await option.isSelected()).toBe(false);
        });

        await allure.step('Verify chip label is hidden after clearing selection', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(false);
        });

        await allure.step('Verify badge is hidden after clearing selection', async () => {
            await filtersMenu.page.waitForTimeout(500);
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
    });

    test('TC005 – Clear all selected filters', async ({artistryPage}) => {
        await allure.description('Verify clearing all filters resets all active states.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Filters Menu');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Select option from Genre filter', async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            const dropdown = await genreFilter.openDropdown();
            const option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Close Genre dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Set year range in Year filter', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            await yearFilter.setYearRange('1950', '1975');
            await filtersMenu.closeOpenedDropdown();
        });

        await allure.step('Verify badge count is updated to 2', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);
        });

       await allure.step('Clear all selected filters', async () => {
            await filtersMenu.page.waitForTimeout(500);
            await filtersMenu.clearAllFilters();
            await filtersMenu.page.waitForTimeout(500);
        });

        await allure.step('Verify chip label is hidden after clearing selection', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(false);
        })
        await allure.step('Verify badge is hidden after clearing selection', async () => {
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
    });

    test('TC006 – Verify no active filters by default', async ({artistryPage}) => {
        await allure.description('Ensure that the filters badge is hidden by default.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Filter Button');

        await allure.step('Verify badge is hidden after clearing selection', async () => {
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
    });

    test('TC007 – Verify badge count updates dynamically', async ({artistryPage}) => {
        await allure.description('Validate dynamic badge updates as filters are selected and deselected.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Badge Count');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Select option from Genre filter', async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            const dropdown = await genreFilter.openDropdown();
            const option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Close Genre dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Set year range in Year filter', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            await yearFilter.setYearRange('1950', '1975');
            await filtersMenu.closeOpenedDropdown();
        });

        await allure.step('Verify badge count is updated to 2', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);
        });

        await allure.step('Open Genre dropdown and clear selected before option', async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            const dropdown = await genreFilter.openDropdown();
            const option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.deselect();
            expect(await option.isSelected()).toBe(false);
        });

        await allure.step('Close Genre dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Verify badge count is updated to 1', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);
        });

        await allure.step('Open Year filter dropdown', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Click "Clear filter" button in Year filter', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.clickClearFilterButton();
        });

        await allure.step('Close Year filter dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            await filtersMenu.page.waitForTimeout(500);
        });

        await allure.step('Verify badge is hidden after clearing selection', async () => {
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
    });

    test('TC008 – Validate chip count updates correctly', async ({artistryPage}) => {
        await allure.description('Ensure that the chip label reflects correct number of selected options.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Chip');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let dropdown:FilterDropdownComponent;
        let option:FilterOptionItemComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step("Select 'Romance' option from Genre filter", async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            dropdown = await genreFilter.openDropdown();
            option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Verify chip label shows correct selection count', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(true);
            expect(await chip.getLabel()).toContain(ChipText[currentLanguage].oneSelected);
        });

        await allure.step("Select 'Art song' option from Genre filter", async () => {
            const option = dropdown.getOption(FilterOptions.ART_SONG);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });
        await allure.step('Verify chip label shows correct selection count', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(true);
            expect(await chip.getLabel()).toContain(ChipText[currentLanguage].twoSelected);
        });

        await allure.step('Clear selected option from dropdown', async () => {
            await option.deselect();
            expect(await option.isSelected()).toBe(false);
        });

        await allure.step('Verify chip label shows correct selection count', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(true);
            expect(await chip.getLabel()).toContain(ChipText[currentLanguage].oneSelected);
        });
    });

    test('TC009 – Year range valid', async ({artistryPage}) => {
        await allure.description('Verify valid year range values are accepted.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Year Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let yearFilter: FilterYearItemComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Set year range in Year filter', async () => {
            yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            await yearFilter.setYearRange('1919', '1997');
            await filtersMenu.closeOpenedDropdown();
        });

        await allure.step('Verify badge count is updated to 1', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);
         });
    });

    test('TC010 – Year range invalid', async ({artistryPage}) => {
        await allure.description('Verify validation messages for invalid year ranges.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Year Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let yearFilter: FilterYearItemComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Open Year filter dropdown', async () => {
            yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            expect(await yearFilter.isVisible()).toBe(true);
        });

        await allure.step('Enter valid "From" year and invalid "To" year', async () => {
            await yearFilter.updateFromInput('1918');
            await yearFilter.updateToInput('1999');
            expect(await yearFilter.isToValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify  validation message for "To" field is present', async () => {
            expect(await yearFilter.isToValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify text of "To" validation message', async () => {
            expect(await yearFilter.getToValidationText()).toBe(ValidationMessages[currentLanguage].TO_GREATER_THAN_MAX);
        });

        await allure.step('Enter invalid "From" year and valid "To" year', async () => {
            await yearFilter.updateFromInput('1917');
            await yearFilter.updateToInput('1998');
            expect(await yearFilter.isFromValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify  validation message for "From" field is present', async () => {
            expect(await yearFilter.isFromValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify text of "From" validation message', async () => {
            expect(await yearFilter.getFromValidationText()).toBe(ValidationMessages[currentLanguage].FROM_LESS_THAN_MIN);
        });

        await allure.step('Enter invalid "From" year and invalid "To" year', async () => {
            await yearFilter.updateFromInput('1917');
            await yearFilter.updateToInput('1999');
            expect(await yearFilter.isFromValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify  validation message for "From" field is present', async () => {
            expect(await yearFilter.isFromValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify text of "From" validation message', async () => {
            expect(await yearFilter.getFromValidationText()).toBe(ValidationMessages[currentLanguage].FROM_LESS_THAN_MIN);
        });

        await allure.step('Verify  validation message for "To" field is present', async () => {
            expect(await yearFilter.isToValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify text of "To" validation message', async () => {
            expect(await yearFilter.getToValidationText()).toBe(ValidationMessages[currentLanguage].TO_GREATER_THAN_MAX);
        });

        await allure.step('Verify badge is hidden after invalid inputs', async () => {
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
    });

    test('TC011 – Validation: Year range accepts only numeric values', async ({ artistryPage }) => {
        await allure.description('Verify year filter fields only accept numeric values.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Year Filter');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let yearFilter: FilterYearItemComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Open Year filter dropdown', async () => {
            yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            expect(await yearFilter.isVisible()).toBe(true);
        });

        await allure.step('Enter numeric values in "From" and "To" year fields', async () => {
            await yearFilter.updateFromInput('abc');
            await yearFilter.updateToInput('xyz');
            expect(await yearFilter.isFromValidationMessageVisible()).toBe(true);
        });

        await allure.step('Verify  validation message for "From" field is present', async () => {
            expect(await yearFilter.isToValidationMessageVisible()).toBe(true);
        });
        await allure.step('Verify text of "From" validation message', async () => {
            expect(await yearFilter.getToValidationText()).toBe(ValidationMessages[currentLanguage].NUMERIC_ONLY);
        });

        await allure.step('Verify  validation message for "To" field is present', async () => {
            expect(await yearFilter.isToValidationMessageVisible()).toBe(true);
        });
        await allure.step('Verify text of "To" validation message', async () => {
            expect(await yearFilter.getToValidationText()).toBe(ValidationMessages[currentLanguage].NUMERIC_ONLY);
        });

        await allure.step('Verify badge is hidden after invalid inputs', async () => {
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
    });

    test('TC012 – Open and close filter dropdown', async ({artistryPage}) => {
        await allure.description('Check that dropdown opens and closes correctly.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Dropdown');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step("Open Genre filter dropdown", async () => {
            const genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            await genreFilter.openDropdown();
            expect(await genreFilter.isDropdownVisible()).toBe(true);
        });

        await allure.step('Close Genre dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });
    });

    test('TC013 – "Clear All filters" (trash icon) button hidden when no filters selected', async ({artistryPage}) => {
        await allure.description('Ensure "Clear all filters" icon is hidden when no filters are active.');
        await allure.label('feature', 'Filters');
        await allure.parameter('Component', 'Clear All Button');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Verify Clear All button is hidden', async () => {
            expect(await filtersMenu.isClearAllButtonVisible()).toBe(false);
        });
    });

    test('TC014 – Combined interaction flow', async ({ artistryPage }) => {
        await allure.description('Verify full user interaction flow across multiple filters components.');
        await allure.label('feature', 'Filters');
        await allure.label('severity', 'critical');
        await allure.parameter('Component', 'All');

        const filtersMenu = await artistryPage.filterButton.openFiltersMenu();
        let dropdown: FilterDropdownComponent;
        let genreFilter:FilterListItemComponent;

        await allure.step('Verify Filters menu is visible', async () => {
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Select option from Genre filter', async () => {
            genreFilter = filtersMenu.getListFilter(FilterNames.GENRE);
            dropdown = await genreFilter.openDropdown();
            const option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.select();
            expect(await option.isSelected()).toBe(true);
        });

        await allure.step('Close Genre dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            await filtersMenu.page.waitForTimeout(500);
        });

        await allure.step('Verify chip label shows correct selection count', async () => {
            const chip = filtersMenu.getActiveChip();
            expect(await chip.isVisible()).toBe(true);
            expect(await chip.getLabel()).toContain(ChipText[currentLanguage].oneSelected);
        });

        await allure.step('Verify badge count is updated to 1', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);

        });

        await allure.step('Set year range in Year filter', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            expect(await yearFilter.isVisible()).toBe(true);
            await yearFilter.setYearRange('1918', '1950');
            await filtersMenu.closeOpenedDropdown();
        });

        await allure.step('Verify badge count is updated to 2', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(2);
        });

        await allure.step("Open Genre filter an deselect 'Romance' option", async () => {
            filtersMenu.getListFilter(FilterNames.GENRE);
            await genreFilter.openDropdown();
            const option = dropdown.getOption(FilterOptions.ROMANCE);
            await option.deselect();
            expect(await option.isSelected()).toBe(false);
        });

        await allure.step('Close Genre dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Verify badge count is updated to 1', async () => {
            expect(await artistryPage.filterButton.getBadgeCount()).toBe(1);
        });
        await allure.step('Open Year filter dropdown', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.openDropdown();
            expect(await filtersMenu.isVisible()).toBe(true);
        });

        await allure.step('Click "Clear filter" button in Year filter', async () => {
            const yearFilter = filtersMenu.getYearFilter();
            await yearFilter.clickClearFilterButton();
        });

        await allure.step('Close Year filter dropdown', async () => {
            await filtersMenu.closeOpenedDropdown();
        });

        await allure.step('Verify badge is hidden after clearing selection', async () => {
            await filtersMenu.page.waitForTimeout(500);
            expect(await artistryPage.filterButton.isBadgeHidden()).toBe(true);
        });
   });
});