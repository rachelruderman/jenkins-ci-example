const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ouw15q",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
