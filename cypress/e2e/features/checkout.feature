@checkout
Feature: Checkout Functionality
  As a registered user with items in cart
  I want to review my order and complete payment
  So that I can place an order successfully

  Background:
    Given I am on the AutomationExercise home page
    And I am logged in as a registered user

  @smoke @positive
  Scenario: Complete checkout with valid payment details
    When I navigate to the Products page
    And I add the first available product to the cart
    And I click View Cart
    And I click Proceed to Checkout from the cart
    Then I should see my delivery address details
    And I should see the order summary
    When I add a comment "Please leave at door"
    And I click Place Order
    And I fill in valid payment details
    And I confirm the payment
    Then my order should be placed successfully

  @positive
  Scenario: Verify order summary shows correct items before placing order
    When I navigate to the Products page
    And I add the first available product to the cart
    And I click View Cart
    And I click Proceed to Checkout from the cart
    Then I should see my delivery address details
    And I should see the order summary

  @positive
  Scenario: Verify checkout works with multiple products
    When I navigate to the Products page
    And I add the first available product to the cart
    And I click Continue Shopping
    And I add the second available product to the cart
    And I click View Cart
    And I click Proceed to Checkout from the cart
    Then I should see my delivery address details
    And I should see the order summary