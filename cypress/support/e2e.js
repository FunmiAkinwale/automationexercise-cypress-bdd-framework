// cypress/support/e2e.js
// Entry point loaded before every spec file.

import "./commands";

// ── Global Hooks ─────────────────────────────────────────────────────────────

// Suppress uncaught exceptions thrown by third-party ad scripts on the site
Cypress.on("uncaught:exception", (err) => {
  // Returning false prevents Cypress from failing the test
  if (
    err.message.includes("Cannot read properties of undefined") ||
    err.message.includes("adsbygoogle") ||
    err.message.includes("googletag") ||
    err.message.includes("ResizeObserver loop")
  ) {
    return false;
  }
});

beforeEach(() => {
  // Hide cookie consent banners if present
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

afterEach(function () {
  // Take a screenshot on failure (Cypress does this automatically,
  // but this hook gives us a named screenshot)
  if (this.currentTest && this.currentTest.state === "failed") {
    const testTitle = this.currentTest.title.replace(/\s+/g, "_");
    cy.screenshot(`FAILED_${testTitle}`);
  }
});
