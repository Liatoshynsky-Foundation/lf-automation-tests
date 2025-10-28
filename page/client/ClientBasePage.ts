import { Page } from '@playwright/test';
import { BasePage} from '../BasePage';
import { HeaderComponent } from '../../component/client/HeaderComponent';
import { FooterComponent } from '../../component/client/FooterComponent';
import { CookiesModal } from "../../component/client/CookiesModal";

export class ClientBasePage extends BasePage {
  header: HeaderComponent;
  footer: FooterComponent;
  protected cookiesModal: CookiesModal;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.cookiesModal = new CookiesModal(page);
  }

  async goto(path: string): Promise<void> {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
      await this.cookiesModal.acceptAll(2000);
  }

  async getTitleText(): Promise<string> {
    return await this.title.textContent() || '';
  }

}
