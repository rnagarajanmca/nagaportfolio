# Contributor Attribution Policy - Quick Reference

**One-Page Summary of Project Requirements**

---

## ⚡ TL;DR

> **Only humans can be listed as contributors in git. AI tools must never appear as co-authors.**

---

## ✅ What's Allowed

```bash
# Single human author (just commit normally)
git commit -m "feat: add login feature"

# Multiple humans collaborating
git commit -m "feat: add login

Co-Authored-By: Jane Doe <jane@example.com>
Co-Authored-By: John Smith <john@example.com>"

# Mention AI help in commit message (optional)
git commit -m "feat: improve performance

Optimized rendering with GitHub Copilot suggestions.
- Reduced re-renders by 40%"
```

---

## ❌ What's Prohibited

```bash
# ❌ DO NOT DO THIS - AI as co-author
git commit -m "feat: add feature

Co-Authored-By: Claude <noreply@anthropic.com>"

# ❌ DO NOT DO THIS - AI service email
git commit -m "feat: add feature

Co-Authored-By: Development Bot <noreply@openai.com>"

# ❌ DO NOT DO THIS - AI tool name
git commit -m "feat: add feature

Co-Authored-By: ChatGPT <ai@example.com>"
```

---

## 🚫 Blocked AI Tools

The following are explicitly prohibited as co-authors:
- Claude / Haiku / Sonnet / Opus
- ChatGPT / GPT-4 / GPT-3.5
- GitHub Copilot
- Google Bard / Gemini
- Meta Llama
- Mistral
- Perplexity
- And any AI service emails

---

## 🛠️ If You Violate the Policy

**Your commit will be automatically rejected:**

```bash
$ git commit -m "feat: add login

Co-Authored-By: Claude <noreply@anthropic.com>"

❌ COMMIT REJECTED
Error: Commit message contains AI tool attribution: 'claude'
```

**To Fix:**

```bash
# Amend the commit to remove AI co-author
git commit --amend

# Remove the "Co-Authored-By: Claude" line
# Save and exit

# Try again - now it passes ✅
```

---

## 📚 Full Documentation

| Document | Purpose |
|----------|---------|
| **CONTRIBUTING.md** | Full contribution guidelines |
| **CONTRIBUTOR_ATTRIBUTION_POLICY.md** | Complete policy with rationale |
| **.githooks/README.md** | Technical hook documentation |
| **.githooks/commit-msg** | Automated enforcement hook |

---

## 💡 Tips

### Tip 1: Want to Credit AI?
Put it in the commit message, not the metadata:
```
feat: add login feature

Implemented with suggestions from GitHub Copilot.
- Used Copilot for boilerplate code
- Manually reviewed and tested all changes
```

### Tip 2: Collaborating with Humans?
Always use co-author trailers for your human teammates:
```
feat: implement payment system

Co-Authored-By: Alice Smith <alice@example.com>
Co-Authored-By: Bob Johnson <bob@example.com>
```

### Tip 3: Check Before Committing
```bash
# Review your commit message
git log -1 --pretty=%B

# Make sure:
# ✅ No AI tool names
# ✅ No AI service emails
# ✅ Only human co-authors (if any)
```

---

## 🔧 Setup Required

### First Time
```bash
npm install
# Automatically sets up git hooks
```

### Verify Setup
```bash
git config core.hooksPath
# Should output: .githooks
```

---

## 🤔 Common Questions

**Q: Can I use AI tools?**
A: Yes! Just don't list them as co-authors.

**Q: Can I mention AI in my commit?**
A: Yes, in the message body. Not in Co-Authored-By trailers.

**Q: What if I forget?**
A: The git hook catches it automatically. Just amend and try again.

**Q: Can I bypass this?**
A: Technically (`git commit --no-verify`), but you shouldn't. It's a project requirement.

**Q: Is this forever?**
A: Yes, it's a binding policy for this project.

---

## 📋 Commit Checklist

Before pushing:
- [ ] Commit builds and tests pass
- [ ] Commit message is clear
- [ ] No AI tools in Co-Authored-By trailers
- [ ] All co-authors are humans with real emails
- [ ] Only humans shown in contributors list

---

## 🚨 Policy Violations

If you see AI tools in the contributor list or git history:
1. Report it immediately
2. Create an issue with details
3. Include commits that violate policy

---

## 📞 Need Help?

1. Read `CONTRIBUTING.md` for details
2. Check `.githooks/README.md` for technical info
3. Review `CONTRIBUTOR_ATTRIBUTION_POLICY.md` for full policy
4. Open an issue if you have questions

---

## 🎯 Policy Summary

| Item | Status | Requirement |
|------|--------|------------|
| Human authors | ✅ Required | Always |
| AI co-authors | ❌ Prohibited | Never |
| AI mentions in body | ✅ Optional | Allowed |
| Human co-authors | ✅ Allowed | Required when collaborating |
| Verification | ✅ Automated | Git hooks enforce |
| Code review | ✅ Manual | Reviewers verify |

---

**Last Updated:** 2026-02-15
**Version:** 1.0.0
**Status:** ACTIVE & ENFORCED

This is a binding policy. All contributors must comply.

For questions or concerns, open an issue on GitHub.
