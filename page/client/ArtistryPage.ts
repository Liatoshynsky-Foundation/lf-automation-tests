import { Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { FilterButtonComponent } from "../../component/client/filters/FilterButtonComponent";
import { ClientBasePage } from "./ClientBasePage";
import {SearchComponent} from "../../component/client/SearchComponent";

export class ArtistryPage extends ClientBasePage {

    filterButton: FilterButtonComponent;
    search: SearchComponent;

    constructor(page: Page) {
        super(page);
        this.filterButton = new FilterButtonComponent(page, this.page.locator('body'));
        this.search = new SearchComponent(page, this.page.locator('body'));
    }

    async visit(): Promise<void> {
        return await step(`Visit Artistry page.`, async () => {
            await this.goto(await this.getPathCurrentLanguage('artistry'));
        });
    }
}