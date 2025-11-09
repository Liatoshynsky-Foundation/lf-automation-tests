import { Locator } from "@playwright/test";
import * as allure from 'allure-js-commons';

export class LegalMenuComponent {
    menu: Locator;
    item: Locator;

    constructor(parent: Locator) {
        this.menu = parent;
        this.item = parent.locator('xpath=.//li/a');
        
    }

    async getAllMenuItems(): Promise<{ name: string; href: string }[]> {
        const items: { name: string; href: string }[] = [];
        const countItems = await this.item.count();

        await allure.step(`Found ${countItems} items`, async () => {
            for (let i = 0; i < countItems; i++) {
                const name = await this.item.nth(i).innerText();
                const href = await this.item.nth(i).getAttribute('href') || '';
                await allure.parameter('Name', name);
                await allure.parameter('Href', href);

                await allure.step(`Found item: "${name}" → ${href}`, async () => {
                    items.push({name: name.trim(), href: href || ''});
                });
            }
        });
        return items;   
    }

    async clickItemByName(name: string) {
        await allure.step(`Click on page item: ${name}`, async () => {
            const countItems = await this.item.count();

            for (let i = 0; i < countItems; i++) {
               const itemName = await this.item.nth(i).innerText(); 
               if (itemName === name) {
                await this.item.nth(i).click();
               }
            }
            
        })
    }
}