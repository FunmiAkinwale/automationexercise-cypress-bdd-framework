const BasePage = require("./BasePage");

/**
 * SignupLoginPage
 * Covers both login and new user signup flows.
 */
class SignupLoginPage extends BasePage {
  // --- Login selectors ---
  get loginHeading() { return "h2:contains('Login to your account')"; }
  get loginEmailInput() { return "input[data-qa='login-email']"; }
  get loginPasswordInput() { return "input[data-qa='login-password']"; }
  get loginButton() { return "button[data-qa='login-button']"; }
  get loginErrorMsg() { return "p:contains('Your email or password is incorrect!')"; }

  // --- Signup selectors ---
  get signupHeading() { return "h2:contains('New User Signup!')"; }
  get signupNameInput() { return "input[data-qa='signup-name']"; }
  get signupEmailInput() { return "input[data-qa='signup-email']"; }
  get signupButton() { return "button[data-qa='signup-button']"; }
  get signupErrorMsg() { return "p:contains('Email Address already exist!')"; }

  // --- Registration form selectors ---
  get accountInfoHeading() { return "h2.title b"; }
  get genderMr() { return "#id_gender1"; }
  get passwordInput() { return "input[data-qa='password']"; }
  get dobDay() { return "select[data-qa='days']"; }
  get dobMonth() { return "select[data-qa='months']"; }
  get dobYear() { return "select[data-qa='years']"; }
  get newsletterCheckbox() { return "#newsletter"; }
  get optinCheckbox() { return "#optin"; }
  get firstNameInput() { return "input[data-qa='first_name']"; }
  get lastNameInput() { return "input[data-qa='last_name']"; }
  get companyInput() { return "input[data-qa='company']"; }
  get addressInput() { return "input[data-qa='address']"; }
  get address2Input() { return "input[data-qa='address2']"; }
  get countrySelect() { return "select[data-qa='country']"; }
  get stateInput() { return "input[data-qa='state']"; }
  get cityInput() { return "input[data-qa='city']"; }
  get zipcodeInput() { return "input[data-qa='zipcode']"; }
  get mobileInput() { return "input[data-qa='mobile_number']"; }
  get createAccountButton() { return "button[data-qa='create-account']"; }
  get accountCreatedHeading() { return "h2[data-qa='account-created']"; }
  get continueButton() { return "a[data-qa='continue-button']"; }

  // --- Actions ---
  login(email, password) {
    this.typeText(this.loginEmailInput, email);
    this.typeText(this.loginPasswordInput, password);
    this.clickElement(this.loginButton);
  }

  enterSignupDetails(name, email) {
    this.typeText(this.signupNameInput, name);
    this.typeText(this.signupEmailInput, email);
    this.clickElement(this.signupButton);
    this.waitForUrl("/signup");
  }

  fillRegistrationForm(userData) {
    cy.get(this.genderMr).check();
    this.typeText(this.passwordInput, userData.password);
    this.selectDropdown(this.dobDay, "10");
    this.selectDropdown(this.dobMonth, "5");
    this.selectDropdown(this.dobYear, "1990");
    cy.get(this.newsletterCheckbox).check();
    cy.get(this.optinCheckbox).check();
    this.typeText(this.firstNameInput, userData.firstName);
    this.typeText(this.lastNameInput, userData.lastName);
    this.typeText(this.companyInput, userData.company);
    this.typeText(this.addressInput, userData.address);
    this.typeText(this.address2Input, userData.address2);
    this.selectDropdown(this.countrySelect, userData.country);
    this.typeText(this.stateInput, userData.state);
    this.typeText(this.cityInput, userData.city);
    this.typeText(this.zipcodeInput, userData.zipcode);
    this.typeText(this.mobileInput, userData.mobileNumber);
    this.clickElement(this.createAccountButton);
  }

  verifyAccountCreated() {
    cy.get(this.accountCreatedHeading)
      .should("be.visible")
      .and("contain.text", "ACCOUNT CREATED!");
  }

  clickContinueAfterSignup() {
    this.clickElement(this.continueButton);
  }

  verifyLoginError() {
    cy.get(this.loginErrorMsg).should("be.visible");
  }

  verifySignupEmailError() {
    cy.get(this.signupErrorMsg).should("be.visible");
  }
}

module.exports = new SignupLoginPage();
