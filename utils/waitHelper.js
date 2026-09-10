/**
 * waitHelper.js
 * Reusable explicit-wait helpers built on top of Playwright's
 * auto-waiting locators. Use these where a plain click/fill is not
 * enough to guarantee element readiness (e.g. dynamic badges,
 * navigation-triggered content, animations).
 */

const DEFAULT_TIMEOUT = 10000;

/**
 * Wait until the given locator is visible on the page.
 * @param {import('@playwright/test').Locator} locator
 * @param {number} timeout
 */
async function waitForVisible(locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
}

/**
 * Wait until the given locator is detached/hidden from the DOM.
 * @param {import('@playwright/test').Locator} locator
 * @param {number} timeout
 */
async function waitForHidden(locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'hidden', timeout });
}

/**
 * Wait for the page URL to contain a given substring (useful after
 * navigation-triggering actions like Login / Checkout / Logout).
 * @param {import('@playwright/test').Page} page
 * @param {string|RegExp} urlPart
 * @param {number} timeout
 */
async function waitForUrlContains(page, urlPart, timeout = DEFAULT_TIMEOUT) {
  await page.waitForURL(urlPart, { timeout });
}

/**
 * Wait until a locator's text content contains the expected substring.
 * Uses Playwright's built-in polling assertion under the hood.
 * @param {import('@playwright/test').Locator} locator
 * @param {string} expectedText
 * @param {number} timeout
 */
async function waitForTextContains(locator, expectedText, timeout = DEFAULT_TIMEOUT) {
  const { expect } = require('@playwright/test');
  await expect(locator).toContainText(expectedText, { timeout });
}

module.exports = {
  DEFAULT_TIMEOUT,
  waitForVisible,
  waitForHidden,
  waitForUrlContains,
  waitForTextContains,
};
