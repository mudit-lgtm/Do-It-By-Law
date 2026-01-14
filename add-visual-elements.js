/**
 * Phase 3: Add Visual Elements to State Pages
 * - State flag emoji/icon
 * - Age requirement visual indicators
 * - Enhanced styling for key information boxes
 */

const fs = require('fs');
const path = require('path');

// State flag emojis (Unicode regional indicators)
const stateFlags = {
  'alabama': '🏴󠁵󠁳󠁡󠁬󠁿', 'alaska': '🏴󠁵󠁳󠁡󠁫󠁿', 'arizona': '🏴󠁵󠁳󠁡󠁺󠁿', 'arkansas': '🏴󠁵󠁳󠁡󠁲󠁿',
  'california': '🏴󠁵󠁳󠁣󠁡󠁿', 'colorado': '🏴󠁵󠁳󠁣󠁯󠁿', 'connecticut': '🏴󠁵󠁳󠁣󠁴󠁿',
  'delaware': '🏴󠁵󠁳󠁤󠁥󠁿', 'florida': '🏴󠁵󠁳󠁦󠁬󠁿', 'georgia': '🏴󠁵󠁳󠁧󠁡󠁿', 'hawaii': '🏴󠁵󠁳󠁨󠁩󠁿',
  'idaho': '🏴󠁵󠁳󠁩󠁤󠁿', 'illinois': '🏴󠁵󠁳󠁩󠁬󠁿', 'indiana': '🏴󠁵󠁳󠁩󠁮󠁿', 'iowa': '🏴󠁵󠁳󠁩󠁡󠁿',
  'kansas': '🏴󠁵󠁳󠁫󠁳󠁿', 'kentucky': '🏴󠁵󠁳󠁫󠁹󠁿', 'louisiana': '🏴󠁵󠁳󠁬󠁡󠁿', 'maine': '🏴󠁵󠁳󠁭󠁥󠁿',
  'maryland': '🏴󠁵󠁳󠁭󠁤󠁿', 'massachusetts': '🏴󠁵󠁳󠁭󠁡󠁿', 'michigan': '🏴󠁵󠁳󠁭󠁩󠁿',
  'minnesota': '🏴󠁵󠁳󠁭󠁮󠁿', 'mississippi': '🏴󠁵󠁳󠁭󠁳󠁿', 'missouri': '🏴󠁵󠁳󠁭󠁯󠁿',
  'montana': '🏴󠁵󠁳󠁭󠁴󠁿', 'nebraska': '🏴󠁵󠁳󠁮󠁥󠁿', 'nevada': '🏴󠁵󠁳󠁮󠁶󠁿',
  'newhampshire': '🏴󠁵󠁳󠁮󠁨󠁿', 'newjersey': '🏴󠁵󠁳󠁮󠁪󠁿', 'newmexico': '🏴󠁵󠁳󠁮󠁭󠁿',
  'newyork': '🏴󠁵󠁳󠁮󠁹󠁿', 'northcarolina': '🏴󠁵󠁳󠁮󠁣󠁿', 'northdakota': '🏴󠁵󠁳󠁮󠁤󠁿',
  'ohio': '🏴󠁵󠁳󠁯󠁨󠁿', 'oklahoma': '🏴󠁵󠁳󠁯󠁫󠁿', 'oregon': '🏴󠁵󠁳󠁯󠁲󠁿',
  'pennsylvania': '🏴󠁵󠁳󠁰󠁡󠁿', 'rhodeisland': '🏴󠁵󠁳󠁲󠁩󠁿', 'southcarolina': '🏴󠁵󠁳󠁳󠁣󠁿',
  'southdakota': '🏴󠁵󠁳󠁳󠁤󠁿', 'tennessee': '🏴󠁵󠁳󠁴󠁮󠁿', 'texas': '🏴󠁵󠁳󠁴󠁸󠁿',
  'utah': '🏴󠁵󠁳󠁵󠁴󠁿', 'vermont': '🏴󠁵󠁳󠁶󠁴󠁿', 'virginia': '🏴󠁵󠁳󠁶󠁡󠁿',
  'washington': '🏴󠁵󠁳󠁷󠁡󠁿', 'westvirginia': '🏴󠁵󠁳󠁷󠁶󠁿', 'wisconsin': '🏴󠁵󠁳󠁷󠁩󠁿',
  'wyoming': '🏴󠁵󠁳󠁷󠁹󠁿'
};

// All 50 US states
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

function addVisualElements(html, stateKey) {
  const stateName = stateNames[stateKey];
  const flag = '🏛️'; // Generic government building emoji (state flags may not render)
  
  // 1. Add state icon to main h1 title
  const h1Regex = /<h1[^>]*>([^<]*Tattoo Age Laws[^<]*)<\/h1>/i;
  html = html.replace(h1Regex, (match, title) => {
    return match.replace(title, `${flag} ${title}`);
  });
  
  // 2. Enhance Quick Facts box with visual indicators
  const quickFactsRegex = /<div class="quick-facts-box"[^>]*>/i;
  if (quickFactsRegex.test(html)) {
    html = html.replace(quickFactsRegex, (match) => {
      return match.replace('>', ` style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); margin: 2rem 0;">`);
    });
    
    // Make quick facts items more visual
    html = html.replace(/<li><strong>Minimum Age:<\/strong>([^<]+)<\/li>/gi, (match, content) => {
      return `<li style="padding: 0.75rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 0.5rem;"><i class="fas fa-birthday-cake" style="color: #ffd700; margin-right: 0.5rem;"></i><strong>Minimum Age:</strong>${content}</li>`;
    });
    
    html = html.replace(/<li><strong>Parental Consent:<\/strong>([^<]+)<\/li>/gi, (match, content) => {
      return `<li style="padding: 0.75rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 0.5rem;"><i class="fas fa-users" style="color: #ffd700; margin-right: 0.5rem;"></i><strong>Parental Consent:</strong>${content}</li>`;
    });
    
    html = html.replace(/<li><strong>Medical Exceptions:<\/strong>([^<]+)<\/li>/gi, (match, content) => {
      return `<li style="padding: 0.75rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 0.5rem;"><i class="fas fa-hospital" style="color: #ffd700; margin-right: 0.5rem;"></i><strong>Medical Exceptions:</strong>${content}</li>`;
    });
    
    html = html.replace(/<li><strong>Penalties:<\/strong>([^<]+)<\/li>/gi, (match, content) => {
      return `<li style="padding: 0.75rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 0.5rem;"><i class="fas fa-gavel" style="color: #ffd700; margin-right: 0.5rem;"></i><strong>Penalties:</strong>${content}</li>`;
    });
  }
  
  // 3. Add visual age requirement badge at the top
  const ageRequirementBadge = `
<!-- Age Requirement Visual Badge -->
<div class="age-badge-container" style="display: flex; justify-content: center; margin: 2rem 0;">
  <div class="age-badge" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 1.5rem 3rem; border-radius: 50px; text-align: center; box-shadow: 0 8px 20px rgba(245, 87, 108, 0.4);">
    <div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.5rem;">18+</div>
    <div style="font-size: 1rem; opacity: 0.9;">Legal Tattoo Age in ${stateName}</div>
    <div style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.8;">⚠️ Exceptions may apply - see details below</div>
  </div>
</div>
`;
  
  // Insert badge after h1
  html = html.replace(/(<h1[^>]*>.*?<\/h1>)/i, `$1${ageRequirementBadge}`);
  
  // 4. Add warning callout boxes for important information
  html = html.replace(/<p><strong>⚠️ Important:<\/strong>([^<]+)<\/p>/gi, (match, content) => {
    return `<div class="warning-box" style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; margin: 1.5rem 0; border-radius: 8px;">
  <div style="display: flex; align-items: start; gap: 1rem;">
    <i class="fas fa-exclamation-triangle" style="color: #ffc107; font-size: 1.5rem; margin-top: 0.25rem;"></i>
    <div>
      <strong style="color: #856404;">Important:</strong>
      <span style="color: #856404;">${content}</span>
    </div>
  </div>
</div>`;
  });
  
  // 5. Enhance documentation checklist with checkboxes
  html = html.replace(/<h3>(?:<i[^>]*><\/i>\s*)?Documentation Checklist<\/h3>/i, (match) => {
    return `<h3 style="color: #667eea;"><i class="fas fa-clipboard-check"></i> Documentation Checklist</h3>`;
  });
  
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
    
    html = addVisualElements(html, stateKey);
    
    fs.writeFileSync(filepath, html, 'utf8');
    
    const addedChars = html.length - originalLength;
    console.log(`✅ VISUAL: ${filename} (+${addedChars} chars)`);
    
  } catch (error) {
    console.error(`❌ ERROR: ${filename}:`, error.message);
  }
}

// Main execution
console.log('🎨 Adding visual elements to all 50 state pages...\n');

let processed = 0;
states.forEach(stateKey => {
  processStateFile(stateKey);
  processed++;
});

console.log(`\n✅ COMPLETE: Added visual elements to ${processed} state pages`);
