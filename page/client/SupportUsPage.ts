import {Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {VolunteerActionComponent} from '../../component/client/VolunteerActionComponent';
import { QuickDonationComponent } from '../../component/client/QuickDonationComponent';
import { FAQComponent } from '../../component/client/FAQComponent';

export class SupportUsPage extends BasePage {

    public volunteerAction: VolunteerActionComponent;
    public quickDonation: QuickDonationComponent;
    public faqSection: FAQComponent;


    constructor(page: Page) {
        super(page);
        this.volunteerAction = new VolunteerActionComponent(page);
        this.quickDonation = new QuickDonationComponent(page);
        this.faqSection = new FAQComponent(page);
    }

    async visit(): Promise<void> {
        await this.goto('/support-us');
    }
}

