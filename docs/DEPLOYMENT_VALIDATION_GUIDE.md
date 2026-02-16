# Deployment Validation Guide

This guide walks through the complete development loop: creating a PR, merging it, and validating Vercel deployment.

## Current Status
✅ Changes made:
1. Added Vercel deployment status badge to README
2. Added live deployment indicator in footer
3. Created deployment validation GitHub Actions workflow
4. Created PR template for human-written PRs
5. Created automation script

## Steps to Complete the Loop

### 1. Push Changes to GitHub
```bash
cd portfolio
./scripts/create-pr-and-deploy.sh
```

Follow the interactive prompts to:
- Commit changes with a human-written message
- Push to your feature branch

### 2. Create Pull Request on GitHub
1. Visit: https://github.com/rnagarajanmca/nagaportfolio
2. Click "Compare & pull request" for your branch
3. Use PR template (auto-populated)
4. Title: "feat: Add deployment validation updates"
5. Description: "Updates to validate Vercel deployment workflow"
6. Create PR

### 3. Wait for CI Validation
GitHub Actions will:
- Run build and tests
- Check for AI references in code/commits/branch names
- Generate deployment validation report

### 4. Merge PR
Once CI passes:
1. Merge the PR to main branch
2. This triggers Vercel deployment automatically

### 5. Validate Vercel Deployment
1. Check Vercel dashboard: https://vercel.com/rnagarajanmca/nagaportfolio
2. Visit deployed site: https://nagaportfolio.vercel.app
3. Verify:
   - Footer shows "Deployment status: Live on Vercel"
   - README has Vercel badge
   - Site loads without errors

## Files Created/Modified

### New Files:
- `.github/workflows/vercel-deploy.yml` - Deployment validation workflow
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template
- `scripts/create-pr-and-deploy.sh` - Automation script
- `DEPLOYMENT_VALIDATION_GUIDE.md` - This guide

### Modified Files:
- `README.md` - Added Vercel deployment badge
- `src/app/page.tsx` - Added deployment status indicator in footer

## Verification Checklist

- [ ] PR created with human-written description
- [ ] No AI references in code/commits/branch names
- [ ] GitHub Actions CI passes
- [ ] PR merged to main
- [ ] Vercel deployment triggered
- [ ] Deployment completes successfully
- [ ] Site updates visible live
- [ ] Deployment logs show no errors

## Troubleshooting

### GitHub Push Issues
If `git push` fails:
```bash
# Check remote URL
git remote -v

# Use SSH if HTTPS fails
git remote set-url origin git@github.com:rnagarajanmca/nagaportfolio.git

# Ensure SSH key is added to GitHub
# Check: https://github.com/settings/keys
```

### Vercel Deployment Issues
1. Check project is linked: https://vercel.com/rnagarajanmca/nagaportfolio
2. Verify environment variables are set
3. Check build logs in Vercel dashboard

### CI Failures
1. Check GitHub Actions tab for error details
2. Ensure all tests pass locally: `npm run test:ci`
3. Verify build works: `npm run build`

## Success Metrics
- ✅ PR created and merged by human
- ✅ Vercel deployment triggered automatically
- ✅ Site updates visible within minutes
- ✅ No AI references in any part of the process
- ✅ Complete development loop validated