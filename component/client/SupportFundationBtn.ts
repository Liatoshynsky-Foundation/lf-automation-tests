import { Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

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
    await allure.step ('Click Support Btn', async () => {
      await this.button.click();
    })
  }

  async getText(): Promise<string> {
    let btnText: string = "";
    await allure.step('Get text on Support Btn', async () => {
      btnText = await this.button.innerText();
    })
    return btnText.trim();
  }

  async getLink(): Promise<string> {
    let link: string = "";
    await allure.step('Get image link of Support Btn', async () => {
      link = await this.link.getAttribute('href') ?? '';
    })
    return link;
  }
}