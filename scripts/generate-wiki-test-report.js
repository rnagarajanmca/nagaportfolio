#!/usr/bin/env node

/**
 * Generate Wiki Test Report
 *
 * This script generates a markdown test report for the GitHub Wiki
 * based on the latest Jest coverage and Playwright results.
 *
 * Usage: node scripts/generate-wiki-test-report.js
 */

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'wiki');
const TEST_REPORTS_DIR = path.join(__dirname, '..', 'test-reports');
const COVERAGE_DIR = path.join(__dirname, '..', 'coverage');

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateTestReport() {
  try {
    // Ensure wiki directory exists
    if (!fs.existsSync(WIKI_DIR)) {
      fs.mkdirSync(WIKI_DIR, { recursive: true });
    }

    const testReportsDir = path.join(WIKI_DIR, 'Test-Reports');
    if (!fs.existsSync(testReportsDir)) {
      fs.mkdirSync(testReportsDir, { recursive: true });
    }

    let coverageData = {};
    let playwrightStats = {
      totalTests: 'N/A',
      passed: 'N/A',
      failed: 'N/A',
    };

    // Read coverage summary if available
    const coverageSummaryPath = path.join(COVERAGE_DIR, 'coverage-summary.json');
    if (fs.existsSync(coverageSummaryPath)) {
      try {
        coverageData = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));
      } catch (e) {
        console.warn('Failed to parse coverage summary:', e.message);
      }
    }

    // Read Playwright results if available
    const playwrightResultsPath = path.join(TEST_REPORTS_DIR, 'playwright-results.json');
    if (fs.existsSync(playwrightResultsPath)) {
      try {
        const results = JSON.parse(fs.readFileSync(playwrightResultsPath, 'utf8'));
        playwrightStats = {
          totalTests: results.stats?.expected || 'N/A',
          passed: (results.stats?.expected || 0) - (results.stats?.unexpected || 0),
          failed: results.stats?.unexpected || 0,
        };
      } catch (e) {
        console.warn('Failed to parse Playwright results:', e.message);
      }
    }

    // Generate coverage table
    let coverageTable = '';
    if (coverageData.total) {
      const { lines, statements, functions, branches } = coverageData.total;
      coverageTable = `
| Metric | Coverage | Status |
|--------|----------|--------|
| Lines | ${lines.pct}% | ${lines.pct >= 70 ? '✅' : '⚠️'} |
| Statements | ${statements.pct}% | ${statements.pct >= 70 ? '✅' : '⚠️'} |
| Functions | ${functions.pct}% | ${functions.pct >= 70 ? '✅' : '⚠️'} |
| Branches | ${branches.pct}% | ${branches.pct >= 70 ? '✅' : '⚠️'} |
`;
    } else {
      coverageTable = '\nNo coverage data available yet. Run `npm run test:ci` to generate coverage reports.\n';
    }

    // Generate markdown report
    const timestamp = new Date().toISOString();
    const dateStr = formatDate(new Date());
    const ciRunNumber = process.env.GITHUB_RUN_NUMBER || 'local';

    const report = `# Latest Test Results

**Last Updated:** ${timestamp}
**CI Run:** #${ciRunNumber}

## Unit Test Coverage (Jest)

${coverageTable}

## E2E Test Results (Playwright)

| Metric | Count | Status |
|--------|-------|--------|
| Total Tests | ${playwrightStats.totalTests} | 📊 |
| Passed | ${playwrightStats.passed} | ${playwrightStats.failed === 0 ? '✅' : '⚠️'} |
| Failed | ${playwrightStats.failed} | ${playwrightStats.failed === 0 ? '✅' : '❌'} |

## Artifact Links

- **Coverage Report** - Download from CI artifacts
- **Playwright Report** - Download from CI artifacts

> 💡 Full test reports (HTML coverage reports and Playwright reports) are available as CI artifacts. Visit the GitHub Actions run to download.

---

**Generated at:** ${timestamp}
**Report Type:** Automated CI Test Summary

For detailed historical reports, see [Test History](../History/).
`;

    // Write the latest test results
    const latestReportPath = path.join(testReportsDir, 'Latest-Test-Results.md');
    fs.writeFileSync(latestReportPath, report);
    console.log('✅ Created Latest-Test-Results.md');

    // Archive the report with date
    const archiveDir = path.join(WIKI_DIR, 'History');
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }

    const archiveReportPath = path.join(archiveDir, `Test-Results-${dateStr}.md`);
    fs.writeFileSync(archiveReportPath, report);
    console.log(`✅ Archived report to Test-Results-${dateStr}.md`);

    console.log('✅ Wiki test report generated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error generating wiki test report:', error.message);
    return false;
  }
}

// Run if executed directly
if (require.main === module) {
  const success = generateTestReport();
  process.exit(success ? 0 : 1);
}

module.exports = { generateTestReport };
