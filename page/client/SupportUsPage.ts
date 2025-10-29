import {Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {VolunteerActionComponent} from '../../component/client/VolunteerActionComponent';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';

export class SupportUsPage extends BasePage {

    public volunteerAction: VolunteerActionComponent;
    public quickDonation: QuickDonationComponent;


    constructor(page: Page) {
        super(page);
        this.volunteerAction = new VolunteerActionComponent(page);
        this.quickDonation = new QuickDonationComponent(page);
    }

    async visit(): Promise<void> {
        await this.goto('/support-us');
    }
}

