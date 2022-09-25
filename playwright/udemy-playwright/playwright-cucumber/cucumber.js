/** @typedef {import('@cucumber/cucumber/api').IConfiguration} CucumberConfig **/
/** @type {Partial<CucumberConfig>} */
const config = {
  import: ['setup/hooks.ts', 'step-definitions/**/*.step.ts'],
  paths: ['features/**/*.feature'],
  format: ['json:cucumber_report.json'],
  publishQuiet: true,
};

export default config;
