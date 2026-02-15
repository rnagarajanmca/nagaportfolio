#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */

/**
 * Script to regenerate the resume PDF from the template.
 * Run this when you update resume content to create a new PDF.
 *
 * Usage: node scripts/regenerate-resume.js
 */

const fs = require('fs');
const path = require('path');

async function regenerateResume() {
  console.log('🔄 Regenerating resume PDF...\n');

  try {
    // Check for required dependencies
    const puppeteer = require('puppeteer-core');
    const chromium = require('@sparticuz/chromium');

    // Try local Puppeteer first for development
    let browser;
    let usingLocal = false;

    try {
      const puppeteerDefault = require('puppeteer');
      console.log('Using local Puppeteer...');
      browser = await puppeteerDefault.launch({ headless: 'new' });
      usingLocal = true;
    } catch (e) {
      console.log('Using Chromium from @sparticuz/chromium...');
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }

    // Load the template from the built files
    const { buildResumeTemplateData, renderResumeHtml } = require('../.next/server/app/lib/resumeTemplate.js');
    const { siteContent } = require('../.next/server/app/content/site.js');

    console.log('Generating HTML from template...');
    const templateData = buildResumeTemplateData(siteContent);
    const html = renderResumeHtml(templateData);

    console.log('Converting HTML to PDF...');
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '18mm',
        left: '15mm',
      },
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    // Save the PDF
    const publicDir = path.join(__dirname, '../public');
    const pdfPath = path.join(publicDir, 'resume.pdf');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(pdfPath, pdfBuffer);

    const sizeMB = (pdfBuffer.length / 1024).toFixed(1);
    console.log(`\n✅ Resume PDF generated successfully!`);
    console.log(`   Location: public/resume.pdf`);
    console.log(`   Size: ${sizeMB} KB`);
    console.log(`\n💡 Don't forget to commit the updated PDF file!`);

  } catch (error) {
    console.error('\n❌ Error generating resume:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure you have built the project first: npm run build');
    console.error('2. Install puppeteer for local development: npm install -D puppeteer');
    console.error('3. Or use the API route: start dev server and visit /api/resume');
    process.exit(1);
  }
}

regenerateResume();
