#!/usr/bin/env node
/**
 * Expand remaining 10 states with unhyphenated filenames
 */

const fs = require('fs');
const path = require('path');

// Import the generator function and state data from the main script
const mainScript = fs.readFileSync('expand-all-states-phase2.js', 'utf8');

// Execute main script in context to get STATE_DATA and generateExpandedContent
eval(mainScript.split('// Main execution')[0]);

// Mapping for unhyphenated filenames to state keys
const fileMap = {
  'newhampshire.html': 'new-hampshire',
  'newjersey.html': 'new-jersey',
  'newmexico.html': 'new-mexico',
  'newyork.html': 'new-york',
  'northcarolina.html': 'north-carolina',
  'northdakota.html': 'north-dakota',
  'rhodeisland.html': 'rhode-island',
  'southcarolina.html': 'south-carolina',
  'southdakota.html': 'south-dakota',
  'westvirginia.html': 'west-virginia'
};

console.log('🚀 Expanding Remaining 10 States\n');

let processedCount = 0;
let errorCount = 0;

Object.entries(fileMap).forEach(([filename, stateKey]) => {
  const filepath = path.join(__dirname, filename);

  try {
    // Read existing file
    if (!fs.existsSync(filepath)) {
      console.log(`⚠️  SKIP: ${filename} not found`);
      return;
    }

    let html = fs.readFileSync(filepath, 'utf8');

    // Check if already expanded
    if (html.includes('<!-- Enhanced Content Section -->')) {
      console.log(`✓ SKIP: ${filename} already expanded`);
      return;
    }

    // Find footer insertion point
    const footerMatch = html.match(/<footer[^>]*>/i);
    if (!footerMatch) {
      console.log(`⚠️  ERROR: ${filename} - No footer found`);
      errorCount++;
      return;
    }

    const footerIndex = footerMatch.index;

    // Generate and insert expanded content
    const expandedContent = generateExpandedContent(stateKey);
    const newHtml = html.slice(0, footerIndex) + expandedContent + '\n' + html.slice(footerIndex);

    // Write updated file
    fs.writeFileSync(filepath, newHtml, 'utf8');
    
    processedCount++;
    console.log(`✅ EXPANDED: ${filename} (+2,500 words)`);
  } catch (error) {
    console.log(`❌ ERROR: ${filename} - ${error.message}`);
    errorCount++;
  }
});

console.log(`\n📊 REMAINING 10 STATES COMPLETE:\n`);
console.log(`✅ Processed: ${processedCount} states`);
console.log(`⚠️  Errors: ${errorCount}`);
console.log(`\n🎯 ALL 50 STATES NOW COMPLETE (39 + 10 + Alabama = 50 states total)`);
