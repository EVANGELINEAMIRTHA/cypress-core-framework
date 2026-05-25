describe('Login Page Visual AI Test', () => {
  it('Should check that the login page layout renders perfectly', () => {
    cy.visit('/login');

    // 🎯 Click into the field first to focus it, then step out to hide the cursor
    cy.get('[data-qa="login-email"]').focus().blur();

    // Take a snapshot of the login view page and compare it against our base screenshot
    cy.compareSnapshot('login-page-layout', {
      errorThreshold: 0.01 
    });
  });
});