# Contributing to Nagarajan Ravikumar's Portfolio

Thank you for contributing! This document outlines guidelines, requirements, and best practices for contributing to this project.

## 📋 Table of Contents

1. [Contributor Attribution Policy](#contributor-attribution-policy)
2. [Development Setup](#development-setup)
3. [Commit Message Standards](#commit-message-standards)
4. [Code Quality Requirements](#code-quality-requirements)
5. [Testing Requirements](#testing-requirements)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Issues](#reporting-issues)

---

## 🔐 Contributor Attribution Policy

### ⚠️ HARD REQUIREMENT: No AI Tool Co-Authors in Git

This project maintains a strict policy: **Only human contributors may be attributed in git commit history.**

**Why?**
- Maintains accurate record of human effort and ownership
- Preserves contributor reputation and trust
- Ensures clear accountability for code changes
- Protects project integrity

### What This Means

❌ **DO NOT** use co-author trailers for AI tools:
```bash
# ❌ PROHIBITED - Do not do this
Co-Authored-By: Claude Haiku <noreply@anthropic.com>
Co-Authored-By: ChatGPT <noreply@openai.com>
Co-Authored-By: Copilot <noreply@github.com>
```

✅ **DO** use your own name:
```bash
# ✅ CORRECT - Use only human contributors
Co-Authored-By: Jane Doe <jane@example.com>
Co-Authored-By: John Smith <john@example.com>
```

✅ **DO** mention AI assistance in commit body:
```bash
# ✅ OPTIONAL - You can mention AI help in the message body
commit message

- Improved performance with suggestions from AI tools
- Used GitHub Copilot for test writing
- Leveraged ChatGPT for documentation

This is optional and helps with transparency, but the code author
should be the only person in the Git commit metadata.
```

### Human-Only Contributors List

The contributors shown on GitHub and in `git log` should **only include humans who directly contributed code**. This is a binding requirement.

---

## 💻 Development Setup

### Prerequisites
- Node.js 20.x or later
- npm (included with Node.js)
- Git 2.13+ (for modern git features)

### Installation
```bash
# Clone the repository
git clone https://github.com/rnagarajanmca/nagaportfolio.git
cd nagaportfolio

# Install dependencies
npm install

# Set up git hooks
npm run prepare
```

### Local Development
```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

---

## 📝 Commit Message Standards

### Format
Use conventional commit format with detailed descriptions:

```
type(scope): brief description (under 50 characters)

Longer description explaining the change, why it was made,
and any relevant context. Wrap at 72 characters.

- Bullet point for major changes
- Another important detail
- List any breaking changes

Fixes #123
Relates to #456
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting, missing semicolons, etc.
- `refactor:` Code refactoring without feature changes
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build tools, dependencies, etc.
- `ci:` CI/CD configuration

### Examples

✅ **Good:**
```
feat(contact): add form validation with Zod schema

Implements client-side validation for contact form using Zod
schema validation before submission. Improves UX by providing
instant feedback on invalid inputs.

- Add Zod schema validation
- Display inline error messages
- Add aria-invalid attributes for accessibility

Fixes #42
```

✅ **Good (with AI mention):**
```
docs(readme): improve getting started section clarity

Restructured getting started section for better readability
with AI assistance for documentation refinement.

- Reordered steps logically
- Added code examples
- Added troubleshooting section
```

❌ **Bad:**
```
Implement stuff

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Co-Author Trailers (When Applicable)

**If multiple humans worked together:**
```
# ✅ CORRECT - Multiple humans
Co-Authored-By: Jane Doe <jane@example.com>
Co-Authored-By: John Smith <john@example.com>
```

**AI Tool Usage (Optional):**
Mention in commit message body, NOT in trailers:
```
feat(component): refactor Button component

Simplified component logic and improved reusability.
Leveraged GitHub Copilot for code suggestions.

- Reduced lines of code by 30%
- Improved TypeScript types
- Enhanced CSS flexibility
```

### Commit Message Validation

This project uses automated validation. Commits that violate the policy will be rejected by git hooks.

**Validation Rules:**
- ❌ No AI tool names in trailers (Claude, ChatGPT, Copilot, etc.)
- ❌ No `noreply@anthropic.com` or similar AI service emails
- ✅ Human names in Co-Authored-By trailers only
- ✅ AI mentions allowed only in commit body

---

## 🧪 Code Quality Requirements

### Linting
All code must pass ESLint:
```bash
npm run lint
```

Fix automatically:
```bash
npm run lint -- --fix
```

### TypeScript
Code must have zero TypeScript errors:
```bash
npm run type-check
```

### Code Standards
- Use TypeScript for all new code
- Follow Next.js conventions
- Use semantic HTML elements
- Include ARIA labels for interactive elements
- No console.log in production code
- No hardcoded secrets or API keys

---

## 🧪 Testing Requirements

**All changes must maintain or improve test coverage.**

### Unit Tests
```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage
```

**Requirements:**
- Minimum 70% coverage for new code
- All component changes require tests
- Use React Testing Library for DOM testing
- Mock API calls appropriately

### E2E Tests
```bash
# Run E2E tests
npm run e2e

# Interactive mode
npm run e2e:ui
```

**Requirements:**
- Critical user flows must be tested
- Contact form submission
- Navigation functionality
- Theme toggle persistence
- Resume download

### Before Committing
```bash
# Full quality check
npm run lint && npm run type-check && npm test && npm run e2e
```

---

## 🔄 Pull Request Process

### Before Opening PR
1. ✅ Branch from main: `git checkout -b feature/your-feature`
2. ✅ Make changes and test thoroughly
3. ✅ Run: `npm run lint && npm run type-check && npm test && npm run e2e`
4. ✅ Commit with proper message format
5. ✅ Verify no AI tools in commit trailers
6. ✅ Push: `git push origin feature/your-feature`

### Opening a PR
1. Create PR from your branch to `main`
2. Use the PR template (if available)
3. Link related issues with `Fixes #123` or `Relates to #456`
4. Provide clear description of changes
5. List any breaking changes
6. Request review from maintainers

### PR Checks
Your PR must pass:
- ✅ GitHub Actions CI (lint, tests, build)
- ✅ Code review (at least 1 approval)
- ✅ No merge conflicts
- ✅ All conversations resolved
- ✅ Commit messages follow standards
- ✅ No AI tool attributions in commits

### Merge Requirements
- Squash commits if multiple work-in-progress commits
- Use "Create a merge commit" option (maintains full history)
- Ensure commit message follows standards before merge

### After Merge
- Delete feature branch
- Verify changes deployed to staging
- Monitor for any issues

---

## 📝 Commit Message Checking

### Automated Validation
Git hooks automatically validate your commits. If a commit message violates the policy:

```bash
$ git commit -m "feat: add feature\n\nCo-Authored-By: Claude <noreply@anthropic.com>"
# ❌ COMMIT REJECTED
# Error: Commit message contains AI tool attribution
# Remove Co-Authored-By trailers for AI tools and try again
```

### Manual Verification
Before committing, verify your message:

```bash
# Check last commit message
git log -1 --pretty=%B

# Should show ONLY human names/emails, NO AI tool names
```

---

## 🐛 Reporting Issues

### Bug Reports
Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if relevant
- Environment (OS, Node version, browser)
- Error messages or logs

### Feature Requests
Include:
- Clear description of the feature
- Use case / why it's needed
- Proposed implementation (optional)
- Mockups or examples (if applicable)

### Security Issues
**Do NOT open public issues for security vulnerabilities.** Email security concerns to the maintainer privately.

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Playwright Docs](https://playwright.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ✅ Contributor Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style and conventions
- [ ] All tests pass locally
- [ ] Coverage maintained or improved
- [ ] TypeScript compiles without errors
- [ ] Linting passes
- [ ] Commit messages follow format
- [ ] **NO AI tool co-author trailers** ⚠️
- [ ] PR description is clear and links issues
- [ ] No console.log or debug code
- [ ] No hardcoded secrets
- [ ] Documentation updated if needed
- [ ] Accessibility considerations addressed (ARIA, semantic HTML)

---

## 🙏 Thank You!

Thank you for contributing to this project. Your human effort and expertise make this portfolio exceptional.

---

**Last Updated:** 2026-02-15
**Version:** 1.0.0

Questions? Open an issue or discussion on GitHub.
