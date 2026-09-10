const { BasePage } = require('./BasePage');
const { ProductsPage } = require('./ProductsPage');
const locators = require('../locators/cartLocators');

/**
 * CartPage
 * Encapsulates all interactions with the SauceDemo Cart page
 * (https://www.saucedemo.com/cart.html).
 */
class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.cartList = page.locator(locators.cartList);
    this.cartItem = page.locator(locators.cartItem);
    this.cartItemName = page.locator(locators.cartItemName);
    this.continueShoppingButton = page.locator(locators.continueShoppingButton);
    this.checkoutButton = page.locator(locators.checkoutButton);
  }

  /** Get the count of line items currently in the cart. */
  async getCartItemCount() {
    return this.cartItem.count();
  }

  /** Get the list of product names currently in the cart. */
  async getCartItemNames() {
    return this.cartItemName.allTextContents();
  }

  /**
   * Remove a specific item from the cart by its display name.
   * @param {string} productName
   */
  async removeItem(productName) {
    const slug = ProductsPage.toSlug(productName);
    const button = this.page.locator(locators.removeButtonByName(slug));
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  /** Navigate back to the Products page. */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /** Proceed to the Checkout: Your Information step. */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
