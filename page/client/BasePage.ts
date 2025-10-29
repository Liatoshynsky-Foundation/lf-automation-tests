import {Locator, Page} from '@playwright/test';
import { HeaderComponent } from '../../component/client/HeaderComponent';
import { FooterComponent } from '../../component/client/FooterComponent';

export class BasePage {
  protected page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  private  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.title = page.locator('//title');
  }

  async getPathCurrentLanguage(path: string) {
    const currentURL = new URL(this.page.url());
    const basePath = currentURL.pathname.split('/')[1];
    return `/${basePath}/${path}`;
  }

  async goto(path = ''): Promise<void> {
    // allow either full url or relative path
    if (path.startsWith('http')) {
      await this.page.goto(path);
    } else {
      await this.page.goto(path || '/');
    }
  }

  async getTitleText(): Promise<string> {
    return await this.title.textContent() || '';
  }

}
