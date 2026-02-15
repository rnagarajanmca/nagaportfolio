# Nagarajan Ravikumar Portfolio - Technical Documentation

Welcome to the comprehensive technical documentation for the portfolio project. This wiki provides architectural details, deployment guides, testing information, and design specifications.

## 📚 Documentation

### Project Documentation

- **[Architecture-Review](Architecture-Review)** - Comprehensive technical analysis including system design, component hierarchy, and architectural decisions
- **[Deployment-Guide](Deployment-Guide)** - Complete deployment workflow with step-by-step instructions
- **[Testing-Guide](#testing-guide)** - Unit, integration, and E2E testing strategies
- **[Design-System](Design-System)** - Visual blueprint and design tokens
- **[Accessibility-Performance](Accessibility-Performance)** - Accessibility standards and performance optimization
- **[Deployment-Checklist](Deployment-Checklist)** - Pre-deployment verification checklist
- **[Audit-Findings](Audit-Findings)** - Security and performance audit results

## 🧪 Test Reports

### Latest Results

- **[Latest-Test-Results](Test-Reports/Latest-Test-Results)** - Current test coverage and E2E test status
- **[Coverage-Report](#coverage-report)** - Detailed code coverage metrics
- **[E2E-Test-Results](#e2e-test-results)** - Playwright E2E test results
- **[Performance-Audits](#performance-audits)** - Lighthouse performance scores

### Historical Reports

See [Test History](History/) for archived test reports from previous CI runs.

## 🔗 Quick Links

- **[Repository](https://github.com/rnagarajanmca/nagaportfolio)** - Source code on GitHub
- **[Live Site](https://nagarajanr.com)** - Production deployment
- **[Issues](https://github.com/rnagarajanmca/nagaportfolio/issues)** - Issue tracker
- **[Discussions](https://github.com/rnagarajanmca/nagaportfolio/discussions)** - Discussions

## 📊 Project Overview

### Technology Stack

- **Framework:** Next.js 16
- **React Version:** 19.2.0
- **Styling:** Tailwind CSS 4
- **Testing:** Jest (Unit), Playwright (E2E)
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics & Speed Insights

### Test Coverage

- **Unit Tests:** 74 tests using Jest
- **E2E Tests:** 20 tests using Playwright
- **Coverage Target:** 70%+ across all metrics

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test              # Unit tests
npm run test:watch      # Unit tests in watch mode
npm run test:coverage   # Unit tests with coverage
npm run e2e             # E2E tests
npm run e2e:ui          # E2E tests with UI
```

### Building & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Run deployment verification
npm run deploy
```

## 📖 Testing Guide

### Unit Testing (Jest)

The project uses Jest for unit testing with TypeScript support. Tests are located in the same directories as the source files with `.test.ts` or `.test.tsx` extensions.

**Key Testing Patterns:**
- Component testing with React Testing Library
- Mock API responses
- CSS Module mocking with identity-obj-proxy
- Coverage targets: 70%+ (Lines, Statements, Functions, Branches)

**Run Tests:**
```bash
npm run test              # Run all tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
npm run test:ci         # CI mode with coverage
```

### E2E Testing (Playwright)

E2E tests are located in the `e2e/` directory and test complete user workflows.

**Features:**
- Chromium browser testing
- Automatic screenshots on failure
- Video recording on failure
- Trace collection on first retry
- 2 retries in CI mode

**Run Tests:**
```bash
npm run e2e             # Run all E2E tests
npm run e2e:ui         # Run with Playwright UI
npm run e2e:debug      # Debug individual tests
npm run e2e:report     # View HTML test report
```

## 📈 Coverage Report

See [Coverage-Report](Test-Reports/Coverage-Report) for detailed code coverage metrics.

**Current Metrics:**
- Lines: Measured by CI
- Statements: Measured by CI
- Functions: Measured by CI
- Branches: Measured by CI

## ✅ CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

1. **Lint:** ESLint validation
2. **Unit Tests:** Jest with coverage reporting
3. **Build:** Next.js production build
4. **E2E Tests:** Playwright test suite
5. **Reporting:** Test results published to PR/commit
6. **Artifacts:** Test reports and coverage uploaded for 30 days

## 🔐 Security & Performance

### Security Measures

- Environment variables properly managed
- No hardcoded secrets
- Security audit findings documented in [Audit-Findings](Audit-Findings)

### Performance Optimization

- Server-side rendering with Next.js
- Image optimization
- Code splitting and lazy loading
- Performance monitored with Lighthouse and Vercel Analytics

## 📝 Contributing

When contributing to this project:

1. Run tests before committing: `npm run test && npm run e2e`
2. Check code coverage: `npm run test:coverage`
3. Follow ESLint rules: `npm run lint`
4. Update documentation in `docs/` directory
5. Tests should maintain or improve coverage

## 📞 Support

For questions or issues:

- Check [Issues](https://github.com/rnagarajanmca/nagaportfolio/issues)
- Start a [Discussion](https://github.com/rnagarajanmca/nagaportfolio/discussions)
- Review this [Wiki](https://github.com/rnagarajanmca/nagaportfolio/wiki)

---

**Last Updated:** [Auto-updated by CI]

**Status:** ✅ Production Ready

**Wiki Structure:**
- `/` - This home page
- `/Test-Reports/` - Latest and historical test results
- `/History/` - Archived test reports by date
