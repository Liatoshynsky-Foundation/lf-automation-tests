import { Locator, Page } from "@playwright/test";

export class PageItemComponent {
  private name: Locator;
  private link: Locator;
  

  constructor(parent: Locator) {
    this.name = parent;
    this.link = parent.locator('..');
  }

  async get_Name(): Promise<string> {
    return await this.name.innerText() || '';
  }

  async getLink(): Promise<string> {
    const href = await this.link.getAttribute('href') ?? '';
    return href ;
  }

  async click(): Promise<void> {
    await this.link.click();
  }
}