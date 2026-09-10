const { test, expect } = require('../fixtures/pageFixtures');
const users = require('../test-data/users.json');

/**
 * Login scenarios
 * Covers TC_LOGIN_01 (Valid Login) and TC_LOGIN_03 (Invalid Login)
 * from the manual test case suite.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('Scenario 1: Valid Login - standard_user logs in successfully', async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    await productsPage.waitForUrl(/inventory\.html/);
    expect(await productsPage.isLoaded()).toBe(true);
    await expect(productsPage.pageTitle).toHaveText('Products');
  });

  test('Scenario 2: Invalid Login - incorrect credentials are rejected', async ({
    loginPage,
  }) => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    expect(await loginPage.isErrorDisplayed()).toBe(true);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match any user in this service');

    // User should remain on the Login page (no navigation occurred).
    expect(await loginPage.isLoginFormDisplayed()).toBe(true);
  });

  test('Login - locked out user is rejected with lockout message', async ({ loginPage }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Sorry, this user has been locked out');
  });
});
