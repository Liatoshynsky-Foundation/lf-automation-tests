import { Locator, Page } from "@playwright/test";

export class HeaderChangeLangBtn {
  image: Locator; 
  menuLocator: Locator;
  checkSelected: Locator;
  

  constructor(parent: Locator) {
    this.image = parent.locator('button img[alt="select language"]');
    this.menuLocator = parent.locator('ul[role="menu"]');
    this.checkSelected = parent.locator('ul[role="menu"] li:has(img[alt="selected locale"])');
  }

  async click(): Promise<void> {
    await this.image.click();
  }

  async getImage(): Promise<string> {
    return await this.image.getAttribute('src') || "";
  }

  async waitForHeaderChangeLangBtnVisible(timeout = 5000): Promise<void> {
    await this.menuLocator.waitFor({ state: 'visible', timeout });
    }

  async selectLanguage(language: string): Promise<void> {
    //this.click();
    //if (!this.subMenuIsVisible) throw new Error('Can`t select language!');
    await this.menuLocator.locator(`li:has-text("${language}")`).click();
  }

  async getSelectedLanguage(): Promise<string> {
    //this.click();
    //if (!this.subMenuIsVisible) throw new Error('Can`t get selected language!');
    return (await this.checkSelected.innerText());
  }
}