describe('Login Stability', () => {
  it('Retries login if ad-modal blocks the button', () => {
    cy.visit('/login');
    // Using {force: true} and retry-ability via should('be.visible')
    cy.get('button[data-qa="login-button"]')
      .should('be.visible')
      .click({ force: true });
  });
});