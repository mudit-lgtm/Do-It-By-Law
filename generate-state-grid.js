const fs = require('fs');
const { stateLaws } = require('./js/state-data.js');

// Generate state card HTML
function generateStateCard(stateKey, state, isFeatured = false) {
  const consentInfo = state.parentalConsentAllowed 
    ? `Allowed at age ${state.consentAge}`
    : 'Not permitted';
  
  const featuredClass = isFeatured ? ' featured' : '';
  const featuredBadge = isFeatured ? '<span class="badge">Most Popular</span>' : '';
  
  return `
        <!-- ${state.name} Card${isFeatured ? ' (Featured)' : ''} -->
        <article class="state-card${featuredClass}">
          <div class="state-header">
            <img src="images/${stateKey}-map.svg" alt="${state.name}" class="state-icon" width="60" height="60">
            <h3>${state.name}</h3>
            ${featuredBadge}
          </div>
          <div class="state-body">
            <div class="law-summary">
              <p class="age-requirement">
                <strong>Minimum Age:</strong> ${state.minAge} years old
              </p>
              <p class="consent-info">
                <strong>With Parental Consent:</strong> ${consentInfo}
              </p>
              <p class="penalty">
                <strong>Violation:</strong> ${state.penalty}
              </p>
            </div>
            ${isFeatured ? `<div class="state-stats">
              <span>🔍 Most searched</span>
              <span>📅 Updated Nov 2025</span>
            </div>` : ''}
          </div>
          <div class="state-footer">
            <a href="${stateKey}.html" class="btn btn-outline">
              View Full Details →
            </a>
          </div>
        </article>`;
}

// Generate complete grid
let gridHTML = '';

// Featured states (top 5 by click volume)
const featuredStates = Object.entries(stateLaws)
  .sort((a, b) => b[1].clickVolume - a[1].clickVolume)
  .slice(0, 5);

console.log('Generating state grid HTML...\n');
console.log('Featured states:', featuredStates.map(s => s[1].name).join(', '));

// Add featured states
featuredStates.forEach(([key, state]) => {
  gridHTML += generateStateCard(key, state, true);
});

// Add remaining states (sorted alphabetically)
const remainingStates = Object.entries(stateLaws)
  .filter(([key]) => !featuredStates.find(f => f[0] === key))
  .sort((a, b) => a[1].name.localeCompare(b[1].name));

remainingStates.forEach(([key, state]) => {
  gridHTML += generateStateCard(key, state, false);
});

// Write to file
fs.writeFileSync('/home/user/webapp/state-grid-snippet.html', gridHTML);

console.log('\n✓ Generated state grid with', featuredStates.length, 'featured and', remainingStates.length, 'regular states');
console.log('✓ Output saved to state-grid-snippet.html');
