#!/bin/bash
# Automated PR and Vercel Deployment Workflow
# This script automates the complete development loop: PR creation → CI validation → Vercel deployment

set -e

echo "🚀 Automated PR and Vercel Deployment Workflow"
echo "=============================================="

# Configuration
REPO_OWNER="rnagarajanmca"
REPO_NAME="nagaportfolio"
VERCEL_PROJECT_URL="https://vercel.com/rnagarajanmca/nagaportfolio"
LIVE_SITE_URL="https://nagaportfolio.vercel.app"
GITHUB_REPO_URL="https://github.com/rnagarajanmca/nagaportfolio"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed"
        exit 1
    fi
    
    # Check if in git repo
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
    
    # Check remote
    if ! git remote get-url origin &> /dev/null; then
        print_error "No remote 'origin' configured"
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_warning "Node.js is not installed (needed for local validation)"
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_warning "npm is not installed (needed for local validation)"
    fi
    
    print_success "Prerequisites check passed"
}

# Validate changes
validate_changes() {
    print_info "Validating changes..."
    
    # Check for uncommitted changes
    if git diff --quiet && git diff --cached --quiet; then
        print_error "No changes to commit. Please make some changes first."
        exit 1
    fi
    
    # Run local tests if possible
    if command -v npm &> /dev/null; then
        print_info "Running local validation..."
        
        # Check if we can run build
        if [ -f "package.json" ]; then
            echo "Installing dependencies..."
            npm ci --silent || npm install --silent
            
            echo "Running lint check..."
            npm run lint --silent || print_warning "Lint check failed or not configured"
            
            echo "Running type check..."
            npx tsc --noEmit --silent || print_warning "Type check failed or not configured"
            
            echo "Running build..."
            npm run build --silent && print_success "Build successful" || {
                print_error "Build failed"
                exit 1
            }
        fi
    fi
    
    print_success "Local validation passed"
}

# Create feature branch
create_feature_branch() {
    print_info "Creating feature branch..."
    
    # Generate branch name with timestamp
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    BRANCH_NAME="feature/vercel-validation-$TIMESTAMP"
    
    # Create and switch to new branch
    git checkout -b "$BRANCH_NAME"
    print_success "Created branch: $BRANCH_NAME"
    
    echo "$BRANCH_NAME"
}

# Commit changes
commit_changes() {
    print_info "Committing changes..."
    
    # Stage all changes
    git add .
    
    # Get commit message
    echo ""
    echo "Please enter a commit message (human-written, no AI references):"
    echo "Example: 'feat: Add deployment validation workflow improvements'"
    echo ""
    read -p "Commit message: " COMMIT_MSG
    
    # Validate commit message
    if echo "$COMMIT_MSG" | grep -iE "(ai|chatgpt|claude|openai|llm|gpt|assistant|bot)" > /dev/null; then
        print_error "Commit message contains AI references. Please write a human-written message."
        exit 1
    fi
    
    # Commit
    git commit -m "$COMMIT_MSG"
    print_success "Committed changes with message: $COMMIT_MSG"
}

# Push to GitHub
push_to_github() {
    local BRANCH_NAME="$1"
    
    print_info "Pushing to GitHub..."
    
    # Push branch
    git push origin "$BRANCH_NAME"
    print_success "Pushed branch to GitHub"
    
    # Return the branch name for PR creation
    echo "$BRANCH_NAME"
}

# Create PR instructions
create_pr_instructions() {
    local BRANCH_NAME="$1"
    
    print_info "Creating PR instructions..."
    
    cat << EOF

🎉 SUCCESS! Changes pushed to GitHub.

📋 NEXT STEPS TO COMPLETE THE DEVELOPMENT LOOP:

1. CREATE PULL REQUEST:
   - Go to: $GITHUB_REPO_URL
   - Click "Compare & pull request" for branch: $BRANCH_NAME
   - Or use this direct link: $GITHUB_REPO_URL/compare/main...$BRANCH_NAME

2. FILL PR DETAILS:
   - Title: "feat: Add deployment validation workflow improvements"
   - Description: "This PR adds enhanced deployment validation and automation for the Vercel deployment workflow."
   - Review the PR template for additional details

3. WAIT FOR CI VALIDATION:
   - GitHub Actions will automatically run:
     ✅ Build validation
     ✅ Test execution
     ✅ AI reference check
     ✅ Deployment readiness check

4. MERGE THE PR:
   - Once CI passes, merge the PR to main branch
   - This will trigger Vercel deployment automatically

5. VERIFY VERCEL DEPLOYMENT:
   - Check Vercel dashboard: $VERCEL_PROJECT_URL
   - Visit deployed site: $LIVE_SITE_URL
   - Verify deployment status in footer
   - Check build logs for any issues

🔍 VALIDATION CHECKLIST:
- [ ] PR created with human-written description
- [ ] No AI references in code/commits/branch names
- [ ] GitHub Actions CI passes
- [ ] PR merged to main
- [ ] Vercel deployment triggered
- [ ] Deployment completes successfully
- [ ] Site updates visible live

📊 MONITORING:
- GitHub Actions: $GITHUB_REPO_URL/actions
- Vercel Deployments: $VERCEL_PROJECT_URL/deployments
- Live Site: $LIVE_SITE_URL

💡 TIPS:
- Keep an eye on the GitHub Actions tab for real-time CI status
- Check Vercel logs if deployment fails
- Verify the site loads correctly after deployment
- Test key functionality on the deployed site

EOF
}

# Main workflow
main() {
    echo ""
    print_info "Starting automated PR and deployment workflow..."
    echo ""
    
    # Step 1: Check prerequisites
    check_prerequisites
    
    # Step 2: Validate changes
    validate_changes
    
    # Step 3: Create feature branch
    BRANCH_NAME=$(create_feature_branch)
    
    # Step 4: Commit changes
    commit_changes
    
    # Step 5: Push to GitHub
    BRANCH_NAME=$(push_to_github "$BRANCH_NAME")
    
    # Step 6: Create PR instructions
    create_pr_instructions "$BRANCH_NAME"
    
    print_success "Workflow completed! Follow the instructions above to complete the development loop."
}

# Run main function
main "$@"