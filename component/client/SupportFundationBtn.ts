import { Locator } from "@playwright/test";

export class SupportFoundationBtn {
  link: Locator;
  button: Locator;
  image: Locator;

  constructor(parent: Locator){
    this.link = parent.locator('a[href*="/support-us"]');
    this.button = parent.locator('a[href*="/support-us"] > button')
    this.image = parent.locator('img[alt="Donation Button"]');
  }

  async click(): Promise<void>{
    await this.button.click();
  }

  async getText(): Promise<string> {
    return (await this.button.innerText()).trim();
  }

  async getLink(): Promise<string> {
    const href = await this.link.getAttribute('href') ?? '';
    return href ;
  }
}