# SauceDemo Playwright Automation Suite

Playwright (JavaScript) end-to-end automation for
[https://www.saucedemo.com/](https://www.saucedemo.com/),

## Mandatory Automated Scenarios

| # | Scenario                         | Spec file                  |
|---|-----------------------------------|-----------------------------|
| 1 | Valid Login                       | `tests/login.spec.js`       |
| 2 | Invalid Login                     | `tests/login.spec.js`       |
| 3 | Verify Products Page              | `tests/products.spec.js`    |
| 4 | Add Two Products to Cart          | `tests/cart.spec.js`        |
| 5 | Remove One Product from Cart      | `tests/cart.spec.js`        |
| 6 | Complete Checkout                 | `tests/checkout.spec.js`    |
| 7 | Verify Order Confirmation         | `tests/checkout.spec.js`    |
| 8 | Logout                            | `tests/logout.spec.js`      |

A few additional supporting tests (e.g. locked-out login, sort validation,
checkout field validation) are included alongside the mandatory scenarios
to demonstrate broader coverage from the manual suite.

## Project Structure

```
project/
├── tests/                 # Spec files - one per module, assertions live here
│   ├── login.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   └── logout.spec.js
├── pages/                  # Page Object Model classes (reusable methods)
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── locators/                # Selectors only, decoupled from page logic
│   ├── loginLocators.js
│   ├── productsLocators.js
│   ├── cartLocators.js
│   └── checkoutLocators.js
├── fixtures/                # Custom Playwright test fixtures (POM injection)
│   └── pageFixtures.js
├── utils/                   # Generic reusable helpers
│   ├── waitHelper.js         # explicit-wait wrappers
│   └── screenshotHelper.js   # named screenshot capture
├── test-data/                # Test data, separated from test logic
│   ├── users.json
│   ├── checkoutData.json
│   └── products.json
├── reports/                  # HTML/JSON reports generated on `npm test`
├── screenshots/               # Auto-captured failure screenshots
├── playwright.config.js
├── package.json
└── README.md
```

### Why this structure?

- **`locators/`** is kept separate from `pages/` so selector changes never
  require touching business logic, and selectors can be reused if needed.
- **`pages/`** implements the Page Object Model: each class exposes
  intention-revealing methods (`login()`, `addProductToCart()`,
  `completeCheckout()`) instead of exposing raw locators to tests.
- **`fixtures/`** wires Page Objects into Playwright's `test` via
  `test.extend`, so every spec gets ready-to-use `loginPage`,
  `productsPage`, `cartPage`, `checkoutPage` fixtures with no manual
  instantiation, and gets automatic failure screenshots for free.
- **`test-data/`** externalizes credentials and checkout data as JSON so
  data changes don't require code changes and data can be swapped per
  environment.
- **`utils/`** holds cross-cutting helpers (explicit waits, screenshots)
  reused across every Page Object.
- **`reports/`** and **`screenshots/`** are output directories, gitignored
  by default (see `.gitignore`), populated on every test run.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
cd project
npm install
npx playwright install --with-deps
```

## Running Tests

```bash
# Run the full suite (all browsers defined in playwright.config.js)
npm test

# Run only in Chromium
npm run test:chromium

# Run a specific module
npm run test:login
npm run test:cart

# Run headed (visible browser) for debugging
npm run test:headed

# Step-through debug mode
npm run test:debug
```

## Reports & Artifacts

- HTML report: `reports/html-report/index.html` (open via `npm run report`)
- JSON results: `reports/test-results.json`
- Failure screenshots: `screenshots/` (auto-captured by `pageFixtures.js`)
- Traces/videos on failure: `reports/test-artifacts/` (configured via
  `trace: 'retain-on-failure'` and `video: 'retain-on-failure'` in
  `playwright.config.js`) — open a trace with:
  ```bash
  npx playwright show-trace reports/test-artifacts/<test-name>/trace.zip
  ```
