import {expect, Locator, Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";
import * as allure from "allure-js-commons";

type SortState = 'default' | 'upwards' | 'downwards';
type HumanSortState = 'default' | 'ascending' | 'descending';

const stateMap: Record<HumanSortState, SortState> = {
    default: 'default',
    ascending: 'upwards',
    descending: 'downwards'
};

export class SortButton extends BaseComponent {
    title: Locator;
    image: Locator;

    constructor(page: Page, parent: Locator) {
        super(page, parent);
        this.title = parent.locator('p');
        this.image = parent.locator('img');
    }

    async getTitleText(): Promise<string> {
        return await allure.step('Get sort button title text', async () => {
            await this.title.scrollIntoViewIfNeeded();
            return await this.title.textContent() || '';
        });
    }

    async getSrc(): Promise<string> {
        return await allure.step('Get sort icon source', async () => {
            await this.image.scrollIntoViewIfNeeded();
            return await this.image.getAttribute('src') ?? '';
        });
    }

    async getState(): Promise<SortState> {
        return await allure.step('Determine current sort state', async () => {
            const src = await this.getSrc();
            if (src.includes('upwards-chevron')) return 'upwards';
            if (src.includes('downwards-chevron')) return 'downwards';
            return 'default';
        });
    }

    async waitForState(state: SortState, timeout = 2000): Promise<void> {
        await allure.step(`Wait for state: ${state}`, async () => {
            await expect(this.image).toHaveAttribute('src', new RegExp(`${state}-chevron`), {timeout});
        });
    }

    async click(): Promise<void> {
        await allure.step('Click sort button', async () => {
            await this.title.scrollIntoViewIfNeeded();
            await this.title.click();
        });
    }

    async setState(target: SortState): Promise<void> {
        await allure.step(`Set sort state to: ${target}`, async () => {
            const current = await this.getState();
            if (current === target) return;

            for (let i = 0; i < 3; i++) {
                await this.click();
                await this.waitForState(target).catch(() => {
                });

                const newState = await this.getState();
                if (newState === target) return;
            }
            throw new Error(`Failed to set sort state to ${target}`);
        });
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

    async verifyOrderCycle(expectedStates: HumanSortState[]): Promise<void> {
        await allure.step(`Verify sort order cycle: ${expectedStates}`, async () => {
            const actualStates: SortState[] = [];
            const expectedMappedStates: SortState[] = [];

            for (let i = 0; i < expectedStates.length; i++) {
                const humanState = expectedStates[i];
                const expectedMapped = stateMap[humanState];
                const currentState = await this.getState();

                actualStates.push(currentState);
                expectedMappedStates.push(expectedMapped);

                if (i < expectedStates.length - 1) {
                    await this.click();
                }
            }
            await allure.attachment('Expected states sequence', JSON.stringify(expectedMappedStates, null, 2), 'application/json');
            await allure.attachment('Actual states sequence', JSON.stringify(actualStates, null, 2), 'application/json');

            await allure.step('Check if current states sequence matches expected', async () => {
                expect(actualStates).toEqual(expectedMappedStates);
            });
        });
    }
}