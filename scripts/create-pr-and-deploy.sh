#!/bin/bash
# Script to create PR and deploy to Vercel for validation
# Run this script after making changes to test the full development loop

set -e

echo "🚀 Starting PR and deployment validation process..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 Current branch: $CURRENT_BRANCH"

# Check if changes exist
if git diff --quiet && git diff --cached --quiet; then
    echo "⚠️  No changes to commit. Please make some changes first."
    exit 1
fi

# Check for AI references in changes
echo "🔍 Checking for AI references in changes..."
if git diff --cached --name-only | xargs grep -l -iE "(ai|chatgpt|claude|openai|llm|gpt|assistant|openclaw)" 2>/dev/null; then
    echo "❌ Found AI references in changed files"
    exit 1
fi

# Commit changes with human-written message
echo "📝 Committing changes..."
git add .
echo "Enter commit message (human-written, no AI references):"
echo "Example: 'feat: Add deployment validation updates'"
read -p "> " COMMIT_MSG

# Validate commit message doesn't contain AI references
if echo "$COMMIT_MSG" | grep -iE "(ai|chatgpt|claude|openai|llm|gpt|assistant|openclaw)"; then
    echo "❌ Commit message contains AI references"
    exit 1
fi

git commit -m "$COMMIT_MSG"

# Push to remote
echo "📤 Pushing to remote..."
git push origin "$CURRENT_BRANCH"

echo ""
echo "✅ Changes pushed successfully!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Go to GitHub: https://github.com/rnagarajanmca/nagaportfolio"
echo "2. Click 'Compare & pull request' for branch: $CURRENT_BRANCH"
echo "3. Use PR template (auto-populated)"
echo "4. Title: 'feat: Add deployment validation updates'"
echo "5. Description: 'Updates to validate Vercel deployment workflow'"
echo "6. Wait for GitHub Actions CI to complete"
echo "7. Merge the PR"
echo ""
echo "🌐 Vercel will automatically deploy from main branch"
echo "📊 Check deployment logs at: https://vercel.com/rnagarajanmca/nagaportfolio"
echo "🔗 Live site: https://nagaportfolio.vercel.app"
echo ""
echo "🔍 To verify deployment:"
echo "1. Wait for Vercel build to complete (check email notifications)"
echo "2. Visit deployed site: https://nagaportfolio.vercel.app"
echo "3. Check footer for 'Deployment status: Live on Vercel'"
echo "4. Verify README has Vercel badge"
echo "5. Check GitHub Actions passed all checks"