import { Locator, Page } from "@playwright/test";

export class MediaMenuBtn {
  button: Locator;
  link: Locator;
  image: Locator;

  constructor(parent: Locator){
    this.button = parent.locator('a > button')
    this.link = parent.locator('a');
    this.image = parent.locator('a button div img');
  }

  async click(): Promise<void>{
    await this.button.click();
  }

    async getLink(): Promise<string> {
    const href = await this.link.getAttribute('href') ?? '';
    return href ;
  }
}