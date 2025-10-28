import { Page } from '@playwright/test';
import { ClientBasePage } from './ClientBasePage';
import { VolunteerActionComponent } from '../../component/client/VolunteerActionComponent';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';

export class SupportUsPage extends ClientBasePage {

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

