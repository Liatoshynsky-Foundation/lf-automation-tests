import {Locator, Page} from '@playwright/test';
import { HeaderComponent } from '../../component/client/HeaderComponent';
import { FooterComponent } from '../../component/client/FooterComponent';

export class BasePage {
  protected page: Page;
  header: HeaderComponent;
  footer: FooterComponent;
  private  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.title = page.locator('//title');
  }

  async goto(path: string): Promise<void> {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getTitleText(): Promise<string> {
    return await this.title.textContent() || '';
  }

}
