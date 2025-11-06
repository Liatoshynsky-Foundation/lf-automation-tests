import pLimit from 'p-limit';
import {RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS} from '../config/env';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createRateLimiter(maxConcurrent: number, minDelayMs: number) {
  const limit = pLimit(maxConcurrent);
  let lastExecutionTime = 0;

  return async function rateLimited<T>(fn: () => Promise<T>): Promise<T> {
    return limit(async () => {
      const timeSinceLastExecution = Date.now() - lastExecutionTime;
      if (timeSinceLastExecution < minDelayMs) {
        await delay(minDelayMs - timeSinceLastExecution);
      }

      lastExecutionTime = Date.now();
      return await fn();
    });
  };
}

// Default rate limiter from env config
export const rateLimited = createRateLimiter(RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS);

// Pre-configured limiters for different scenarios
export const fastLimiter = createRateLimiter(5, 200);   // Fast: 5 concurrent, 200ms delay
export const slowLimiter = createRateLimiter(1, 2000);  // Slow: 1 concurrent, 2s delay