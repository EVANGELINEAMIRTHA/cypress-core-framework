describe('Signup Module Self-Healing Automation', () => {
  it('Should bypass broken attributes using fallback locator selectors', () => {
    // 1. Visit the page and ensure it is fully loaded
    cy.visit('/login', { timeout: 30000 });

    // 2. Updated Fallback Locators
    const nameLocators = [
      'input[name="name"]',
      '.signup-form input[data-qa="signup-name"]',
      'form[action="/signup"] input[type="text"]'
    ];

    const emailLocators = [
      'input[data-qa="signup-email"]',
      '.signup-form input[name="email"]',
      'form[action="/signup"] input[type="email"]'
    ];

    const submitBtnLocators = [
      'button[data-qa="signup-button"]',
      '.signup-form button[type="submit"]',
      '#form button'
    ];

    const dynamicName = 'Automation QA Engineer';
    const uniqueEmail = `rockwell_qa_${Date.now()}@test.com`;

    // 3. Perform Interactions using the Self-Healing mechanism
    // Interact with Name Field
    cy.getSelfHealing(nameLocators)
      .clear()
      .type(dynamicName)
      .should('have.value', dynamicName);
    
    // Interact with Email Field
    cy.getSelfHealing(emailLocators)
      .clear()
      .type(uniqueEmail)
      .should('have.value', uniqueEmail);

    // Click Submit
    cy.getSelfHealing(submitBtnLocators).click();

    // 4. Assertions
    // Confirm the URL updates or the registration form appears
    // Note: Adjust the URL assertion based on the actual redirect behavior
    cy.url().should('include', '/signup');
    
    // Confirm the success state (e.g., presence of account information fields)
    cy.get('h2').should('contain', 'Enter Account Information');
  });
});