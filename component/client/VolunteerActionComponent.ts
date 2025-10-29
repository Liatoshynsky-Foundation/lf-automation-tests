import { Locator, Page } from '@playwright/test';
import { VolunteerActionCardComponent } from './VolunteerActionCardComponent';
export class VolunteerActionComponent {
    private readonly sectionCards: Locator; 
    private readonly offerHelpButton: Locator;

    constructor(private page: Page) {
        this.sectionCards = this.page.locator('div.MuiBox-root.css-1fesufy > div.MuiBox-root');
        
        this.offerHelpButton = this.page.locator('body > div.MuiBox-root.css-swu6uj > div > div > div.MuiBox-root.css-c1nekw > div.MuiBox-root.css-1fesufy > a > div > div.MuiBox-root.css-1vx2ffw > p');
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
}