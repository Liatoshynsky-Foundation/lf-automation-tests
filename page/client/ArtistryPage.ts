import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import {FilterButtonComponent} from "../../component/client/filters/FilterButtonComponent";

export class ArtistryPage extends BasePage {

    readonly filterButton: FilterButtonComponent;

    constructor(page: Page) {
    super(page);
    this.filterButton = new FilterButtonComponent(page, this.page.locator('body'));
  }

  async visit(): Promise<void> {
    await this.goto('uk/artistry');
  }
}

