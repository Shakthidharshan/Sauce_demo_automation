/**
 * productsLocators.js
 * Centralized selectors for the SauceDemo Products (Inventory) page.
 */
module.exports = {
  pageTitle: '.title',
  inventoryList: '.inventory_list',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  inventoryItemPrice: '.inventory_item_price',
  sortDropdown: '[data-test="product-sort-container"]',
  cartIcon: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  menuButton: '#react-burger-menu-btn',
  closeMenuButton: '#react-burger-cross-btn',
  logoutLink: '#logout_sidebar_link',
  inventoryContainer: '#inventory_container',

  /** Dynamic locator: "Add to cart" button for a product, by its data-test id fragment. */
  addToCartButtonByName: (productSlug) => `[data-test="add-to-cart-${productSlug}"]`,
  /** Dynamic locator: "Remove" button for a product, by its data-test id fragment. */
  removeButtonByName: (productSlug) => `[data-test="remove-${productSlug}"]`,
};
