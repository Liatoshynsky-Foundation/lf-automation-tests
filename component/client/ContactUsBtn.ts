import { Locator } from "@playwright/test";

export class ContactUsBtn {
  button: Locator;
  link: Locator;
  image: Locator;

  constructor(parent: Locator){
    this.button = parent.locator('a[href*="/contacts"] > button')
    this.link = parent.locator('a[href*="/contacts"]:has(button)');
    this.image = parent.locator('img[alt="Contact Us Button"]');
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