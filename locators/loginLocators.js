/**
 * loginLocators.js
 * Centralized selectors for the SauceDemo Login page.
 * Kept separate from the Page Object so selectors can be reused/updated
 * in a single place without touching page logic.
 */
module.exports = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]',
  errorCloseButton: '.error-button',
};
