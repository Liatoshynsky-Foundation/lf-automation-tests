# Testing Guidelines

## 📋 Overview

This document provides guidelines for writing high-quality, maintainable E2E tests using Playwright and the Page Object Model pattern.

---

## 🎯 Core Principles

### 1. **Atomic Tests**
Each test should be independent and test one specific behavior.

```typescript
// ✅ GOOD - Tests one thing
test('should display error when email is invalid', async ({ loginPage }) => {
    await loginPage.fillEmail('invalid-email');
    await loginPage.submit();
    expect(await loginPage.getErrorMessage()).toContain('Invalid email');
});

// ❌ BAD - Tests multiple things
test('should test entire user flow', async ({ page }) => {
    // Login
    // Navigate to profile
    // Update profile
    // Logout
    // Too much in one test!
});
```

### 2. **Test Independence**
Tests should not depend on each other or on execution order.

```typescript
// ✅ GOOD - Each test sets up its own state
test.describe('User Profile', () => {
    test.beforeEach(async ({ loginPage, authenticatedPage }) => {
        // Setup for each test
        await loginPage.login('user@test.com', 'password');
    });

    test('should update username', async ({ profilePage }) => {
        await profilePage.updateUsername('NewName');
        expect(await profilePage.getUsername()).toBe('NewName');
    });

    test('should update email', async ({ profilePage }) => {
        await profilePage.updateEmail('new@test.com');
        expect(await profilePage.getEmail()).toBe('new@test.com');
    });
});
```

### 3. **Descriptive Test Names**
Use clear, behavior-focused test names.

```typescript
// ✅ GOOD - Describes behavior and expected outcome
test('should display validation error when password is less than 8 characters', async () => {});
test('should redirect to dashboard after successful login', async () => {});
test('should disable submit button when form is invalid', async () => {});

// ❌ BAD - Vague or implementation-focused
test('test login', async () => {});
test('click button', async () => {});
test('check validation', async () => {});
```

---

## 🏗️ Page Object Model

### Page Object Structure

```typescript
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Locators as private readonly properties
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        // Initialize locators
        this.emailInput = this.page.getByLabel('Email');
        this.passwordInput = this.page.getByLabel('Password');
        this.submitButton = this.page.getByRole('button', { name: 'Sign In' });
        this.errorMessage = this.page.getByTestId('error-message');
    }

    // Actions - what user can do on this page
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async submit(): Promise<void> {
        await this.submitButton.click();
    }

    // Getters - retrieve information from page (assertion-free)
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() ?? '';
    }

    async isSubmitButtonEnabled(): Promise<boolean> {
        return await this.submitButton.isEnabled();
    }

    // Navigate to this page
    async visit(): Promise<void> {
        await this.goto('/login');
    }
}
```

### Key Rules for Page Objects

1. **No assertions in Page Objects** - Only return data, let tests do assertions
2. **Use semantic locators** - Prefer `getByRole`, `getByLabel`, `getByTestId`
3. **Encapsulate logic** - Tests should not know about locators
4. **Type everything** - Use TypeScript types for better IDE support
5. **Make locators private** - Don't expose locators to tests

---

## 🎭 Locator Strategies

### Priority Order (Use in this order)

#### 1. **Test IDs** (Most Stable)
```typescript
// ✅ Best for dynamic content or complex structures
page.getByTestId('user-profile-name')
page.getByTestId('submit-button')
```

#### 2. **Role + Accessible Name** (Semantic)
```typescript
// ✅ Best for interactive elements
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })
page.getByRole('link', { name: 'Contact Us' })
page.getByRole('heading', { name: 'Welcome' })
```

#### 3. **Label** (Form Fields)
```typescript
// ✅ Best for form inputs
page.getByLabel('Email address')
page.getByLabel('Password')
page.getByLabel('Remember me')
```

#### 4. **Placeholder**
```typescript
// ✅ When no label exists
page.getByPlaceholder('Enter your email')
```

#### 5. **Text Content**
```typescript
// ✅ For unique text content
page.getByText('Welcome back!')
page.getByText('Signed in as')
```

#### 6. **CSS Selectors**
```typescript
// ⚠️ Use as last resort
page.locator('[data-component="header"]')
page.locator('.user-menu > button')
```

#### ❌ **Avoid XPath** (Especially Absolute)
```typescript
// ❌ NEVER use absolute XPath
page.locator('xpath=/html/body/div[1]/div[2]/button')

// ⚠️ Relative XPath OK if nothing else works, but not preferred
page.locator('xpath=//button[contains(@class, "submit")]')
```

---

## ⏱️ Waiting Strategies

### Use Auto-Waiting
Playwright has built-in auto-waiting for most actions:

```typescript
// ✅ These automatically wait for element to be actionable
await page.getByRole('button').click();
await page.getByLabel('Email').fill('test@test.com');
await expect(page.getByText('Success')).toBeVisible();
```

### Explicit Waits (When Needed)

```typescript
// ✅ Wait for navigation
await page.waitForURL('/dashboard');
await page.waitForURL(/\/profile\/\d+/);

// ✅ Wait for network to be idle
await page.waitForLoadState('networkidle');
await page.waitForLoadState('domcontentloaded');

// ✅ Wait for API response
await page.waitForResponse(resp => 
    resp.url().includes('/api/user') && resp.status() === 200
);

// ✅ Wait for element state
await element.waitFor({ state: 'visible' });
await element.waitFor({ state: 'hidden' });
await element.waitFor({ state: 'attached' });

// ✅ Wait for condition
await page.waitForFunction(() => window.dataLoaded === true);
```

### ❌ Avoid Hard Waits

```typescript
// ❌ BAD - Brittle, slow, unreliable
await page.waitForTimeout(3000);
await page.waitForTimeout(5000);

// ✅ GOOD - Wait for specific condition
await expect(page.getByText('Loaded')).toBeVisible();
await page.waitForResponse(resp => resp.url().includes('/api/data'));
```

---

## 🧪 Test Structure

### Basic Test Template

```typescript
import { test, expect } from '../../fixtures/fixturePage';

test.describe('Feature Name', () => {
    // Run before each test in this describe block
    test.beforeEach(async ({ page }) => {
        // Setup code
    });

    // Run after each test in this describe block
    test.afterEach(async ({ page }) => {
        // Cleanup code (usually not needed)
    });

    test('should do something specific', async ({ fixtureName }) => {
        // Arrange - Setup test data and state
        
        // Act - Perform the action being tested
        
        // Assert - Verify the outcome
    });
});
```

### Using Allure Annotations

```typescript
import * as allure from 'allure-js-commons';

test('should login successfully', async ({ loginPage }) => {
    allure.description('Verify user can login with valid credentials');
    allure.severity('critical');
    allure.feature('Authentication');
    allure.story('User Login');
    
    await allure.step('Navigate to login page', async () => {
        await loginPage.visit();
    });
    
    await allure.step('Enter valid credentials', async () => {
        await loginPage.fillEmail('user@test.com');
        await loginPage.fillPassword('password123');
    });
    
    await allure.step('Click submit button', async () => {
        await loginPage.submit();
    });
    
    await allure.step('Verify redirect to dashboard', async () => {
        await expect(page).toHaveURL('/dashboard');
    });
});
```

---

## 📊 Test Data Management

### Constants and Test Data

```typescript
// data/testUsers.ts
export const TEST_USERS = {
    VALID_USER: {
        email: 'valid@test.com',
        password: 'ValidPass123!',
    },
    ADMIN_USER: {
        email: 'admin@test.com',
        password: 'AdminPass123!',
    },
} as const;

// Use in tests
import { TEST_USERS } from '../../data/testUsers';

test('should login', async ({ loginPage }) => {
    await loginPage.login(
        TEST_USERS.VALID_USER.email,
        TEST_USERS.VALID_USER.password
    );
});
```

### Data-Driven Tests

```typescript
const invalidEmails = [
    { email: 'invalid', expected: 'Invalid email format' },
    { email: '@test.com', expected: 'Invalid email format' },
    { email: 'test@', expected: 'Invalid email format' },
    { email: '', expected: 'Email is required' },
];

for (const { email, expected } of invalidEmails) {
    test(`should show error for email: "${email}"`, async ({ loginPage }) => {
        await loginPage.fillEmail(email);
        await loginPage.submit();
        expect(await loginPage.getErrorMessage()).toContain(expected);
    });
}
```

---

## 🎯 Assertions

### Playwright Expect

```typescript
// ✅ Element visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();
await expect(element).toBeAttached();

// ✅ Element state
await expect(element).toBeEnabled();
await expect(element).toBeDisabled();
await expect(element).toBeChecked();

// ✅ Text content
await expect(element).toHaveText('Expected text');
await expect(element).toContainText('partial text');
await expect(element).toHaveText(/regex pattern/);

// ✅ Attributes
await expect(element).toHaveAttribute('href', '/path');
await expect(element).toHaveClass('active');
await expect(element).toHaveId('my-id');

// ✅ Page state
await expect(page).toHaveURL('/expected-path');
await expect(page).toHaveTitle('Expected Title');

// ✅ Count
await expect(page.getByRole('button')).toHaveCount(3);
```

---

## 🔧 Debugging Tips

### Run Tests in Headed Mode
```bash
npm run test:headed
# or
npx playwright test --headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
# or
npx playwright test --debug
```

### Use Playwright Inspector
```typescript
test('debug this test', async ({ page }) => {
    await page.pause(); // Pauses test and opens inspector
    // ... rest of test
});
```

### View Test Report
```bash
npm run show
# or
npx playwright show-report
```

### Generate Code
```bash
npx playwright codegen https://your-url.com
```

---

## 🚫 Common Anti-Patterns to Avoid

### 1. ❌ Assertions in Page Objects
```typescript
// ❌ BAD
class LoginPage {
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await expect(this.page).toHaveURL('/dashboard'); // ❌ Assertion in PO
    }
}

// ✅ GOOD
class LoginPage {
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}

// In test:
test('should login', async ({ loginPage, page }) => {
    await loginPage.login('email', 'pass');
    await expect(page).toHaveURL('/dashboard'); // ✅ Assertion in test
});
```

### 2. ❌ Hard-Coded Waits
```typescript
// ❌ BAD
await page.waitForTimeout(3000);

// ✅ GOOD
await expect(element).toBeVisible();
```

### 3. ❌ Accessing Locators in Tests
```typescript
// ❌ BAD
test('test', async ({ page }) => {
    await page.getByLabel('Email').fill('test@test.com'); // ❌ Direct locator
});

// ✅ GOOD
test('test', async ({ loginPage }) => {
    await loginPage.fillEmail('test@test.com'); // ✅ Through page object
});
```

### 4. ❌ Dependent Tests
```typescript
// ❌ BAD
test('create user', async () => {
    // Creates user with ID 123
});

test('update user', async () => {
    // Assumes user 123 exists from previous test
});

// ✅ GOOD
test('update user', async () => {
    // Create user first
    // Then update it
    // Test is independent
});
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Allure Reporting](https://docs.qameta.io/allure/)

---

*Last updated: 2025-11-11*
