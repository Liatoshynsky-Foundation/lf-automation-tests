import {Page} from '@playwright/test';

import {FilterButtonComponent} from "../../component/client/filters/FilterButtonComponent";
import {ClientBasePage} from "./ClientBasePage";

export class ArtistryPage extends ClientBasePage {

    readonly filterButton: FilterButtonComponent;

    constructor(page: Page) {
        super(page);
        this.filterButton = new FilterButtonComponent(page, this.page.locator('body'));
    }

    async visit(): Promise<void> {
        await this.goto(await this.getPathCurrentLanguage('artistry'));
    }
}

