import CheckoutPage from '../../pages/CheckoutPage';

describe('Checkout Error Resilience', () => {
  // Move the initialization inside the describe block, but outside the fixture
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Handles 500 error on payment confirmation', function () {
    // Load the fixture and perform the test steps
    cy.fixture('example').then((data) => {
      // Use the instance defined in the describe block
      cy.loginSession(data.loginUser.email, data.loginUser.password);
      
      // Perform navigation
      checkoutPage.addFirstProductToCart(1);
      cy.visit('/view_cart');
      
      // 1. Navigate through the flow
      checkoutPage.proceedToCheckout();
      checkoutPage.placeOrder(); 
      
      // 2. Define the Intercept
      cy.intercept('POST', '**/payment', {
        statusCode: 500,
        body: { message: 'Internal Server Error' }
      }).as('paymentSubmissionAPI');

      // 3. Fill details 
      checkoutPage.enterPaymentDetails(data.checkoutData);
      
      // 4. Trigger action
      checkoutPage.confirmOrder(); 

      // 5. Assertions
      cy.wait('@paymentSubmissionAPI');
      cy.get('body').should('contain', 'Internal Server Error'); 
    });
  });
});