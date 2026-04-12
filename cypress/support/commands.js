// cypress/support/commands.js
// Custom Cypress commands used across the framework

/**
 * cy.loginViaAPI()
 * Logs in by directly visiting the login page (faster than UI login for Background steps).
 */
Cypress.Commands.add("loginViaAPI", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/login");
      cy.get("input[data-qa='login-email']").type(email);
      cy.get("input[data-qa='login-password']").type(password);
      cy.get("button[data-qa='login-button']").click();
      cy.url().should("not.include", "/login");
      cy.get("a:contains('Logged in as')").should("be.visible");
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});

/**
 * cy.addProductToCartById(index)
 * Adds a product by its index on the products page.
 */
Cypress.Commands.add("addProductToCartById", (index = 0) => {
  cy.visit("/products");
  cy.get(".product-image-wrapper").eq(index).trigger("mouseover");
  cy.get(".product-image-wrapper")
    .eq(index)
    .find(".add-to-cart")
    .first()
    .click({ force: true });
  cy.get("#cartModal").should("be.visible");
  cy.get("button.close-modal, button:contains('Continue Shopping')")
    .first()
    .click();
});

/**
 * cy.dismissAdOverlays()
 * Hides ad iframes that can block clicks on automationexercise.com
 */
Cypress.Commands.add("dismissAdOverlays", () => {
  cy.get("body").then(($body) => {
    if ($body.find("iframe[id^='aswift']").length) {
      cy.get("iframe[id^='aswift']").invoke("css", "display", "none");
    }
    if ($body.find("div[id='ad_iframe']").length) {
      cy.get("div[id='ad_iframe']").invoke("css", "display", "none");
    }
  });
});
