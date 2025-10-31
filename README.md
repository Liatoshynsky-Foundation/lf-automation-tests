# lf-automation-tests

A Playwright test project written in TypeScript. It contains a Playwright configuration, a Page Object Model (POM) structure under `page/client`, reusable components under `component/client`, fixtures under `fixtures`, and example UI + API tests.

## Quickstart

Prerequisites:

- Node.js (16+ recommended)
- Git (optional)
- Java 8+ (required for Allure Commandline to generate reports)

1. Install project dependencies:

    ```shell
    npm install
    ```

2. Install Playwright browsers (required for UI tests):

    ```shell
    npx playwright install
    ```

3. Create a `.env` file from the example and edit values if needed:

    ```shell
    copy .env.example .env
    notepad .env
    ```

## Environment variables (`.env`)

This project supports a small set of environment variables loaded via `dotenv` from the repository root. See `config/env.ts` for the implementation.

- `BASE_CLIENT_URL` — Base URL used for client-facing UI tests. Default is defined in `config/env.ts`.
- `BASE_ADMIN_URL` — Base URL used for admin UI flows. Default is defined in `config/env.ts`.
- `BASE_API_URL` — Base URL used for API tests. Default: `https://jsonplaceholder.typicode.com`

Example `.env.example` (copy to `.env` and adjust as needed):

```text
BASE_CLIENT_URL=https://example.com
# Leave empty to use value from config or to keep default
BASE_ADMIN_URL=
BASE_API_URL=https://jsonplaceholder.typicode.com
# ADMIN credentials
ADMIN_EMAIL=admin
ADMIN_PASSWORD=adminpassword

```

A sample file is included as `.env.example`. Do not commit secrets to source control.


## Run tests

You can run tests using the npm scripts defined in `package.json`.

- Run the entire test suite (all configured browsers):

    ```shell
    npm test
    ```

- Run the Admin tests only:

  ```shell
   npx playwright test --project=admin
  ```

- Run the Client tests only:

  ```shell
   npx playwright test --project=client
  ```

- Run the UI tests only:

    ```shell
    npm run test:ui
    ```

- Run the API tests only:

    ```shell
    npm run test:api
    ```

- Type-check the TypeScript sources:

    ```shell
    npm run typecheck
    ```


## Screenshots, videos and Allure attachments

The test suite is configured to capture artifacts for failed tests and include them in reports:

- Playwright is configured to save screenshots only on failure (`screenshot: 'only-on-failure'`) and videos are retained on failure (`video: 'retain-on-failure'`).
- The fixtures include a global `afterEach` hook (in `fixtures/fixtureBase.ts`) that explicitly captures a full-page screenshot when a test fails and attaches it to the test result (Playwright and Allure will pick it up in `allure-results`).

To generate and view the Allure report after running tests:

```shell
npm run allure:generate
npm run allure:open
```

Or serve it immediately:

```shell
npm run allure:serve
```
## Fixtures

- `fixtures/fixtureBase.ts` — base fixtures that expose `baseClientURL`, `baseAdminURL`, `baseApiURL` and attach screenshots on failed tests.
- `fixtures/fixturePage.ts` — page-level fixtures that instantiate page objects like `AboutUsPage`, `ArtistryPage`, etc.

## Project structure (key files)

- `playwright.config.ts` — Playwright configuration (the `baseURL` is set from environment variables via `config/env.ts`).
- `config/env.ts` — Loads `.env` and exports `BASE_CLIENT_URL`, `BASE_ADMIN_URL`, `BASE_API_URL`.
- `component/client/*` — small POM components (Header, Footer).
- `page/client/*` — Page objects that extend `ClientBasePage` (HomePage, AboutUsPage, NewsPage, etc.).
- `fixtures/fixtureBase.ts` — Base fixtures exposing `baseClientURL`, `baseAdminURL`, `baseApiURL` and failure screenshot hook.
- `fixtures/fixturePage.ts` — Fixtures that provide page objects such as `aboutUsPage`.
- `tests/client/*` — UI tests that use the page fixtures.
- `tests/api.spec.ts` — Example API smoke test that uses `baseApiURL`.

## Notes and troubleshooting

- If a UI test times out, make sure Playwright browsers are installed (`npx playwright install`) and that the `BASE_CLIENT_URL` is reachable from your environment.
- Page objects are intentionally assertion-free; they expose actions and wait helpers. Keep assertions in tests or fixtures.
- For CI, ensure you run `npx playwright install --with-deps` (or the platform-appropriate Playwright install) before running tests.

## Next steps (suggestions)

- Add a GitHub Actions workflow to run `npm install`, `npx playwright install --with-deps`, `npm run typecheck`, and `npm test` on push/PR.
- Add more fixtures (logged-in user, admin pages) or a `PageFactory` for easier page instantiation.
- Expand page object selectors and add more UI flows (navigation, forms, error pages).

If you'd like, I can add a CI workflow or scaffold an `adminPage` + fixture wired to `BASE_ADMIN_URL` next.
