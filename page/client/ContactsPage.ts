import { type Locator, type Page } from '@playwright/test';
import { ContactsInfoComponent } from '../../component/client/ContactsInfoComponent';
import { ContactFormC } from '../../component/client/ContactFormC';
import {ClientBasePage} from "./ClientBasePage";

const CONTACTS_PAGE_PATH = 'contacts';


export class ContactsPage extends ClientBasePage {
  public pageHeading: Locator;
  private contactsInfoComponent: ContactsInfoComponent;
  private contactFormC: ContactFormC;

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
  
  async visit(): Promise<void> {
    await this.page.goto(await this.getPathCurrentLanguage(CONTACTS_PAGE_PATH));
  }
}

