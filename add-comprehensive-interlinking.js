/**
 * Phase 2 Final Task: Add Comprehensive Internal Linking
 * - Add hub page links to all 50 state pages
 * - Add regional comparison links between neighboring states
 * - Add contextual links to relevant long-tail content
 */

const fs = require('fs');
const path = require('path');

// All 50 US states (unhyphenated filenames)
const states = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
  'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
  'newhampshire', 'newjersey', 'newmexico', 'newyork', 'northcarolina', 'northdakota',
  'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhodeisland', 'southcarolina',
  'southdakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington',
  'westvirginia', 'wisconsin', 'wyoming'
];

// State display names
const stateNames = {
  'alabama': 'Alabama', 'alaska': 'Alaska', 'arizona': 'Arizona', 'arkansas': 'Arkansas',
  'california': 'California', 'colorado': 'Colorado', 'connecticut': 'Connecticut',
  'delaware': 'Delaware', 'florida': 'Florida', 'georgia': 'Georgia', 'hawaii': 'Hawaii',
  'idaho': 'Idaho', 'illinois': 'Illinois', 'indiana': 'Indiana', 'iowa': 'Iowa',
  'kansas': 'Kansas', 'kentucky': 'Kentucky', 'louisiana': 'Louisiana', 'maine': 'Maine',
  'maryland': 'Maryland', 'massachusetts': 'Massachusetts', 'michigan': 'Michigan',
  'minnesota': 'Minnesota', 'mississippi': 'Mississippi', 'missouri': 'Missouri',
  'montana': 'Montana', 'nebraska': 'Nebraska', 'nevada': 'Nevada',
  'newhampshire': 'New Hampshire', 'newjersey': 'New Jersey', 'newmexico': 'New Mexico',
  'newyork': 'New York', 'northcarolina': 'North Carolina', 'northdakota': 'North Dakota',
  'ohio': 'Ohio', 'oklahoma': 'Oklahoma', 'oregon': 'Oregon', 'pennsylvania': 'Pennsylvania',
  'rhodeisland': 'Rhode Island', 'southcarolina': 'South Carolina', 'southdakota': 'South Dakota',
  'tennessee': 'Tennessee', 'texas': 'Texas', 'utah': 'Utah', 'vermont': 'Vermont',
  'virginia': 'Virginia', 'washington': 'Washington', 'westvirginia': 'West Virginia',
  'wisconsin': 'Wisconsin', 'wyoming': 'Wyoming'
};

// Neighboring states mapping
const neighbors = {
  'alabama': ['florida', 'georgia', 'mississippi', 'tennessee'],
  'alaska': [], // No land borders
  'arizona': ['california', 'colorado', 'nevada', 'newmexico', 'utah'],
  'arkansas': ['louisiana', 'mississippi', 'missouri', 'oklahoma', 'tennessee', 'texas'],
  'california': ['arizona', 'nevada', 'oregon'],
  'colorado': ['arizona', 'kansas', 'nebraska', 'newmexico', 'oklahoma', 'utah', 'wyoming'],
  'connecticut': ['massachusetts', 'newyork', 'rhodeisland'],
  'delaware': ['maryland', 'newjersey', 'pennsylvania'],
  'florida': ['alabama', 'georgia'],
  'georgia': ['alabama', 'florida', 'northcarolina', 'southcarolina', 'tennessee'],
  'hawaii': [], // Island state
  'idaho': ['montana', 'nevada', 'oregon', 'utah', 'washington', 'wyoming'],
  'illinois': ['indiana', 'iowa', 'kentucky', 'michigan', 'missouri', 'wisconsin'],
  'indiana': ['illinois', 'kentucky', 'michigan', 'ohio'],
  'iowa': ['illinois', 'minnesota', 'missouri', 'nebraska', 'southdakota', 'wisconsin'],
  'kansas': ['colorado', 'missouri', 'nebraska', 'oklahoma'],
  'kentucky': ['illinois', 'indiana', 'missouri', 'ohio', 'tennessee', 'virginia', 'westvirginia'],
  'louisiana': ['arkansas', 'mississippi', 'texas'],
  'maine': ['newhampshire'],
  'maryland': ['delaware', 'pennsylvania', 'virginia', 'westvirginia'],
  'massachusetts': ['connecticut', 'newhampshire', 'newyork', 'rhodeisland', 'vermont'],
  'michigan': ['illinois', 'indiana', 'ohio', 'wisconsin'],
  'minnesota': ['iowa', 'northdakota', 'southdakota', 'wisconsin'],
  'mississippi': ['alabama', 'arkansas', 'louisiana', 'tennessee'],
  'missouri': ['arkansas', 'illinois', 'iowa', 'kansas', 'kentucky', 'nebraska', 'oklahoma', 'tennessee'],
  'montana': ['idaho', 'northdakota', 'southdakota', 'wyoming'],
  'nebraska': ['colorado', 'iowa', 'kansas', 'missouri', 'southdakota', 'wyoming'],
  'nevada': ['arizona', 'california', 'idaho', 'oregon', 'utah'],
  'newhampshire': ['maine', 'massachusetts', 'vermont'],
  'newjersey': ['delaware', 'newyork', 'pennsylvania'],
  'newmexico': ['arizona', 'colorado', 'oklahoma', 'texas'],
  'newyork': ['connecticut', 'massachusetts', 'newjersey', 'pennsylvania', 'vermont'],
  'northcarolina': ['georgia', 'southcarolina', 'tennessee', 'virginia'],
  'northdakota': ['minnesota', 'montana', 'southdakota'],
  'ohio': ['indiana', 'kentucky', 'michigan', 'pennsylvania', 'westvirginia'],
  'oklahoma': ['arkansas', 'colorado', 'kansas', 'missouri', 'newmexico', 'texas'],
  'oregon': ['california', 'idaho', 'nevada', 'washington'],
  'pennsylvania': ['delaware', 'maryland', 'newjersey', 'newyork', 'ohio', 'westvirginia'],
  'rhodeisland': ['connecticut', 'massachusetts'],
  'southcarolina': ['georgia', 'northcarolina'],
  'southdakota': ['iowa', 'minnesota', 'montana', 'nebraska', 'northdakota', 'wyoming'],
  'tennessee': ['alabama', 'arkansas', 'georgia', 'kentucky', 'mississippi', 'missouri', 'northcarolina', 'virginia'],
  'texas': ['arkansas', 'louisiana', 'newmexico', 'oklahoma'],
  'utah': ['arizona', 'colorado', 'idaho', 'nevada', 'wyoming'],
  'vermont': ['massachusetts', 'newhampshire', 'newyork'],
  'virginia': ['kentucky', 'maryland', 'northcarolina', 'tennessee', 'westvirginia'],
  'washington': ['idaho', 'oregon'],
  'westvirginia': ['kentucky', 'maryland', 'ohio', 'pennsylvania', 'virginia'],
  'wisconsin': ['illinois', 'iowa', 'michigan', 'minnesota'],
  'wyoming': ['colorado', 'idaho', 'montana', 'nebraska', 'southdakota', 'utah']
};

// Strictest states (18+ only, no exceptions)
const strictestStates = ['georgia', 'idaho', 'massachusetts', 'nevada', 'newyork', 'southcarolina', 'wyoming'];

// Most lenient states (16+ with consent)
const lenientStates = ['alabama', 'arkansas', 'colorado', 'connecticut', 'indiana', 'kansas', 'louisiana', 'mississippi', 'montana', 'ohio'];

// States allowing 16-year-olds
const states16Plus = lenientStates;

function addHubPageLinks(html, stateName) {
  const stateKey = stateName.toLowerCase().replace(/\s+/g, '');
  
  // Find the "Neighboring States" section (various formats)
  const sectionRegex = /<h3[^>]*>\s*(?:How [^<]+ Compares to Neighboring States|Comparison with Neighboring States|Neighboring States Comparison)\s*<\/h3>/i;
  
  if (!sectionRegex.test(html)) {
    console.log(`  ⚠️  No Neighboring States section found in ${stateKey}.html`);
    return html;
  }
  
  // Build hub page links section
  let hubLinks = `\n\n<!-- Hub Page Links -->\n`;
  hubLinks += `<div class="hub-links-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">\n`;
  hubLinks += `  <h3 style="color: white; margin-top: 0; font-size: 1.5rem; margin-bottom: 1rem;"><i class="fas fa-map-marked-alt"></i> Compare ${stateName} Laws Nationwide</h3>\n`;
  hubLinks += `  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">\n`;
  
  // Add relevant hub page links
  if (strictestStates.includes(stateKey)) {
    hubLinks += `    <a href="/strictest-tattoo-age-laws.html" style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-decoration: none; color: white; transition: all 0.3s; display: block; border: 2px solid rgba(255,255,255,0.3);">\n`;
    hubLinks += `      <i class="fas fa-gavel" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>\n`;
    hubLinks += `      <strong style="display: block; margin-bottom: 0.25rem;">Strictest States</strong>\n`;
    hubLinks += `      <small>Compare ${stateName}'s strict 18+ policy with other states</small>\n`;
    hubLinks += `    </a>\n`;
  }
  
  if (lenientStates.includes(stateKey)) {
    hubLinks += `    <a href="/most-lenient-tattoo-age-laws.html" style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-decoration: none; color: white; transition: all 0.3s; display: block; border: 2px solid rgba(255,255,255,0.3);">\n`;
    hubLinks += `      <i class="fas fa-heart" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>\n`;
    hubLinks += `      <strong style="display: block; margin-bottom: 0.25rem;">Most Lenient States</strong>\n`;
    hubLinks += `      <small>See how ${stateName} compares to other flexible states</small>\n`;
    hubLinks += `    </a>\n`;
  }
  
  if (states16Plus.includes(stateKey)) {
    hubLinks += `    <a href="/states-allowing-16-year-olds.html" style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-decoration: none; color: white; transition: all 0.3s; display: block; border: 2px solid rgba(255,255,255,0.3);">\n`;
    hubLinks += `      <i class="fas fa-users" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>\n`;
    hubLinks += `      <strong style="display: block; margin-bottom: 0.25rem;">States Allowing 16+</strong>\n`;
    hubLinks += `      <small>Explore all states that allow tattoos at 16</small>\n`;
    hubLinks += `    </a>\n`;
  }
  
  // Always add "All States" link
  hubLinks += `    <a href="/" style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-decoration: none; color: white; transition: all 0.3s; display: block; border: 2px solid rgba(255,255,255,0.3);">\n`;
  hubLinks += `      <i class="fas fa-flag-usa" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>\n`;
  hubLinks += `      <strong style="display: block; margin-bottom: 0.25rem;">View All 50 States</strong>\n`;
  hubLinks += `      <small>Interactive map and state-by-state comparison</small>\n`;
  hubLinks += `    </a>\n`;
  
  hubLinks += `  </div>\n`;
  hubLinks += `</div>\n`;
  
  // Insert hub links AFTER the Neighboring States section heading
  html = html.replace(sectionRegex, (match) => {
    return match + hubLinks;
  });
  
  return html;
}

function enhanceNeighboringStateLinks(html, stateKey) {
  const stateName = stateNames[stateKey];
  const neighboringStates = neighbors[stateKey] || [];
  
  if (neighboringStates.length === 0) {
    return html; // Alaska and Hawaii have no neighbors
  }
  
  // Find the h4 "Compare Laws in Neighboring States:" section
  const neighborRegex = /<h4[^>]*>Compare Laws in Neighboring States:<\/h4>/i;
  
  if (neighborRegex.test(html)) {
    // Build enhanced neighboring state links
    let neighborLinks = `<div class="neighboring-states-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">\n`;
    
    neighboringStates.forEach(neighbor => {
      const neighborName = stateNames[neighbor];
      neighborLinks += `  <a href="/${neighbor}.html" class="state-card" style="background: white; padding: 1rem; border-radius: 8px; text-decoration: none; color: #333; border: 2px solid #e0e0e0; transition: all 0.3s; display: block; text-align: center;">\n`;
      neighborLinks += `    <i class="fas fa-map-marker-alt" style="color: #667eea; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>\n`;
      neighborLinks += `    <strong style="display: block; color: #667eea;">${neighborName}</strong>\n`;
      neighborLinks += `    <small style="color: #666;">View age laws</small>\n`;
      neighborLinks += `  </a>\n`;
    });
    
    neighborLinks += `</div>\n`;
    
    // Replace the h4 heading with enhanced version
    html = html.replace(neighborRegex, (match) => {
      return `<h4>Compare Laws in Neighboring States:</h4>\n<p>Planning to get inked near the border? ${stateName} shares borders with ${neighboringStates.length} state${neighboringStates.length > 1 ? 's' : ''}, each with different tattoo age requirements:</p>\n${neighborLinks}`;
    });
  }
  
  return html;
}

function processStateFile(stateKey) {
  const filename = `${stateKey}.html`;
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`❌ SKIP: ${filename} not found`);
    return;
  }
  
  try {
    let html = fs.readFileSync(filepath, 'utf8');
    const originalLength = html.length;
    
    // Add hub page links
    html = addHubPageLinks(html, stateNames[stateKey]);
    
    // Enhance neighboring state links
    html = enhanceNeighboringStateLinks(html, stateKey);
    
    // Write updated file
    fs.writeFileSync(filepath, html, 'utf8');
    
    const addedChars = html.length - originalLength;
    console.log(`✅ ENHANCED: ${filename} (+${addedChars} chars)`);
    
  } catch (error) {
    console.error(`❌ ERROR processing ${filename}:`, error.message);
  }
}

// Main execution
console.log('🔗 Starting comprehensive interlinking for all 50 states...\n');

let processed = 0;
states.forEach(stateKey => {
  processStateFile(stateKey);
  processed++;
});

console.log(`\n✅ COMPLETE: Enhanced ${processed} state pages with hub links and neighboring state grids`);
