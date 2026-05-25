const { execSync } = require('child_process');
const cypress = require('cypress');

function getModifiedFiles() {
  try {
    // Interrogates local Git index history logs to see exactly what files changed
    const output = execSync('git diff --name-only HEAD~1').toString();
    return output.split('\n').filter(Boolean);
  } catch (error) {
    // Fail-safe protection fallback layer if executed inside a non-repository hook context
    return []; 
  }
}

async function runOptimizedSuite() {
  const changedFiles = getModifiedFiles();
  let testSuiteToRun = 'cypress/e2e/**/*.cy.js'; // Default: Execute everything

  // Check if your local modifications map directly into an isolated business module
  const isLoginChanged = changedFiles.some(file => file.toLowerCase().includes('login'));
  const isSignupChanged = changedFiles.some(file => file.toLowerCase().includes('signup'));
  const isCheckoutChanged = changedFiles.some(file => file.toLowerCase().includes('checkout'));

  // 🎯 UNIFIED MULTI-TRACK SELECTION LAYER
  if (isLoginChanged || isSignupChanged || isCheckoutChanged) {
    console.log("🤖 Optimization Engine Triggered: Target code change vectors detected.");
    
    let specsToExecute = [];
    if (isLoginChanged) specsToExecute.push('cypress/e2e/**/*login*.cy.js');
    if (isSignupChanged) specsToExecute.push('cypress/e2e/**/*signup*.cy.js');
    if (isCheckoutChanged) specsToExecute.push('cypress/e2e/**/*checkout*.cy.js');

    // Join files with a comma delimiter formatting structure for standard Cypress spec compilation
    testSuiteToRun = specsToExecute.join(',');
    console.log(`🚀 Executing ONLY affected framework specs to save pipeline resources: [ ${testSuiteToRun} ]`);
  } else {
    console.log("🌍 No module adjustments matching changes. Executing full integration test suite context.");
  }

  // Launch the Cypress process engine cleanly inside Chrome
  await cypress.run({
    spec: testSuiteToRun,
    browser: 'chrome'
  });
}

// Fire the pipeline engine orchestration
runOptimizedSuite();