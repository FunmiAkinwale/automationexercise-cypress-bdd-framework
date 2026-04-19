const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const cartPage = require("../pages/CartPage");
const checkoutPage = require("../pages/CheckoutPage");

// ── Proceed to checkout ───────────────────────────────────────────────────────
When("I click Proceed to Checkout from the cart", () => {
  cy.visit("/view_cart");
  checkoutPage.clickProceedToCheckout();
});

When("I proceed to checkout", () => {
  cartPage.proceedToCheckout();
});

When("I proceed to checkout as a guest", () => {
  cartPage.proceedToCheckout();
});

// ── Checkout page assertions ──────────────────────────────────────────────────

Then("I should be on the one step checkout page", () => {
  cy.url().should("include", "onestepcheckout");
});

Then("I should see the order summary with items", () => {
  checkoutPage.verifyOrderSummaryHasItems();
});

Then("I should see my delivery address details", () => {
  cy.fixture("testData").then((data) => {
    checkoutPage.verifyDeliveryAddress(data.newUser.firstName);
  });
});

Then("I should see the order summary", () => {
  checkoutPage.verifyOrderSummaryHasItems();
});

// ── Filling in checkout form ──────────────────────────────────────────────────

When("I fill in the shipping address details", () => {
  cy.fixture("testData").then((data) => {
    checkoutPage.fillShippingAddress(data.newUser);
  });
});

When("I select a shipping method", () => {
  checkoutPage.selectShippingMethod();
});

When("I select a payment method", () => {
  checkoutPage.selectPaymentMethod();
});

When("I add a checkout comment {string}", (comment) => {
  checkoutPage.addOrderComment(comment);
});

When("I add a comment {string}", (comment) => {
  checkoutPage.addOrderComment(comment);
});

When("I fill in valid payment details", () => {
  cy.fixture("testData").then((data) => {
    checkoutPage.fillPaymentDetails(data.payment);
  });
});

When("I confirm the payment", () => {
  checkoutPage.confirmPayment();
});

// ── Place order ───────────────────────────────────────────────────────────────

When("I place the order", () => {
  checkoutPage.placeOrder();
});

When("I click Place Order", () => {
  checkoutPage.placeOrder();
});

// ── Order success ─────────────────────────────────────────────────────────────

Then("my order should be completed successfully", () => {
  checkoutPage.verifyOrderSuccess();
});

Then("my order should be placed successfully", () => {
  checkoutPage.verifyOrderSuccess();
});

// ── Guest checkout ────────────────────────────────────────────────────────────

Then("I should be prompted to login or register", () => {
  cy.get(
    "p:contains('Register / Login account'), u:contains('Register / Login'), .login-container, #customer-email"
  ).should("be.visible");
});
