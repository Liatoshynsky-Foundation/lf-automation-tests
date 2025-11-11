import {expect, Page} from '@playwright/test';
import {ClientBasePage} from './ClientBasePage';
import {SortButton} from "../../component/client/SortButton";
import {WorkItemComponent} from "../../component/client/WorkItemComponent";
import * as allure from "allure-js-commons";

export class ResearchAndAcademicWorksPage extends ClientBasePage {

    // Table column indices
    private static readonly NAME_COLUMN_INDEX = 0;
    private static readonly AUTHOR_COLUMN_INDEX = 1;
    private static readonly YEAR_COLUMN_INDEX = 2;

    nameSortButton : SortButton;
    authorSortButton : SortButton;
    yearSortButton : SortButton;

    constructor(page: Page) {
        super(page);
        this.nameSortButton = new SortButton(this.page, this.page.locator("th > div").nth(ResearchAndAcademicWorksPage.NAME_COLUMN_INDEX));
        this.authorSortButton = new SortButton(this.page, this.page.locator("th > div").nth(ResearchAndAcademicWorksPage.AUTHOR_COLUMN_INDEX));
        this.yearSortButton = new SortButton(this.page, this.page.locator("th > div").nth(ResearchAndAcademicWorksPage.YEAR_COLUMN_INDEX));
    }

    async visit(): Promise<void> {
        await this.goto('/research');
    }

    async getWorkItems(): Promise<WorkItemComponent[]> {
        return await allure.step('Get Work items', async () => {
            await expect(this.page.locator("tbody tr td p").nth(0)).toBeVisible();
            const items = await this.page.locator("tbody tr").all();
            return items.map(item => new WorkItemComponent(this.page, item));        });
    }
}

