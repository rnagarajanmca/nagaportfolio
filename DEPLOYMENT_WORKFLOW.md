# Automated Deployment Workflow

This project includes an automated workflow to handle changes, create PRs, and verify deployments on Vercel.

## Overview

The deployment workflow automates the following steps:

1. **Detect Changes** - Identifies modified files in your working directory
2. **Commit Changes** - Stages and commits changes with appropriate messages
3. **Push to Remote** - Pushes the branch to GitHub
4. **Create/Update PR** - Creates a pull request (or identifies existing one)
5. **Monitor Deployment** - Watches Vercel deployment status
6. **Verify Endpoint** - Tests the deployed endpoint
7. **Report Status** - Provides clear deployment status

## Usage

### Command Line

```bash
npm run deploy
```

### What It Does

```
🚀 Starting Deploy & Verify Workflow

Step 1: Checking for changes...
✓ Found changes: ...

Step 2: Staging and committing changes...
✓ Changes committed

Step 3: Pushing to remote...
✓ Pushed to resume

Step 4: Creating/Updating PR...
✓ PR #14 exists

Step 5: Monitoring Vercel deployment...
✓ Vercel deployment successful!

Step 6: Testing endpoint...
✓ Resume endpoint responding with 200 OK

==================================================
✅ DEPLOYMENT SUCCESSFUL
==================================================
```

## Prerequisites

Before using this workflow, ensure:

1. **GitHub CLI installed and authenticated**
   ```bash
   gh auth login
   ```

2. **Git configured**
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

3. **Vercel token configured** (if needed for API calls)
   - Set `VERCEL_TOKEN` environment variable

## Workflow Steps Explained

### Step 1: Check for Changes
Scans your working directory for modified or new files. If no changes are found, the workflow exits early.

### Step 2: Commit Changes
- Stages all changes with `git add -A`
- Creates a commit with standardized message format
- Includes co-author attribution to Claude

### Step 3: Push to Remote
- Pushes the current branch to GitHub
- Supports both `main` and feature branches

### Step 4: Create or Update PR
- Automatically creates a new PR if one doesn't exist
- References existing PR if it's already open
- PR includes detailed description and test checklist

### Step 5: Monitor Deployment
- Polls Vercel deployment status every 10 seconds
- Waits up to 10 minutes for deployment to complete
- Reports success or failure status

### Step 6: Test Endpoint
- Performs HTTP HEAD request to deployed endpoint
- Verifies 200 OK response
- Confirms successful deployment

### Step 7: Report Status
- Displays final status summary
- Shows whether deployment was successful
- Provides next steps if manual verification is needed

## Environment Variables

Optional environment variables:

```bash
# For Vercel API access (if needed)
export VERCEL_TOKEN=your_token_here

# For GitHub CLI authentication
export GH_TOKEN=your_github_token_here
```

## Workflow Configuration

The workflow is defined in: `scripts/deploy-and-verify.js`

Key configuration:
- **Commit message format**: Includes co-author attribution
- **Deployment timeout**: 10 minutes (60 attempts × 10 seconds)
- **Endpoint test**: Tests `/api/resume` endpoint
- **Production URL**: https://www.nagarajanr.com

## Troubleshooting

### "No changes to commit"
- The workflow exits if no changes are detected
- Make sure you have uncommitted changes

### "Could not create PR"
- A PR may already exist for your branch
- Use `gh pr view` to check existing PRs

### "Deployment check timeout"
- Vercel deployment took longer than 10 minutes
- Check status manually on vercel.com

### "Endpoint test failed"
- The endpoint may not be deployed yet
- Wait a few more minutes and test manually
- Check Vercel deployment logs

## Manual Commands

If you prefer to run steps manually:

```bash
# Check status
git status

# Commit
git add -A
git commit -m "message"

# Push
git push origin <branch>

# Create PR
gh pr create --title "title" --body "body"

# Check PR status
gh pr checks

# Test endpoint
curl -I https://www.nagarajanr.com/api/resume
```

## Integration with Claude Code

To use this with Claude Code AI assistant:

1. Make your code changes
2. Request Claude to run: `npm run deploy`
3. Claude will:
   - Execute the deployment script
   - Monitor the progress
   - Report any issues
   - Verify successful deployment

Example:
```
You: "Deploy these changes and verify they work"
Claude: Executes deployment workflow and confirms success
```

## Best Practices

1. **Make atomic commits** - Keep changes focused and logical
2. **Test locally first** - Run `npm run build` before deploying
3. **Review PRs** - Always check PR details before merging
4. **Monitor deployments** - Watch the deployment progress
5. **Test endpoints** - Verify functionality after deployment

## CI/CD Integration

The workflow integrates with:

- **GitHub Actions** - Lint and test checks run automatically
- **Vercel** - Preview deployments on every push
- **ESLint** - Code quality checks
- **Next.js Build** - Production build verification

## Next Steps

After successful deployment:

1. Review the PR on GitHub
2. Merge to main if approved
3. Production deployment happens automatically
4. Verify on production URL

## Support

For issues or improvements, refer to:
- Script location: `scripts/deploy-and-verify.js`
- Configuration: `package.json` scripts
- GitHub Actions: `.github/workflows/`

---

**Last Updated**: February 2025
**Version**: 1.0
