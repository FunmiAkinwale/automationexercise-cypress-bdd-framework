const BasePage = require("./BasePage");

/**
 * CheckoutPage
 * Covers the checkout address confirmation, order review, and payment.
 */
class CheckoutPage extends BasePage {
  // Checkout - address & review
  get deliveryAddressSection() { return "#address_delivery"; }
  get billingAddressSection() { return "#address_invoice"; }
  get orderProducts() { return "#cart_info tbody tr"; }
  get orderComment() { return "textarea.form-control"; }
  get placeOrderButton() { return "a.btn.btn-default.check_out"; }

  // Payment page
  get cardNameInput() { return "input[data-qa='name-on-card']"; }
  get cardNumberInput() { return "input[data-qa='card-number']"; }
  get cvcInput() { return "input[data-qa='cvc']"; }
  get expiryMonthInput() { return "input[data-qa='expiry-month']"; }
  get expiryYearInput() { return "input[data-qa='expiry-year']"; }
  get payAndConfirmButton() { return "button[data-qa='pay-button']"; }
  get orderSuccessMsg() { return "h2[data-qa='order-placed'], p:contains('Congratulations! Your order has been confirmed!')"; }
  get downloadInvoiceBtn() { return "a.btn:contains('Download Invoice')"; }
  get continueButton() { return "a[data-qa='continue-button']"; }

  verifyDeliveryAddress(name) {
    cy.get(this.deliveryAddressSection)
      .should("be.visible")
      .and("contain.text", name);
  }

  verifyOrderItems() {
    cy.get(this.orderProducts).should("have.length.greaterThan", 0);
  }

  addOrderComment(comment) {
    // Use first() in case textarea appears more than once in DOM
    cy.get(this.orderComment).first().clear().type(comment);
  }

  clickPlaceOrder() {
    // Use first() to avoid multiple element error
    cy.get(this.placeOrderButton).first().should("be.visible").click();
    this.waitForUrl("/payment");
  }

  fillPaymentDetails(payment) {
    cy.get(this.cardNameInput).should("be.visible").clear().type(payment.cardName);
    cy.get(this.cardNumberInput).should("be.visible").clear().type(payment.cardNumber);
    cy.get(this.cvcInput).should("be.visible").clear().type(payment.cvc);
    cy.get(this.expiryMonthInput).should("be.visible").clear().type(payment.expiryMonth);
    cy.get(this.expiryYearInput).should("be.visible").clear().type(payment.expiryYear);
  }

  confirmPayment() {
    cy.get(this.payAndConfirmButton).first().should("be.visible").click();
  }

  verifyOrderSuccess() {
    cy.get(this.orderSuccessMsg, { timeout: 15000 }).first().should("be.visible");
  }

  clickContinueAfterOrder() {
    cy.get(this.continueButton).first().should("be.visible").click();
  }
}

module.exports = new CheckoutPage();
