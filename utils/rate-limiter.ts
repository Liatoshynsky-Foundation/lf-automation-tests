import pLimit from 'p-limit';
import {RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS} from '../config/env';

const limit = pLimit(RATE_LIMIT_MAX_CONCURRENT);
let lastExecutionTime = 0;

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function rateLimited<T>(fn: () => Promise<T>): Promise<T> {
  return limit(async () => {
    const timeSinceLastExecution = Date.now() - lastExecutionTime;
    if (timeSinceLastExecution < RATE_LIMIT_MIN_DELAY_MS) {
      await delay(RATE_LIMIT_MIN_DELAY_MS - timeSinceLastExecution);
    }

    lastExecutionTime = Date.now();
    return await fn();
  });
}