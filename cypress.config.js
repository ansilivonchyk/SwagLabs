const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    testIsolation: false,
    defaultCommandTimeout: 5000,
    screenshotOnRunFailure: false,
    trashAssetsBeforeRuns: true,
  //video: true
  },
});
