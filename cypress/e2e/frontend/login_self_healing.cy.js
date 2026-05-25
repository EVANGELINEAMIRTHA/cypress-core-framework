describe('Login Page Self-Healing Test', () => {
  beforeEach(function () {
    cy.fixture('example').as('data');
  });

  it('Logs in successfully even if developers change the code attributes', function () {
    const user = this.data.loginUser;
    cy.visit('/login');

    // Merge primary and backups into one array
    cy.getSelfHealing([
      '[data-qa="login-email"]',
      'input[name="login-email"]',
      'input[type="email"]',
      '.login-form input'
    ]).type(user.email);

    cy.getSelfHealing([
      '[data-qa="login-password"]',
      'input[name="password"]',
      'input[type="password"]'
    ]).type(user.password);

    cy.getSelfHealing([
      '[data-qa="login-button"]',
      'button[type="submit"]',
      '.login-form button'
    ]).click();

    cy.contains('Logged in as').should('be.visible');
  });
});