/**
 * screenshotHelper.js
 * Reusable helper for capturing named screenshots into the
 * /screenshots directory, and for auto-capturing on test failure
 * (wired up in fixtures/pageFixtures.js).
 */

const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

/**
 * Capture a full-page screenshot with a descriptive, collision-safe name.
 * @param {import('@playwright/test').Page} page
 * @param {string} name - short, descriptive name, e.g. "login-success"
 * @returns {Promise<string>} the file path written
 */
async function captureScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${name}-${timestamp}.png`;
  const filePath = path.join(SCREENSHOTS_DIR, fileName);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

module.exports = {
  SCREENSHOTS_DIR,
  captureScreenshot,
};
