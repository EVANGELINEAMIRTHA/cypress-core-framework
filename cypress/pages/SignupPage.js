class SignupPage {
  visit() { cy.visit('/login'); }
  enterSignupName(name) { cy.get('input[data-qa="signup-name"]').clear().type(name); }
  enterSignupEmail(email) { cy.get('input[data-qa="signup-email"]').clear().type(email); }
  clickSignupButton() { cy.get('button[data-qa="signup-button"]').click(); }
  fillAccountDetails(data) {
    cy.get('#id_gender2').click();
    cy.get('#password').clear().type(data.password);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1999');
    cy.get('#first_name').clear().type(data.firstName);
    cy.get('#last_name').clear().type(data.lastName);
    cy.get('#address1').clear().type(data.address);
    cy.get('#country').select(data.country);
    cy.get('#state').clear().type(data.state);
    cy.get('#city').clear().type(data.city);
    cy.get('#zipcode').clear().type(data.zipcode);
    cy.get('#mobile_number').clear().type(data.mobileNumber);
    cy.get('button[data-qa="create-account"]').click();
  }
  setupMockExistingEmail() { cy.intercept('POST', '**/signup', { statusCode: 400, body: { error: 'Exists' } }).as('initialSignupCheck'); }
  setupMockSignupServerCrash() { cy.intercept('POST', '**/signup', { statusCode: 500, body: { error: 'Crash' } }).as('createAccountDBCall'); }
  verifySignupFailure(alias, status) { cy.wait(`@${alias}`).its('response.statusCode').should('eq', status); }
  verifyAccountCreated() { cy.get('[data-qa="account-created"]', { timeout: 12000 }).should('be.visible'); }
}

// Export the class directly
export default SignupPage;