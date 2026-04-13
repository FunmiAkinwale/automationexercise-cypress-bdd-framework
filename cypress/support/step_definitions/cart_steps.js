const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const productsPage = require("../pages/ProductsPage");
const cartPage = require("../pages/CartPage");

When("I add the first available product to the cart", () => {
  productsPage.addFirstProductToCart();
});

When("I add the second available product to the cart", () => {
  productsPage.addProductToCartByIndex(1);
});

When("I click Continue Shopping", () => {
  productsPage.continueShopping();
});

When("I click View Cart", () => {
  productsPage.proceedToCart();
});

When("I search for product {string}", (productName) => {
  productsPage.searchProduct(productName);
  productsPage.verifySearchResults(productName);
});

Then("the cart icon should reflect items added", () => {
  cy.get("a[href='/view_cart']").should("be.visible");
});

Then("the cart should contain {string}", (productName) => {
  cartPage.verifyProductInCart(productName);
});

Then("the cart should have at least {int} items", (minCount) => {
  cy.get(cartPage.cartItems).its("length").should("be.gte", minCount);
});
