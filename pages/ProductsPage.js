const { BasePage } = require('./BasePage');
const locators = require('../locators/productsLocators');

/**
 * ProductsPage
 * Encapsulates all interactions with the SauceDemo Products/Inventory page
 * (https://www.saucedemo.com/inventory.html).
 */
class ProductsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.pageTitle = page.locator(locators.pageTitle);
    this.inventoryList = page.locator(locators.inventoryList);
    this.inventoryItem = page.locator(locators.inventoryItem);
    this.sortDropdown = page.locator(locators.sortDropdown);
    this.cartIcon = page.locator(locators.cartIcon);
    this.cartBadge = page.locator(locators.cartBadge);
    this.menuButton = page.locator(locators.menuButton);
    this.closeMenuButton = page.locator(locators.closeMenuButton);
    this.logoutLink = page.locator(locators.logoutLink);
  }

  /**
   * Convert a human-readable product name into the slug used in
   * SauceDemo's data-test attributes, e.g.
   * "Sauce Labs Backpack" -> "sauce-labs-backpack".
   * @param {string} productName
   * @returns {string}
   */
  static toSlug(productName) {
    return productName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  /** Whether the Products page has loaded (title + inventory visible). */
  async isLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
    return (await this.pageTitle.textContent())?.trim() === 'Products'
      && (await this.inventoryList.isVisible());
  }

  /** Get the count of products currently rendered on the page. */
  async getProductCount() {
    return this.inventoryItem.count();
  }

  /** Get the list of all product names currently displayed. */
  async getProductNames() {
    return this.page.locator(locators.inventoryItemName).allTextContents();
  }

  /**
   * Add a product to the cart by its display name.
   * @param {string} productName e.g. "Sauce Labs Backpack"
   */
  async addProductToCart(productName) {
    const slug = ProductsPage.toSlug(productName);
    const button = this.page.locator(locators.addToCartButtonByName(slug));
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  /**
   * Remove a product from the cart directly from the Products page.
   * @param {string} productName e.g. "Sauce Labs Backpack"
   */
  async removeProductFromCart(productName) {
    const slug = ProductsPage.toSlug(productName);
    const button = this.page.locator(locators.removeButtonByName(slug));
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  /**
   * Add multiple products to the cart in one call.
   * @param {string[]} productNames
   */
  async addMultipleProductsToCart(productNames) {
    for (const name of productNames) {
      await this.addProductToCart(name);
    }
  }

  /**
   * Get the current cart badge count as a number (0 if badge not shown).
   * @returns {Promise<number>}
   */
  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return Number(text?.trim() ?? '0');
    }
    return 0;
  }

  /** Navigate to the Cart page via the cart icon. */
  async openCart() {
    await this.cartIcon.click();
  }

  /**
   * Sort products using the dropdown.
   * @param {'az'|'za'|'lohi'|'hilo'} option
   */
  async sortProductsBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  /** Open the hamburger side menu. */
  async openMenu() {
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  /** Open the side menu and click Logout. */
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}

module.exports = { ProductsPage };
