describe('Signup Page Visual AI Test', () => {
  it('Should check that the signup page layout renders perfectly', () => {
    cy.visit('/login'); // Signup form lives on the /login page route

    // Target the specific name input in the signup form to focus/blur and hide cursors
    cy.get('[data-qa="signup-name"]').focus().blur();

    // Capture or compare the signup page view snapshot
    cy.compareSnapshot('signup-page-layout', {
      errorThreshold: 0.01
    });
  });
});