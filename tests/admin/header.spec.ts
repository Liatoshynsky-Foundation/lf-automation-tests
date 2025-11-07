import { test, expect } from '../../fixtures/fixturePage';

test.describe('Admin Header Component', () => {
    test.beforeEach(async ({ adminDashboardPage, page }) => {
        await adminDashboardPage.navigate();
        await page.waitForLoadState('networkidle');
    });

    test('should display header title and description', async ({ adminDashboardPage }) => {
        const title = await adminDashboardPage.header.getTitle();
        const description = await adminDashboardPage.header.getDescription();
        
        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
    });

    test('should display language switch buttons', async ({ adminDashboardPage }) => {
        await expect(adminDashboardPage.header.ukrainianButton).toBeVisible();
        await expect(adminDashboardPage.header.englishButton).toBeVisible();
    });

    test('should display action buttons', async ({ adminDashboardPage }) => {
        await expect(adminDashboardPage.header.previewButton).toBeVisible();
        await expect(adminDashboardPage.header.cancelButton).toBeVisible();
        await expect(adminDashboardPage.header.saveButton).toBeVisible();
    });

    test('should switch language to English', async ({ adminDashboardPage }) => {
        await adminDashboardPage.header.switchToEnglish();
        
        await expect(adminDashboardPage.header.englishButton).toBeDisabled();
    });

    test('should have save button disabled by default', async ({ adminDashboardPage }) => {
        const isEnabled = await adminDashboardPage.header.isSaveButtonEnabled();
        
        expect(isEnabled).toBeFalsy();
    });
});