@checkout
Feature: Checkout Functionality
  As a logged-in user with items in my cart
  I want to complete the checkout process
  So that I can place and confirm my order

  Background:
    Given I am on the AutomationExercise home page
    And I am logged in as a registered user
    And I have at least one product in my cart

  @smoke @positive
  Scenario: Complete checkout with valid payment details
    When I navigate to the cart page
    And I proceed to checkout
    Then I should see my delivery address details
    And I should see the order summary
    When I add a comment "Please deliver between 9am-5pm"
    And I click Place Order
    And I fill in valid payment details
    And I confirm the payment
    Then my order should be placed successfully

  @positive
  Scenario: Verify delivery address on checkout page
    When I navigate to the cart page
    And I proceed to checkout
    Then I should see my delivery address details

  @negative
  Scenario: Attempt checkout without being logged in
    Given I am not logged in
    And I have at least one product in my cart as a guest
    When I navigate to the cart page
    And I proceed to checkout as a guest
    Then I should be prompted to login or register
