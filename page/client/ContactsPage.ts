import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ContactsInfoComponent } from '../../component/client/ContactsInfoComponent';
import { ContactFormC } from '../../component/client/ContactFormC';

const CONTACTS_PAGE_PATH = '/uk/contacts';

export class ContactsPage extends BasePage {
    public  pageHeading: Locator;
    private  contactsInfoComponent: ContactsInfoComponent;
    private  contactFormC: ContactFormC;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h2').filter({ hasText: 'Контакти' });
    this.contactsInfoComponent = new ContactsInfoComponent(page);
    this.contactFormC = new ContactFormC(page);
  }

  async getHeadingText(): Promise<string> {
        return (await this.pageHeading.textContent()) ?? '';
    }

        getContactsInfoComponent(): ContactsInfoComponent {
        return this.contactsInfoComponent;
    }

        getContactFormC(): ContactFormC {
        return this.contactFormC;
    }

  
}

