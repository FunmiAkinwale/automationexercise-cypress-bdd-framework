const BasePage = require("./BasePage");

/**
 * CheckoutPage
 * Site: https://automationexercise.com
 * Full flow: Cart → Checkout → Payment → Order Confirmation
 */
class CheckoutPage extends BasePage {

  // ── Cart page ─────────────────────────────────────────────────────────────
  get proceedToCheckoutBtn() { return "a.btn.btn-default.check_out"; }

  // ── Checkout page - Address & Order Review ────────────────────────────────
  get deliveryAddressSection() { return "#address_delivery"; }
  get billingAddressSection()  { return "#address_invoice"; }
  get orderProducts()          { return "#cart_info tbody tr"; }
  get orderCommentBox()        { return "textarea.form-control"; }
  get placeOrderButton()       { return "a.btn.btn-default.check_out"; }

  // ── Payment page ──────────────────────────────────────────────────────────
  get cardNameInput()          { return "input[data-qa='name-on-card']"; }
  get cardNumberInput()        { return "input[data-qa='card-number']"; }
  get cvcInput()               { return "input[data-qa='cvc']"; }
  get expiryMonthInput()       { return "input[data-qa='expiry-month']"; }
  get expiryYearInput()        { return "input[data-qa='expiry-year']"; }
  get payAndConfirmButton()    { return "button[data-qa='pay-button']"; }

  // ── Order Success page ────────────────────────────────────────────────────
  get orderSuccessMsg()        { return "h2[data-qa='order-placed'], p:contains('Congratulations! Your order has been confirmed!')"; }
  get downloadInvoiceBtn()     { return "a.btn:contains('Download Invoice')"; }
  get continueButton()         { return "a[data-qa='continue-button']"; }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Called from cart page — clicks "Proceed To Checkout"
   * This is the entry point that links the add-to-cart flow to checkout
   */
  clickProceedToCheckout() {
    cy.get(this.proceedToCheckoutBtn).first().should("be.visible").click();
    cy.url().should("include", "/checkout");
  }

  verifyDeliveryAddress(name) {
    cy.get(this.deliveryAddressSection)
      .should("be.visible")
      .and("contain.text", name);
  }

  verifyOrderItems() {
    cy.get(this.orderProducts).should("have.length.greaterThan", 0);
  }

  addOrderComment(comment) {
    cy.get(this.orderCommentBox).first().clear().type(comment);
  }

  clickPlaceOrder() {
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

  verifyOrderSummaryHasItems() {
    cy.get(this.orderProducts).should("have.length.greaterThan", 0);
  }

  placeOrder() {
    cy.get(this.placeOrderButton).first().should("be.visible").click();
    this.waitForUrl("/payment");
  }
  
  // ── Convenience method: full payment flow in one call ─────────────────────
  completePayment(payment) {
    this.fillPaymentDetails(payment);
    this.confirmPayment();
  }
}

module.exports = new CheckoutPage();