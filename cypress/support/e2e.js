// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

// 1. ALL IMPORTS MUST BE AT THE VERY TOP
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
  Cypress.env('visualRegressionType', 'regression');
});