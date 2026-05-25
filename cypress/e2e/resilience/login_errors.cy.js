import LoginPage from "../../pages/LoginPage";
const loginPage = new LoginPage();

describe('Login Error Resilience', () => {
  beforeEach(() => cy.fixture('example').as('data'));

  it('Handles 500 error on login submission', function() {
    loginPage.visit();
    loginPage.setupMockServerCrash(); // 500 error
    loginPage.enterLoginEmail(this.data.loginUser.email);
    loginPage.enterLoginPassword(this.data.loginUser.password);
    loginPage.clickLoginButton();
    // Verify UI handles the crash message
    cy.contains('Internal server error', { timeout: 10000 }).should('be.visible');
  });
});