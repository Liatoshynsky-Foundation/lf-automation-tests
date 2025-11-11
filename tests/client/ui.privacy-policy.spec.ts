import { expect, test } from "../../fixtures/fixturePage";
import * as allure from "allure-js-commons";
import {
  privacyPolicySections,
  privacyPolicyContent,
  privacyPolicyTestIds,
} from "../../data/privacyPolicyTexts";

test.describe("UI - Privacy Policy Page", () => {
  test.beforeEach(async ({ privacyPolicyPage }) => {
    await allure.epic("Client UI");
    await allure.feature("Privacy Policy");
    await privacyPolicyPage.visit();
  });

  test("should display page title correctly in English", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify Privacy Policy page title is displayed correctly in English"
    );
    await allure.severity("critical");
    await allure.tag("smoke");

    await allure.step("Verify page title", async () => {
      const title = await privacyPolicyPage.getPageTitle();
      await allure.parameter("Page Title", title);
      expect(title).toBe(privacyPolicyContent.en.title);
    });

    await allure.step("Verify title is visible", async () => {
      await expect(privacyPolicyPage.pageTitle).toBeVisible();
    });
  });

  test("should display page title correctly in Ukrainian", async ({
    privacyPolicyPage,
    page,
  }) => {
    await allure.description(
      "Verify Privacy Policy page title is displayed correctly in Ukrainian"
    );
    await allure.severity("critical");
    await allure.tag("smoke");

    await allure.step("Switch to Ukrainian language", async () => {
      await privacyPolicyPage.footer.changeLangBtn.click();
      await page.waitForLoadState("networkidle");
    });

    await allure.step("Verify page title in Ukrainian", async () => {
      const title = await privacyPolicyPage.getPageTitle();
      await allure.parameter("Page Title", title);
      expect(title).toBe(privacyPolicyContent.uk.title);
    });
  });

  test("should display intro section with content", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify intro section is visible and contains expected content"
    );
    await allure.severity("critical");
    await allure.tag("content");

    await allure.step("Verify intro section is visible", async () => {
      const isVisible = await privacyPolicyPage.isSectionVisible(
        privacyPolicyTestIds.intro
      );
      await allure.parameter("Section Visible", isVisible.toString());
      expect(isVisible).toBe(true);
    });

    await allure.step("Verify intro title is visible", async () => {
      await expect(privacyPolicyPage.pageTitle).toBeVisible();
    });

    await allure.step("Verify intro content is not empty", async () => {
      const content = await privacyPolicyPage.getIntroContent();
      await allure.parameter("Content Length", content.length.toString());
      expect(content.length).toBeGreaterThan(0);
    });

    await allure.step('Verify intro contains "guarantee" keyword', async () => {
      const content = await privacyPolicyPage.getIntroContent();
      const hasKeyword = content.toLowerCase().includes("guarantee");
      await allure.parameter("Has Guarantee", hasKeyword.toString());
      expect(hasKeyword).toBe(true);
    });
  });

  test("should display all main sections with titles and content", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify all main privacy policy sections are present with visible titles and content"
    );
    await allure.severity("critical");
    await allure.tag("smoke");

    const sections = [
      privacyPolicyTestIds.dataWeCollect,
      privacyPolicyTestIds.dataUsage,
      privacyPolicyTestIds.cookies,
      privacyPolicyTestIds.googleAuth,
      privacyPolicyTestIds.socialNetworks,
      privacyPolicyTestIds.targetedAds,
      privacyPolicyTestIds.newsletter,
      privacyPolicyTestIds.dataRetention,
      privacyPolicyTestIds.userRights,
      privacyPolicyTestIds.contactUs,
    ];

    for (const sectionId of sections) {
      await allure.step(`Verify section: ${sectionId}`, async () => {
        const isVisible = await privacyPolicyPage.isSectionVisible(sectionId);
        await allure.parameter("Section ID", sectionId);
        await allure.parameter("Is Visible", isVisible.toString());
        expect(isVisible).toBe(true);

        const title = await privacyPolicyPage.getSectionTitle(sectionId);
        await allure.parameter("Section Title", title);
        expect(title.length).toBeGreaterThan(0);

        const content = await privacyPolicyPage.getSectionContent(sectionId);
        await allure.parameter("Content Length", content.length.toString());
        expect(content.length).toBeGreaterThan(0);
      });
    }
  });

  test("should display all section titles in English", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify all section titles match expected English text"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Get all section titles", async () => {
      const actualTitles = await privacyPolicyPage.getAllSectionTitles();
      await allure.parameter("Sections Count", actualTitles.length.toString());
      expect(actualTitles.length).toBeGreaterThan(0);
    });

    const expectedTitles = [
      privacyPolicySections.en.dataWeCollect,
      privacyPolicySections.en.dataUsage,
      privacyPolicySections.en.cookies,
      privacyPolicySections.en.googleAuth,
      privacyPolicySections.en.socialNetworks,
      privacyPolicySections.en.targetedAds,
      privacyPolicySections.en.newsletter,
      privacyPolicySections.en.dataRetention,
      privacyPolicySections.en.userRights,
      privacyPolicySections.en.contactUs,
    ];

    for (const expectedTitle of expectedTitles) {
      await allure.step(`Verify title: ${expectedTitle}`, async () => {
        const titleLocator = await privacyPolicyPage.getSectionH2Title(
          expectedTitle
        );
        await expect(titleLocator).toBeVisible();
        await allure.parameter("Title", expectedTitle);
      });
    }
  });

  test("should display all section titles in Ukrainian", async ({
    privacyPolicyPage,
    page,
  }) => {
    await allure.description(
      "Verify all section titles match expected Ukrainian text"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Switch to Ukrainian language", async () => {
      await privacyPolicyPage.footer.changeLangBtn.click();
      await page.waitForLoadState("networkidle");
    });

    const expectedTitles = [
      privacyPolicySections.uk.dataWeCollect,
      privacyPolicySections.uk.dataUsage,
      privacyPolicySections.uk.cookies,
      privacyPolicySections.uk.googleAuth,
      privacyPolicySections.uk.socialNetworks,
      privacyPolicySections.uk.targetedAds,
      privacyPolicySections.uk.newsletter,
      privacyPolicySections.uk.dataRetention,
      privacyPolicySections.uk.userRights,
      privacyPolicySections.uk.contactUs,
    ];

    for (const expectedTitle of expectedTitles) {
      await allure.step(`Verify title: ${expectedTitle}`, async () => {
        const titleLocator = await privacyPolicyPage.getSectionH2Title(
          expectedTitle
        );
        await expect(titleLocator).toBeVisible();
        await allure.parameter("Title", expectedTitle);
      });
    }
  });

  test("should have cookie emoji in cookies section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description("Verify cookies section contains cookie emoji");
    await allure.severity("minor");
    await allure.tag("content");

    await allure.step("Check for cookie emoji", async () => {
      const hasEmoji = await privacyPolicyPage.hasCookieEmoji();
      await allure.parameter("Has Cookie Emoji", hasEmoji.toString());
      expect(hasEmoji).toBe(true);
    });
  });

  test("should mention Google Analytics in cookies section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify cookies section mentions Google Analytics"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Check for Google Analytics text", async () => {
      const hasGA = await privacyPolicyPage.hasGoogleAnalyticsText();
      await allure.parameter("Has Google Analytics", hasGA.toString());
      expect(hasGA).toBe(true);
    });
  });

  test("should display bullet points in data collection section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify data collection section contains bullet points"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step(
      "Get bullet points in data collection section",
      async () => {
        const bullets = await privacyPolicyPage.getBulletPointsInSection(
          privacyPolicyTestIds.dataWeCollect
        );
        await allure.parameter(
          "Bullet Points Count",
          bullets.length.toString()
        );
        expect(bullets.length).toBeGreaterThan(0);
      }
    );
  });

  test("should display bullet points in user rights section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify user rights section contains multiple bullet points"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Get bullet points in user rights section", async () => {
      const bullets = await privacyPolicyPage.getBulletPointsInSection(
        privacyPolicyTestIds.userRights
      );
      await allure.parameter("Bullet Points Count", bullets.length.toString());
      expect(bullets.length).toBeGreaterThanOrEqual(5);
    });
  });

  test("should have valid email link with correct address", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify email link has correct mailto format and email address"
    );
    await allure.severity("critical");
    await allure.tag("links");

    await allure.step("Verify email link href", async () => {
      const href = await privacyPolicyPage.getEmailLinkHref();
      await allure.parameter("Email href", href);
      await allure.parameter("Expected email", "liatoshynsky@gmail.com");

      expect(href).toContain("mailto:");

      if (href.includes("info@example.com")) {
        await allure.description(
          "BUG DETECTED: Email link shows 'info@example.com' but should be 'liatoshynsky@gmail.com'"
        );
      }

      expect(href).toContain("liatoshynsky@gmail.com");
    });

    await allure.step("Verify email link is visible", async () => {
      await expect(privacyPolicyPage.emailLink).toBeVisible();
    });
  });

  test("should have correct contact link href", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify contact link has correct href to contacts page (/contacts)"
    );
    await allure.severity("critical");
    await allure.tag("links");

    await allure.step("Verify contact link href", async () => {
      const href = await privacyPolicyPage.getContactLinkHref();
      const isUkrainian = await privacyPolicyPage.isUkrainianLanguage();

      await allure.parameter("Contact href", href);
      await allure.parameter("Language", isUkrainian ? "Ukrainian" : "English");
      await allure.parameter("Expected href", "/contacts");

      if (href !== "/contacts") {
        await allure.description(
          `BUG DETECTED: Contact link href is "${href}" but expected "/contacts". Language: ${
            isUkrainian ? "UK" : "EN"
          }`
        );
      }

      expect(href).toBe("/contacts");
    });

    await allure.step("Verify contact link is visible", async () => {
      const contactLinkLocator = privacyPolicyPage.getContactLinkLocator();
      await expect(contactLinkLocator).toBeVisible();
    });
  });

  test("should navigate to contacts page when clicking contact link", async ({
    privacyPolicyPage,
    page,
  }) => {
    await allure.description(
      "Verify navigation to contacts page via contact link"
    );
    await allure.severity("normal");
    await allure.tag("navigation");

    await allure.step("Click contact link", async () => {
      await privacyPolicyPage.clickContactLink();
      await page.waitForLoadState("networkidle");
    });

    await allure.step("Verify navigation to contacts page", async () => {
      const url = page.url();
      await allure.parameter("Current URL", url);
      expect(url).toContain("/contacts");
    });
  });

  test("should verify all sections have proper structure", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify each section has title and content structure"
    );
    await allure.severity("normal");
    await allure.tag("structure");

    const sections = [
      privacyPolicyTestIds.dataWeCollect,
      privacyPolicyTestIds.dataUsage,
      privacyPolicyTestIds.cookies,
      privacyPolicyTestIds.googleAuth,
      privacyPolicyTestIds.socialNetworks,
      privacyPolicyTestIds.targetedAds,
      privacyPolicyTestIds.newsletter,
      privacyPolicyTestIds.dataRetention,
      privacyPolicyTestIds.userRights,
      privacyPolicyTestIds.contactUs,
    ];

    for (const sectionId of sections) {
      await allure.step(`Verify structure of: ${sectionId}`, async () => {
        const hasStructure = await privacyPolicyPage.verifySectionStructure(
          sectionId
        );
        await allure.parameter("Section ID", sectionId);
        await allure.parameter("Has Structure", hasStructure.toString());
        expect(hasStructure).toBe(true);
      });
    }
  });

  test("should be able to scroll to each section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description("Verify ability to scroll to each section");
    await allure.severity("minor");
    await allure.tag("navigation");

    const sections = [
      privacyPolicyTestIds.dataWeCollect,
      privacyPolicyTestIds.cookies,
      privacyPolicyTestIds.userRights,
      privacyPolicyTestIds.contactUs,
    ];

    for (const sectionId of sections) {
      await allure.step(`Scroll to section: ${sectionId}`, async () => {
        await privacyPolicyPage.scrollToSection(sectionId);
        const isVisible = await privacyPolicyPage.isSectionVisible(sectionId);
        await allure.parameter("Section ID", sectionId);
        await allure.parameter("Is Visible", isVisible.toString());
        expect(isVisible).toBe(true);
      });
    }
  });

  test("should display contact us section as last section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify contact us section is the last section on the page"
    );
    await allure.severity("minor");
    await allure.tag("structure");

    await allure.step("Get all section titles", async () => {
      const titles = await privacyPolicyPage.getAllSectionTitles();
      const lastTitle = titles[titles.length - 1];
      await allure.parameter("Last Section Title", lastTitle);
      await allure.parameter(
        "Expected Title",
        privacyPolicySections.en.contactUs
      );
      expect(lastTitle).toBe(privacyPolicySections.en.contactUs);
    });
  });

  test("should have consistent section order", async ({
    privacyPolicyPage,
  }) => {
    await allure.description("Verify sections appear in expected order");
    await allure.severity("normal");
    await allure.tag("structure");

    await allure.step("Verify section order", async () => {
      const titles = await privacyPolicyPage.getAllSectionTitles();
      const expectedOrder = Object.values(privacyPolicySections.en);

      await allure.parameter("Sections Count", titles.length.toString());
      await allure.parameter("Expected Count", expectedOrder.length.toString());

      for (let i = 0; i < Math.min(titles.length, expectedOrder.length); i++) {
        await allure.parameter(
          `Section ${i + 1}`,
          `${titles[i]} === ${expectedOrder[i]}`
        );
        expect(titles[i]).toBe(expectedOrder[i]);
      }
    });
  });

  test("should display Google Auth section content", async ({
    privacyPolicyPage,
  }) => {
    await allure.description("Verify Google Auth section has visible content");
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Verify Google Auth section exists", async () => {
      const isVisible = await privacyPolicyPage.isSectionVisible(
        privacyPolicyTestIds.googleAuth
      );
      expect(isVisible).toBe(true);
    });

    await allure.step("Verify section has content", async () => {
      const content = await privacyPolicyPage.getSectionContent(
        privacyPolicyTestIds.googleAuth
      );
      await allure.parameter("Content Length", content.length.toString());
      expect(content.length).toBeGreaterThan(0);
    });
  });

  test("should display social networks section", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify social networks section is present and visible"
    );
    await allure.severity("minor");
    await allure.tag("content");

    await allure.step("Verify social networks section", async () => {
      const isVisible = await privacyPolicyPage.isSectionVisible(
        privacyPolicyTestIds.socialNetworks
      );
      expect(isVisible).toBe(true);
    });

    await allure.step("Verify section content", async () => {
      const content = await privacyPolicyPage.getSectionContent(
        privacyPolicyTestIds.socialNetworks
      );
      await allure.parameter("Content", content.substring(0, 100));
      expect(content.length).toBeGreaterThan(0);
    });
  });

  test("should display targeted ads section", async ({ privacyPolicyPage }) => {
    await allure.description(
      "Verify targeted ads section states no targeted advertising"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Verify targeted ads section exists", async () => {
      const isVisible = await privacyPolicyPage.isSectionVisible(
        privacyPolicyTestIds.targetedAds
      );
      expect(isVisible).toBe(true);
    });
  });

  test("should display newsletter section with subscription info", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify newsletter section contains subscription information"
    );
    await allure.severity("minor");
    await allure.tag("content");

    await allure.step("Verify newsletter section", async () => {
      const isVisible = await privacyPolicyPage.isSectionVisible(
        privacyPolicyTestIds.newsletter
      );
      expect(isVisible).toBe(true);
    });
  });

  test("should display data retention policy", async ({
    privacyPolicyPage,
  }) => {
    await allure.description(
      "Verify data retention section explains data storage policy"
    );
    await allure.severity("normal");
    await allure.tag("content");

    await allure.step("Verify data retention section", async () => {
      const isVisible = await privacyPolicyPage.isSectionVisible(
        privacyPolicyTestIds.dataRetention
      );
      expect(isVisible).toBe(true);
    });

    await allure.step(
      "Verify mentions Google Analytics retention",
      async () => {
        const content = await privacyPolicyPage.getSectionContent(
          privacyPolicyTestIds.dataRetention
        );
        const hasGA = content.includes("Google Analytics");
        await allure.parameter("Mentions Google Analytics", hasGA.toString());
        expect(hasGA).toBe(true);
      }
    );
  });
});
