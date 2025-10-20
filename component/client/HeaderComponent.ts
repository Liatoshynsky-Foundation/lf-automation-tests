import { Locator, Page } from '@playwright/test';
import { PageMenuItemComponent } from './PageMenuItemComponent';
import { HeaderChangeLangBtn } from './HeaderChangeLangBtn';
import { SupportFundationBtn } from './SupportFundationBtn';

export class HeaderComponent {
  readonly page: Page;
  readonly root: Locator;
  logo: Locator;
  pageMenu: Locator;
  playerBtn: Locator;
  changeLangBtn: HeaderChangeLangBtn;
  supportFundBtn: SupportFundationBtn;
  menuItems: PageMenuItemComponent[];


  constructor(page: Page, items: PageMenuItemComponent[] = []) {
    this.page = page;
    this.root = page.locator('header');
    this.logo = this.root.locator('a svg[title="Company logo"]').first();
    this.playerBtn = page.locator('button[aria-label="Toggle audio player"]');
    this.changeLangBtn = new HeaderChangeLangBtn(this.root);
    this.supportFundBtn = new SupportFundationBtn(this.root);
    this.pageMenu = this.root.locator('div[aria-label="Button Group"]:has(button)');
    this.menuItems = items;
  }

  async isPresent(): Promise<boolean> {
    return (await this.root.count()) > 0;
  }

  async clickFirstLink(): Promise<void> {
    if (await this.isPresent()) {
      const link = this.root.locator('a').first();
      if (await link.count()) await link.click();
    }
  }
  async getMenuItems(): Promise<PageMenuItemComponent[]> {
      const menuItems: PageMenuItemComponent[] = [];
      const buttons = this.pageMenu.locator('button');
      const count = await buttons.count();
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        menuItems.push(new PageMenuItemComponent(button));
      }
  
      this.menuItems = menuItems;
      return menuItems;
    }

  
  async getMenuByName(str: string): Promise<PageMenuItemComponent> {
    if (!this.menuItems.length) {
      await this.getMenuItems();
    }
    
    for (const element of this.menuItems) {
      const itemName = (await element.getName()).trim();
      if (itemName === str.trim()) {
        return element;
      }
    }
    throw new Error(`Menu item not found: ${str}`);
  }

  async clickMenuByName(name: string): Promise<void> {
    const menuItem = await this.getMenuByName(name);
    await menuItem.clickDropdown();
  }
}

