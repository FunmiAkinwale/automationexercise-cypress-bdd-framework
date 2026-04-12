const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const cartPage = require("../pages/CartPage");
const checkoutPage = require("../pages/CheckoutPage");

When("I proceed to checkout", () => {
  cartPage.proceedToCheckout();
});

When("I proceed to checkout as a guest", () => {
  cartPage.proceedToCheckout();
});

When("I add a comment {string}", (comment) => {
  checkoutPage.addOrderComment(comment);
});

When("I click Place Order", () => {
  checkoutPage.clickPlaceOrder();
});

When("I fill in valid payment details", () => {
  cy.fixture("testData").then((data) => {
    checkoutPage.fillPaymentDetails(data.payment);
  });
});

When("I confirm the payment", () => {
  checkoutPage.confirmPayment();
});

Then("I should see my delivery address details", () => {
  cy.fixture("testData").then((data) => {
    checkoutPage.verifyDeliveryAddress(data.newUser.firstName);
  });
});

Then("I should see the order summary", () => {
  checkoutPage.verifyOrderItems();
});

Then("my order should be placed successfully", () => {
  checkoutPage.verifyOrderSuccess();
});

Then("I should be prompted to login or register", () => {
  // Site shows a modal asking to login or register as a guest
  cy.get("p:contains('Register / Login account'), u:contains('Register / Login')")
    .should("be.visible");
});
