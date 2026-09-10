const { test, expect } = require('../fixtures/pageFixtures');
const users = require('../test-data/users.json');

/**
 * Logout scenarios
 * Covers TC_LOGOUT_01 (Logout) from the manual test case suite.
 */
test.describe('Logout', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('Scenario 8: User can log out successfully via the hamburger menu', async ({
    productsPage,
    loginPage,
  }) => {
    await productsPage.logout();

    await loginPage.waitForUrl('https://www.saucedemo.com/');
    expect(await loginPage.isLoginFormDisplayed()).toBe(true);
  });

  test('Logout - Products page is not accessible after logout via browser back', async ({
    page,
    productsPage,
    loginPage,
  }) => {
    await productsPage.logout();
    await page.goBack();

    // Application should not allow viewing cached inventory after logout.
    expect(await loginPage.isLoginFormDisplayed()).toBe(true);
  });
});
