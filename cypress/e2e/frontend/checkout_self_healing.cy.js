describe('Checkout Module Self-Healing Automation', () => {
  beforeEach(function () {
    cy.fixture('example').as('data');
    
    cy.get('@data').then((data) => {
      // 1. Establish login session
      cy.loginSession(data.loginUser.email, data.loginUser.password);
      
      // 2. CRITICAL: Add items to cart so the checkout button appears
      cy.visit('/products');
      cy.get('.add-to-cart').first().click({ force: true });
      cy.contains('Continue Shopping').click(); // Close the modal
    });
  });

  it('Should successfully place an order', () => {
    cy.visit('/view_cart');

    // Now the button will be present!
    cy.contains('Proceed To Checkout', { timeout: 15000 })
      .should('be.visible')
      .click();

    cy.get('textarea[name="message"]', { timeout: 10000 })
      .clear()
      .type('Automated order submission.');

    cy.contains('Place Order').click();
    cy.url().should('include', '/payment');
  });
});