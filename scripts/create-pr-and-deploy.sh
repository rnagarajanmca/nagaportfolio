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

# Commit changes with human-written message
echo "📝 Committing changes..."
git add .
read -p "Enter commit message (human-written, no AI references): " COMMIT_MSG
git commit -m "$COMMIT_MSG"

# Push to remote
echo "📤 Pushing to remote..."
git push origin "$CURRENT_BRANCH"

echo ""
echo "✅ Changes pushed successfully!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Go to GitHub: https://github.com/rnagarajanmca/nagaportfolio"
echo "2. Click 'Compare & pull request'"
echo "3. Create PR with title: 'feat: Add deployment validation updates'"
echo "4. Add description: 'Updates to validate Vercel deployment workflow'"
echo "5. Merge the PR"
echo ""
echo "🌐 Vercel will automatically deploy from main branch"
echo "📊 Check deployment logs at: https://vercel.com/rnagarajanmca/nagaportfolio"
echo ""
echo "🔍 To verify deployment:"
echo "1. Wait for Vercel build to complete"
echo "2. Visit your deployed site"
echo "3. Check footer for 'Deployment status: Live on Vercel'"
echo "4. Verify README has Vercel badge"