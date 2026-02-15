#!/usr/bin/env node

/**
 * Sync Documentation to GitHub Wiki
 *
 * This script syncs documentation from docs/ directory to the GitHub Wiki.
 * It handles:
 * - Filename conversion (ARCHITECTURE_REVIEW.md → Architecture-Review.md)
 * - Link rewriting (relative links to wiki links)
 * - Image path updates
 *
 * Usage: node scripts/sync-wiki.js
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const WIKI_DIR = path.join(__dirname, '..', 'wiki');

// Mapping of docs files to wiki file names
const FILE_MAPPING = {
  'ARCHITECTURE_REVIEW.md': 'Architecture-Review.md',
  'DEPLOYMENT_WORKFLOW.md': 'Deployment-Guide.md',
  'accessibility-performance.md': 'Accessibility-Performance.md',
  'craftivo-visual-blueprint.md': 'Design-System.md',
  'deployment-checklist.md': 'Deployment-Checklist.md',
  'audit-findings.md': 'Audit-Findings.md',
  'social-preview.md': 'Social-Preview.md',
};

function convertFilename(filename) {
  if (FILE_MAPPING[filename]) {
    return FILE_MAPPING[filename];
  }
  // Convert kebab-case to Title Case
  return filename
    .replace(/\.md$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-') + '.md';
}

function rewriteLinks(content) {
  // Rewrite relative markdown links from docs to wiki format
  // [text](./other-doc.md) → [text](Other-Doc)
  content = content.replace(
    /\[([^\]]+)\]\(\.\/([^\.]+)\.md\)/g,
    (match, text, filename) => {
      const wikiName = convertFilename(filename + '.md').replace('.md', '');
      return `[${text}](${wikiName})`;
    }
  );

  // Rewrite image paths from docs/images/ to images/
  content = content.replace(/!\[([^\]]*)\]\(\.\/images\//g, '![\\$1](images/');

  return content;
}

function syncDocs() {
  try {
    // Ensure wiki directory exists
    if (!fs.existsSync(WIKI_DIR)) {
      fs.mkdirSync(WIKI_DIR, { recursive: true });
    }

    // Ensure images directory exists
    const imagesDir = path.join(WIKI_DIR, 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Read all files from docs directory
    const docsFiles = fs.readdirSync(DOCS_DIR);

    let syncedCount = 0;

    docsFiles.forEach(filename => {
      if (!filename.endsWith('.md')) {
        return;
      }

      const sourcePath = path.join(DOCS_DIR, filename);
      const wikiFilename = convertFilename(filename);
      const targetPath = path.join(WIKI_DIR, wikiFilename);

      try {
        // Read source file
        let content = fs.readFileSync(sourcePath, 'utf8');

        // Rewrite links for wiki
        content = rewriteLinks(content);

        // Write to wiki
        fs.writeFileSync(targetPath, content);
        console.log(`✅ Synced: ${filename} → ${wikiFilename}`);
        syncedCount++;
      } catch (error) {
        console.error(`❌ Error syncing ${filename}:`, error.message);
      }
    });

    // Sync images if they exist
    const docsImagesDir = path.join(DOCS_DIR, 'images');
    if (fs.existsSync(docsImagesDir)) {
      const imageFiles = fs.readdirSync(docsImagesDir);
      imageFiles.forEach(imageFile => {
        try {
          const sourceImagePath = path.join(docsImagesDir, imageFile);
          const targetImagePath = path.join(imagesDir, imageFile);
          fs.copyFileSync(sourceImagePath, targetImagePath);
          console.log(`✅ Copied image: ${imageFile}`);
        } catch (error) {
          console.error(`❌ Error copying image ${imageFile}:`, error.message);
        }
      });
    }

    console.log(`\n✅ Wiki synchronization complete (${syncedCount} files synced)`);
    return true;
  } catch (error) {
    console.error('❌ Error syncing documentation:', error.message);
    return false;
  }
}

// Run if executed directly
if (require.main === module) {
  const success = syncDocs();
  process.exit(success ? 0 : 1);
}

module.exports = { syncDocs };
