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
                const section = this.menuSection.nth(i);

                await allure.step(`Get header text for section #${i + 1}`, async () => {
                    const text = await section.locator('p').innerText();

                    await allure.parameter('Section index', `${i + 1}`);
                    await allure.parameter('Header text', text);

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
                const countLink = await section.locator('ul li a').count();

                await allure.step(`Section #${s + 1} has ${countLink} link(s)`, async () => {
                    if (countLink === 0) {
                        await allure.logStep(`Section #${s + 1} is empty, skipping`);
                        return;
                    }

                    for (let i = 0; i < countLink; i++) {
                        const link = section.locator('ul li a').nth(i);
                        await link.waitFor({state: 'visible'});
                        const name = await link.innerText();
                        const href = await link.getAttribute('href') || '';
                        await allure.parameter('Section', `${s + 1}`);
                        await allure.parameter('Link Index', `${i + 1}`);
                        await allure.parameter('Name', name);
                        await allure.parameter('Href', href);

                        await allure.step(`Found footer link: "${name}" → ${href}`, async () => {
                            items.push({name: name.trim(), href: href || ''});
                        });
                    }
                });
            }
        });
        return items;
    }
}