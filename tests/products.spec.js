const { test, expect } = require('../fixtures/pageFixtures');
const users = require('../test-data/users.json');

/**
 * Products Page scenarios
 * Covers TC_PROD_01 (Verify Products Page) from the manual test case suite.
 */
test.describe('Products Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('Scenario 3: Verify Products Page loads with all products after login', async ({
    productsPage,
  }) => {
    expect(await productsPage.isLoaded()).toBe(true);

    const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(6);

    const productNames = await productsPage.getProductNames();
    expect(productNames).toEqual(
      expect.arrayContaining([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt Red',
      ])
    );
  });

  test('Products Page - sorting by Price (low to high) re-orders items correctly', async ({
    productsPage,
  }) => {
    await productsPage.sortProductsBy('lohi');

    const prices = await productsPage.page
      .locator('.inventory_item_price')
      .allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace('$', '')));
    const sorted = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sorted);
  });
});
