import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Allure Reporting Demo', () => {
  test('Example test with Allure annotations', async ({ page }) => {
    await allure.epic('Demo Tests');
    await allure.feature('Allure Integration');
    await allure.story('Basic test with annotations');
    await allure.owner('Test Team');
    await allure.tag('smoke');
    await allure.tag('demo');

    await allure.step('Navigate to Playwright website', async () => {
      await page.goto('https://playwright.dev/');
    });

    await allure.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    await allure.step('Check Get Started link', async () => {
      const link = page.getByRole('link', { name: 'Get started' });
      await expect(link).toBeVisible();
    });

    await allure.attachment('Page URL', page.url(), 'text/plain');
  });

  test('Simple API test with Allure', async ({ request }) => {
    await allure.epic('API Tests');
    await allure.feature('HTTP Requests');
    await allure.story('GET request example');

    await allure.step('Send GET request to JSONPlaceholder', async () => {
      const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      await allure.attachment('Response Data', JSON.stringify(data, null, 2), 'application/json');
      
      expect(data.id).toBe(1);
      expect(data.userId).toBeTruthy();
      expect(data.title).toBeTruthy();
    });
  });
});
