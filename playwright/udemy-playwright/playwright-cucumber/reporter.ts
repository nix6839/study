import * as reporter from 'cucumber-html-reporter';

const options: reporter.Options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App version': '2.0.0',
    'Test environment': 'STAGING',
    Browser: 'Chromium 100.0',
    Platform: 'macOS 12.6',
  },
};

reporter.generate(options);
