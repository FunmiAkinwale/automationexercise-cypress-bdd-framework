const BasePage = require("./BasePage");

/**
 * HomePage
 * Represents the landing page of automationexercise.com
 */
class HomePage extends BasePage {
  // Selectors
  get logo() { return ".logo.pull-left"; }
  get navSignupLogin() { return "a[href='/login']"; }
  get navCart() { return "a[href='/view_cart']"; }
  get navLogout() { return "a[href='/logout']"; }
  get navDeleteAccount() { return "a[href='/delete_account']"; }
  get loggedInAsText() { return "a:contains('Logged in as')"; }
  get productsNav() { return "a[href='/products']"; }
  get homeSlider() { return "#slider"; }

  visit() {
    super.visit("/");
    // Wait for the page to be interactive
    cy.get(this.logo).should("be.visible");
  }

  navigateToSignupLogin() {
    this.clickElement(this.navSignupLogin);
    this.waitForUrl("/login");
  }

  navigateToProducts() {
    this.clickElement(this.productsNav);
    this.waitForUrl("/products");
  }

  navigateToCart() {
    this.clickElement(this.navCart);
    this.waitForUrl("/view_cart");
  }

  logout() {
    this.clickElement(this.navLogout);
    this.waitForUrl("/login");
  }

  deleteAccount() {
    this.clickElement(this.navDeleteAccount);
    this.waitForUrl("/delete_account");
  }

  isLoggedIn() {
    return cy.get(this.loggedInAsText).should("be.visible");
  }

  getLoggedInUsername() {
    return cy.get(this.loggedInAsText).invoke("text");
  }
}

module.exports = new HomePage();
