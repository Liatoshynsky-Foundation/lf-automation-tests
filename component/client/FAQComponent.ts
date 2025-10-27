import {Locator, Page} from "@playwright/test";
import {FAQSectionComponent} from './FAQSectionComponent';

export class FAQComponent {
    private root: Locator;
    private sectionRoots: Locator;

    constructor(private page: Page) {
        this.root = page.locator('div.MuiBox-root.css-ylc2c5').first();
        this.sectionRoots = this.root.locator('.MuiAccordion-root');
    }

    async getFAQSections(): Promise<FAQSectionComponent[]> {
        const count = await this.sectionRoots.count();
        const sections: FAQSectionComponent[] = [];

        for (let i = 0; i < count; i++) {
            const sectionRoot = this.sectionRoots.nth(i);
            sections.push(new FAQSectionComponent(sectionRoot));
        }
        return sections;
    }

    async getNumberOfFAQSections(): Promise<number> {
        return this.sectionRoots.count();
    }

    async getSectionByTitle(titleText: string): Promise<FAQSectionComponent> {
        const sectionRoot = this.root.locator('.MuiAccordion-root', {hasText: titleText}).first();

        if (await sectionRoot.count() === 0) {
            throw new Error(`FAQ section with title "${titleText}" not found.`);
        }
        return new FAQSectionComponent(sectionRoot);
    }

}