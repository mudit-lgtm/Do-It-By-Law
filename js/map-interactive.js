// ========================================
// INTERACTIVE US MAP - PHASE 3
// SVG-based interactive US map with state info popups
// ========================================

// SVG coordinates for each state (approximate positions)
const stateCoordinates = {
  alabama: { x: 720, y: 560, abbr: 'AL' },
  alaska: { x: 100, y: 700, abbr: 'AK' },
  arizona: { x: 200, y: 480, abbr: 'AZ' },
  arkansas: { x: 620, y: 490, abbr: 'AR' },
  california: { x: 100, y: 380, abbr: 'CA' },
  colorado: { x: 360, y: 380, abbr: 'CO' },
  connecticut: { x: 940, y: 260, abbr: 'CT' },
  delaware: { x: 900, y: 340, abbr: 'DE' },
  florida: { x: 820, y: 680, abbr: 'FL' },
  georgia: { x: 780, y: 560, abbr: 'GA' },
  hawaii: { x: 300, y: 700, abbr: 'HI' },
  idaho: { x: 240, y: 220, abbr: 'ID' },
  illinois: { x: 680, y: 360, abbr: 'IL' },
  indiana: { x: 720, y: 360, abbr: 'IN' },
  iowa: { x: 600, y: 320, abbr: 'IA' },
  kansas: { x: 520, y: 420, abbr: 'KS' },
  kentucky: { x: 760, y: 420, abbr: 'KY' },
  louisiana: { x: 640, y: 600, abbr: 'LA' },
  maine: { x: 960, y: 140, abbr: 'ME' },
  maryland: { x: 880, y: 360, abbr: 'MD' },
  massachusetts: { x: 940, y: 240, abbr: 'MA' },
  michigan: { x: 740, y: 260, abbr: 'MI' },
  minnesota: { x: 580, y: 200, abbr: 'MN' },
  mississippi: { x: 660, y: 560, abbr: 'MS' },
  missouri: { x: 600, y: 420, abbr: 'MO' },
  montana: { x: 320, y: 160, abbr: 'MT' },
  nebraska: { x: 480, y: 340, abbr: 'NE' },
  nevada: { x: 160, y: 320, abbr: 'NV' },
  newhampshire: { x: 940, y: 200, abbr: 'NH' },
  newjersey: { x: 900, y: 320, abbr: 'NJ' },
  newmexico: { x: 340, y: 520, abbr: 'NM' },
  newyork: { x: 880, y: 240, abbr: 'NY' },
  northcarolina: { x: 840, y: 480, abbr: 'NC' },
  northdakota: { x: 480, y: 180, abbr: 'ND' },
  ohio: { x: 780, y: 360, abbr: 'OH' },
  oklahoma: { x: 520, y: 500, abbr: 'OK' },
  oregon: { x: 140, y: 200, abbr: 'OR' },
  pennsylvania: { x: 840, y: 320, abbr: 'PA' },
  rhodeisland: { x: 960, y: 260, abbr: 'RI' },
  southcarolina: { x: 820, y: 520, abbr: 'SC' },
  southdakota: { x: 480, y: 260, abbr: 'SD' },
  tennessee: { x: 740, y: 480, abbr: 'TN' },
  texas: { x: 480, y: 600, abbr: 'TX' },
  utah: { x: 260, y: 360, abbr: 'UT' },
  vermont: { x: 920, y: 180, abbr: 'VT' },
  virginia: { x: 840, y: 400, abbr: 'VA' },
  washington: { x: 160, y: 120, abbr: 'WA' },
  westvirginia: { x: 800, y: 380, abbr: 'WV' },
  wisconsin: { x: 660, y: 240, abbr: 'WI' },
  wyoming: { x: 340, y: 260, abbr: 'WY' }
};

// Color mapping based on strictness
function getStrictnessColor(level) {
  const colors = {
    'strict': '#c8102e',      // Red - 18+ no consent
    'moderate': '#f59e0b',    // Yellow - 16-17 with consent
    'lenient': '#10b981'      // Green - 14-15 with consent
  };
  return colors[level] || '#6b7280';
}

// Initialize the interactive map
function initializeMap() {
  const mapContainer = document.getElementById('us-map');
  if (!mapContainer) return;
  
  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1000 800');
  svg.setAttribute('class', 'interactive-map');
  
  // Add background
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '1000');
  bg.setAttribute('height', '800');
  bg.setAttribute('fill', '#f3f4f6');
  svg.appendChild(bg);
  
  // Add title
  const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  title.setAttribute('x', '500');
  title.setAttribute('y', '40');
  title.setAttribute('text-anchor', 'middle');
  title.setAttribute('font-size', '24');
  title.setAttribute('font-weight', 'bold');
  title.setAttribute('fill', '#1f2937');
  title.textContent = 'US Tattoo Age Laws by State';
  svg.appendChild(title);
  
  // Add legend
  addLegend(svg);
  
  // Add state circles
  for (const [stateKey, coords] of Object.entries(stateCoordinates)) {
    const state = stateLaws[stateKey];
    if (!state) continue;
    
    const color = getStrictnessColor(state.strictnessLevel);
    
    // Create group for state
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'state-marker');
    g.setAttribute('data-state', stateKey);
    g.style.cursor = 'pointer';
    
    // Create circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', coords.x);
    circle.setAttribute('cy', coords.y);
    circle.setAttribute('r', '20');
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('opacity', '0.8');
    
    // Create text (abbreviation)
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', coords.x);
    text.setAttribute('y', coords.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#ffffff');
    text.textContent = coords.abbr;
    
    g.appendChild(circle);
    g.appendChild(text);
    
    // Add hover effect
    g.addEventListener('mouseenter', function() {
      circle.setAttribute('opacity', '1');
      circle.setAttribute('r', '24');
      showStatePopup(stateKey, coords.x, coords.y);
    });
    
    g.addEventListener('mouseleave', function() {
      circle.setAttribute('opacity', '0.8');
      circle.setAttribute('r', '20');
      hideStatePopup();
    });
    
    // Add click handler
    g.addEventListener('click', function() {
      window.location.href = `${stateKey}.html`;
      if (typeof trackEvent === 'function') {
        trackEvent('map_state_click', { state: stateKey });
      }
    });
    
    svg.appendChild(g);
  }
  
  mapContainer.appendChild(svg);
  
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'map-popup';
  popup.className = 'map-popup hidden';
  document.body.appendChild(popup);
}

// Add legend to map
function addLegend(svg) {
  const legendY = 680;
  const legendX = 50;
  
  // Legend title
  const legendTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  legendTitle.setAttribute('x', legendX);
  legendTitle.setAttribute('y', legendY);
  legendTitle.setAttribute('font-size', '14');
  legendTitle.setAttribute('font-weight', 'bold');
  legendTitle.setAttribute('fill', '#1f2937');
  legendTitle.textContent = 'Age Requirements:';
  svg.appendChild(legendTitle);
  
  const legendItems = [
    { color: '#c8102e', label: '18+ (No consent)', offset: 0 },
    { color: '#f59e0b', label: '16-17 (With consent)', offset: 180 },
    { color: '#10b981', label: '14-15 (With consent)', offset: 360 }
  ];
  
  legendItems.forEach(item => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', legendX + item.offset);
    circle.setAttribute('cy', legendY + 20);
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', item.color);
    svg.appendChild(circle);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', legendX + item.offset + 15);
    text.setAttribute('y', legendY + 25);
    text.setAttribute('font-size', '12');
    text.setAttribute('fill', '#4b5563');
    text.textContent = item.label;
    svg.appendChild(text);
  });
}

// Show state popup on hover
function showStatePopup(stateKey, x, y) {
  const state = stateLaws[stateKey];
  if (!state) return;
  
  const popup = document.getElementById('map-popup');
  if (!popup) return;
  
  const consentText = state.parentalConsentAllowed 
    ? `✓ Consent allowed at ${state.consentAge}`
    : '✗ No parental consent';
  
  popup.innerHTML = `
    <div class="popup-header">
      <strong>${state.name}</strong>
    </div>
    <div class="popup-body">
      <div class="popup-row">
        <span class="popup-label">Min Age:</span>
        <span class="popup-value">${state.minAge}</span>
      </div>
      <div class="popup-row">
        <span class="popup-label">Consent:</span>
        <span class="popup-value">${consentText}</span>
      </div>
      <div class="popup-row">
        <span class="popup-label">Penalty:</span>
        <span class="popup-value">${state.penalty}</span>
      </div>
    </div>
    <div class="popup-footer">
      Click for full details →
    </div>
  `;
  
  // Position popup near the state marker
  const mapContainer = document.getElementById('us-map');
  const rect = mapContainer.getBoundingClientRect();
  const scale = rect.width / 1000; // SVG viewBox width
  
  popup.style.left = (rect.left + (x * scale)) + 'px';
  popup.style.top = (rect.top + (y * scale) - 150) + 'px';
  popup.classList.remove('hidden');
}

// Hide state popup
function hideStatePopup() {
  const popup = document.getElementById('map-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
}

// Filter states by criteria
function filterStates(criteria) {
  const { age, consent, strictness } = criteria;
  
  return Object.entries(stateLaws).filter(([key, state]) => {
    if (age && state.minAge !== parseInt(age)) return false;
    if (consent === 'yes' && !state.parentalConsentAllowed) return false;
    if (consent === 'no' && state.parentalConsentAllowed) return false;
    if (strictness && state.strictnessLevel !== strictness) return false;
    return true;
  }).map(([key, state]) => ({ key, ...state }));
}

// Highlight filtered states on map
function highlightFilteredStates(filteredStateKeys) {
  const allMarkers = document.querySelectorAll('.state-marker');
  
  allMarkers.forEach(marker => {
    const stateKey = marker.getAttribute('data-state');
    const circle = marker.querySelector('circle');
    
    if (filteredStateKeys.includes(stateKey)) {
      circle.setAttribute('opacity', '1');
      circle.setAttribute('stroke-width', '3');
    } else {
      circle.setAttribute('opacity', '0.2');
      circle.setAttribute('stroke-width', '1');
    }
  });
}

// Reset map highlighting
function resetMapHighlighting() {
  const allMarkers = document.querySelectorAll('.state-marker');
  
  allMarkers.forEach(marker => {
    const circle = marker.querySelector('circle');
    circle.setAttribute('opacity', '0.8');
    circle.setAttribute('stroke-width', '2');
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMap);
} else {
  initializeMap();
}

// Export functions for external use
if (typeof window !== 'undefined') {
  window.mapInteractive = {
    filterStates,
    highlightFilteredStates,
    resetMapHighlighting
  };
}
