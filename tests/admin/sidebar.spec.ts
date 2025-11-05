import {test, expect} from '../../fixtures/fixturePage';

test.describe('Admin Sidebar Component', () => {
    test.beforeEach(async ({ adminDashboardPage, page }) => {
        await adminDashboardPage.navigate();
        await page.waitForLoadState('networkidle');
    });

    test('should display logo and close buttons', async ({ adminDashboardPage }) => {
        await expect(adminDashboardPage.sidebar.logoButton).toBeVisible();
        await expect(adminDashboardPage.sidebar.closeButton).toBeVisible();
    });

    test('should collapse sidebar', async ({ adminDashboardPage }) => {
        await adminDashboardPage.sidebar.collapseSidebar();
    });

    test('should expand sidebar', async ({ adminDashboardPage }) => {
        await adminDashboardPage.sidebar.collapseSidebar();
        await adminDashboardPage.sidebar.expandSidebar();
    });

    test('should display section headers', async ({ adminDashboardPage }) => {
        await expect(adminDashboardPage.sidebar.getSectionHeader('Сторінки сайту')).toBeVisible();
        await expect(adminDashboardPage.sidebar.getSectionHeader('Налаштування сайту')).toBeVisible();
    });

    test('should navigate to Головна', async ({ adminDashboardPage }) => {
        const homeMenuItem = adminDashboardPage.sidebar.getMenuItem('Головна');
        await homeMenuItem.click();
        
        const isSelected = await homeMenuItem.isSelected();
        expect(isSelected).toBeTruthy();
    });

    test('should get all menu items', async ({ adminDashboardPage }) => {
        const menuItems = await adminDashboardPage.sidebar.getAllMenuItems();
        expect(menuItems.length).toBeGreaterThan(0);
    });

    test('should check menu item has correct text', async ({ adminDashboardPage }) => {
        const newsMenuItem = adminDashboardPage.sidebar.getMenuItem('Новини');
        const text = await newsMenuItem.getText();
        expect(text).toBe('Новини');
    });

    test('should expand menu item with submenu', async ({ adminDashboardPage }) => {
        const bioMenuItem = adminDashboardPage.sidebar.getMenuItem('Борис Лятошинський');
        const hasExpandIcon = await bioMenuItem.hasExpandIcon();
        
        if (hasExpandIcon) {
            await bioMenuItem.expand();
        }
        
        expect(hasExpandIcon).toBeTruthy();
    });

    test('should check menu item icon alt text', async ({ adminDashboardPage }) => {
        const homeMenuItem = adminDashboardPage.sidebar.getMenuItem('Головна');
        const iconAlt = await homeMenuItem.getIconAlt();
        expect(iconAlt).toBe('Головна');
    });
});