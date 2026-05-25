import SignupPage from "../../pages/SignupPage";
const signupPage = new SignupPage();

describe('Signup Error Resilience', () => {
  beforeEach(() => cy.fixture('example').as('data'));

  it('Handles 400 error when email already exists', function() {
    signupPage.visit();
    signupPage.setupMockExistingEmail();
    signupPage.enterSignupName('Duplicate');
    signupPage.enterSignupEmail('existing@test.com');
    signupPage.clickSignupButton();
    signupPage.verifySignupFailure('initialSignupCheck', 400);
  });
});