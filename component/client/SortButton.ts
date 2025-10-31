import {expect, Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";

type SortState = 'default' | 'upwards' | 'downwards';

export class SortButton extends BaseComponent {
    title: Locator;
    image: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.title = parent.locator('p');
        this.image = parent.locator('img');
    }

    async getTitleText(): Promise<string> {
        await this.title.scrollIntoViewIfNeeded();
        return await this.title.textContent() || '';
    }

    async getSrc(): Promise<string> {
        await this.image.scrollIntoViewIfNeeded();
        return await this.image.getAttribute('src') ?? '';
    }

    async getState(): Promise<SortState> {
        const src = await this.getSrc();
        if (src.includes('upwards-chevron')) return 'upwards';
        if (src.includes('downwards-chevron')) return 'downwards';
        return 'default';
    }

    async waitForState(state: SortState, timeout = 2000): Promise<void> {
        await expect(this.image).toHaveAttribute('src', new RegExp(`${state}-chevron`), {timeout});
    }

    async click(): Promise<void> {
        await this.title.scrollIntoViewIfNeeded();
        await this.title.click();
    }

    async setState(target: SortState): Promise<void> {
        const current = await this.getState();
        if (current === target) return;

        for (let i = 0; i < 3; i++) {
            await this.click();
            await this.waitForState(target).catch(() => {
            });

            const newState = await this.getState();
            if (newState === target) return;
        }
    }

    async sortDefault(): Promise<void> {
        await this.setState('default');
    }

    async sortAscending(): Promise<void> {
        await this.setState('upwards');
    }

    async sortDescending(): Promise<void> {
        await this.setState('downwards');
    }
}