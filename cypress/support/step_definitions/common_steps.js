const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../pages/HomePage");
const signupLoginPage = require("../pages/SignupLoginPage");
const productsPage = require("../pages/ProductsPage");
const cartPage = require("../pages/CartPage");

// ── Shared / Background steps ─────────────────────────────────────────────────

Given("I am on the AutomationExercise home page", () => {
  homePage.visit();
});

Given("I am logged in as a registered user", () => {
  cy.fixture("testData").then((data) => {
    homePage.navigateToSignupLogin();
    signupLoginPage.login(data.existingUser.email, data.existingUser.password);
    homePage.isLoggedIn();
  });
});

Given("I am not logged in", () => {
  // Ensure no active session
  cy.clearCookies();
  cy.clearLocalStorage();
  homePage.visit();
});

Given("I have at least one product in my cart", () => {
  homePage.navigateToProducts();
  productsPage.addFirstProductToCart();
  productsPage.continueShopping();
});

Given("I have at least one product in my cart as a guest", () => {
  homePage.navigateToProducts();
  productsPage.addFirstProductToCart();
  productsPage.continueShopping();
});

// ── Navigation steps ──────────────────────────────────────────────────────────

When("I navigate to the login page", () => {
  homePage.navigateToSignupLogin();
});

When("I navigate to the Products page", () => {
  homePage.navigateToProducts();
});

When("I navigate to the cart page", () => {
  homePage.navigateToCart();
});
