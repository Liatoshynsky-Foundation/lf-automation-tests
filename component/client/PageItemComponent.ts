import { Locator, Page } from "@playwright/test";

export class PageItemComponent {
  private name: Locator;
  private link: Locator;
  

  constructor(parent: Locator) {
    this.name = parent.locator('a li');
    this.link = parent.locator('a');
  }

  async getName(): Promise<string> {
    return await this.name.innerText() || '';
  }

  async getLink(): Promise<string> {
    const href = await this.link.getAttribute('href') ?? '';
    return href ;
  }

  async visitPage(page: Page): Promise<void> {
    const href = await this.getLink();
    if (!href) throw new Error('Page not found!');
    await page.goto(href);
  }
  
}