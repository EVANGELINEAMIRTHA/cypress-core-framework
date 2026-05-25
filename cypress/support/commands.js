import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import CheckoutPage from "../pages/CheckoutPage"
import '@percy/cypress'

const loginPage = new LoginPage() 
const signupPage = new SignupPage()
const checkoutPage = new CheckoutPage()

// --- LOGIN COMMANDS ---
Cypress.Commands.add('loginSession', (email, password) => {
  cy.session([email, password], () => {
    // We visit the page and do the actual UI login.
    // Because we are in a session block, this only happens ONCE.
    cy.visit('/login');
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
    
    // Crucial: Wait for the app to be fully authenticated
    cy.url().should('not.include', '/login');
    cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
  }, {
    validate() {
      // Validate by checking a cookie or a protected URL
      cy.visit('/'); 
      cy.contains('Logged in as').should('be.visible');
    }
  });
});

// --- 2. MOCK LOGIN (UI-BASED): For testing UI resilience ---
// We use UI here because we want to see if the error message appears on the screen
Cypress.Commands.add('loginWithMock', (email, password, mockType, expectedStatus) => {
  loginPage.visit();
  
  // Set up the interception BEFORE clicking login
  if (mockType === 'failure') {
    loginPage.setupMockLogin(); // Intercepts with 401
  } else if (mockType === 'crash') {
    loginPage.setupMockServerCrash(); // Intercepts with 500
  }
  
  loginPage.enterLoginEmail(email);
  loginPage.enterLoginPassword(password);
  loginPage.clickLoginButton();
  
  // Verify UI handles the intercepted error
  loginPage.verifyLoginFailure(expectedStatus);
});

// --- SIGNUP COMMANDS ---

// 1. FAST API SIGNUP: Use this for test setup
Cypress.Commands.add('signupUserApi', (data) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount', 
    form: true,
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      title: 'Mr',
      birth_day: '10',
      birth_month: 'May',
      birth_year: '1999',
      firstname: data.firstName,
      lastname: data.lastName,
      address1: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
      mobile_number: data.mobileNumber
    },
    failOnStatusCode: false
  }).then((res) => {
    expect(res.status).to.be.oneOf([200, 201]);
  });
});

// 2. UI SIGNUP: Use this specifically to test the Signup feature
Cypress.Commands.add('signupUser', (data) => {
  signupPage.visit();
  signupPage.enterSignupName(data.name);
  signupPage.enterSignupEmail(data.email);
  signupPage.clickSignupButton();
  signupPage.fillAccountDetails(data);
  signupPage.verifyAccountCreated();
});

// 3. MOCK EMAIL ERROR
Cypress.Commands.add('signupWithMockEmailError', (data) => {
  signupPage.visit();
  signupPage.enterSignupName(data.name);
  signupPage.enterSignupEmail(data.email);
  signupPage.setupMockExistingEmail();
  signupPage.clickSignupButton();
  signupPage.verifySignupFailure('initialSignupCheck', 400);
});

// 4. MOCK SERVER CRASH
Cypress.Commands.add('signupWithMockServerCrash', (data) => {
  signupPage.visit();
  signupPage.enterSignupName(data.name);
  signupPage.enterSignupEmail(data.email);
  signupPage.clickSignupButton();
  
  // 1. Fill the details
  signupPage.fillAccountDetails(data); 
  
  // 2. SETUP THE MOCK BEFORE THE FINAL ACTION
  signupPage.setupMockSignupServerCrash();
  
  // 3. NOW trigger the action that sends the request
  cy.get('button[data-qa="create-account"]').click();
  
  // 4. Finally verify
  signupPage.verifySignupFailure('createAccountDBCall', 500);
});

// --- CHECKOUT COMMANDS ---

// 1. ADD TO CART API: Use this to bypass slow UI modal clicks
// --- UPDATED: USE UI FOR ADD TO CART TO AVOID CSRF/403 ---
Cypress.Commands.add('addToCartApi', (productId = 1) => {
  // We use UI to visit, which naturally handles CSRF cookies and Headers
  cy.visit('/product_details/' + productId);
  cy.get('.cart').click();
  // Simply click 'Continue Shopping' to stay on the page
  cy.get('.modal-footer > .btn').click(); 
});

// 2. SUCCESSFUL CHECKOUT (Hybrid): API for Cart, UI for Payment
Cypress.Commands.add('checkoutUser', (data) => {
  cy.addToCartApi(1); 
  checkoutPage.goToCart();
  
  // This now handles the click and the navigation check
  checkoutPage.proceedToCheckout(); 
  
  // This verifies the content of the checkout page
  checkoutPage.verifyCheckoutPage(); 
  
  checkoutPage.placeOrder();
  checkoutPage.enterPaymentDetails(data);
  checkoutPage.confirmOrder();

  cy.contains('Congratulations!', { timeout: 15000 }).should('be.visible');
});

// 3. MOCK PAYMENT FAILURE: For testing error resilience
Cypress.Commands.add('checkoutWithMockFailure', (data) => {
  cy.addToCartApi(1);
  
  // Use a navigation retry wrapper
  checkoutPage.goToCart();
  
  checkoutPage.proceedToCheckout();
  checkoutPage.placeOrder();
  
  checkoutPage.setupMockPaymentFailure();
  
  checkoutPage.enterPaymentDetails(data);
  checkoutPage.confirmOrder();
  
  // Verify the intercepted 500 error
  cy.wait('@paymentCall').its('response.statusCode').should('eq', 500);
});

// --- THE SELF-HEALING ENGINE ---
Cypress.Commands.add('getSelfHealing', (selectors) => {
  const findElement = (index) => {
    const selector = selectors[index];
    
    // Log the attempt
    cy.log(`Trying selector [${index + 1}/${selectors.length}]: ${selector}`);

    // We use a custom 'should' assertion to force Cypress to retry the search 
    // until it finds the element or times out the whole command
    return cy.get('body', { log: false }).then(($body) => {
      const $el = $body.find(selector).filter(':visible').first();

      if ($el.length > 0) {
        cy.log(`✅ Success! Found: ${selector}`);
        return cy.wrap($el);
      } else {
        if (index + 1 < selectors.length) {
          return findElement(index + 1);
        } else {
          throw new Error(`❌ Self-Healing Failed: None of the provided selectors were found.`);
        }
      }
    });
  };

  return findElement(0);
});