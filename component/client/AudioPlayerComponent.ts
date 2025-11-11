import {Locator, Page, expect} from '@playwright/test';
import {BaseComponent} from './BaseComponent'; 
import * as allure from 'allure-js-commons';

export class AudioPlayerComponent extends BaseComponent {
    readonly toggleButton: Locator; 
    
    // Popover (розкритий плеєр)
    readonly popover: Locator; 
    readonly playPauseButton: Locator; 
    readonly timeInfo: Locator;
    readonly titleInfo: Locator;
    readonly allWorksButton: Locator;

    constructor(page: Page) {
        super(page, page.locator('body'));
        this.toggleButton = page.locator('button[aria-label="Toggle audio player"]');
        this.popover = page.locator('.MuiBox-root.css-1hdbc19');
        this.playPauseButton = this.popover.locator('button[aria-label^="Play audio"], button[aria-label^="Pause audio"]');
        this.timeInfo = this.popover.locator('p.css-kqmgnq');
        this.titleInfo = this.popover.locator('p.css-1ri18u6');
        this.allWorksButton = this.popover.getByRole('button', { name: 'Усі твори' });

        
    }

    
    async togglePlayer(): Promise<void> {
        await allure.step('Toggle Audio Player (Open/Close Popover)', async () => {
           await this.toggleButton.click();
           await expect(this.popover).toBeVisible().catch(() => {});
        
        });
        
    }
    
    async playOrPause(): Promise<void> {
        await allure.step('Click Play/Pause button in Popover', async () => {
            await this.playPauseButton.click();
        });
    }
    
    async clickAllWorksButton(): Promise<void> {
        await allure.step('Click "All Works" button', async () => {
            await this.allWorksButton.click();
        });
    }
}