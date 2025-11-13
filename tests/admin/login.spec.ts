import { expect, test } from "../../fixtures/fixturePage";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/env";

test.describe("Admin Login Page", () => {
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
    await adminLoginPage.navigate();
    await page.waitForLoadState("networkidle");
    await adminLoginPage.fillEmail(ADMIN_EMAIL);
    await adminLoginPage.fillPassword(ADMIN_PASSWORD);
    await adminLoginPage.togglePasswordVisibility();
    await adminLoginPage.clickLoginButton();

    await page.waitForURL("/");
  });

  test("should login user by clicking enter on keyboard", async ({
    adminLoginPage,
    page,
  }) => {
    await adminLoginPage.navigate();
    await page.waitForLoadState("networkidle");
    await adminLoginPage.fillEmail(ADMIN_EMAIL);
    await adminLoginPage.fillPassword(ADMIN_PASSWORD);
    await adminLoginPage.pressEnterOnKeyboard();

    await page.waitForURL("/");
    expect(page.url()).toBe("/");
  });
});
