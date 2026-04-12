/**
 * BasePage
 * Shared utilities inherited by all Page Object classes.
 */
class BasePage {
  visit(path = "/") {
    cy.visit(path);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    cy.get(selector).should("be.visible").click();
  }

  typeText(selector, text) {
    cy.get(selector).should("be.visible").clear().type(text);
  }

  selectDropdown(selector, value) {
    cy.get(selector).select(value);
  }

  getText(selector) {
    return cy.get(selector).invoke("text");
  }

  isVisible(selector) {
    return cy.get(selector).should("be.visible");
  }

  waitForUrl(urlPart) {
    cy.url().should("include", urlPart);
  }

  scrollToElement(selector) {
    cy.get(selector).scrollIntoView();
  }

  dismissAds() {
    // Handle common ad iframes / overlays on the site
    cy.get("body").then(($body) => {
      if ($body.find("iframe[id^='aswift']").length) {
        cy.get("iframe[id^='aswift']").each(($iframe) => {
          cy.wrap($iframe).invoke("css", "display", "none");
        });
      }
    });
  }
}

module.exports = BasePage;
