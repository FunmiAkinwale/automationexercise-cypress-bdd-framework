@cart
Feature: Add Product to Cart
  As a logged-in user of AutomationExercise
  I want to add products to my shopping cart
  So that I can purchase them later

  Background:
    Given I am on the AutomationExercise home page
    And I am logged in as a registered user

  @smoke @positive
  Scenario: Add a product to cart from the products page
    When I navigate to the Products page
    And I add the first available product to the cart
    And I click Continue Shopping
    Then the cart icon should reflect items added

  @positive
  Scenario: Search for a product and add it to cart
    When I navigate to the Products page
    And I search for product "Blue Top"
    And I add the first available product to the cart
    And I click View Cart
    Then the cart should contain "Blue Top"

  @positive
  Scenario: Add multiple products to cart
    When I navigate to the Products page
    And I add the first available product to the cart
    And I click Continue Shopping
    And I add the second available product to the cart
    And I click View Cart
    Then the cart should have at least 2 items
