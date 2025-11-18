import { expect, test } from "../../fixtures/fixturePage";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/env";
import { Page } from "@playwright/test";
import { AdminLoginPage } from "../../page/admin/AdminLoginPage";

test.describe("Admin Login Page", () => {
  // Helper function for common login flow
  async function performLogin(
    adminLoginPage: AdminLoginPage,
    page: Page,
    email: string,
    password: string = ADMIN_PASSWORD
  ) {
    await adminLoginPage.navigate();
    await page.waitForLoadState("networkidle");
    await adminLoginPage.fillEmail(email);
    await adminLoginPage.fillPassword(password);
  }

  // Helper function to verify successful login
  async function verifySuccessfulLogin(page: Page) {
    await page.waitForURL("/");
    expect(page.url()).not.toContain("/login");
  }

  test("should navigate to admin login page", async ({ adminLoginPage }) => {
    await adminLoginPage.navigate();

    expect(await adminLoginPage.isLogoVisible()).toBeTruthy();
  });

  test("should display login form", async ({ adminLoginPage }) => {
    await adminLoginPage.navigate();

    expect(await adminLoginPage.isLoginFormVisible()).toBeTruthy();
  });

  test("should have form title and description", async ({ adminLoginPage }) => {
    await adminLoginPage.navigate();

    const title = await adminLoginPage.getFormTitle();
    const description = await adminLoginPage.getFormDescription();

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
  });

  test("should login with credentials", async ({ adminLoginPage, page }) => {
    await performLogin(adminLoginPage, page, ADMIN_EMAIL);
    await adminLoginPage.togglePasswordVisibility();
    await adminLoginPage.clickLoginButton();

    await verifySuccessfulLogin(page);
  });

  test("should login user by clicking enter on keyboard", async ({
    adminLoginPage,
    page,
  }) => {
    await performLogin(adminLoginPage, page, ADMIN_EMAIL);
    await adminLoginPage.pressEnterOnKeyboard();

    await verifySuccessfulLogin(page);
  });

  test.describe("Email Trimming", () => {
    const testCases = [
      { description: "leading space", email: ` ${ADMIN_EMAIL}` },
      { description: "trailing space", email: `${ADMIN_EMAIL} ` },
      { description: "both leading and trailing spaces", email: ` ${ADMIN_EMAIL} ` },
      { description: "multiple leading/trailing spaces", email: `   ${ADMIN_EMAIL}   ` },
    ];

    testCases.forEach(({ description, email }) => {
      test(`should trim ${description} from email and login successfully`, async ({
        adminLoginPage,
        page,
      }) => {
        await performLogin(adminLoginPage, page, email);
        await adminLoginPage.clickLoginButton();

        await verifySuccessfulLogin(page);
      });
    });
  });
});
