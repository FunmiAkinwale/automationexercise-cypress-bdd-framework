const BasePage = require("./BasePage");

/**
 * CartPage
 * Represents the shopping cart (/view_cart).
 */
class CartPage extends BasePage {
  get cartItems() { return "#cart_info_table tbody tr"; }
  get cartProductNames() { return ".cart_description h4 a"; }
  get cartQuantities() { return ".cart_quantity button"; }
  get cartPrices() { return ".cart_price p"; }
  get totalPrice() { return ".cart_total_price"; }
  get checkoutButton() { return "a.btn.btn-default.check_out"; }
  get emptyCartMsg() { return "#empty_cart"; }
  get deleteItemButtons() { return ".cart_quantity_delete"; }

  visit() {
    super.visit("/view_cart");
  }

  verifyCartHasItems() {
    cy.get(this.cartItems).should("have.length.greaterThan", 0);
  }

  verifyProductInCart(productName) {
    cy.get(this.cartProductNames)
      .should("contain.text", productName);
  }

  getCartItemCount() {
    return cy.get(this.cartItems).its("length");
  }

  proceedToCheckout() {
    this.clickElement(this.checkoutButton);
  }

  removeFirstItem() {
    cy.get(this.deleteItemButtons).first().click();
    cy.wait(500);
  }

  verifyCartIsEmpty() {
    cy.get(this.emptyCartMsg).should("be.visible");
  }
}

module.exports = new CartPage();
