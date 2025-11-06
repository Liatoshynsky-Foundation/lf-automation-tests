import pLimit from 'p-limit';
import {RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS} from '../config/env';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a rate limiter function that controls concurrent executions and enforces minimum delays.
 *
 * @param maxConcurrent - Maximum number of concurrent executions
 * @param minDelayMs - Minimum delay in milliseconds between executions
 * @returns Rate-limited function wrapper
 * @remarks
 * Each rate limiter instance maintains its own execution state (lastExecutionTime).
 * Do not share limiter instances across Playwright workers - they run in separate processes.
 * For shared rate limiting across workers, use pre-configured exports: rateLimited, fastLimiter, slowLimiter.
 */
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

// Pre-configured rate limiters - safe to use across all tests
// Each Playwright worker gets its own instance (workers run in separate processes)
export const rateLimited = createRateLimiter(RATE_LIMIT_MAX_CONCURRENT, RATE_LIMIT_MIN_DELAY_MS);
export const fastLimiter = createRateLimiter(5, 200);
export const slowLimiter = createRateLimiter(1, 2000);