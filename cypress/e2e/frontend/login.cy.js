import LoginPage from "../../pages/LoginPage";
const loginPage = new LoginPage();

describe('Login Test Suite - Real & Mocked Workflows', () => {
  beforeEach(function () {
    cy.fixture('example').then((data) => {
      this.data = data;
    });
  });

  it('Login with Valid Credentials', function () {
    cy.loginSession(this.data.loginUser.email, this.data.loginUser.password);
    cy.visit('/');
    cy.contains('Logged in as').should('be.visible');
  });

  it('Mocked Scenario - Should handle wrong credentials gracefully', function () {
    cy.loginWithMock(
      this.data.invalidLoginUser.email, 
      this.data.invalidLoginUser.password, 
      'failure', 
      401
    );
  });

  it('Mocked Scenario - Should handle server crash gracefully', function () {
    cy.loginWithMock(
      this.data.loginUser.email, 
      this.data.loginUser.password, 
      'crash', 
      500
    );
  });
});