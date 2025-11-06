import pLimit from 'p-limit';
import {RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS} from '../config/env';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createRateLimiter(maxConcurrent: number, minDelayMs: number) {
  const limit = pLimit(maxConcurrent);
  const delayLimit = pLimit(1);
  let lastExecutionTime = 0;

  return async function rateLimited<T>(fn: () => Promise<T>): Promise<T> {
    return limit(async () => {
      await delayLimit(async () => {
        if (lastExecutionTime > 0) {
          const timeSinceLastExecution = Date.now() - lastExecutionTime;
          if (timeSinceLastExecution < minDelayMs) {
            await delay(minDelayMs - timeSinceLastExecution);
          }
        }
        lastExecutionTime = Date.now();
      });

      return await fn();
    });
  };
}

export const rateLimited = createRateLimiter(RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS);

export const fastLimiter = createRateLimiter(5, 200);
export const slowLimiter = createRateLimiter(1, 2000);