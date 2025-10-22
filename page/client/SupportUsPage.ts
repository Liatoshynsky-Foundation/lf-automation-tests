import {Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {VolunteerActionComponent} from '../../component/client/VolunteerActionComponent';

export class SupportUsPage extends BasePage {

    translationAssistance: VolunteerActionComponent;
    eventOrganizationAssistance: VolunteerActionComponent;
    socialMediaManagement: VolunteerActionComponent;

    constructor(page: Page) {
        super(page);
        this.translationAssistance = new VolunteerActionComponent(
            this.page,
            this.page.locator('xpath=/html/body/div[2]/div/div/div[3]/div[2]/div[1]')
        );
        this.eventOrganizationAssistance = new VolunteerActionComponent(
            this.page,
            this.page.locator('xpath=/html/body/div[2]/div/div/div[3]/div[2]/div[2]')
        );
        this.socialMediaManagement = new VolunteerActionComponent(
            this.page,
            this.page.locator('xpath=/html/body/div[2]/div/div/div[3]/div[2]/div[3]')
        );
    }

    async visit(): Promise<void> {
        await this.goto('/support-us');
    }
}

