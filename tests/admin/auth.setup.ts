import { test as setup } from '@playwright/test';
import { AdminLoginPage } from '../../page/admin/AdminLoginPage';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../config/env';

const authFile = 'playwright/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  await loginPage.goto("/login");
  await page.waitForLoadState('networkidle');
  
  await loginPage.loginForm.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  
  await page.waitForURL('/');
  
  await page.context().storageState({ path: authFile });
});