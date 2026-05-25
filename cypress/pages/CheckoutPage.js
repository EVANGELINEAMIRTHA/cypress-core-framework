class CheckoutPage {
  // --- NAVIGATION ---
  goToProducts() { 
    cy.visit('/products'); 
  }

  goToCart() { 
    cy.visit('/view_cart', { failOnStatusCode: false }).then((response) => {
      if (response.status === 503) {
        cy.wait(2000);
        cy.visit('/view_cart');
      }
    });
  }

  // --- ACTIONS ---
  // API Action: Use for fast setup when CSRF is not an issue
  addToCartApi(productId = 1) {
    cy.request('POST', `/add_to_cart/${productId}`);
  }

  // UI Action: Use this to avoid 403 Forbidden errors
  addFirstProductToCart(productId) {
    cy.visit(`/product_details/${productId}`);
    cy.get('.cart').click();
    cy.get('.modal-footer > .btn').click(); 
  }

  proceedToCheckout() { 
  cy.contains('Proceed To Checkout').click(); 
  cy.url().should('include', '/checkout');
}

  placeOrder() { 
    cy.contains('a', 'Place Order').click(); 
  }

  // Added .clear() to ensure stability against pre-filled inputs
  enterPaymentDetails(data) {
    cy.get('input[name="name_on_card"]').clear().type(data.name);
    cy.get('input[name="card_number"]').clear().type(data.cardNumber);
    cy.get('input[name="cvc"]').clear().type(data.cvc);
    cy.get('input[name="expiry_month"]').clear().type(data.month);
    cy.get('input[name="expiry_year"]').clear().type(data.year);
  }

  confirmOrder() {
    cy.get('#submit').click();
  }

  // --- VALIDATIONS ---
  verifyCheckoutPage() { 
    cy.contains('Address Details').should('be.visible'); 
  }

  // --- MOCKING ---
  setupMockPaymentFailure() {
    cy.intercept('POST', '**/payment', { statusCode: 500 }).as('paymentCall');
  }
}

export default CheckoutPage;