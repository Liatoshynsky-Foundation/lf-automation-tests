import { expect, Locator, Page, test } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { SupportFoundationBtn } from './SupportFundationBtn';
import { FooterChangeLangBtn } from './FooterChangeLangBtn';
import { ContactUsBtn } from './ContactUsBtn';
import { MediaMenuBtn } from './MediaMenuBtn';
import { PageItemComponent } from './PageItemComponent';

export class FooterComponent extends BaseComponent{
    logo: Locator;
    infoName: Locator;
    infoAddress: Locator;
    infoPhone: Locator;
    infoEmail: Locator;
    contactUsBtn: ContactUsBtn;
    supportFundBtn: SupportFoundationBtn;
    legalMenu: Locator;
    copyrightText: Locator;
    changeLangBtn: FooterChangeLangBtn;
    pageMenu: Locator;
    menuItems: Locator;
    mediaMenu: MediaMenuBtn;
    developedBy: Locator;
    bigFooterImage: Locator;

  constructor(page: Page) {
    super(page, page.locator('footer'));
    this.logo = this.parent.locator('svg[title="Company logo"]');
    this.infoName = this.parent.locator('//div[2]/div[3]/div/div[1]/p');
    this.infoAddress = this.parent.locator('//div[2]/div[3]/div/div[1]/div/p');
    this.infoPhone = this.parent.locator('//div[2]/div[3]/div/div[2]/div[1]');
    this.infoEmail = this.parent.locator('//div[2]/div[3]/div/div[2]/div[2]');
    this.contactUsBtn = new ContactUsBtn(this.parent);
    this.supportFundBtn = new SupportFoundationBtn(this.parent);
    this.legalMenu = this.parent.locator('div[2]/div[7]/div/ul');
    this.copyrightText = this.parent.locator('//div[2]/div[7]/div/p');
    this.changeLangBtn = new FooterChangeLangBtn(this.page, this.parent);
    this.pageMenu = this.page.locator('//footer/div[2]/div[6]/div');
    this.menuItems = this.parent.locator('div:has(> ul) ul');
    this.mediaMenu = new MediaMenuBtn(this.parent.locator('div[2]/div[5]/div'));
    this.developedBy = this.parent.locator('img[alt="OpenTech Academy logo"]');
    this.bigFooterImage = this.parent.locator('img[alt="Lyatoshynsky Foundation"]');
    
  }

  async getPageMenuHeaders(): Promise< string[]> {
    await this.waitIsVisible(this.pageMenu,50000);
    const locators = await this.pageMenu.locator('div > p');
    const count = await locators.count();
    const headers: string[] = [];
    for (let i = 0; i < count; i++){
      headers.push(await locators.nth(i).innerText());
    }
    return headers;
  }

  async getMenuItems(): Promise< PageItemComponent[]> {
    
    const items = await this.menuItems.locator('li > a').all();
    return items.map(item => new PageItemComponent(item));
  }

  async getPageItemByName(str: string): Promise<PageItemComponent> {
    let elementFound: PageItemComponent;
    await test.step(`Check if pageItem is visible`, async () => {
      const elements = await this.getMenuItems()
  
      for (const element of elements) {
        const itemName: string =  (await element.get_Name()).trim();
          if (itemName === str.trim()) {
            elementFound = element;
            break
          }
        }
      expect(elementFound, {message: (`Menu item not found: ${str}`)}).not.toBeNull();
    });
    return  elementFound!;
  }
  
  async clickPageItemByName(name: string){
    const menuItem = await this.getPageItemByName(name);
    if (menuItem){
      await test.step(`Click on page item: ${name}`, async () => {
        await menuItem.footerclick();
      });
    }
  }

  async checkInfoName(str: string): Promise<void>{
    await this.infoName.waitFor({ state: 'visible' });
    await this.infoName.scrollIntoViewIfNeeded();
    expect(this.infoName).toHaveText(str);
  }

  async checkInfoAddress(str: string): Promise<void>{
    await this.infoAddress.waitFor({ state: 'visible' });
    await this.infoAddress.scrollIntoViewIfNeeded();
    expect(this.infoAddress).toHaveText(str);
  }

  async checkInfoPhone(str: string): Promise<void>{
    await this.infoPhone.waitFor({ state: 'visible' });
    await this.infoPhone.scrollIntoViewIfNeeded();
    expect(this.infoPhone.locator('p')).toHaveText("Phone:");
    expect(this.infoPhone.locator('a')).toHaveText(str);
  }

  async clickInfoPhone(): Promise<void>{
    await this.infoPhone.waitFor({ state: 'visible' });
    await this.infoPhone.scrollIntoViewIfNeeded();
    await this.infoPhone.locator('a').click({ force: true });
  }

  async checkInfoEmail(str: string): Promise<void>{
    await this.infoEmail.waitFor({ state: 'visible' });
    await this.infoEmail.scrollIntoViewIfNeeded();
    expect(this.infoEmail.locator('p')).toHaveText("Email:");
    expect(this.infoEmail.locator('a')).toHaveText(str);
  }

  async clickInfoEmail(): Promise<void>{
    await this.infoEmail.waitFor({ state: 'visible' });
    await this.infoEmail.scrollIntoViewIfNeeded();
    const link = this.infoEmail.locator('a');
    await expect(link).toHaveAttribute('href', /mailto:/);
    await link.click({ force: true });
  }

  async checkCopyrightText(str: string): Promise<void>{
    await this.copyrightText.waitFor({ state: 'visible' });
    await this.copyrightText.scrollIntoViewIfNeeded();
    expect(this.copyrightText).toHaveText(str);
  }




}

