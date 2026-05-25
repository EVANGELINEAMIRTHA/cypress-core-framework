import CheckoutPage from '../../pages/CheckoutPage';

describe('Hybrid Checkout Integration Testing (UI + API State)', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(function () {
    // 1. Load data block from example.json
    cy.fixture('example').as('data');
  });

  it('1. UI Session Flow — Authenticate User and Complete Checkout', function () {
    const user = this.data.loginUser;
    const payment = this.data.checkoutData;

    // Step 2: Use the UI login command to plant the authentic session state
    cy.loginSession(user.email, user.password);
    
    // Step 3: Now that we are logged in, navigate safely through the checkout sequence
    cy.visit('/');
    
    checkoutPage.goToProducts();
    
    // CHANGED: Switched from API (which triggers 403) to UI-based Add to Cart
    checkoutPage.addFirstProductToCart(1);
    
    checkoutPage.goToCart();
    
    // Guard: Ensure the cart table is fully drawn on the screen
    cy.get('#cart_info').should('be.visible');
    
    // Step 4: Proceed to the checkout layout screen
    checkoutPage.proceedToCheckout();
    checkoutPage.verifyCheckoutPage();
    checkoutPage.placeOrder();
    
    // Step 5: Inject the payment values directly out of your fixture data block
    checkoutPage.enterPaymentDetails({
      name: payment.name, 
      cardNumber: payment.cardNumber, 
      cvc: payment.cvc, 
      month: payment.month, 
      year: payment.year
    });
    
    checkoutPage.confirmOrder();

    // Step 6: Assert final success confirmation screen state
    cy.contains('Congratulations! Your order has been confirmed!', { timeout: 15000 })
      .should('be.visible');
  });
});