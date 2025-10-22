// component/client/VolunteerActionComponent.ts

import {Locator, Page} from '@playwright/test';
import {BaseComponent} from "./BaseComponent";


export class VolunteerActionComponent extends BaseComponent {
    sectionCards: Locator;
    offerHelpButton: Locator;

    constructor(page: Page, parentLocator: Locator) {
        super(page, parentLocator);

        this.sectionCards = this.page.locator('div.MuiBox-root.css-1fesufy > div.MuiBox-root');

        this.offerHelpButton = this.page.locator('body > div.MuiBox-root.css-swu6uj > div > div > div.MuiBox-root.css-c1nekw > div.MuiBox-root.css-1fesufy > a > div > div.MuiBox-root.css-1vx2ffw > p');
    }

    async isMainTitleVisible(): Promise<boolean> {
        return this.page.locator('h2', {hasText: 'ДОПОМОГТИ СПРАВАМИ'}).isVisible();
    }

    async getNumberOfDescriptionSections(): Promise<number> {
        return this.sectionCards.count();
    }

    async clickOfferHelpButton(): Promise<void> {
        await this.offerHelpButton.click();
    }
}