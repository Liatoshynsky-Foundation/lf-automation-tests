import {Locator} from "@playwright/test";
import * as allure from 'allure-js-commons';

export class FooterPageMenuComponent {

    menuSection: Locator;
    
    constructor(parent: Locator) {
        this.menuSection = parent.locator(('div:has(> ul)'));
    }

    async getSectionHeaders(): Promise<string[]> {
    const count = await this.menuSection.count();
    const headers: string[] = [];

    await allure.step(`Get footer section headers (total ${count})`, async () => {
        for (let i = 0; i < count; i++) {
            const section = await this.menuSection.nth(i);
            
            await allure.step(`Get header text for section #${i + 1}`, async () => {
                const text = await section.locator('p').innerText();

                allure.parameter('Section index', `${i + 1}`);
                allure.parameter('Header text', text);
                
                headers.push(text.trim());
            });
        }
    });
    return headers;
  }

  async getAllMenuItems(): Promise<{ name: string; href: string }[]> {
    const items: { name: string; href: string }[] = [];

    const countSect = await this.menuSection.count();
    await allure.step(`Found ${countSect} footer sections`, async () => {
        for (let s = 0; s < countSect; s++) {
            const section = this.menuSection.nth(s);
            const links = section.locator('ul li a');
            const countLink = await links.count();
            
            await allure.step(`Section #${s + 1} has ${countLink} link(s)`, async () => {
                if (countLink === 0) {
                    allure.logStep(`Section #${s + 1} is empty, skipping`);
                    return;
                }
            
                await links.first().waitFor({ state: 'visible' });
                
                for (let i = 0; i < countLink; i++) {
                    await this.sleep(1000);

                    const name = await links.nth(i).innerText();
                    const href = await links.nth(i).getAttribute('href') || '';
                    allure.parameter('Section', `${s + 1}`);
                    allure.parameter('Link Index', `${i + 1}`);
                    allure.parameter('Name', name);
                    allure.parameter('Href', href);

                    await allure.step(`Found footer link: "${name}" → ${href}`, async () => {
                        items.push({ name: name.trim(), href: href || '' });
                    });
                }
            });
        }
    });
    return items;
    
   
    // const links = this.menuSection.locator('ul li a');
    // const count = await links.count();
    // const items: { name: string; href: string }[] = [];

    // for (let i = 0; i < count; i++) {
    //   const name = await links.nth(i).innerText();
    //   const href = await links.nth(i).getAttribute('href');
    //   items.push({ name: name.trim(), href: href || '' });
    // }
    // return items;
  }

  async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
  async getMenuItemsBySection(sectionIndex: number): Promise<{ name: string; href: string }[]> {
    const section = this.menuSection.nth(sectionIndex);
    const links = section.locator('ul li a');
    const count = await links.count();
    const items: { name: string; href: string }[] = [];

    for (let i = 0; i < count; i++) {
      const name = await links.nth(i).innerText();
      const href = await links.nth(i).getAttribute('href');
      items.push({ name: name.trim(), href: href || '' });
    }
    return items;
  }
}