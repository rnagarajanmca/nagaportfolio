# Resume PDF Generation Scripts

## Overview

This project generates a PDF resume from the HTML template defined in `src/lib/resumeTemplate.ts`. The resume is served as a static file from `public/resume.pdf`.

## How It Works

1. **Static PDF Serving**: The API route at `/api/resume` serves the pre-generated PDF from `public/resume.pdf`
2. **Build-time Check**: The `prebuild` script checks if the PDF exists before deployment
3. **Local Regeneration**: Use the `resume:generate` script to create a new PDF when content changes

## Scripts

### `generate-resume-pdf.js`
Runs during the `prebuild` phase. Checks if `public/resume.pdf` exists and logs its status.

### `regenerate-resume.js`
Regenerates the PDF from your resume template. Use this when you update resume content.

## Updating Your Resume

When you need to update your resume content:

1. Update the content in `src/content/site.ts` or `src/lib/resumeTemplate.ts`
2. Build the project: `npm run build`
3. Generate new PDF: `npm run resume:generate`
4. Commit the updated PDF: `git add public/resume.pdf && git commit -m "Update resume"`
5. Deploy to Vercel: `git push`

## Template

The resume template is defined in:
- **Data**: `src/lib/resumeTemplate.ts` - `buildResumeTemplateData()` function
- **HTML/CSS**: `src/lib/resumeTemplate.ts` - `renderResumeHtml()` function
- **Content**: `src/content/site.ts` - source data for the resume

**Important**: The template is carefully styled. Avoid making CSS changes unless necessary, as they can affect the PDF layout.

## Troubleshooting

### "Resume PDF not found" error on Vercel

Make sure `public/resume.pdf` is committed to your repository:
```bash
git add public/resume.pdf
git commit -m "Add resume PDF"
git push
```

### Regeneration fails

1. Make sure the project is built first: `npm run build`
2. Install Puppeteer for local development: `npm install -D puppeteer`
3. Alternatively, start the dev server and visit `/api/resume` to download the current PDF

## Dependencies

- `puppeteer-core`: PDF generation engine
- `@sparticuz/chromium`: Chromium binary for serverless environments (dev dependency)
