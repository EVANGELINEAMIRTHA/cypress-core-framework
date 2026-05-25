import './commands';
import '@shelex/cypress-allure-plugin';
import 'cypress-visual-regression/dist/command';
// 2. REGISTER THE VISUAL AI SNAPSHOT ENGINE COMMAND
const { addCompareSnapshotCommand } = require('cypress-visual-regression/dist/command');
addCompareSnapshotCommand();

// 3. GLOBAL CONFIGURATIONS & HOOKS
// Automatically handles and bypasses third-party application exceptions/ads
Cypress.on('uncaught:exception', () => {
  return false;
});

// Sets a standard desktop viewport resolution before every single test run
beforeEach(() => {
  cy.viewport(1440, 900);
});

// Add this to cypress/support/e2e.js
before(() => {
  Cypress.config('visualRegressionType', 'regression');
});
