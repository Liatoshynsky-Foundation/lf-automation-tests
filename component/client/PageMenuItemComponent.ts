import { expect, Locator } from "@playwright/test";
import { PageItemComponent } from './PageItemComponent';

export class PageMenuItemComponent {
    
  name: Locator; 
  dropdownBtn: Locator;
  menuLocator: Locator;
  pages: PageItemComponent[];

  constructor(parent: Locator, pages: PageItemComponent[] = []) {
    this.name = parent;
    this.dropdownBtn = parent.locator('button');
    this.menuLocator = parent.page().locator('ul[role="menu"]:visible');
    this.pages = pages;
  }

  async getName(): Promise<string> {
    return await this.name.textContent() || '';
  }

  
  async clickDropdown(): Promise<void> {
    await this.name.click();
  }

  async subMenuIsVisible(): Promise<boolean> {
    try {
      await this.menuLocator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSubMenu(): Promise<void> {
    if (!(await this.subMenuIsVisible())) {
      await this.clickDropdown();
      await expect(this.menuLocator).toBeVisible({ timeout: 5000 });
    }
  }

  async getSubPages(): Promise<PageItemComponent[]> {
    await this.getSubMenu();

    const pages: PageItemComponent[] = [];
    const count = await this.menuLocator.locator('li').count();

    
    for (let i = 0; i < count; i++) {
      const li = this.menuLocator.locator('li').nth(i);
      pages.push(new PageItemComponent(li));
    }

    this.pages = pages;
    return pages;
  }

  async clickSubPageByName(str: string): Promise<void> {
    let subPages = await this.getSubPages();
    
    for (const page of subPages) {
      const pageName = (await page.get_Name()).trim(); 
      if (pageName === str.trim()) {
        await page.headerclick();
        return;
      }
    }
    throw new Error(`No such subpage: ${str}`);
  }
}