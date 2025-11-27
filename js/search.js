// ========================================
// SEARCH FUNCTIONALITY - PHASE 3
// Smart search with autocomplete and filtering
// ========================================

// Search index for faster searching
let searchIndex = null;

// Initialize search
function initializeSearch() {
  // Build search index
  searchIndex = Object.entries(stateLaws).map(([key, state]) => ({
    key,
    name: state.name.toLowerCase(),
    abbreviation: state.abbreviation.toLowerCase(),
    minAge: state.minAge,
    parentalConsent: state.parentalConsentAllowed,
    legalCode: state.legalCode.toLowerCase(),
    penalty: state.penalty.toLowerCase(),
    notes: state.notes.toLowerCase(),
    restrictions: state.restrictions.toLowerCase(),
    strictness: state.strictnessLevel,
    searchText: `${state.name} ${state.abbreviation} ${state.legalCode} ${state.notes}`.toLowerCase()
  }));
  
  console.log('Search index built with', searchIndex.length, 'states');
}

// Perform search
function performSearch(query, filters = {}) {
  if (!searchIndex) initializeSearch();
  
  const lowerQuery = query.toLowerCase().trim();
  
  // If no query and no filters, return all
  if (!lowerQuery && Object.keys(filters).length === 0) {
    return searchIndex.map(item => {
      const state = stateLaws[item.key];
      return { key: item.key, ...state, relevance: 100 };
    });
  }
  
  let results = searchIndex;
  
  // Apply text search
  if (lowerQuery) {
    results = results.map(item => {
      let relevance = 0;
      
      // Exact name match - highest priority
      if (item.name === lowerQuery) {
        relevance += 100;
      } else if (item.name.includes(lowerQuery)) {
        relevance += 50;
      }
      
      // Abbreviation match
      if (item.abbreviation === lowerQuery) {
        relevance += 100;
      }
      
      // Search text match
      if (item.searchText.includes(lowerQuery)) {
        relevance += 20;
      }
      
      // Legal code match
      if (item.legalCode.includes(lowerQuery)) {
        relevance += 15;
      }
      
      // Notes/restrictions match
      if (item.notes.includes(lowerQuery) || item.restrictions.includes(lowerQuery)) {
        relevance += 10;
      }
      
      return { ...item, relevance };
    }).filter(item => item.relevance > 0);
  }
  
  // Apply filters
  if (filters.minAge) {
    results = results.filter(item => item.minAge === parseInt(filters.minAge));
  }
  
  if (filters.parentalConsent !== undefined) {
    results = results.filter(item => item.parentalConsent === filters.parentalConsent);
  }
  
  if (filters.strictness) {
    results = results.filter(item => item.strictness === filters.strictness);
  }
  
  // Sort by relevance
  results.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  
  // Return with full state data
  return results.map(item => {
    const state = stateLaws[item.key];
    return { key: item.key, ...state, relevance: item.relevance };
  });
}

// Get autocomplete suggestions
function getAutocompleteSuggestions(query, maxResults = 8) {
  if (!searchIndex) initializeSearch();
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions = [];
  
  // Add state names
  searchIndex.forEach(item => {
    const state = stateLaws[item.key];
    
    if (item.name.startsWith(lowerQuery)) {
      suggestions.push({
        type: 'state',
        key: item.key,
        text: state.name,
        subtitle: `${state.abbreviation} - Min age: ${state.minAge}`
      });
    }
  });
  
  // Add abbreviations
  searchIndex.forEach(item => {
    if (item.abbreviation === lowerQuery) {
      const state = stateLaws[item.key];
      if (!suggestions.find(s => s.key === item.key)) {
        suggestions.push({
          type: 'state',
          key: item.key,
          text: state.name,
          subtitle: `${state.abbreviation} - Min age: ${state.minAge}`
        });
      }
    }
  });
  
  // Add age-based suggestions
  if (/^\d+$/.test(query)) {
    const age = parseInt(query);
    if (age >= 14 && age <= 18) {
      suggestions.push({
        type: 'age',
        text: `States allowing tattoos at age ${age}`,
        filter: { minAge: age }
      });
    }
  }
  
  // Add keyword suggestions
  const keywords = ['parental consent', 'no consent', 'strict', 'lenient', 'notarized'];
  keywords.forEach(keyword => {
    if (keyword.includes(lowerQuery)) {
      suggestions.push({
        type: 'keyword',
        text: keyword,
        query: keyword
      });
    }
  });
  
  return suggestions.slice(0, maxResults);
}

// Display search results
function displaySearchResults(results, container) {
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <h3>No Results Found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }
  
  const html = results.map(state => {
    const consentBadge = state.parentalConsentAllowed 
      ? `<span class="badge badge-success">Consent at ${state.consentAge}</span>`
      : `<span class="badge badge-danger">No Consent</span>`;
    
    const strictnessBadge = `<span class="badge badge-${state.strictnessLevel}">${state.strictnessLevel}</span>`;
    
    return `
      <div class="search-result-card" data-state="${state.key}">
        <div class="result-header">
          <h3>${state.name}</h3>
          <span class="result-age">Age: ${state.minAge}</span>
        </div>
        <div class="result-badges">
          ${strictnessBadge}
          ${consentBadge}
        </div>
        <div class="result-info">
          <p><strong>Legal Code:</strong> ${state.legalCode}</p>
          <p><strong>Penalty:</strong> ${state.penalty}</p>
          <p class="result-notes">${state.notes}</p>
        </div>
        <div class="result-actions">
          <a href="${state.key}.html" class="btn btn-primary btn-sm">View Details</a>
          <button class="btn btn-secondary btn-sm" onclick="addToComparison('${state.key}')">Add to Compare</button>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
  
  // Add result count
  const countEl = document.getElementById('resultCount');
  if (countEl) {
    countEl.textContent = results.length;
  }
}

// Display autocomplete suggestions
function displayAutocompleteSuggestions(suggestions, container) {
  if (!container) return;
  
  if (suggestions.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  const html = suggestions.map(suggestion => {
    let icon = '';
    switch(suggestion.type) {
      case 'state':
        icon = '<svg width="16" height="16" fill="currentColor"><path d="M3 3h8v8H3z"/></svg>';
        break;
      case 'age':
        icon = '<svg width="16" height="16" fill="currentColor"><circle cx="8" cy="8" r="7"/></svg>';
        break;
      case 'keyword':
        icon = '<svg width="16" height="16" fill="currentColor"><path d="M5 3l8 8-8 8V3z"/></svg>';
        break;
    }
    
    return `
      <div class="autocomplete-item" data-type="${suggestion.type}" data-key="${suggestion.key || ''}" data-query="${suggestion.query || suggestion.text}">
        ${icon}
        <div class="autocomplete-text">
          <div class="autocomplete-main">${suggestion.text}</div>
          ${suggestion.subtitle ? `<div class="autocomplete-sub">${suggestion.subtitle}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
  container.style.display = 'block';
  
  // Add click handlers
  container.querySelectorAll('.autocomplete-item').forEach(item => {
    item.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      const key = this.getAttribute('data-key');
      const query = this.getAttribute('data-query');
      
      if (type === 'state' && key) {
        window.location.href = `${key}.html`;
      } else if (query) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.value = query;
          triggerSearch();
        }
      }
      
      container.style.display = 'none';
    });
  });
}

// Trigger search
function triggerSearch() {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');
  
  if (!searchInput || !resultsContainer) return;
  
  const query = searchInput.value;
  
  // Get filter values
  const filters = {
    minAge: document.getElementById('filterAge')?.value || null,
    parentalConsent: document.getElementById('filterConsent')?.value === 'yes' ? true : 
                     document.getElementById('filterConsent')?.value === 'no' ? false : null,
    strictness: document.getElementById('filterStrictness')?.value || null
  };
  
  // Remove null values
  Object.keys(filters).forEach(key => {
    if (filters[key] === null || filters[key] === '') {
      delete filters[key];
    }
  });
  
  const results = performSearch(query, filters);
  displaySearchResults(results, resultsContainer);
  
  // Track search
  if (typeof trackEvent === 'function') {
    trackEvent('search_performed', { query, filters, results: results.length });
  }
}

// Add state to comparison
function addToComparison(stateKey) {
  let compareList = JSON.parse(localStorage.getItem('compareStates') || '[]');
  
  if (!compareList.includes(stateKey)) {
    compareList.push(stateKey);
    localStorage.setItem('compareStates', JSON.stringify(compareList));
    
    // Show notification
    showNotification(`${stateLaws[stateKey].name} added to comparison`);
    
    // Track event
    if (typeof trackEvent === 'function') {
      trackEvent('state_added_to_comparison', { state: stateKey, source: 'search' });
    }
  } else {
    showNotification(`${stateLaws[stateKey].name} already in comparison`);
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
  initializeSearch();
}

// Export functions
if (typeof window !== 'undefined') {
  window.searchFunctions = {
    performSearch,
    getAutocompleteSuggestions,
    displaySearchResults,
    displayAutocompleteSuggestions,
    triggerSearch,
    addToComparison
  };
}
