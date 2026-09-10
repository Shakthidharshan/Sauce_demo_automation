/**
 * cartLocators.js
 * Centralized selectors for the SauceDemo Cart page.
 */
module.exports = {
  cartList: '.cart_list',
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  cartItemPrice: '.inventory_item_price',
  cartQuantity: '.cart_quantity',
  continueShoppingButton: '#continue-shopping',
  checkoutButton: '#checkout',

  /** Dynamic locator: "Remove" button for a specific cart line item. */
  removeButtonByName: (productSlug) => `[data-test="remove-${productSlug}"]`,
};
