import { test, expect } from '../fixtures/fixturePage';

test.describe('UI - Home page', () => {
  test('Home page shows expected heading (using POM)', async ({ aboutUsPage }) => {
    await aboutUsPage.goto('/');
    const title = await aboutUsPage.getTitleText();
    // If tests point at example.com assert the known Example Domain heading.
    expect(title).toEqual('Фундація Лятошинського');
  });
  test("test", async ({ aboutUsPage,  archiveCabinetPage}) => {
    // await aboutUsPage.goto('/about');
    await archiveCabinetPage.goto('/archive-cabinet');
    const title2 = await archiveCabinetPage.getTitleText();
    expect(title2).toEqual('Create Next App');
    const btnText = await archiveCabinetPage.getTextReturnToHomeBtn();
    expect(btnText).toEqual('Return to home');
    await archiveCabinetPage.clickReturnToHome();
    const title3 = await aboutUsPage.getTitleText();
    expect(title3).toEqual('Фундація Лятошинського');
  })
});
