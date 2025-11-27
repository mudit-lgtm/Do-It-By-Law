#!/usr/bin/env node

// ========================================
// STATE PAGE GENERATOR - PHASE 3
// Generates HTML pages for all 50 states
// ========================================

const fs = require('fs');
const path = require('path');

// Load state data
const { stateLaws } = require('./js/state-data.js');

// Template placeholders and their mappings
const replacePlaceholder = (template, state, stateKey) => {
  const replacements = {
    // State name and abbreviation
    'Alabama': state.name,
    'alabama': stateKey,
    'ALABAMA': state.name.toUpperCase(),
    'AL': state.abbreviation,
    
    // Legal code
    'AL Code § 22-17A-2': state.legalCode,
    
    // Penalty
    'Class C misdemeanor (up to 3 months jail, $500 fine)': state.penalty,
    
    // Age and consent info
    '18': state.minAge.toString(),
    
    // Notes and restrictions
    'Alabama does not allow tattooing of minors under any circumstances.': state.notes,
    'Patron may not be intoxicated or otherwise impaired': state.restrictions,
    
    // Colors (using state-specific colors based on strictness)
    '#c8102e': getStateColor(state.strictnessLevel),
    
    // Map file
    'alabama-map.svg': `${stateKey}-map.svg`,
    
    // Consent information
    'No parental consent allowed': state.parentalConsentAllowed 
      ? `Parental consent allowed at age ${state.consentAge}` 
      : 'No parental consent allowed',
    
    // Quick answer
    'You must be <strong>18 years old</strong> to get a tattoo in Alabama. No exceptions for parental consent.': 
      generateQuickAnswer(state, stateKey)
  };
  
  let result = template;
  
  // Replace all occurrences
  for (const [search, replace] of Object.entries(replacements)) {
    const regex = new RegExp(escapeRegex(search), 'g');
    result = result.replace(regex, replace);
  }
  
  // Update canonical URL
  result = result.replace(
    /https:\/\/doitbylaw\.com\/alabama\.html/g,
    `https://doitbylaw.com/${stateKey}.html`
  );
  
  // Update meta description
  result = result.replace(
    /<meta name="description" content="[^"]+"/,
    `<meta name="description" content="Complete guide to ${state.name} tattoo age laws 2025. Legal age: ${state.minAge}. ${state.parentalConsentAllowed ? 'Parental consent allowed at ' + state.consentAge : 'No parental consent'}. Penalties, requirements & FAQs."`
  );
  
  // Update meta keywords
  result = result.replace(
    /<meta name="keywords" content="[^"]+"/,
    `<meta name="keywords" content="${stateKey} tattoo laws, tattoo age ${stateKey}, ${state.name} tattoo age requirements, legal age tattoo ${state.name}, ${stateKey} body art laws, tattoo parental consent ${stateKey}"`
  );
  
  // Update title tag
  result = result.replace(
    /<title>[^<]+<\/title>/,
    `<title>${state.name} Tattoo Age Laws 2025 | How Old to Get Tattoo in ${state.name}</title>`
  );
  
  // Update Open Graph tags
  result = result.replace(
    /<meta property="og:title" content="[^"]+"/,
    `<meta property="og:title" content="${state.name} Tattoo Age Laws 2025 | Legal Age Guide"`
  );
  
  result = result.replace(
    /<meta property="og:url" content="[^"]+"/,
    `<meta property="og:url" content="https://doitbylaw.com/${stateKey}.html"`
  );
  
  // Update JSON-LD structured data
  result = updateStructuredData(result, state, stateKey);
  
  return result;
};

// Helper: Escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper: Get color based on strictness level
function getStateColor(strictness) {
  const colors = {
    'strict': '#c8102e',    // Red
    'moderate': '#f59e0b',  // Yellow/Amber
    'lenient': '#10b981'    // Green
  };
  return colors[strictness] || '#2563eb'; // Blue as default
}

// Helper: Generate quick answer text
function generateQuickAnswer(state, stateKey) {
  if (!state.parentalConsentAllowed) {
    return `You must be <strong>${state.minAge} years old</strong> to get a tattoo in ${state.name}. No exceptions for parental consent.`;
  } else if (state.consentAge < state.minAge) {
    return `You must be <strong>${state.minAge} years old</strong> to get a tattoo in ${state.name}. However, minors aged <strong>${state.consentAge} and older</strong> may get tattooed with written parental consent and presence.`;
  } else {
    return `You must be <strong>${state.minAge} years old</strong> to get a tattoo in ${state.name}. Parental consent and presence required for minors.`;
  }
}

// Helper: Update JSON-LD structured data
function updateStructuredData(html, state, stateKey) {
  // Update Article schema
  html = html.replace(
    /"name": "Alabama Tattoo Age Laws 2025"/,
    `"name": "${state.name} Tattoo Age Laws 2025"`
  );
  
  html = html.replace(
    /"headline": "Alabama Tattoo Age Laws 2025"/,
    `"headline": "${state.name} Tattoo Age Laws 2025"`
  );
  
  // Update FAQPage schema
  const faqRegex = /"name": "How old do you have to be to get a tattoo in Alabama\?",\s*"acceptedAnswer":\s*{\s*"@type": "Answer",\s*"text": "[^"]+"/;
  html = html.replace(
    faqRegex,
    `"name": "How old do you have to be to get a tattoo in ${state.name}?",\n          "acceptedAnswer": {\n            "@type": "Answer",\n            "text": "In ${state.name}, you must be ${state.minAge} years old to get a tattoo. ${state.parentalConsentAllowed ? 'Minors aged ' + state.consentAge + ' may get tattooed with parental consent and presence.' : 'No exceptions are made for parental consent.'}"`
  );
  
  // Update breadcrumb
  html = html.replace(
    /"name": "Alabama Laws"/,
    `"name": "${state.name} Laws"`
  );
  
  html = html.replace(
    /alabama\.html/g,
    `${stateKey}.html`
  );
  
  return html;
}

// Helper: Create placeholder SVG map for states
function createStateSVG(stateKey, stateName, color) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" fill="${color}">
  <rect width="300" height="200" fill="${color}" opacity="0.1"/>
  <text x="150" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${color}">
    ${stateName}
  </text>
  <text x="150" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="${color}" opacity="0.7">
    Map Placeholder
  </text>
</svg>`;
  
  const svgPath = path.join(__dirname, 'images', `${stateKey}-map.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✓ Created ${stateKey}-map.svg`);
}

// Main generator function
async function generateStatePages() {
  console.log('========================================');
  console.log('STATE PAGE GENERATOR - PHASE 3');
  console.log('========================================\n');
  
  // Read template
  const templatePath = path.join(__dirname, 'alabama.html');
  const template = fs.readFileSync(templatePath, 'utf-8');
  console.log('✓ Loaded alabama.html template\n');
  
  // States to skip (already created)
  const skipStates = ['alabama', 'alaska', 'california', 'florida', 'georgia'];
  
  // Generate pages
  let created = 0;
  let skipped = 0;
  
  for (const [stateKey, state] of Object.entries(stateLaws)) {
    if (skipStates.includes(stateKey)) {
      console.log(`⊘ Skipping ${state.name} (already exists)`);
      skipped++;
      continue;
    }
    
    try {
      // Generate HTML content
      const htmlContent = replacePlaceholder(template, state, stateKey);
      
      // Write HTML file
      const htmlPath = path.join(__dirname, `${stateKey}.html`);
      fs.writeFileSync(htmlPath, htmlContent);
      
      // Create SVG map placeholder
      createStateSVG(stateKey, state.name, getStateColor(state.strictnessLevel));
      
      console.log(`✓ Created ${stateKey}.html - ${state.name}`);
      created++;
    } catch (error) {
      console.error(`✗ Error creating ${stateKey}.html:`, error.message);
    }
  }
  
  console.log('\n========================================');
  console.log(`GENERATION COMPLETE`);
  console.log(`Created: ${created} state pages`);
  console.log(`Skipped: ${skipped} state pages (already exist)`);
  console.log(`Total: ${Object.keys(stateLaws).length} states`);
  console.log('========================================\n');
}

// Run generator
generateStatePages().catch(console.error);
