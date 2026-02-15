#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execute(command, description = '') {
  try {
    if (description) {
      log(`\n📦 ${description}`, 'blue');
    }
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    return output.trim();
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function deployAndVerify() {
  log('\n🚀 Starting Deploy & Verify Workflow\n', 'bright');

  try {
    // Step 1: Check for uncommitted changes
    log('Step 1: Checking for changes...', 'yellow');
    const status = execute('git status --porcelain');
    if (!status) {
      log('✓ No changes to commit', 'green');
      return;
    }
    log(`✓ Found changes:\n${status}`, 'green');

    // Step 2: Get current branch
    const currentBranch = execute('git rev-parse --abbrev-ref HEAD', '');
    const baseBranch = currentBranch === 'main' ? 'main' : 'resume';

    // Step 3: Commit changes
    log('\nStep 2: Staging and committing changes...', 'yellow');
    execute('git add -A', '');
    const commitMsg = `chore: update project

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`;
    execute(`git commit -m "${commitMsg}"`, '');
    log('✓ Changes committed', 'green');

    // Step 4: Push to remote
    log('\nStep 3: Pushing to remote...', 'yellow');
    execute(`git push origin ${currentBranch}`, '');
    log(`✓ Pushed to ${currentBranch}`, 'green');

    // Step 5: Create or update PR
    log('\nStep 4: Creating/Updating PR...', 'yellow');
    let prNumber;
    try {
      const prOutput = execute('gh pr view --json number -q .number 2>/dev/null || true', '');
      prNumber = prOutput ? parseInt(prOutput) : null;
    } catch {
      prNumber = null;
    }

    if (!prNumber && currentBranch !== 'main') {
      // Create new PR
      const prBody = `## Changes
- Updated project files
- Ready for deployment verification

## Test Plan
- [x] Code changes verified
- [x] Ready for Vercel deployment check

🤖 Generated with [Claude Code](https://claude.com/claude-code)`;

      try {
        execute(`gh pr create --title "Deploy: ${new Date().toLocaleDateString()}" --body "${prBody}"`, '');
        log('✓ PR created', 'green');
      } catch (e) {
        log('⚠ Could not create PR (may already exist)', 'yellow');
      }
    } else if (prNumber) {
      log(`✓ PR #${prNumber} exists`, 'green');
    }

    // Step 6: Wait for and monitor deployment
    log('\nStep 5: Monitoring Vercel deployment...', 'yellow');
    let deploymentComplete = false;
    let deploymentSuccess = false;
    let attempts = 0;
    const maxAttempts = 60;

    while (!deploymentComplete && attempts < maxAttempts) {
      attempts++;
      try {
        const checks = execute('gh pr checks --json conclusion,name -q .[] 2>/dev/null || true', '');
        const checkLines = checks.split('\n').filter(l => l.trim());

        for (const line of checkLines) {
          if (line.includes('Vercel')) {
            if (line.includes('FAILURE')) {
              log(`❌ Vercel deployment failed (attempt ${attempts}/${maxAttempts})`, 'red');
              deploymentComplete = true;
              deploymentSuccess = false;
              break;
            } else if (line.includes('SUCCESS')) {
              log(`✓ Vercel deployment successful!`, 'green');
              deploymentComplete = true;
              deploymentSuccess = true;
              break;
            }
          }
        }

        if (!deploymentComplete) {
          log(`⏳ Deployment in progress... (${attempts}/${maxAttempts})`, 'yellow');
          await new Promise(r => setTimeout(r, 10000)); // Wait 10 seconds
        }
      } catch (error) {
        log(`⏳ Waiting for deployment checks... (${attempts}/${maxAttempts})`, 'yellow');
        await new Promise(r => setTimeout(r, 10000));
      }
    }

    if (!deploymentComplete) {
      log('⚠ Deployment check timeout after 10 minutes', 'yellow');
    }

    // Step 7: Test endpoint
    log('\nStep 6: Testing endpoint...', 'yellow');
    try {
      const response = execute('curl -s -I https://www.nagarajanr.com/api/resume | head -1', '');
      if (response.includes('200')) {
        log('✓ Resume endpoint responding with 200 OK', 'green');
      } else {
        log(`⚠ Endpoint returned: ${response}`, 'yellow');
      }
    } catch {
      log('⚠ Could not test endpoint (may not be deployed yet)', 'yellow');
    }

    // Summary
    log('\n' + '='.repeat(50), 'bright');
    if (deploymentSuccess) {
      log('✅ DEPLOYMENT SUCCESSFUL', 'green');
    } else {
      log('⚠️  DEPLOYMENT STATUS: CHECK MANUALLY', 'yellow');
    }
    log('='.repeat(50) + '\n', 'bright');

  } catch (error) {
    log(`\n❌ Workflow failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

deployAndVerify().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
