import {Locator, Page} from '@playwright/test';
import {VolunteerActionCardComponent} from './VolunteerActionCardComponent';

export class VolunteerActionComponent {
    private sectionCards: Locator;
    public mainTitle: Locator;
    public offerHelpButton: Locator;

    constructor(private page: Page) {
        this.sectionCards = this.page.locator('div.MuiBox-root.css-1fesufy > div.MuiBox-root');
        this.mainTitle = page.getByTestId('ActionsHelp-titleContainer-title');
        this.offerHelpButton = page.getByTestId('ActionsHelp-buttonCard');
    }


    async isMainTitleVisible(): Promise<boolean> {
        return this.page.getByTestId("title-icon").isVisible();
    }


    async getCards(): Promise<VolunteerActionCardComponent[]> {
        const count = await this.sectionCards.count();
        const cards: VolunteerActionCardComponent[] = [];

        for (let i = 0; i < count; i++) {
            const cardRoot = this.sectionCards.nth(i);
            cards.push(new VolunteerActionCardComponent(cardRoot));
        }
        return cards;
    }


    async getNumberOfDescriptionSections(): Promise<number> {
        return this.sectionCards.count();
    }


    async clickOfferHelpButton(): Promise<void> {
        await this.offerHelpButton.click();
    }

    async isComponentVisible(): Promise<void> {
        await this.mainTitle.waitFor({ state: 'visible' });
    }
}