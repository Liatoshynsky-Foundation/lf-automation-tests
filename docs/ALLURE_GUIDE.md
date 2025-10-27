# Allure Reporting Guide

## Overview
This project uses Allure Framework for generating beautiful and comprehensive test reports. Allure provides detailed insights into test execution, including test steps, attachments, categorization, and historical trends.

## Basic Usage

### Running Tests and Generating Reports

1. Run your tests normally:
   ```bash
   npm test
   # or
   npm run test:ui
   npm run test:api
   ```

2. After tests complete, generate and view the Allure report:
   ```bash
   npm run allure:serve
   ```
   
   Or generate and open separately:
   ```bash
   npm run allure:generate
   npm run allure:open
   ```

## Enhancing Tests with Allure Annotations

You can add rich metadata to your tests using Allure annotations. See `tests/allure-demo.spec.ts` for examples.

### Available Annotations

```typescript
import { allure } from 'allure-playwright';

test('Example test', async ({ page }) => {
  // Organize tests hierarchically
  await allure.epic('Epic Name');          // High-level feature
  await allure.feature('Feature Name');    // Specific feature
  await allure.story('User Story');        // User story or scenario
  
  // Add metadata
  await allure.owner('Team/Person');       // Test owner
  await allure.tag('tag-name');            // Add tags for filtering
  await allure.severity('critical');       // Set severity level
  
  // Add test steps for better readability
  await allure.step('Step description', async () => {
    // Your test code here
  });
  
  // Attach data to the report
  await allure.attachment('Name', 'content', 'text/plain');
});
```

### Severity Levels
- `blocker` - Critical functionality is broken
- `critical` - Critical functionality has defects
- `normal` - Normal priority (default)
- `minor` - Minor defects
- `trivial` - Trivial defects

### Step Annotations

Steps help organize test actions and make reports more readable:

```typescript
await allure.step('Navigate to login page', async () => {
  await page.goto('/login');
});

await allure.step('Enter credentials', async () => {
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password');
});

await allure.step('Submit form', async () => {
  await page.click('button[type="submit"]');
});
```

### Attachments

Add screenshots, logs, or other data to your reports:

```typescript
// Text attachment
await allure.attachment('Debug Info', JSON.stringify(data), 'application/json');

// Screenshot (Playwright automatically attaches on failure)
const screenshot = await page.screenshot();
await allure.attachment('Screenshot', screenshot, 'image/png');
```

## Report Features

Allure reports include:

1. **Overview Dashboard**
   - Test execution statistics
   - Success rate
   - Duration trends
   - Environment information

2. **Test Details**
   - Step-by-step execution
   - Screenshots and attachments
   - Error messages and stack traces
   - Execution time

3. **Categorization**
   - Filter by feature, story, tag
   - Group by severity
   - Search capabilities

4. **Historical Trends**
   - Track test stability over time
   - Identify flaky tests
   - Monitor performance changes

## CI/CD Integration

The GitHub Actions workflow automatically:
1. Runs tests
2. Generates Allure report
3. Uploads report as an artifact

Download the `allure-report` artifact from the Actions tab to view results.

## Troubleshooting

### Report not generating
- Ensure tests have run at least once to create `allure-results/` folder
- Check that `allure-results/` contains JSON files

### Missing test details
- Add `allure.step()` calls to break down test actions
- Use annotations to provide metadata

### Reports in version control
- Don't commit `allure-results/` or `allure-report/` directories
- These are excluded in `.gitignore`

## Additional Resources

- [Allure Framework Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Integration](https://www.npmjs.com/package/allure-playwright)
- [Playwright Documentation](https://playwright.dev/)
