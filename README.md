# AutomationExercise — Cypress BDD Framework

A production-ready **Page Object Model (POM) + BDD (Cucumber/Gherkin)** test automation framework for [automationexercise.com](https://automationexercise.com), with a fully configured **GitHub Actions CI/CD pipeline**.

---

## 🗂 Project Structure

```
cypress-bdd-framework/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml        # GitHub Actions CI/CD pipeline
├── cypress/
│   ├── e2e/
│   │   └── features/                # BDD feature files (Gherkin)
│   │       ├── signup.feature
│   │       ├── login.feature
│   │       ├── addToCart.feature
│   │       └── checkout.feature
│   ├── fixtures/
│   │   └── testData.json            # Test data (users, payment, products)
│   └── support/
│       ├── pages/                   # Page Object Model classes
│       │   ├── BasePage.js          # Shared utilities
│       │   ├── HomePage.js
│       │   ├── SignupLoginPage.js
│       │   ├── ProductsPage.js
│       │   ├── CartPage.js
│       │   └── CheckoutPage.js
│       ├── step_definitions/        # Cucumber step implementations
│       │   ├── common_steps.js
│       │   ├── signup_steps.js
│       │   ├── login_steps.js
│       │   ├── cart_steps.js
│       │   └── checkout_steps.js
│       ├── commands.js              # Custom Cypress commands
│       ├── e2e.js                   # Global hooks & support entry point
│       └── generateReport.js        # HTML report generator
├── cypress.config.js                # Cypress + Cucumber configuration
├── cypress.env.json.example         # Environment variables template
└── package.json
```

---

## ✅ Test Coverage

| Feature         | Scenarios Covered                                              |
|-----------------|----------------------------------------------------------------|
| **Sign-up**     | Successful registration, duplicate email error                 |
| **Login**       | Valid credentials, invalid credentials, logout                 |
| **Add to Cart** | Add single product, search & add, add multiple products        |
| **Checkout**    | Full payment flow, address verification, guest checkout prompt |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- npm **9+**
- Chrome / Firefox browser (for headed runs)

### 1. Clone & Install

```bash
git clone https://github.com/<your-org>/cypress-bdd-framework.git
cd cypress-bdd-framework
npm install
```

### 2. Configure Credentials

```bash
cp cypress.env.json.example cypress.env.json
# Edit cypress.env.json with a real test account from automationexercise.com
```

> ⚠️ **Register a test account** at https://automationexercise.com first, then use those credentials in `cypress.env.json`.

---

## 🧪 Running Tests

### Open Cypress Test Runner (interactive)
```bash
npm run cy:open
```

### Run all tests headlessly
```bash
npm run cy:run
```

### Run with a specific browser
```bash
npm run cy:run:chrome
```

### Run a specific feature file
```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

### Run by tag (e.g. only @smoke tests)
```bash
npx cypress run --env TAGS=@smoke
```

### Run tests and generate HTML report
```bash
npm run test:report
```

---

## 🏗 Architecture

### Page Object Model (POM)

Each page of the application has a corresponding class in `cypress/support/pages/`:

- **`BasePage.js`** — Shared helper methods (`clickElement`, `typeText`, `waitForUrl`, etc.) inherited by all pages.
- **`HomePage.js`** — Navigation, login state checks, logout.
- **`SignupLoginPage.js`** — Registration form, login form, error messages.
- **`ProductsPage.js`** — Product search, add-to-cart modal, continue/view cart.
- **`CartPage.js`** — Cart item verification, proceed to checkout.
- **`CheckoutPage.js`** — Address verification, order summary, payment, order confirmation.

### BDD with Cucumber

Feature files in `cypress/e2e/features/` use **Gherkin syntax** (`Given / When / Then`). Step implementations live in `cypress/support/step_definitions/` and are logically separated by feature area.

```gherkin
Scenario: Successful login with valid credentials
  Given I am on the AutomationExercise home page
  When I navigate to the Sign Up / Login page
  And I login with valid email and password
  Then I should be logged in as "Auto Tester"
```

### Custom Commands

Reusable Cypress commands in `commands.js`:

| Command | Description |
|---|---|
| `cy.loginViaAPI(email, pass)` | Session-cached login (fast, reuses auth across specs) |
| `cy.addProductToCartById(index)` | Adds product by index; handles modal |
| `cy.dismissAdOverlays()` | Hides ad iframes that block clicks |

---

## ⚙️ CI/CD — GitHub Actions

The pipeline (`.github/workflows/cypress-tests.yml`) has **4 jobs**:

```
install → smoke-tests → regression (parallel matrix) → report
```

| Job | Description |
|---|---|
| `install` | Installs npm deps, caches Cypress binary |
| `smoke-tests` | Runs `@smoke` tagged scenarios first (fast feedback) |
| `regression` | Runs all 4 feature files **in parallel** using a matrix strategy |
| `report` | Merges cucumber JSON outputs, generates HTML report, publishes as artifact |

### Triggers

| Event | Behaviour |
|---|---|
| Push to `main` / `develop` | Full pipeline runs |
| Pull Request to `main` / `develop` | Full pipeline runs |
| Scheduled (daily 06:00 UTC) | Full regression suite |
| `workflow_dispatch` | Manual trigger with browser & tag selection |

### Setting up GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `CYPRESS_USER_EMAIL` | Your test account email |
| `CYPRESS_USER_PASSWORD` | Your test account password |

---

## 📊 Reports

After a CI run, download the **`cypress-bdd-html-report`** artifact from the GitHub Actions run. It contains a rich multi-feature HTML report with:

- Pass/fail counts per feature and scenario
- Step-level details
- Duration metrics
- Browser and platform metadata

---

## 🔧 Configuration Reference

Key settings in `cypress.config.js`:

| Setting | Value |
|---|---|
| `baseUrl` | `https://automationexercise.com` |
| `specPattern` | `cypress/e2e/features/**/*.feature` |
| `defaultCommandTimeout` | `10000ms` |
| `retries.runMode` | `2` (auto-retry flaky tests in CI) |
| `video` | `true` |
| `screenshotOnRunFailure` | `true` |

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/new-test-area`
2. Add your `.feature` file under `cypress/e2e/features/`
3. Add step definitions under `cypress/support/step_definitions/`
4. Add a Page Object under `cypress/support/pages/` if a new page is involved
5. Open a Pull Request — CI will run automatically
