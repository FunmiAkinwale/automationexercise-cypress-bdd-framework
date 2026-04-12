const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../pages/HomePage");
const signupLoginPage = require("../pages/SignupLoginPage");

When("I login with valid email and password", () => {
  cy.fixture("testData").then((data) => {
    signupLoginPage.login(data.existingUser.email, data.existingUser.password);
  });
});

When(
  "I login with invalid email {string} and password {string}",
  (email, password) => {
    signupLoginPage.login(email, password);
  }
);

When("I click on the Logout button", () => {
  homePage.logout();
});

Then("the navigation should show my username", () => {
  homePage.isLoggedIn();
});

Then('I should see the login error {string}', (errorMsg) => {
  signupLoginPage.verifyLoginError();
  cy.get("p").should("contain.text", errorMsg);
});

Then("I should be redirected to the login page", () => {
  cy.url().should("include", "/login");
  cy.get(signupLoginPage.loginHeading).should("be.visible");
});
