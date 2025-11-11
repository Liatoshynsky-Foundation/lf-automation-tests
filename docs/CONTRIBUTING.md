# Contributing Guidelines

Welcome to the lf-automation-tests project! This document provides guidelines for contributing to the test automation suite.

---

## 🎯 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 16+ installed
- **Git** installed
- **Java 8+** (for Allure reports)
- A code editor (VS Code recommended)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Liatoshynsky-Foundation/lf-automation-tests.git
   cd lf-automation-tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run tests to verify setup**
   ```bash
   npm test
   ```

---

## 🌿 Branch Strategy

### Branch Naming Convention

Use the following prefixes for branches:

- `feature/` - New features or enhancements
  - Example: `feature/add-login-tests`
  
- `fix/` - Bug fixes
  - Example: `fix/update-locator-strategy`
  
- `refactor/` - Code refactoring without changing behavior
  - Example: `refactor/improve-page-objects`
  
- `docs/` - Documentation updates
  - Example: `docs/update-readme`
  
- `test/` - Test-related changes
  - Example: `test/add-api-tests`

### Workflow

1. Create a new branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit regularly
   ```bash
   git add .
   git commit -m "feat: add login page tests"
   ```

3. Push your branch and create a Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 📝 Commit Message Guidelines

### Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `perf`: Performance improvements
- `chore`: Changes to build process or auxiliary tools

### Examples

```bash
# Good commit messages
git commit -m "feat(login): add login page object and tests"
git commit -m "fix(header): update navigation locator strategy"
git commit -m "refactor(fixtures): simplify page fixture creation"
git commit -m "docs(readme): add troubleshooting section"
git commit -m "test(api): add API smoke tests"

# Bad commit messages (avoid these)
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"
```

---

## 🧪 Adding New Tests

### 1. Identify the Test Scope

- **Client tests**: User-facing UI tests → `tests/client/`
- **Admin tests**: Admin panel tests → `tests/admin/`
- **API tests**: Backend API tests → `tests/api.spec.ts`

### 2. Create Page Objects (if needed)

If testing a new page, create a Page Object:

```bash
# For client pages
touch page/client/NewPage.ts

# For admin pages
touch page/admin/NewAdminPage.ts
```

**Template:**
```typescript
import { Locator, Page } from '@playwright/test';
import { ClientBasePage } from './ClientBasePage';

export class NewPage extends ClientBasePage {
    private readonly pageHeading: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = this.page.getByRole('heading', { name: 'Page Title' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    }

    async visit(): Promise<void> {
        await this.goto('/new-page');
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }
}
```

### 3. Add Fixture (if needed)

Update `fixtures/fixturePage.ts`:

```typescript
import { NewPage } from '../page/client/NewPage';

type MyFixturesPage = {
    // ... existing fixtures
    newPage: NewPage;
};

export const test = baseTest.extend<MyFixturesPage>({
    // ... existing fixtures
    newPage: async ({ page }, use) => {
        const newPage = new NewPage(page);
        await use(newPage);
    },
});
```

### 4. Write Tests

Create test file: `tests/client/new-page.spec.ts`

```typescript
import { test, expect } from '../../fixtures/fixturePage';
import * as allure from 'allure-js-commons';

test.describe('New Page Tests', () => {
    test.beforeEach(async ({ newPage }) => {
        await newPage.visit();
    });

    test('should display page heading', async ({ newPage }) => {
        allure.description('Verify page heading is visible');
        allure.severity('normal');
        
        await expect(newPage.pageHeading).toBeVisible();
    });
});
```

### 5. Run Your Tests

```bash
# Run specific test file
npx playwright test tests/client/new-page.spec.ts

# Run with UI
npx playwright test tests/client/new-page.spec.ts --ui

# Run in headed mode
npx playwright test tests/client/new-page.spec.ts --headed
```

---

## ✅ Quality Checklist

Before submitting a Pull Request, ensure:

### Code Quality

- [ ] Code follows existing patterns and conventions
- [ ] No hard-coded values (use config or test data)
- [ ] No `any` types in TypeScript
- [ ] Locators use semantic selectors (not XPath)
- [ ] No hard waits (`sleep`, `waitForTimeout`)

### Testing

- [ ] Tests pass locally: `npm test`
- [ ] Type check passes: `npm run typecheck`
- [ ] Linting passes: `npm run lint`
- [ ] Tests are atomic and independent
- [ ] Test names are descriptive

### Documentation

- [ ] Code is self-documenting with clear names
- [ ] Complex logic has comments
- [ ] README updated if adding new features
- [ ] JSDoc comments for public methods

---

## 🔍 Code Review Process

### Submitting a PR

1. Ensure your branch is up to date with `main`
   ```bash
   git checkout main
   git pull
   git checkout your-branch
   git merge main
   ```

2. Push your changes
   ```bash
   git push origin your-branch
   ```

3. Create a Pull Request on GitHub with:
   - **Clear title** describing the change
   - **Description** explaining what and why
   - **Link to related issues** (if any)
   - **Screenshots/videos** for UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added (if applicable)
- [ ] Type check passes
- [ ] Lint passes

## Screenshots (if applicable)
Add screenshots or videos

## Related Issues
Closes #123
```

### Review Criteria

Reviewers will check:

- ✅ Code quality and readability
- ✅ Test coverage
- ✅ Adherence to guidelines
- ✅ No breaking changes
- ✅ Performance impact

---

## 🏗️ Project Structure

```
lf-automation-tests/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── component/              # Reusable UI components
│   ├── admin/             # Admin components
│   └── client/            # Client components
├── config/                # Configuration files
│   └── env.ts            # Environment variables
├── data/                  # Test data and constants
├── docs/                  # Documentation
├── fixtures/              # Playwright fixtures
│   ├── fixtureBase.ts    # Base fixtures
│   └── fixturePage.ts    # Page object fixtures
├── page/                  # Page Objects
│   ├── admin/            # Admin page objects
│   ├── client/           # Client page objects
│   └── BasePage.ts       # Base page class
├── tests/                 # Test specifications
│   ├── admin/            # Admin tests
│   └── client/           # Client tests
├── .env.example          # Environment variables template
├── .gitignore
├── eslint.config.mts     # ESLint configuration
├── package.json
├── playwright.config.ts   # Playwright configuration
├── README.md
└── tsconfig.json         # TypeScript configuration
```

---

## 🐛 Reporting Issues

### Bug Reports

When reporting a bug, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Numbered steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, browser
6. **Screenshots/Logs**: If applicable

**Template:**
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. Windows 11, macOS 13]
- Node: [e.g. 18.16.0]
- Browser: [e.g. Chrome 120]

**Screenshots/Logs**
Add any relevant screenshots or logs.
```

### Feature Requests

When requesting a feature, include:

1. **Problem**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other solutions you considered
4. **Additional Context**: Any other relevant information

---

## 🤝 Code of Conduct

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism
- ✅ Focus on what is best for the project
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment or discriminatory language
- ❌ Personal attacks
- ❌ Public or private harassment
- ❌ Publishing others' private information

---

## 📚 Resources

### Documentation
- [Testing Guidelines](./TESTING_GUIDELINES.md)
- [Repository Audit Report](./REPOSITORY_AUDIT_REPORT.md)
- [Allure Guide](./ALLURE_GUIDE.md)

### External Resources
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 💬 Getting Help

If you need help:

1. Check the [documentation](../README.md)
2. Search [existing issues](https://github.com/Liatoshynsky-Foundation/lf-automation-tests/issues)
3. Create a new issue with the `question` label
4. Reach out to the team

---

## 🎉 Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes
- Project README (for significant contributions)

Thank you for contributing! 🙏

---

*Last updated: 2025-11-11*
