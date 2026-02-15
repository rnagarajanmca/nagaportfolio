#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

async function generateResumePdf() {
  try {
    console.log('Checking resume PDF for build...');

    const publicDir = path.join(__dirname, '../public');
    const pdfPath = path.join(publicDir, 'resume.pdf');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Check if PDF already exists
    if (fs.existsSync(pdfPath)) {
      const stats = fs.statSync(pdfPath);
      console.log(`✓ Resume PDF found (${(stats.size / 1024).toFixed(1)} KB)`);
      return;
    }

    console.log('⚠ No resume.pdf found in public folder');
    console.log('  Run "npm run dev" locally and visit /api/resume to generate it');
    console.log('  Then commit the public/resume.pdf file to your repository');
  } catch (error) {
    console.error('Error checking resume PDF:', error);
    // Don't fail the build
  }
}

generateResumePdf();
