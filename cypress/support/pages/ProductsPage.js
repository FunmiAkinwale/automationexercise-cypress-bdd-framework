const BasePage = require("./BasePage");

/**
 * ProductsPage
 * Covers product listing, search, and add-to-cart interactions.
 */
class ProductsPage extends BasePage {
  get searchInput() { return "input#search_product"; }
  get searchButton() { return "button#submit_search"; }
  get productCards() { return ".product-image-wrapper"; }
  get productTitles() { return ".productinfo p"; }
  get firstAddToCartBtn() { return ".product-image-wrapper:first .add-to-cart"; }
  get addToCartButtons() { return ".add-to-cart"; }
  get continueShoppingBtn() { return "button.close-modal, button:contains('Continue Shopping')"; }
  get viewCartLink() { return "a:contains('View Cart')"; }
  get modalVisible() { return "#cartModal"; }
  get searchedProductsSection() { return ".searched-products"; }

  visit() {
    super.visit("/products");
    cy.get(this.productCards).should("have.length.greaterThan", 0);
  }

  searchProduct(term) {
    this.typeText(this.searchInput, term);
    this.clickElement(this.searchButton);
    cy.get(this.productCards).should("have.length.greaterThan", 0);
  }

  addFirstProductToCart() {
    // Hover and click the first product's add-to-cart button
    cy.get(".product-image-wrapper").first().trigger("mouseover");
    cy.get(".product-image-wrapper").first().find(".add-to-cart").first().click({ force: true });
    cy.get(this.modalVisible).should("be.visible");
  }

  addProductToCartByIndex(index = 0) {
    cy.get(".product-image-wrapper").eq(index).trigger("mouseover");
    cy.get(".product-image-wrapper").eq(index).find(".add-to-cart").first().click({ force: true });
    cy.get(this.modalVisible).should("be.visible");
  }

  continueShopping() {
    cy.get(this.continueShoppingBtn).first().click();
    cy.get(this.modalVisible).should("not.be.visible");
  }

  proceedToCart() {
    cy.get(this.viewCartLink).first().click();
    this.waitForUrl("/view_cart");
  }

  verifySearchResults(productName) {
    cy.get(this.productTitles).each(($el) => {
      cy.wrap($el).invoke("text").then((text) => {
        expect(text.toLowerCase()).to.include(productName.toLowerCase());
      });
    });
  }
}

module.exports = new ProductsPage();
