# lf-automation-tests

A Playwright test project written in TypeScript. It contains a Playwright configuration, a Page Object Model (POM) structure under `page/client`, reusable components under `component/client`, fixtures under `tests/fixtures`, and example UI + API tests.

Quickstart
----------
Prerequisites:
- Node.js (16+ recommended)
- Git (optional)
- Java 8+ (required for Allure Commandline to generate reports)

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
You can run tests using the npm scripts defined in `package.json`.

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

- Run tests for a specific Playwright project (e.g. Chromium):

    ```cmd
    npx playwright test --project=chromium
    ```

- Type-check the TypeScript sources:

    ```cmd
    npm run typecheck
    ```

Project scripts (from package.json)
-----------------------------------
- `test` — run Playwright tests
- `test:ui` — run UI tests (tests/ui.spec.ts)
- `client:ui` — run client UI tests (tests/client)
- `test:api` — run API tests (tests/api.spec.ts)
- `typecheck` — run `tsc` to type-check sources
- `show` — show Playwright HTML report (`npx playwright show-report` or `npm run show`)
- `lint` / `lint:fix` — ESLint commands
- `allure:generate` — generate Allure report from test results
- `allure:open` — open the generated Allure report
- `allure:serve` — generate and serve Allure report (opens in browser)

Allure Reporting
----------------
This project includes Allure reporting for enhanced test result visualization.

After running tests, you can view the Allure report in two ways:

1. Generate and open the report:
    ```cmd
    npm run allure:generate
    npm run allure:open
    ```

2. Generate and serve the report in one command:
    ```cmd
    npm run allure:serve
    ```

The Allure report provides:
- Detailed test execution results with steps
- Historical trends and statistics
- Failed test analysis
- Screenshots and attachments (if configured)
- Test categorization and filtering

**Note:** 
- The `allure-results/` folder is generated during test execution and is used to create the report. 
- Both `allure-results/` and `allure-report/` are excluded from version control via `.gitignore`.
- Allure Commandline requires Java 8 or newer to be installed and available in your system PATH.

For detailed information on using Allure annotations, creating test steps, and customizing reports, see [docs/ALLURE_GUIDE.md](docs/ALLURE_GUIDE.md).
For an example test with Allure annotations, steps, and attachments, see tests/allure-demo.spec.ts.

Environment variables (`.env`)
------------------------------
This project supports a small set of environment variables loaded via `dotenv` from the repository root. See `config/env.ts` for the implementation.

- `BASE_CLIENT_URL` — Base URL used for client-facing UI tests. Default: `https://example.com`
- `BASE_ADMIN_URL` — Base URL used for admin UI flows. Default: automatically derived from `BASE_CLIENT_URL` as `${BASE_CLIENT_URL}/admin` when not provided.
- `BASE_API_URL` — Base URL used for API tests. Default: `https://jsonplaceholder.typicode.com`

Example `.env.example` (copy to `.env` and adjust as needed):

```text
BASE_CLIENT_URL=https://example.com
# Leave empty to derive from BASE_CLIENT_URL, e.g. https://example.com/admin
BASE_ADMIN_URL=
BASE_API_URL=https://jsonplaceholder.typicode.com
```

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
The repository provides small fixture modules you can import from tests instead of `@playwright/test` directly.

Example (UI test inside `tests/`):

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

Example (API test inside `tests/`):

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
