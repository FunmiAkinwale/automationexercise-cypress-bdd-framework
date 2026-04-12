const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../pages/HomePage");
const signupLoginPage = require("../pages/SignupLoginPage");

When(
  "I enter new user signup details with name {string} and a unique email",

  (name) => {
    // Generate a unique email using timestamp to avoid conflicts
    const uniqueEmail = `testuser_${Date.now()}@mailinator.com`;
    cy.wrap(uniqueEmail).as("uniqueEmail");
    signupLoginPage.enterSignupDetails(name, uniqueEmail);
  }
);

When("I fill in the registration form with valid details", () => {
  cy.fixture("testData").then((data) => {
    signupLoginPage.fillRegistrationForm(data.newUser);
  });
});

When("I enter signup details with an already registered email", () => {
  cy.fixture("testData").then((data) => {
    signupLoginPage.enterSignupDetails(
      data.newUser.name,
      data.existingUser.email
    );
  });
});

Then("my account should be created successfully", () => {
  signupLoginPage.verifyAccountCreated();
  signupLoginPage.clickContinueAfterSignup();
});

Then("I should be logged in as {string}", (username) => {
  homePage.isLoggedIn();
  homePage.getLoggedInUsername().should("contain", username);
});

Then('I should see an error message {string}', (message) => {
  if (message.includes("already exist")) {
    signupLoginPage.verifySignupEmailError();
  }
});
