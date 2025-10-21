import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { SupportFoundationBtn } from './SupportFundationBtn';
import { FooterChangeLangBtn } from './FooterChangeLangBtn';
import { ContactUsBtn } from './ContactUsBtn';
import { MediaMenuBtn } from './mediaMenuBtn';

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
    menuHeader: Locator;
    menuItems: Locator;
    mediaMenu: MediaMenuBtn;
    developedBy: Locator;
    bigFooterImage: Locator;

  constructor(page: Page) {
    super(page, page.locator('footer'));
    this.logo = this.parent.locator('svg[title="Company logo"]');
    this.infoName = this.parent.locator('');
    this.infoAddress = this.parent.locator('');
    this.infoPhone = this.parent.locator('');
    this.infoEmail = this.parent.locator('');
    this.contactUsBtn = new ContactUsBtn(this.parent);
    this.supportFundBtn = new SupportFoundationBtn(this.parent);
    this.legalMenu = this.parent.locator('');
    this.copyrightText = this.parent.locator('');
    this.changeLangBtn = new FooterChangeLangBtn(this.page, this.parent);
    this.menuHeader = this.parent.locator('');
    this.menuItems = this.parent.locator('');
    this.mediaMenu = new MediaMenuBtn(this.parent.locator('div[2]/div[5]/div'));
    this.developedBy = this.parent.locator('img[alt="OpenTech Academy logo');
    this.bigFooterImage = this.parent.locator('img[alt="Lyatoshynsky Foundation"]');
    
  }

  async isPresent(): Promise<boolean> {
    return (await this.parent.count()) > 0;
  }

  async clickLinkByText(text: string): Promise<void> {
    if (await this.isPresent()) {
      const link = this.parent.locator(`text=${text}`);
      if (await link.count()) await link.click();
    }
  }
}

