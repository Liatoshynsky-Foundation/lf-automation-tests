# lf-automation-tests

[![Playwright Tests](https://github.com/Liatoshynsky-Foundation/lf-automation-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/Liatoshynsky-Foundation/lf-automation-tests/actions/workflows/playwright.yml)

A professional E2E test automation suite built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern. This project provides comprehensive UI and API testing capabilities with Allure reporting integration.

## 📚 Documentation

- **[Repository Audit Report](./docs/REPOSITORY_AUDIT_REPORT.md)** - Comprehensive analysis of repository quality and recommendations
- **[Testing Guidelines](./docs/TESTING_GUIDELINES.md)** - Best practices for writing tests
- **[Contributing Guidelines](./docs/CONTRIBUTING.md)** - How to contribute to the project
- **[Allure Guide](./docs/ALLURE_GUIDE.md)** - Allure reporting documentation

## 🏗️ Architecture

This project follows the Page Object Model (POM) design pattern:

- **Page Objects** (`page/`) - Represent pages and encapsulate locators + actions
- **Components** (`component/`) - Reusable UI components (Header, Footer, Forms)
- **Fixtures** (`fixtures/`) - Playwright fixtures for dependency injection
- **Tests** (`tests/`) - Test specifications organized by feature area (client, admin)
- **Data** (`data/`) - Test data, constants, and enums
- **Config** (`config/`) - Environment configuration and settings

## ⚡ Quickstart

### Prerequisites

- **Node.js** 16+ (18+ recommended)
- **Git** 
- **Java 8+** (required for Allure reports)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Liatoshynsky-Foundation/lf-automation-tests.git
   cd lf-automation-tests
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Verify setup**
   ```bash
   npm run typecheck
   npm run lint
   ```

## 🔧 Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_CLIENT_URL` | Client-facing site URL | (see `config/env.ts`) |
| `BASE_ADMIN_URL` | Admin panel URL | (see `config/env.ts`) |
| `BASE_API_URL` | API endpoint URL | `https://jsonplaceholder.typicode.com` |
| `ADMIN_EMAIL` | Admin login email | - |
| `ADMIN_PASSWORD` | Admin login password | - |
| `HEADLESS` | Run browsers in headless mode | `false` |
| `CI` | CI environment flag | - |
| `WORKERS` | Number of parallel workers | `1` (local), `2` (CI) |

**Example `.env` file:**
```bash
BASE_CLIENT_URL=https://example.com
BASE_ADMIN_URL=https://example.com/admin
BASE_API_URL=https://jsonplaceholder.typicode.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
HEADLESS=false
```

⚠️ **Never commit `.env` file to source control** - it's already in `.gitignore`


## 🧪 Running Tests

### All Tests
```bash
npm test                          # Run all tests
```

### By Project
```bash
npx playwright test --project=client    # Client-facing tests only
npx playwright test --project=admin     # Admin panel tests only
```

### By Test File
```bash
npm run test:ui                   # UI tests only
npm run test:api                  # API tests only
npm run client:ui                 # Client UI tests only
npx playwright test tests/client/contacts.spec.ts  # Specific test file
```

### Debug & Development
```bash
npx playwright test --headed      # Run with visible browser
npx playwright test --ui          # Run with Playwright UI mode
npx playwright test --debug       # Run with Playwright Inspector
npx playwright codegen            # Generate test code
```

### Reports
```bash
npm run show                      # View Playwright HTML report
npm run allure:generate           # Generate Allure report
npm run allure:open               # Open Allure report
npm run allure:serve              # Generate and serve Allure report
```

### Quality Checks
```bash
npm run typecheck                 # TypeScript type checking
npm run lint                      # ESLint check
npm run lint:fix                  # ESLint auto-fix
```


## 📊 Test Artifacts

### Screenshots & Videos

The test suite automatically captures test artifacts:

- **Screenshots**: Captured on test failure (`screenshot: 'only-on-failure'`)
- **Videos**: Retained on test failure (`video: 'retain-on-failure'`)
- **Traces**: Captured on first retry (`trace: 'on-first-retry'`)

Artifacts are saved in:
- `test-results/` - Playwright test results
- `playwright-report/` - Playwright HTML report
- `allure-results/` - Allure raw results
- `allure-report/` - Allure HTML report

### Allure Reports

Generate and view comprehensive test reports with Allure:

```bash
npm run allure:generate    # Generate report from results
npm run allure:open        # Open generated report
npm run allure:serve       # Generate and serve in one command
```

See [Allure Guide](./docs/ALLURE_GUIDE.md) for more details.
## 🎯 Project Structure

```
lf-automation-tests/
├── .github/
│   └── workflows/          # CI/CD pipelines (GitHub Actions)
├── component/              # Reusable UI components
│   ├── admin/             # Admin panel components
│   └── client/            # Client-facing components
├── config/                # Configuration files
│   └── env.ts            # Environment variables loader
├── data/                  # Test data, constants, enums
├── docs/                  # Documentation
│   ├── REPOSITORY_AUDIT_REPORT.md
│   ├── TESTING_GUIDELINES.md
│   ├── CONTRIBUTING.md
│   └── ALLURE_GUIDE.md
├── fixtures/              # Playwright fixtures
│   ├── fixtureBase.ts    # Base fixtures (URLs, screenshot hooks)
│   └── fixturePage.ts    # Page object fixtures
├── page/                  # Page Objects (POM pattern)
│   ├── admin/            # Admin page objects
│   ├── client/           # Client page objects
│   └── BasePage.ts       # Base page class
├── tests/                 # Test specifications
│   ├── admin/            # Admin panel tests
│   └── client/           # Client-facing tests
├── .env.example          # Environment variables template
├── .gitignore
├── eslint.config.mts     # ESLint configuration
├── package.json
├── playwright.config.ts   # Playwright configuration
├── README.md
└── tsconfig.json         # TypeScript configuration
```

## 🐛 Troubleshooting

### Tests fail with "Browser not found"
```bash
npx playwright install --with-deps
```

### Tests fail with timeout errors
- Check if `BASE_CLIENT_URL` is accessible from your network
- Increase timeout in `playwright.config.ts` if needed
- Check network connectivity

### TypeScript errors
```bash
npm run typecheck
```

### Tests are flaky
- Avoid hard waits (`sleep`, `waitForTimeout`)
- Use deterministic waits (`waitForSelector`, `expect().toBeVisible()`)
- Check the [Testing Guidelines](./docs/TESTING_GUIDELINES.md)

### Environment variables not loading
- Ensure `.env` file exists in project root
- Check `.env` file format (no spaces around `=`)
- Verify variable names match those in `config/env.ts`

### Allure report not generating
- Ensure Java 8+ is installed: `java -version`
- Install Allure CLI: `npm install -g allure-commandline`
- Run tests first to generate results: `npm test`

## 🤝 Contributing

We welcome contributions! Please see [Contributing Guidelines](./docs/CONTRIBUTING.md) for details on:

- Setting up your development environment
- Branch naming conventions
- Commit message guidelines
- Pull request process
- Code review criteria

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the [Testing Guidelines](./docs/TESTING_GUIDELINES.md)
4. Run quality checks:
   ```bash
   npm run typecheck
   npm run lint
   npm test
   ```
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📖 Additional Resources

- **[Repository Audit Report](./docs/REPOSITORY_AUDIT_REPORT.md)** - Current state and improvement recommendations
- **[Testing Guidelines](./docs/TESTING_GUIDELINES.md)** - How to write high-quality tests
- **[Allure Guide](./docs/ALLURE_GUIDE.md)** - Allure reporting documentation
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Team

**Liatoshynsky Foundation**
- GitHub: [@Liatoshynsky-Foundation](https://github.com/Liatoshynsky-Foundation)

---

**Happy Testing! 🎭✨**
