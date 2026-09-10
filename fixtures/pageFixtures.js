const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { captureScreenshot } = require('../utils/screenshotHelper');

/**
 * pageFixtures.js
 * Extends Playwright's base `test` with ready-to-use Page Object
 * instances so spec files never have to instantiate them manually:
 *
 *   const { test, expect } = require('../fixtures/pageFixtures');
 *   test('...', async ({ loginPage, productsPage }) => { ... });
 *
 * Also auto-captures a screenshot into /screenshots whenever a test
 * fails, tagged with the test title, in addition to Playwright's own
 * built-in trace/screenshot/video artifacts configured in
 * playwright.config.js.
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const safeName = testInfo.title.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
    await captureScreenshot(page, `FAILED-${safeName}`);
  }
});

module.exports = { test, expect: base.expect };
