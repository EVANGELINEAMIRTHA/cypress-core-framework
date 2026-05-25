import SignupPage from '../../pages/SignupPage';
const signupPage = new SignupPage();

describe('Signup Stability', () => {
  it('Handles dynamic redirection after signup safely', () => {
    cy.fixture('example').then((data) => {
      // FIX: Access 'signupUser', not 'signupData'
      const signupData = data.signupUser; 

      cy.visit('/login');

      // 1. Initial Signup
      signupPage.enterSignupName(signupData.name); // Using fixture for the name too
      signupPage.enterSignupEmail(`test${Date.now()}@gmail.com`);
      signupPage.clickSignupButton();

      // 2. Fill account details
      signupPage.fillAccountDetails(signupData);

      // 3. Verification
      signupPage.verifyAccountCreated();
      cy.url().should('include', '/account_created');
    });
  });
});