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
  get orderSuccessMsg() { return "h2[data-qa='order-placed'], #success_message, p:contains('Congratulations')"; }
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
    this.typeText(this.orderComment, comment);
  }

  clickPlaceOrder() {
    this.clickElement(this.placeOrderButton);
    this.waitForUrl("/payment");
  }

  fillPaymentDetails(payment) {
    this.typeText(this.cardNameInput, payment.cardName);
    this.typeText(this.cardNumberInput, payment.cardNumber);
    this.typeText(this.cvcInput, payment.cvc);
    this.typeText(this.expiryMonthInput, payment.expiryMonth);
    this.typeText(this.expiryYearInput, payment.expiryYear);
  }

  confirmPayment() {
    this.clickElement(this.payAndConfirmButton);
  }

  verifyOrderSuccess() {
    cy.get(this.orderSuccessMsg, { timeout: 15000 }).should("be.visible");
  }

  clickContinueAfterOrder() {
    this.clickElement(this.continueButton);
  }
}

module.exports = new CheckoutPage();
