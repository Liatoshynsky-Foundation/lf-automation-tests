import dotenv from 'dotenv';
import path from 'path';

// Load .env from repository root by default
dotenv.config({path: path.resolve(__dirname, '..', '.env')});

export const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL ?? 'https://lf-client-qa-stage-atbchmhfgtaxfdas.polandcentral-01.azurewebsites.net/';
export const BASE_ADMIN_URL = process.env.BASE_ADMIN_URL ?? `https://lf-admin-qa-stage-apbug0eka2bsdkf9.polandcentral-01.azurewebsites.net/`;
export const BASE_API_URL = process.env.BASE_API_URL ?? 'https://jsonplaceholder.typicode.com';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
export const HEADLESS = process.env.HEADLESS === undefined ? false :process.env.HEADLESS === 'true';
export const WORKERS = process.env.CI ? +process.env.CI  : 1;

export default {
    BASE_CLIENT_URL,
    BASE_ADMIN_URL,
    BASE_API_URL,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    HEADLESS,
    WORKERS
};

