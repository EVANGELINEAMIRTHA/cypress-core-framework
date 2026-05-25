class LoginPage {
  visit() {
    cy.visit('/login');
  }

  enterLoginEmail(email) {
    cy.get('input[data-qa="login-email"]').clear().type(email);
  }

  enterLoginPassword(password) {
    cy.get('input[data-qa="login-password"]').clear().type(password);
  }

  clickLoginButton() {
    // Intercept inside the action if not already intercepted
    cy.intercept('POST', '**/login').as('loginAPI');
    cy.get('button[data-qa="login-button"]').click();
  }

  verifyLoginSuccess() {
    cy.url({ timeout: 15000 }).should('not.include', '/login');
    cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
  }

  verifyLoginFailure(expectedStatusCode) {
    cy.wait('@loginAPI').its('response.statusCode').should('eq', expectedStatusCode);
    cy.url().should('include', '/login');
  }

  setupMockLogin() {
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: { error: 'Incorrect email or password!' }
    }).as('loginAPI');
  }

  setupMockServerCrash() {
    cy.intercept('POST', '**/login', {
      statusCode: 500,
      body: { error: 'Internal server error' }
    }).as('loginAPI');
  }
}

export default LoginPage;