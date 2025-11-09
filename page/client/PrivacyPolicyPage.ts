import { Locator, Page } from "@playwright/test";
import { ClientBasePage } from "./ClientBasePage";
import * as allure from "allure-js-commons";

export class PrivacyPolicyPage extends ClientBasePage {
  introSection: Locator;
  pageTitle: Locator;
  introContent: Locator;
  dataWeCollectSection: Locator;
  dataUsageSection: Locator;
  cookiesSection: Locator;
  googleAuthSection: Locator;
  socialNetworksSection: Locator;
  targetedAdsSection: Locator;
  newsletterSection: Locator;
  dataRetentionSection: Locator;
  userRightsSection: Locator;
  contactUsSection: Locator;
  emailLink: Locator;
  contactLink: Locator;
  sectionTitles: Locator;
  bulletPoints: Locator;

  constructor(page: Page) {
    super(page);
    this.introSection = page.locator('[data-testid="PrivacyPolicy-intro"]');
    this.pageTitle = page.locator('[data-testid="PrivacyPolicy-intro-title"]');
    this.introContent = page.locator(
      '[data-testid="PrivacyPolicy-intro-content"]'
    );
    this.dataWeCollectSection = page.locator(
      '[data-testid="PrivacyPolicy-dataWeCollect"]'
    );
    this.dataUsageSection = page.locator(
      '[data-testid="PrivacyPolicy-dataUsage"]'
    );
    this.cookiesSection = page.locator('[data-testid="PrivacyPolicy-cookies"]');
    this.googleAuthSection = page.locator(
      '[data-testid="PrivacyPolicy-googleAuth"]'
    );
    this.socialNetworksSection = page.locator(
      '[data-testid="PrivacyPolicy-socialNetworks"]'
    );
    this.targetedAdsSection = page.locator(
      '[data-testid="PrivacyPolicy-targetedAds"]'
    );
    this.newsletterSection = page.locator(
      '[data-testid="PrivacyPolicy-newsletter"]'
    );
    this.dataRetentionSection = page.locator(
      '[data-testid="PrivacyPolicy-dataRetention"]'
    );
    this.userRightsSection = page.locator(
      '[data-testid="PrivacyPolicy-userRights"]'
    );
    this.contactUsSection = page.locator(
      '[data-testid="PrivacyPolicy-contactUs"]'
    );
    this.emailLink = page.locator(
      '[data-testid="PrivacyPolicy-contactUs"] a[href^="mailto:"]'
    );
    this.contactLink = page.locator(
      '[data-testid="PrivacyPolicy-userRights"] a[href="/contact"]'
    );
    this.sectionTitles = page.locator("h2.MuiTypography-root");
    this.bulletPoints = page.locator(".css-1fecjwp");
  }

  async visit(): Promise<void> {
    await allure.step("Navigate to Privacy Policy page", async () => {
      await this.goto("/privacy-policy");
      await this.page.waitForLoadState("networkidle");
    });
  }

  async getPageTitle(): Promise<string> {
    return (await this.pageTitle.textContent()) || "";
  }

  async getIntroContent(): Promise<string> {
    return (await this.introContent.textContent()) || "";
  }

  async getSectionByTestId(testId: string): Promise<Locator> {
    return this.page.locator(`[data-testid="${testId}"]`);
  }

  async isSectionVisible(testId: string): Promise<boolean> {
    const section = await this.getSectionByTestId(testId);
    return await section.isVisible();
  }

  async getSectionContent(testId: string): Promise<string> {
    const section = await this.getSectionByTestId(testId);
    return (await section.textContent()) || "";
  }

  async getSectionTitle(testId: string): Promise<string> {
    const section = await this.getSectionByTestId(testId);
    const title = section.locator("h2.MuiTypography-root");
    return (await title.textContent()) || "";
  }

  async getBulletPointsInSection(testId: string): Promise<string[]> {
    const section = await this.getSectionByTestId(testId);
    const bullets = section.locator(".css-1fecjwp");
    return await bullets.allTextContents();
  }

  async getAllSectionTitles(): Promise<string[]> {
    const titles = await this.sectionTitles.allTextContents();
    return titles.map((t) => t.trim());
  }

  async getEmailLinkHref(): Promise<string> {
    return (await this.emailLink.getAttribute("href")) || "";
  }

  async clickEmailLink(): Promise<void> {
    await allure.step("Click email link", async () => {
      await this.emailLink.click();
    });
  }

  async getContactLinkHref(): Promise<string> {
    return (await this.contactLink.getAttribute("href")) || "";
  }

  getContactLinkLocator(): Locator {
    return this.contactLink;
  }

  async clickContactLink(): Promise<void> {
    await allure.step("Click contact link", async () => {
      await this.contactLink.click();
    });
  }

  async hasCookieEmoji(): Promise<boolean> {
    const cookiesContent = await this.getSectionContent(
      "PrivacyPolicy-cookies"
    );
    return cookiesContent.includes("🍪");
  }

  async hasGoogleAnalyticsText(): Promise<boolean> {
    const cookiesContent = await this.getSectionContent(
      "PrivacyPolicy-cookies"
    );
    return cookiesContent.includes("Google Analytics");
  }

  async scrollToSection(testId: string): Promise<void> {
    await allure.step(`Scroll to section: ${testId}`, async () => {
      const section = await this.getSectionByTestId(testId);
      await section.scrollIntoViewIfNeeded();
    });
  }

  async getSectionH2Title(titleText: string): Promise<Locator> {
    return this.page.locator(`h2:text("${titleText}")`);
  }

  async verifySectionStructure(testId: string): Promise<boolean> {
    const section = await this.getSectionByTestId(testId);
    const hasTitle = (await section.locator("h2").count()) > 0;
    const hasContent =
      (await section.locator(".MuiTypography-root").count()) > 0;
    return hasTitle && hasContent;
  }

  async isUkrainianLanguage(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes("/uk/") || currentUrl.includes("/uk");
  }
}
