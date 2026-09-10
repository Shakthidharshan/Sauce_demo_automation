const { test, expect } = require('../fixtures/pageFixtures');
const users = require('../test-data/users.json');
const checkoutData = require('../test-data/checkoutData.json');
const products = require('../test-data/products.json');

/**
 * Checkout scenarios
 * Covers TC_CHK_01 (Complete Checkout) and TC_CHK_09 (Verify Order
 * Confirmation) from the manual test case suite.
 */
test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await productsPage.addProductToCart(products.checkoutProduct);
    await productsPage.openCart();
  });

  test('Scenario 6: Complete checkout with valid customer information', async ({
    cartPage,
    checkoutPage,
  }) => {
    const { firstName, lastName, postalCode } = checkoutData.validCustomer;

    await cartPage.proceedToCheckout();
    await checkoutPage.waitForUrl(/checkout-step-one\.html/);

    await checkoutPage.fillInformation(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    await checkoutPage.waitForUrl(/checkout-step-two\.html/);
    // Sanity-check the order summary reflects the item that was added.
    const totalText = await checkoutPage.getTotalText();
    expect(totalText).toMatch(/Total: \$\d+\.\d{2}/);

    await checkoutPage.clickFinish();
    await checkoutPage.waitForUrl(/checkout-complete\.html/);
  });

  test('Scenario 7: Verify order confirmation is displayed after checkout', async ({
    cartPage,
    checkoutPage,
  }) => {
    const { firstName, lastName, postalCode } = checkoutData.validCustomer;

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    await checkoutPage.waitForUrl(/checkout-complete\.html/);

    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');

    const bodyText = await checkoutPage.getConfirmationText();
    expect(bodyText).toContain('Your order has been dispatched');

    await expect(checkoutPage.backHomeButton).toBeVisible();
  });

  test('Checkout - validation error is shown when First Name is missing', async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInformation('', 'Doe', '12345');
    await checkoutPage.clickContinue();

    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain('First Name is required');
  });
});
