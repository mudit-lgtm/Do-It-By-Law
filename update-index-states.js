const fs = require('fs');

// Read current index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Generate all 50 state cards
const stateData = {
    'alabama': { age: 18, consent: false, penalty: 'Class C misdemeanor' },
    'alaska': { age: 18, consent: false, penalty: 'Class B misdemeanor', medical: true },
    'arizona': { age: 18, consent: false, penalty: 'Class 3 misdemeanor' },
    'arkansas': { age: 18, consent: false, penalty: 'Class A misdemeanor' },
    'california': { age: 18, consent: false, penalty: 'Misdemeanor', medical: true },
    'colorado': { age: 18, consent: false, penalty: 'Class 2 misdemeanor' },
    'connecticut': { age: 18, consent: false, penalty: 'Infraction' },
    'delaware': { age: 18, consent: false, penalty: 'Unclassified misdemeanor', medical: true },
    'florida': { age: 16, consent: true, penalty: '2nd degree misdemeanor' },
    'georgia': { age: 16, consent: true, penalty: 'Misdemeanor' },
    'hawaii': { age: 18, consent: false, penalty: 'Petty misdemeanor' },
    'idaho': { age: 18, consent: false, penalty: 'Misdemeanor' },
    'illinois': { age: 16, consent: true, penalty: 'Class A misdemeanor' },
    'indiana': { age: 18, consent: false, penalty: 'Class C misdemeanor' },
    'iowa': { age: 18, consent: false, penalty: 'Simple misdemeanor' },
    'kansas': { age: 18, consent: false, penalty: 'Class B misdemeanor', medical: true },
    'kentucky': { age: 18, consent: false, penalty: 'Class A misdemeanor' },
    'louisiana': { age: 16, consent: true, penalty: 'Misdemeanor', medical: true },
    'maine': { age: 18, consent: false, penalty: 'Civil violation' },
    'maryland': { age: 16, consent: true, penalty: 'Misdemeanor' },
    'massachusetts': { age: 18, consent: false, penalty: 'Fine up to $300' },
    'michigan': { age: 18, consent: false, penalty: 'Misdemeanor' },
    'minnesota': { age: 16, consent: true, penalty: 'Misdemeanor' },
    'mississippi': { age: 16, consent: true, penalty: 'Misdemeanor' },
    'missouri': { age: 18, consent: false, penalty: 'Class A misdemeanor' },
    'montana': { age: 16, consent: true, penalty: 'Misdemeanor' },
    'nebraska': { age: 18, consent: false, penalty: 'Class III misdemeanor' },
    'nevada': { age: 18, consent: false, penalty: 'Misdemeanor' },
    'newhampshire': { age: 18, consent: false, penalty: 'Violation', displayName: 'New Hampshire' },
    'newjersey': { age: 18, consent: false, penalty: 'Disorderly persons offense', displayName: 'New Jersey' },
    'newmexico': { age: 16, consent: true, penalty: 'Petty misdemeanor', displayName: 'New Mexico' },
    'newyork': { age: 18, consent: false, penalty: 'Violation', displayName: 'New York' },
    'northcarolina': { age: 18, consent: false, penalty: 'Class 2 misdemeanor', displayName: 'North Carolina' },
    'northdakota': { age: 18, consent: false, penalty: 'Class B misdemeanor', displayName: 'North Dakota' },
    'ohio': { age: 16, consent: true, penalty: 'Minor misdemeanor' },
    'oklahoma': { age: 16, consent: true, penalty: 'Misdemeanor' },
    'oregon': { age: 18, consent: false, penalty: 'Class A violation' },
    'pennsylvania': { age: 18, consent: false, penalty: 'Summary offense', medical: true },
    'rhodeisland': { age: 18, consent: false, penalty: 'Misdemeanor', displayName: 'Rhode Island' },
    'southcarolina': { age: 18, consent: false, penalty: 'Misdemeanor', displayName: 'South Carolina' },
    'southdakota': { age: 18, consent: false, penalty: 'Class 2 misdemeanor', displayName: 'South Dakota' },
    'tennessee': { age: 18, consent: false, penalty: 'Class A misdemeanor' },
    'texas': { age: 18, consent: false, penalty: 'Class A misdemeanor' },
    'utah': { age: 18, consent: false, penalty: 'Class B misdemeanor' },
    'vermont': { age: 18, consent: false, penalty: 'Administrative penalty' },
    'virginia': { age: 18, consent: false, penalty: 'Class 1 misdemeanor' },
    'washington': { age: 18, consent: false, penalty: 'Misdemeanor' },
    'westvirginia': { age: 18, consent: false, penalty: 'Misdemeanor', displayName: 'West Virginia' },
    'wisconsin': { age: 18, consent: false, penalty: 'Class A misdemeanor' },
    'wyoming': { age: 18, consent: false, penalty: 'Misdemeanor' }
};

const featuredStates = ['alabama', 'texas', 'california', 'florida', 'newyork'];
const stateKeys = Object.keys(stateData).sort();

let stateCardsHtml = '';

// Featured states first
featuredStates.forEach(stateKey => {
    const state = stateData[stateKey];
    const displayName = state.displayName || stateKey.charAt(0).toUpperCase() + stateKey.slice(1);
    
    stateCardsHtml += `
        <article class="state-card featured">
          <div class="state-header">
            <img src="images/${stateKey}-map.svg" alt="${displayName}" class="state-icon" width="60" height="60">
            <h3>${displayName}</h3>
            <span class="badge">Featured</span>
          </div>
          <div class="state-body">
            <div class="law-summary">
              <p class="age-requirement">
                <strong>Minimum Age:</strong> ${state.age} years old
              </p>
              <p class="consent-info">
                <strong>With Parental Consent:</strong> ${state.consent ? 'Permitted' : 'Not permitted'}
              </p>
              <p class="penalty">
                <strong>Violation:</strong> ${state.penalty}
              </p>
            </div>
          </div>
          <div class="state-footer">
            <a href="${stateKey}.html" class="btn btn-outline">
              View Full Details →
            </a>
          </div>
        </article>`;
});

// Regular states
stateKeys.filter(key => !featuredStates.includes(key)).forEach(stateKey => {
    const state = stateData[stateKey];
    const displayName = state.displayName || stateKey.charAt(0).toUpperCase() + stateKey.slice(1);
    
    stateCardsHtml += `
        <article class="state-card">
          <div class="state-header">
            <img src="images/${stateKey}-map.svg" alt="${displayName}" class="state-icon" width="60" height="60">
            <h3>${displayName}</h3>
          </div>
          <div class="state-body">
            <div class="law-summary">
              <p class="age-requirement">
                <strong>Min Age:</strong> ${state.age}${state.consent ? ' (16 w/ consent)' : ''}
              </p>
              <p class="penalty">
                <strong>Penalty:</strong> ${state.penalty}
              </p>
            </div>
          </div>
          <div class="state-footer">
            <a href="${stateKey}.html" class="btn btn-outline">
              Details →
            </a>
          </div>
        </article>`;
});

// Replace the states section
const statesSection = `  <!-- Featured States Section -->
  <section class="featured-states" id="states">
    <div class="container">
      <h2 class="section-title">All 50 State Laws</h2>
      <p class="section-subtitle">Complete database of tattoo age requirements across all US states</p>
      
      <div class="state-grid">${stateCardsHtml}
      </div>
    </div>
  </section>`;

// Find and replace the states section
const startMarker = '  <!-- Featured States Section -->';
const endMarker = '  </section>\n\n  <!-- Tools Section -->';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newHtml = indexHtml.substring(0, startIndex) + 
                    statesSection + '\n\n' +
                    indexHtml.substring(endIndex + endMarker.length);
    
    fs.writeFileSync('index.html', newHtml);
    console.log('✓ Updated index.html with all 50 states');
} else {
    console.log('✗ Could not find states section markers');
}
