import {expect, Page} from '@playwright/test';
import {ClientBasePage} from './ClientBasePage';
import {SortButton} from "../../component/client/SortButton";
import {WorkItemComponent} from "../../component/client/WorkItemComponent";

export class ResearchAndAcademicWorksPage extends ClientBasePage {

    nameSortButton : SortButton;
    authorSortButton : SortButton;
    yearSortButton : SortButton;

    constructor(page: Page) {
        super(page);
        this.nameSortButton = new SortButton(this.page, this.page.locator("th > div").nth(0));
        this.authorSortButton = new SortButton(this.page, this.page.locator("th > div").nth(1));
        this.yearSortButton = new SortButton(this.page, this.page.locator("th > div").nth(2));
    }

    async visit(): Promise<void> {
        await this.goto('/research');
    }

    async getWorkItems(): Promise<WorkItemComponent[]> {
        await expect(this.page.locator("tbody tr td p").nth(0)).toBeVisible();
        const items = await this.page.locator("tbody tr").all();
        return items.map(item => new WorkItemComponent(this.page, item));
    }
}

