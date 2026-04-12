@login
Feature: User Login
  As a registered user of AutomationExercise
  I want to log in to my account
  So that I can access my personalised dashboard

  Background:
    Given I am on the AutomationExercise home page

  @smoke @positive
  Scenario: Successful login with valid credentials
    When I navigate to the login page
    And I login with valid email and password
    Then I should be logged in as "Auto Tester"
    And the navigation should show my username

  @negative
  Scenario: Login with invalid credentials
    When I navigate to the login page
    And I login with invalid email "wrong@email.com" and password "wrongPass"
    Then I should see the login error "Your email or password is incorrect!"

  @smoke
  Scenario: User logout
    Given I am logged in as a registered user
    When I click on the Logout button
    Then I should be redirected to the login page
