import {expect as baseExpect, test as baseTest, type TestInfo} from '@playwright/test';
import {BASE_ADMIN_URL, BASE_API_URL, BASE_CLIENT_URL} from '../config/env';

type Fixtures = {
    baseClientURL: string;
    baseAdminURL: string;
    baseApiURL: string;
};

export const test = baseTest.extend<Fixtures>({
    baseClientURL: async ({}, use) => {
        await use(BASE_CLIENT_URL);
    },
    baseAdminURL: async ({}, use) => {
        await use(BASE_ADMIN_URL);
    },
    baseApiURL: async ({}, use) => {
        await use(BASE_API_URL);
    },
    page: async ({page}, use) => {
        //before each test

        await use(page);
        //after each test
    }
});

// Attach screenshot on failure to test report (Allure/Playwright attachments)
// This hook runs after each test that uses this `test` fixture.
test.afterEach(async ({ page }, testInfo: TestInfo) => {
    // If the test failed or was flaky, attach a screenshot
    if (testInfo.status !== 'passed') {
        try {
            // capture screenshot as buffer
            const screenshot = await page.screenshot({ fullPage: true });
            await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });

            // If video is enabled and retained on failure, attach a link to the video path (Playwright may store video path in testInfo.attachments)
            // Note: Playwright automatically attaches video when configured as `retain-on-failure` and using 'attachments' in reporter. This ensures screenshot is attached too.
        } catch (err) {
            // avoid failing the hook if screenshot couldn't be taken
             
            console.warn('Could not capture screenshot in afterEach hook:', err);
        }
    }
});

export const expect = baseExpect;
