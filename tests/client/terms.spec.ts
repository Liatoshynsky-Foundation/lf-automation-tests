import { expect, test } from '../../fixtures/fixturePage';
import { TermsPage } from '../../page/client/TermsPage';
import { feature } from 'allure-js-commons';

test.describe('Terms of Use Page Tests (Умови користування)', () => {
  let termsPage: TermsPage;

  test.beforeEach(async ({ page }) => {
    termsPage = new TermsPage(page);
    await termsPage.visit();
  });


  test('should display all main components on Terms page @smoke', async ({ page }) => {
    feature('smoke'); 
    const termsPage = new TermsPage(page);
    await termsPage.visit();
    await expect(page.locator('h2').first()).toBeVisible();
    await expect(page.locator('div:has([aria-label="arrow down"])').first()).toBeVisible();
    await expect(page.locator('button:has([aria-label="icon"])').first()).toBeVisible();
    await expect(page.locator('button:has([aria-label="icon"])').nth(1)).toBeVisible();
    await expect(page.locator('a[href^="mailto:liatoshynsky@gmail.com"]').first()).toBeVisible();;
    await expect(page.locator('a[href*="privacy-policy"]').first()).toBeVisible();;
    await expect(page.locator('a[href*="contacts"]').first()).toBeVisible();;
  });

  test('should navigate to the Artistry page when clicking "View the sheet music library"', async () => {
    await termsPage.clickViewSheetMusicBtn();
  });

  test('should navigate to the Archive Cabinet page when clicking "View the Archive"', async () => {
    await termsPage.clickViewArchiveBtn();
  });

  test('should have a working email link', async () => {
    await termsPage.clickEmailLink();
  });

  test('should navigate to the Privacy Policy page when link is clicked', async () => {
    await termsPage.clickPrivacyPolicyLink();
  });

  test('should navigate to the Contacts page when link is clicked', async () => {
    await termsPage.clickContactLink();
  });


});