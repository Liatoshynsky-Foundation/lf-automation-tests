// component/client/VolunteerActionComponent.ts

import { Locator, Page } from '@playwright/test';
export class VolunteerActionComponent {
    private readonly sectionCards: Locator; 
    private readonly offerHelpButton: Locator;

    constructor(private page: Page) {
       
        const parentContainer = 'div.MuiBox-root.css-1fesufy';
        this.sectionCards = page.locator(`${parentContainer} > div.MuiBox-root`);
        
        this.offerHelpButton = page.locator('body > div.MuiBox-root.css-swu6uj > div > div > div.MuiBox-root.css-c1nekw > div.MuiBox-root.css-1fesufy > a > div > div.MuiBox-root.css-1vx2ffw > p' );
    }

    async isMainTitleVisible(): Promise<boolean> {
        return this.page.locator('h2', { hasText: 'ДОПОМОГТИ СПРАВАМИ' }).isVisible();
    }
    
    async getNumberOfDescriptionSections(): Promise<number> {
        return this.sectionCards.count();
    }

    async clickOfferHelpButton(): Promise<void> {
        await this.offerHelpButton.click();
    }
}