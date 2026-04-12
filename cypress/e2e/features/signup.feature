@signup
Feature: User Sign-up
  As a new visitor to AutomationExercise
  I want to register a new account
  So that I can shop and track my orders

  Background:
    Given I am on the AutomationExercise home page

  @smoke @positive
  Scenario: Successful new user registration
    When I navigate to the login page
    And I enter new user signup details with name "Auto Tester" and a unique email
    And I fill in the registration form with valid details
    Then my account should be created successfully
    And I should be logged in as "Auto Tester"

  @negative
  Scenario: Sign-up with an already registered email
    When I navigate to the login page
    And I enter signup details with an already registered email
    Then I should see an error message "Email Address already exist!"
