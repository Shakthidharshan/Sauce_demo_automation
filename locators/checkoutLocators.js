/**
 * checkoutLocators.js
 * Centralized selectors for the SauceDemo Checkout flow
 * (Step One - Your Information, Step Two - Overview, Complete).
 */
module.exports = {
  // Step One: Your Information
  firstNameInput: '#first-name',
  lastNameInput: '#last-name',
  postalCodeInput: '#postal-code',
  continueButton: '#continue',
  cancelButton: '#cancel',
  errorMessage: '[data-test="error"]',

  // Step Two: Overview
  cartItem: '.cart_item',
  itemTotalLabel: '.summary_subtotal_label',
  taxLabel: '.summary_tax_label',
  totalLabel: '.summary_total_label',
  finishButton: '#finish',

  // Step Three: Complete
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  ponyExpressImage: '.pony_express',
  backHomeButton: '#back-to-products',
};
