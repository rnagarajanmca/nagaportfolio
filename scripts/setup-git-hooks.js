#!/usr/bin/env node

/**
 * Setup Git Hooks
 *
 * Configures git to use the project's .githooks directory
 * for enforcing contributor attribution policy and commit standards.
 *
 * This script is run automatically via `npm install` (via prepare hook)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const gitHooksDir = path.join(projectRoot, '.githooks');
const gitDir = path.join(projectRoot, '.git');

function log(message, type = 'info') {
  const icons = {
    info: 'ℹ️ ',
    success: '✅',
    error: '❌',
    warning: '⚠️ ',
  };
  console.log(`${icons[type]} ${message}`);
}

function setupGitHooks() {
  try {
    // Check if .git directory exists
    if (!fs.existsSync(gitDir)) {
      log('Not a git repository - skipping git hooks setup', 'warning');
      return;
    }

    // Check if .githooks directory exists
    if (!fs.existsSync(gitHooksDir)) {
      log('No .githooks directory found - skipping setup', 'warning');
      return;
    }

    // Configure git to use our custom hooks directory
    log('Configuring git to use .githooks directory...');
    execSync(`git config core.hooksPath .githooks`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    // Verify the setup
    const result = execSync(`git config core.hooksPath`, {
      cwd: projectRoot,
      encoding: 'utf-8',
    }).trim();

    if (result === '.githooks') {
      log('Git hooks configured successfully', 'success');
      log('Installed hooks:');

      // List installed hooks
      const hooks = fs.readdirSync(gitHooksDir).filter(f => {
        const stat = fs.statSync(path.join(gitHooksDir, f));
        return stat.isFile() && (stat.mode & 0o111) !== 0; // executable files
      });

      hooks.forEach(hook => {
        log(`  • ${hook}`, 'info');
      });

      log('', 'success');
      log('Contributor Attribution Policy:', 'success');
      log('  ✅ Only human contributors may be attributed in git');
      log('  ❌ No AI tools (Claude, ChatGPT, Copilot) in commits', 'warning');
      log('  📝 See CONTRIBUTING.md for full policy details', 'info');
    } else {
      log('Failed to configure git hooks', 'error');
      process.exit(1);
    }
  } catch (error) {
    // Git might not be initialized yet, which is fine
    if (error.message.includes('not a git repository')) {
      log('Not in a git repository - skipping hooks setup', 'warning');
      return;
    }

    log(`Error setting up git hooks: ${error.message}`, 'error');
    log('You can manually set it up with:', 'info');
    log('  git config core.hooksPath .githooks', 'info');
  }
}

if (require.main === module) {
  setupGitHooks();
}

module.exports = { setupGitHooks };
