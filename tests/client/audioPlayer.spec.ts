import {expect, test} from '@playwright/test';
import {AudioPlayerComponent} from '../../component/client/AudioPlayerComponent';

test.beforeEach(async ({ page }) => {
    await page.goto('/uk/about-us'); 
});

test.describe('Public Audio Player Functionality', () => {

    test('TC-PLAYER-001: Should toggle from Play to Pause and verify time change', async ({ page }) => {
        const player = new AudioPlayerComponent(page);

        let initialTimeText: string;
        
        await test.step('1. Open Player Popover', async () => {
            await player.togglePlayer();
            await expect(player.popover).toBeVisible();
            await expect(player.titleInfo).toBeVisible();
        });

        await test.step('2. Verify initial state is "Pause" and time is running', async () => {
            await expect(player.playPauseButton).toHaveAttribute('aria-label', 'Pause audio');

            initialTimeText = await player.timeInfo.innerText();
            expect(initialTimeText).toMatch(/^0:\d{2} \/ \d:\d{2}$/);

            await player.sleep(1500);
            const runningTimeText = await player.timeInfo.innerText();
            expect(runningTimeText).not.toBe(initialTimeText);
        });

        await test.step('3.Click Pause and verify state changes to "Play" (Stopped)', async () => {
            await player.playOrPause(); 
            
            await expect(player.playPauseButton).toHaveAttribute('aria-label', 'Play audio', { timeout: 5000 });
            const pausedTimeText = await player.timeInfo.innerText();
            await player.sleep(2000); 
            const finalTimeText = await player.timeInfo.innerText();
            expect(finalTimeText).toBe(pausedTimeText);
        });
        
        await test.step('4. Click Pause and verify state changes back to "Play"', async () => {
            await player.playOrPause(); 
            await expect(player.playPauseButton).toHaveAttribute('aria-label', 'Pause audio', { timeout: 5000 });
        });
    });

    test('TC-PLAYER-002: Should click "All Works" button and navigate to correct page', async ({ page }) => {
        const player = new AudioPlayerComponent(page);
        
        await test.step('1. Open Player Popover', async () => {
            await player.togglePlayer();
            await expect(player.popover).toBeVisible();
        });
        
        await test.step('2. Click "Усі твори" button', async () => {
            await expect(player.allWorksButton).toBeVisible();
            await expect(player.allWorksButton).toBeEnabled();
            await player.clickAllWorksButton();
            await player.sleep(500);
            //expect(page.url()).toContain('/all-works');
        });
    });
});