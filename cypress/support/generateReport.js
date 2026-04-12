// cypress/support/generateReport.js
// Run after `cypress run` to generate a rich HTML report from cucumber JSON output.

const report = require("multiple-cucumber-html-reporter");
const path = require("path");
const fs = require("fs");

const jsonDir = path.join(__dirname, "../reports/cucumber-json");
const outputDir = path.join(__dirname, "../reports/html-report");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

report.generate({
  jsonDir,
  reportPath: outputDir,
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "CI Runner",
    platform: {
      name: "ubuntu",
      version: "22.04",
    },
  },
  customData: {
    title: "AutomationExercise BDD Test Report",
    data: [
      { label: "Project", value: "AutomationExercise Cypress BDD" },
      { label: "Release", value: "1.0.0" },
      { label: "Execution Start Time", value: new Date().toLocaleString() },
      { label: "Executed by", value: "GitHub Actions CI" },
    ],
  },
  pageTitle: "AutomationExercise - Test Execution Report",
  reportName: "BDD Automation Report",
  displayDuration: true,
  durationInMS: true,
});

console.log("✅ HTML Report generated at:", outputDir);
