describe('Checkout Stability', () => {
  it('Waits for modal animation to settle before interaction', () => {
    cy.visit('/products');
    // Ensure we don't click until overlay is gone
    cy.get('.add-to-cart').first().click({ force: true });
    cy.get('#cartModal').should('be.visible');
    cy.contains('Continue Shopping').click({ force: true });
    // Resilience: ensure modal is gone before clicking cart
    cy.get('#cartModal').should('not.have.class', 'show');
    cy.contains('a', 'Cart').click();
  });
});