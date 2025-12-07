#!/usr/bin/env node

/**
 * Responsive Design Test Script
 *
 * This script analyzes the codebase to verify responsive design patterns are in place.
 * Run with: node scripts/test-responsive.js
 */

const fs = require('fs');
const path = require('path');

const BREAKPOINTS = ['sm:', 'md:', 'lg:', 'xl:'];
const MOBILE_PATTERNS = [
  'min-h-\\[44px\\]', // Touch target size
  'p-4', 'p-3', 'px-4', 'py-3', // Mobile padding
  'text-sm', 'text-base', 'text-lg', // Responsive text
  'gap-2', 'gap-3', 'gap-4', // Responsive gaps
  'flex-col', 'flex-wrap', // Mobile layouts
];

const FILES_TO_CHECK = [
  'src/app/page.tsx',
  'src/app/assessment/page.tsx',
  'src/app/report/[id]/ReportPageClient.tsx',
  'src/components/report/DonutChart.tsx',
  'src/components/report/ReportDashboard.tsx',
  'src/components/report/CTASection.tsx',
  'src/components/report/NarrativeInsights.tsx',
  'src/components/assessment/MaturityRating.tsx',
  'src/components/assessment/ContactForm.tsx',
  'src/components/assessment/PriorityPicker.tsx',
  'src/components/assessment/IndustrySelector.tsx',
  'src/app/globals.css',
];

function analyzeFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    return { exists: false, filePath };
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const results = {
    filePath,
    exists: true,
    breakpoints: {},
    mobilePatterns: {},
    issues: [],
  };

  // Check for breakpoint usage
  BREAKPOINTS.forEach(bp => {
    const regex = new RegExp(bp, 'g');
    const matches = content.match(regex);
    results.breakpoints[bp] = matches ? matches.length : 0;
  });

  // Check for mobile-friendly patterns
  MOBILE_PATTERNS.forEach(pattern => {
    const regex = new RegExp(pattern, 'g');
    const matches = content.match(regex);
    results.mobilePatterns[pattern] = matches ? matches.length : 0;
  });

  // Check for potential issues
  // Large fixed padding without responsive variant
  if (content.includes('p-8') && !content.includes('sm:p-') && !content.includes('md:p-')) {
    results.issues.push('Has p-8 without responsive variants');
  }

  // Fixed large text without responsive variant
  if (content.includes('text-4xl') && !content.includes('sm:text-') && !content.includes('md:text-')) {
    results.issues.push('Has text-4xl without responsive variants');
  }

  // max-w-md on charts (might be too large for very small phones)
  if (content.includes('max-w-md') && !content.includes('max-w-[')) {
    results.issues.push('Uses max-w-md which may overflow on very small screens');
  }

  return results;
}

function generateReport() {
  console.log('\\n========================================');
  console.log('  RESPONSIVE DESIGN ANALYSIS REPORT');
  console.log('========================================\\n');

  let totalBreakpoints = { 'sm:': 0, 'md:': 0, 'lg:': 0, 'xl:': 0 };
  let filesWithIssues = 0;
  let allIssues = [];

  FILES_TO_CHECK.forEach(filePath => {
    const result = analyzeFile(filePath);

    if (!result.exists) {
      console.log(`❌ ${filePath} - FILE NOT FOUND`);
      return;
    }

    // Aggregate breakpoint counts
    Object.keys(result.breakpoints).forEach(bp => {
      totalBreakpoints[bp] += result.breakpoints[bp];
    });

    // Check for issues
    if (result.issues.length > 0) {
      filesWithIssues++;
      result.issues.forEach(issue => {
        allIssues.push({ file: filePath, issue });
      });
    }

    // Print file summary
    const bpCount = Object.values(result.breakpoints).reduce((a, b) => a + b, 0);
    const hasResponsive = bpCount > 0;
    const icon = hasResponsive ? '✅' : '⚠️';
    console.log(`${icon} ${filePath}`);
    console.log(`   Breakpoints: sm:${result.breakpoints['sm:']} md:${result.breakpoints['md:']} lg:${result.breakpoints['lg:']} xl:${result.breakpoints['xl:']}`);
    if (result.issues.length > 0) {
      console.log(`   ⚠️  Issues: ${result.issues.join(', ')}`);
    }
    console.log('');
  });

  console.log('========================================');
  console.log('  SUMMARY');
  console.log('========================================\\n');

  console.log('Total Breakpoint Usage:');
  Object.entries(totalBreakpoints).forEach(([bp, count]) => {
    console.log(`  ${bp.replace(':', '')}: ${count} occurrences`);
  });

  console.log('\\nResponsive Coverage:');
  const totalBp = Object.values(totalBreakpoints).reduce((a, b) => a + b, 0);
  console.log(`  Total responsive classes: ${totalBp}`);
  console.log(`  Files with potential issues: ${filesWithIssues}`);

  if (allIssues.length > 0) {
    console.log('\\n⚠️  Issues Found:');
    allIssues.forEach(({ file, issue }) => {
      console.log(`  - ${file}: ${issue}`);
    });
  } else {
    console.log('\\n✅ No major issues detected!');
  }

  console.log('\\n========================================');
  console.log('  RECOMMENDATIONS');
  console.log('========================================\\n');

  console.log('Test at these viewport widths:');
  console.log('  - 320px (iPhone SE)');
  console.log('  - 375px (iPhone 12/13/14)');
  console.log('  - 390px (iPhone 14 Pro)');
  console.log('  - 428px (iPhone 14 Pro Max)');
  console.log('  - 768px (iPad portrait)');
  console.log('  - 1024px (iPad landscape / small desktop)');
  console.log('');
}

// Run the report
generateReport();
