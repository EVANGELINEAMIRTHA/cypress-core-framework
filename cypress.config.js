const { defineConfig } = require("cypress");
// Import the plugin object
const visualRegression = require('cypress-visual-regression/dist/plugin');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'https://automationexercise.com',
    
    // Reliability Settings
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 15000,
    video: false,

    retries: {
      runMode: 2,
      openMode: 0
    },

    setupNodeEvents(on, config) {
      // ✅ Use the function discovered in your logs
      visualRegression.configureVisualRegression(on);
      allureWriter(on, config);
      return config;
    },

    env: {
      visualRegressionType: 'regression',
      allure: true
    },
  },
});