const { BasePage } = require('./BasePage');
const locators = require('../locators/loginLocators');

/**
 * LoginPage
 * Encapsulates all interactions with the SauceDemo Login page
 * (https://www.saucedemo.com/).
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.usernameInput = page.locator(locators.usernameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.loginButton = page.locator(locators.loginButton);
    this.errorMessage = page.locator(locators.errorMessage);
  }

  /** Navigate directly to the base login URL. */
  async open() {
    await this.goto('/');
  }

  /**
   * Perform a login with the given credentials.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Read the inline error message text shown after a failed login attempt.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  /**
   * Whether the login error banner is currently displayed.
   * @returns {Promise<boolean>}
   */
  async isErrorDisplayed() {
    return this.errorMessage.isVisible();
  }

  /** Whether the login form (username/password/login button) is present. */
  async isLoginFormDisplayed() {
    return this.usernameInput.isVisible();
  }
}

module.exports = { LoginPage };
