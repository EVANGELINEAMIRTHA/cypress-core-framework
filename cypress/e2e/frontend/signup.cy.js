describe('Automation Exercise - Signup Test Suite', () => {
  beforeEach(function () {
    cy.fixture('example').as('data');
  });

  it('Create New User Account (UI)', function () {
    // TO THIS:
const signupData = { 
  ...this.data.signupUser, 
  email: (this.data.signupUser?.email) || `test${Date.now()}@gmail.com` 
};
    cy.signupUser(signupData);
  });

  it('Create New User Account (API)', function () {
     // TO THIS:
const signupData = { 
  ...this.data.signupUser, 
  email: (this.data.signupUser?.email) || `test${Date.now()}@gmail.com` 
};
    cy.signupUserApi(signupData);
  });

  it('Mocked: Should throw error when email exists', function () {
    cy.signupWithMockEmailError(this.data.signupUserExistingEmail);
  });


});