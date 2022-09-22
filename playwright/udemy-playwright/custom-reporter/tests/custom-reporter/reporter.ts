import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import fs from 'node:fs';

export default class MyReporter implements Reporter {
  onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
    console.log(`Execution of ${suite.allTests().length} tests`);
  }

  onEnd(result: FullResult): void | Promise<void> {
    console.log(`Execution finished with status of ${result.status}`);
  }

  onTestBegin(test: TestCase, result: TestResult): void {
    console.log(`Exeuction of ${test.title} started.`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const data = {
      test: test.title,
      status: result.status,
      executionTime: result.duration,
      errors: result.errors,
    };
    const dataJSON = JSON.stringify(data, null, 2);
    console.log(dataJSON);
    fs.writeFileSync('test-result.json', dataJSON);
  }
}
