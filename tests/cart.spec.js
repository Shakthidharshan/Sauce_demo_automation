const { test, expect } = require('../fixtures/pageFixtures');
const users = require('../test-data/users.json');
const products = require('../test-data/products.json');

/**
 * Cart scenarios
 * Covers TC_PROD_07 / TC_CART_01 (Add Two Products to Cart) and
 * TC_CART_02 (Remove One Product from Cart) from the manual test case suite.
 */
test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('Scenario 4: Add two products to the cart', async ({ productsPage, cartPage }) => {
    const [productOne, productTwo] = products.twoProductsForCart;

    await productsPage.addMultipleProductsToCart([productOne, productTwo]);
    expect(await productsPage.getCartBadgeCount()).toBe(2);

    await productsPage.openCart();
    expect(await cartPage.getCartItemCount()).toBe(2);

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toEqual(expect.arrayContaining([productOne, productTwo]));
  });

  test('Scenario 5: Remove one product from the cart', async ({ productsPage, cartPage }) => {
    const [productOne, productTwo] = products.twoProductsForCart;
    const productToRemove = products.singleProductForRemoval;

    await productsPage.addMultipleProductsToCart([productOne, productTwo]);
    await productsPage.openCart();
    expect(await cartPage.getCartItemCount()).toBe(2);

    await cartPage.removeItem(productToRemove);

    expect(await cartPage.getCartItemCount()).toBe(1);
    const remainingItems = await cartPage.getCartItemNames();
    expect(remainingItems).not.toContain(productToRemove);
  });

  test('Cart - Continue Shopping returns to the Products page', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.addProductToCart(products.checkoutProduct);
    await productsPage.openCart();

    await cartPage.continueShopping();

    await productsPage.waitForUrl(/inventory\.html/);
    expect(await productsPage.isLoaded()).toBe(true);
  });
});
