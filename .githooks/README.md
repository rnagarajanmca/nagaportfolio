# Git Hooks

This directory contains git hooks that enforce project standards and policies.

## Hooks Included

### `commit-msg`

**Purpose:** Validate commit messages against contributor attribution policy

**Triggers:** On every commit before the commit is finalized

**Validates:**
- ✅ No AI tool co-authors in commits
- ✅ No AI service email patterns
- ✅ Encourages conventional commit format
- ✅ Warns about suspicious patterns

**Policy:**
- ❌ **PROHIBITED**: AI tools as co-authors (Claude, ChatGPT, Copilot, etc.)
- ✅ **ALLOWED**: Human co-authors only
- ✅ **OPTIONAL**: AI mentions in commit message body

## Setup

### Automatic Setup
Hooks are automatically configured when you run:
```bash
npm install
```

The `prepare` script in `package.json` runs `scripts/setup-git-hooks.js` which configures git to use this directory.

### Manual Setup
```bash
git config core.hooksPath .githooks
```

### Verify Setup
```bash
git config core.hooksPath
# Should output: .githooks
```

## Testing Hooks

### Test the commit-msg Hook

**Valid Commit (Passes):**
```bash
git commit -m "feat: add feature"
# ✅ Commit succeeds
```

**Invalid Commit (Fails):**
```bash
git commit -m "feat: add feature

Co-Authored-By: Claude <noreply@anthropic.com>"
# ❌ COMMIT REJECTED
# Error: Commit message contains AI tool attribution
```

**With Human Co-Author (Passes):**
```bash
git commit -m "feat: add feature

Co-Authored-By: Jane Doe <jane@example.com>"
# ✅ Commit succeeds
```

## Bypassing Hooks

**If absolutely necessary** (not recommended):
```bash
git commit --no-verify
```

⚠️ **WARNING**: This bypasses all hooks. Use only if you understand the implications.

## Disabling Hooks Temporarily

```bash
# Temporarily disable hooks
git config core.hooksPath /dev/null

# Re-enable hooks
git config core.hooksPath .githooks
```

## Modifying Hooks

To modify a hook:
1. Edit the hook file in this directory
2. Make sure it remains executable: `chmod +x hookname`
3. Hooks take effect on next commit

## Understanding Hook Output

### Successful Validation
```
✅ Commit message validation passed
```

### Failed Validation
```
❌ COMMIT REJECTED
Error: Commit message contains AI tool attribution: 'claude'

Policy Violation: AI tools cannot be listed as co-authors

Current trailers:
Co-Authored-By: Claude <noreply@anthropic.com>

Solution: Remove the Co-Authored-By trailer for AI tools and try again.
```

### Warnings
```
⚠️  WARNING: Commit doesn't follow conventional commit format
Recommended format: type(scope): description
Example: feat(contact): add form validation
```

## Policy Documentation

For complete policy details, see:
- **`CONTRIBUTOR_ATTRIBUTION_POLICY.md`** - Full policy statement
- **`CONTRIBUTING.md`** - Contributor guidelines
- **`.githooks/commit-msg`** - Hook implementation

## Hook Files

```
.githooks/
├── README.md              # This file
└── commit-msg             # Validates commit messages
```

## Adding New Hooks

To add a new hook:
1. Create the hook file in this directory
2. Make it executable: `chmod +x hookname`
3. Make sure it follows git hook conventions
4. Update this README with documentation

## Troubleshooting

### Hooks Not Running
```bash
# Verify configuration
git config core.hooksPath
# Should show: .githooks

# If not set, run:
npm run prepare
```

### Permission Denied
```bash
# Make hooks executable
chmod +x .githooks/*
```

### Hook Rejecting Valid Commits
1. Review the hook logic in `commit-msg`
2. Check the error message for specific violations
3. See `CONTRIBUTOR_ATTRIBUTION_POLICY.md` for policy details

### Bypassing for Emergency
```bash
# Only if absolutely necessary
git commit --no-verify -m "your message"
```

## Contributing Hook Changes

Before modifying hooks:
1. Discuss in project issues
2. Get approval from maintainer
3. Update documentation
4. Test thoroughly

---

**Last Updated:** 2026-02-15
**Hooks Status:** Active & Enforced
