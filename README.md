# lf-automation-tests

A Playwright test project written in TypeScript. It contains a Playwright configuration, a Page Object Model (POM) structure under `page/client`, reusable components under `component/client`, fixtures under `tests/fixtures`, and example UI + API tests.

Quickstart
----------
Prerequisites:
- Node.js (16+ recommended)
- Git (optional)

1. Install project dependencies:

    ```cmd
    npm install
    ```

2. Install Playwright browsers (required for UI tests):

    ```cmd
    npx playwright install
    ```

3. Create a `.env` file from the example and edit values if needed:

    ```cmd
    copy .env.example .env
    notepad .env
    ```

Run tests
---------
- Run the entire test suite (all configured browsers):

    ```cmd
    npm test
    ```

- Run the UI tests only:

    ```cmd
    npm run test:ui
    ```

- Run the API tests only:

    ```cmd
    npm run test:api
    ```

- Run tests for a specific project (e.g. Chromium) with Playwright directly:

    ```cmd
    npx playwright test --project=chromium
    ```

- Type-check the TypeScript sources:

    ```cmd
    npm run typecheck
    ```

Environment variables (`.env`)
------------------------------
This project supports a small set of environment variables loaded via `dotenv` from the repository root. See `config/env.ts` for the implementation.

- `BASE_CLIENT_URL` — Base URL used for client-facing UI tests. Default: `https://example.com`
- `BASE_ADMIN_URL` — Base URL used for admin UI flows. Default: automatically derived from `BASE_CLIENT_URL` as `${BASE_CLIENT_URL}/admin` when not provided.
- `BASE_API_URL` — Base URL used for API tests. Default: `https://jsonplaceholder.typicode.com`

A sample file is included as `.env.example`. Do not commit secrets to source control.

Project structure (key files)
----------------------------
- `playwright.config.ts` — Playwright configuration (the `baseURL` is set from `BASE_CLIENT_URL`).
- `config/env.ts` — Loads `.env` and exports `BASE_CLIENT_URL`, `BASE_ADMIN_URL`, `BASE_API_URL`.
- `component/client/*` — small POM components (Header, Footer).
- `page/client/*` — Page objects that extend `BasePage` (HomePage, AboutUsPage, NewsPage, etc.).
- `tests/fixtures/fixtureBase.ts` — Base fixtures exposing `baseClientURL`, `baseAdminURL`, `baseApiURL`.
- `tests/fixtures/fixturePage.ts` — Fixtures that provide page objects such as `homePage`.
- `tests/ui.spec.ts` — Example UI test that uses the `homePage` fixture.
- `tests/api.spec.ts` — Example API smoke test that uses `baseApiURL`.

Using the fixtures in tests
---------------------------
The repository provides small fixture modules you can import from tests instead of `@playwright/test` directly. Example (UI test):

```ts
import { test, expect } from './fixtures/fixturePage';

test('Home page heading', async ({ homePage, baseClientURL }) => {
  await homePage.goto('/');
  const heading = await homePage.getHeadingText();

  if ((baseClientURL ?? '').includes('example.com')) {
    expect(heading).toBe('Example Domain');
  } else {
    expect(heading).toBeTruthy();
  }
});
```

Example (API test):

```ts
import { test, expect } from './fixtures/fixtureBase';

test('GET /posts/1 returns id=1', async ({ request, baseApiURL }) => {
  const resp = await request.get(`${baseApiURL}/posts/1`);
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.id).toBe(1);
});
```

Notes and troubleshooting
-------------------------
- If a UI test times out, make sure Playwright browsers are installed (`npx playwright install`) and that the `BASE_CLIENT_URL` is reachable from your environment.
- Page objects are intentionally assertion-free; they expose actions and wait helpers. Keep assertions in tests or fixtures.
- For CI, ensure you run `npx playwright install --with-deps` (or the platform-appropriate Playwright install) before running tests.

Next steps (suggestions)
------------------------
- Add a GitHub Actions workflow to run `npm install`, `npx playwright install --with-deps`, `npm run typecheck`, and `npm test` on push/PR.
- Add more fixtures (logged-in user, admin pages) or a `PageFactory` for easier page instantiation.
- Expand page object selectors and add more UI flows (navigation, forms, error pages).

If you'd like, I can add a CI workflow or scaffold an `adminPage` + fixture wired to `BASE_ADMIN_URL` next.
