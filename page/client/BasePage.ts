import {Locator, Page} from '@playwright/test';
import { HeaderComponent } from '../../component/client/HeaderComponent';
import { FooterComponent } from '../../component/client/FooterComponent';
import {CookiesModal} from "../../component/client/CookiesModal";

export class BasePage {
  protected page: Page;
  header: HeaderComponent;
  footer: FooterComponent;
  private  title: Locator;
  protected cookiesModal: CookiesModal;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.title = page.locator('//head/title');
    this.cookiesModal = new CookiesModal(page);
  }

  async goto(path: string): Promise<void> {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
      await this.cookiesModal.acceptAll(2000);
      // await this.cookiesModal.acceptAll(10000);
  }

  async getTitleText(): Promise<string> {
    return await this.title.textContent() || '';
  }

}
