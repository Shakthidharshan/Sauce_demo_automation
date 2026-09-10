const { BasePage } = require('./BasePage');
const locators = require('../locators/checkoutLocators');

/**
 * CheckoutPage
 * Encapsulates all interactions across the SauceDemo checkout flow:
 * Step One (Your Information), Step Two (Overview), and Complete.
 */
class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Step One
    this.firstNameInput = page.locator(locators.firstNameInput);
    this.lastNameInput = page.locator(locators.lastNameInput);
    this.postalCodeInput = page.locator(locators.postalCodeInput);
    this.continueButton = page.locator(locators.continueButton);
    this.cancelButton = page.locator(locators.cancelButton);
    this.errorMessage = page.locator(locators.errorMessage);

    // Step Two
    this.itemTotalLabel = page.locator(locators.itemTotalLabel);
    this.taxLabel = page.locator(locators.taxLabel);
    this.totalLabel = page.locator(locators.totalLabel);
    this.finishButton = page.locator(locators.finishButton);

    // Complete
    this.completeHeader = page.locator(locators.completeHeader);
    this.completeText = page.locator(locators.completeText);
    this.backHomeButton = page.locator(locators.backHomeButton);
  }

  /**
   * Fill in Step One (Your Information) form fields.
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /** Click Continue on Step One to advance to the Overview page. */
  async clickContinue() {
    await this.continueButton.click();
  }

  /** Click Cancel (valid on both Step One and Step Two). */
  async clickCancel() {
    await this.cancelButton.click();
  }

  /**
   * Get the validation error message text shown on Step One.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  /** Get the Item total value shown on the Overview page. */
  async getItemTotalText() {
    return (await this.itemTotalLabel.textContent())?.trim() ?? '';
  }

  /** Get the Tax value shown on the Overview page. */
  async getTaxText() {
    return (await this.taxLabel.textContent())?.trim() ?? '';
  }

  /** Get the Total value shown on the Overview page. */
  async getTotalText() {
    return (await this.totalLabel.textContent())?.trim() ?? '';
  }

  /** Click Finish on the Overview page to place the order. */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Get the confirmation header text on the Complete page
   * (expected: "Thank you for your order!").
   * @returns {Promise<string>}
   */
  async getConfirmationHeader() {
    await this.completeHeader.waitFor({ state: 'visible' });
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  /** Get the confirmation body text on the Complete page. */
  async getConfirmationText() {
    return (await this.completeText.textContent())?.trim() ?? '';
  }

  /** Click "Back Home" on the Complete page to return to Products. */
  async clickBackHome() {
    await this.backHomeButton.click();
  }

  /**
   * Convenience method that runs the full Step One -> Step Two -> Finish
   * flow in a single call, for tests that only care about the end state.
   * @param {{firstName: string, lastName: string, postalCode: string}} info
   */
  async completeCheckout(info) {
    await this.fillInformation(info.firstName, info.lastName, info.postalCode);
    await this.clickContinue();
    await this.clickFinish();
  }
}

module.exports = { CheckoutPage };
