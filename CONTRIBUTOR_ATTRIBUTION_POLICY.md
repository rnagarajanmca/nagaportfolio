# Contributor Attribution Policy

**Effective Date:** February 15, 2026
**Version:** 1.0.0
**Status:** HARD REQUIREMENT

---

## Executive Summary

This project maintains a **strict policy**: Only human contributors may be attributed in git commit history. AI tools and services are explicitly prohibited from appearing as co-authors or contributors.

**This is a binding requirement enforced through automated git hooks and code review.**

---

## 🔐 Policy Statement

### Core Principle
> All human contributors deserve clear attribution and recognition for their work. Git history is the authoritative record of who contributed what, and it must reflect accurate human effort.

### What This Means

| What | Policy | Reason |
|------|--------|--------|
| **Human co-authors** | ✅ **ALLOWED** | Accurate record of collaboration |
| **AI tool co-authors** | ❌ **PROHIBITED** | Misleads contributors list |
| **AI mentions in body** | ✅ **OPTIONAL** | Transparency without attribution |
| **Copilot/Claude/ChatGPT in trailers** | ❌ **PROHIBITED** | Violates policy |
| **Human names in trailers** | ✅ **REQUIRED** | Proper attribution |

---

## 📋 Enforcement Mechanisms

### 1. Automated Git Hooks (`.githooks/commit-msg`)

**Trigger:** On every commit
**Scope:** All branches, all contributors
**Rejection Criteria:**
- ❌ AI tool names in Co-Authored-By trailers
- ❌ AI service email addresses (e.g., `noreply@anthropic.com`)
- ❌ AI tool abbreviations (Claude, ChatGPT, GPT, Copilot, Bard, Gemini, etc.)

**Blocked Examples:**
```bash
# ❌ REJECTED - AI tool as co-author
Co-Authored-By: Claude Haiku <noreply@anthropic.com>

# ❌ REJECTED - AI service email
Co-Authored-By: Development Assistant <noreply@openai.com>

# ❌ REJECTED - AI tool abbreviation
Co-Authored-By: ChatGPT <ai@example.com>
```

**Allowed Examples:**
```bash
# ✅ ALLOWED - Human co-author
Co-Authored-By: Jane Doe <jane@example.com>

# ✅ ALLOWED - Multiple humans
Co-Authored-By: Jane Doe <jane@example.com>
Co-Authored-By: John Smith <john@example.com>

# ✅ ALLOWED - No co-authors (single contributor)
# (no Co-Authored-By trailer)

# ✅ ALLOWED - AI mentioned in message body
feat: improve performance

Optimized rendering with suggestions from GitHub Copilot.
- Performance improved 40%
- Maintained accessibility
```

### 2. Code Review Checklist

**Reviewers must verify:**
- [ ] No AI tool co-authors in commits
- [ ] No AI service email patterns
- [ ] Accurate human attribution

### 3. Pull Request Validation

**Automated checks:**
- ✅ GitHub Actions validates commit messages
- ✅ All commits must follow policy
- ✅ PR cannot be merged if validation fails

---

## 🛠️ Technical Implementation

### Git Hook Installation

**Automatic:** Runs on `npm install` via prepare script
```bash
npm install
# Automatically configures git hooks
```

**Manual Setup:**
```bash
git config core.hooksPath .githooks
```

**Verification:**
```bash
git config core.hooksPath
# Output: .githooks
```

### Hook Location
```
portfolio/
├── .githooks/
│   └── commit-msg          # Enforces policy on every commit
├── scripts/
│   └── setup-git-hooks.js  # Automatic setup script
└── package.json            # "prepare" script runs setup
```

### How It Works

1. **User commits code**
   ```bash
   git commit -m "feat: add feature"
   ```

2. **Hook triggers automatically**
   - Reads commit message from file
   - Validates against AI tool patterns
   - Checks for prohibited email patterns

3. **Validation passes ✅**
   ```bash
   ✅ Commit message validation passed
   [main abc1234] feat: add feature
   ```

4. **Validation fails ❌**
   ```bash
   ❌ COMMIT REJECTED
   Error: Commit message contains AI tool attribution
   Remove Co-Authored-By trailers for AI tools and try again
   ```

---

## 📝 Commit Message Format

### Standard Format
```
type(scope): description

Body paragraph explaining the change.
Additional context and motivation.

Footer trailers (if applicable):
Fixes #123
Relates to #456
Co-Authored-By: Human Name <human@example.com>
```

### With AI Assistance (Optional)
```
feat(component): improve performance

Optimized component rendering using AI-assisted code suggestions.

- Reduced re-renders by 40%
- Improved TypeScript types
- Used GitHub Copilot for initial implementation

Assisted by: GitHub Copilot
Related-To: #789
```

### ✅ What Passes Validation
```
Co-Authored-By: Jane Doe <jane@example.com>
Co-Authored-By: John Smith <john@example.com>
```

### ❌ What Fails Validation
```
Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: ChatGPT <api@openai.com>
Co-Authored-By: GitHub Copilot <copilot@github.com>
```

---

## 🚨 Violation Scenarios & Resolutions

### Scenario 1: Accidentally Added AI Co-Author
**What Happened:**
```bash
$ git commit -m "feat: add login\n\nCo-Authored-By: Claude <claude@example.com>"
# ❌ COMMIT REJECTED
```

**Resolution:**
1. Remove the AI co-author from the message
2. Use `git commit --amend` to fix it
3. Try again

```bash
# Edit the message to remove AI co-author
git commit --amend
# Remove the "Co-Authored-By: Claude" line
# Save and exit

# Now commit succeeds ✅
```

### Scenario 2: Human Co-Author with AI Service Email
**What Happened:**
```bash
Co-Authored-By: My Teammate <noreply@anthropic.com>
# ❌ REJECTED - email pattern matches AI service
```

**Resolution:**
Use your teammate's personal email address:
```bash
Co-Authored-By: My Teammate <teammate@personalmail.com>
# ✅ ACCEPTED
```

### Scenario 3: Want to Acknowledge AI Help
**What Happened:**
Wrote code with GitHub Copilot suggestions - how to acknowledge it?

**Solution:**
Mention in commit message body, NOT in trailers:
```bash
feat(api): implement user endpoints

Implemented REST API endpoints for user management with
suggestions from GitHub Copilot for boilerplate code.

- Created GET /users endpoint
- Created POST /users/register endpoint
- Created PUT /users/:id endpoint
- Added input validation

Implementation assisted by: GitHub Copilot
```

✅ This passes validation because AI is not in Co-Authored-By trailer

---

## 📖 Contributor Guidelines

### Before Committing
```bash
# 1. Make your changes
# 2. Review your commit message:
git log -1 --pretty=%B

# 3. Check for violations:
# - Does it have "Co-Authored-By:" lines?
# - If yes, do they contain only human names/emails?
# - Are all emails personal addresses (not AI services)?

# If you see AI tools, amend before pushing:
git commit --amend
```

### During Code Review
Reviewers check:
- [ ] No AI tool co-authors
- [ ] All Co-Authored-By trailers have human names
- [ ] No `noreply@anthropic.com` or similar patterns
- [ ] Proper human attribution

### Documentation
- See `CONTRIBUTING.md` for full guidelines
- See `.githooks/commit-msg` for technical implementation
- See `package.json` for "prepare" script setup

---

## 🔍 Policy Rationale

### Why This Matters

**1. Attribution Accuracy**
- Git history is the source of truth for contribution
- Contributors deserve clear recognition
- Preserves project integrity

**2. Legal & Compliance**
- Contributors are liable for their code
- AI-generated code has different legal considerations
- Clear attribution protects all parties

**3. Reputation**
- Humans built this project
- Human talent should be highlighted
- AI tools are assistants, not authors

**4. Career Value**
- Contributors want their work recognized
- Appearing in contributors list has career value
- AI tools don't have careers to build

### How to Acknowledge AI Help
Instead of co-authoring:
1. **Mention in commit message body** (recommended)
2. **Use acknowledgments section** in PR description
3. **Document in code comments** if relevant
4. **List in project README** credits section

This way, AI help is transparent but accurate.

---

## 🚀 Implementation Timeline

| Date | Action | Status |
|------|--------|--------|
| 2026-02-15 | Policy created and documented | ✅ Complete |
| 2026-02-15 | Git hooks implemented | ✅ Complete |
| 2026-02-15 | CONTRIBUTING.md published | ✅ Complete |
| 2026-02-15 | Setup script created | ✅ Complete |
| 2026-02-15 | All commits cleaned | ✅ Complete |
| Ongoing | Code review enforcement | ✅ Active |
| Ongoing | Hook validation | ✅ Active |

---

## ❓ FAQ

### Q: Can I use AI tools to write code?
**A:** Yes! AI tools are great for productivity. Just don't attribute them as co-authors.

### Q: How do I acknowledge AI assistance?
**A:** Mention it in your commit message body or PR description. Examples:
- "Implemented with suggestions from Copilot"
- "Using ChatGPT for documentation ideas"
- "GitHub Copilot assisted with boilerplate"

### Q: What if my team has an AI tool we use regularly?
**A:** That's fine! Use it, mention it in commits, just don't list it as a co-author.

### Q: What if I forget and commit with AI co-author?
**A:** The git hook will reject it automatically. Use `git commit --amend` to fix.

### Q: Can I bypass the hook?
**A:** Technically yes (`git commit --no-verify`), but don't. The policy is binding, and hooks help enforce it fairly.

### Q: Is this about banning AI?
**A:** No! It's about accurate attribution. AI tools are valuable assistants. They just shouldn't appear as contributors.

### Q: What about AI-only projects?
**A:** This policy is specific to this portfolio project. Other projects can have different policies.

---

## 📞 Questions or Exceptions

If you have questions about this policy:
1. Open a discussion in GitHub Issues
2. Email the maintainer
3. Reference this document

**Policy exceptions require explicit written approval** and should be rare.

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-15 | Initial policy document, git hooks, enforcement |

---

**Last Updated:** 2026-02-15
**Maintainer:** Nagarajan Ravikumar
**Status:** ACTIVE & ENFORCED

This policy is binding for all contributors to this project.
