import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import CheckoutPage from "../../pages/CheckoutPage";

const loginPage = new LoginPage();
const signupPage = new SignupPage();
const checkoutPage = new CheckoutPage();

describe('Visual Regression - Core Application Pages', () => {

    beforeEach(function () {
        // Use cy.fixture to load data and alias it
        cy.fixture('example').as('data');
    });

    it('should visually validate the Login page', () => {
        loginPage.visit();
        cy.percySnapshot('Login Page - View');
    });

    it('should visually validate the Signup page', () => {
        signupPage.visit();
        cy.percySnapshot('Signup Page - View');
    });

    // Use a regular function so 'this' context is available
    it('should visually validate the Checkout page', function () {
        // Accessing the aliased data using 'this.data'
        const { email, password } = this.data.loginUser;

        // 1. MUST LOGIN FIRST
        cy.loginSession(email, password);

        // 2. Setup State: Add to cart
        checkoutPage.addFirstProductToCart(1); 
        
        // 3. Navigate to Cart
        checkoutPage.goToCart();
        
        // 4. Proceed to Checkout
        checkoutPage.proceedToCheckout(); 
        
        // 5. Capture snapshot
        cy.percySnapshot('Checkout Page - Initial Load');
    });
});