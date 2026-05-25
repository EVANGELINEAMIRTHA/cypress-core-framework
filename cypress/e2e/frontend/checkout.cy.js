describe('End-to-End Checkout Flow', () => {
  beforeEach(function () {
    cy.fixture('example').as('data');
    // Cooldown: 1 second between test setups to avoid server rate-limiting
    cy.wait(1000); 
  });

  it('Should complete a successful checkout', function () {
    cy.loginSession(this.data.loginUser.email, this.data.loginUser.password);
    cy.checkoutUser(this.data.checkoutData);
  });

  it('Should handle payment gateway failure', function () {
    cy.loginSession(this.data.loginUser.email, this.data.loginUser.password);
    cy.checkoutWithMockFailure(this.data.checkoutData);
  });
});