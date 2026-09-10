const { waitForVisible, waitForUrlContains } = require('../utils/waitHelper');

/**
 * BasePage
 * Common functionality shared by every Page Object:
 * navigation, explicit waits, and generic element interactions.
 * All concrete page objects extend this class.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a relative or absolute URL.
   * @param {string} url
   */
  async goto(url = '/') {
    await this.page.goto(url);
  }

  /**
   * Click an element after explicitly waiting for it to be visible.
   * @param {string} selector
   */
  async click(selector) {
    const locator = this.page.locator(selector);
    await waitForVisible(locator);
    await locator.click();
  }

  /**
   * Fill a text field after explicitly waiting for it to be visible.
   * @param {string} selector
   * @param {string} value
   */
  async fill(selector, value) {
    const locator = this.page.locator(selector);
    await waitForVisible(locator);
    await locator.fill(value);
  }

  /**
   * Get trimmed text content of an element, waiting for visibility first.
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    const locator = this.page.locator(selector);
    await waitForVisible(locator);
    return (await locator.textContent())?.trim() ?? '';
  }

  /**
   * Whether an element is currently visible on the page.
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    return this.page.locator(selector).isVisible();
  }

  /**
   * Wait until the current URL contains the given substring/pattern.
   * @param {string|RegExp} urlPart
   */
  async waitForUrl(urlPart) {
    await waitForUrlContains(this.page, urlPart);
  }

  /**
   * Current page title (per the <title> tag).
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return this.page.title();
  }
}

module.exports = { BasePage };
