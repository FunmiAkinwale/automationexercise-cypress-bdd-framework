const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const cartPage = require("../pages/CartPage");
const checkoutPage = require("../pages/CheckoutPage");

When("I click Proceed to Checkout from the cart", () => {
  cartPage.proceedToCheckout();
});

When("I proceed to checkout", () => {
  cartPage.proceedToCheckout();
});

Then("I should be on the checkout review page", () => {
  cy.url().should("include", "/checkout");
});

Then("I should see the order summary with items", () => {
  checkoutPage.verifyOrderItems();
});

Then("I should see my delivery address details", () => {
  cy.get(checkoutPage.deliveryAddressSection).should("be.visible");
  cy.get(checkoutPage.billingAddressSection).should("be.visible");
});

When("I add a checkout comment {string}", (comment) => {
  checkoutPage.addOrderComment(comment);
});

When("I add a comment {string}", (comment) => {
  checkoutPage.addOrderComment(comment);
});

When("I place the order", () => {
  checkoutPage.clickPlaceOrder();
});

When("I enter valid payment details", () => {
  cy.fixture("testData").then((data) => {
    checkoutPage.fillPaymentDetails(data.payment);
    checkoutPage.confirmPayment();
  });
});

Then("my order should be completed successfully", () => {
  checkoutPage.verifyOrderSuccess();
});

Then("my order should be placed successfully", () => {
  checkoutPage.verifyOrderSuccess();
});
