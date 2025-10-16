import dotenv from 'dotenv';
import path from 'path';

// Load .env from repository root by default
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL ?? 'https://example.com';
export const BASE_ADMIN_URL = process.env.BASE_ADMIN_URL ?? `${BASE_CLIENT_URL}/admin`;
export const BASE_API_URL = process.env.BASE_API_URL ?? 'https://jsonplaceholder.typicode.com';

export default {
  BASE_CLIENT_URL,
  BASE_ADMIN_URL,
  BASE_API_URL,
};

