import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { BASE_CLIENT_URL, BASE_ADMIN_URL, BASE_API_URL } from '../config/env';

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
  page: async ({ page }, use) => {
    //before each test

    await use(page);
    //after each test
  }
});

export const expect = baseExpect;

