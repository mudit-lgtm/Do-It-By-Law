// ========================================
// STATE LAWS DATABASE
// Now loaded from state-data.js for Phase 2
// ========================================

// Note: stateLaws object is now loaded from state-data.js
// This file should be included AFTER state-data.js in HTML

// ========================================
// MAIN AGE CHECKER FUNCTION
// ========================================

function checkEligibility(state, age, hasConsent, hasPresence) {
  const law = stateLaws[state];
  
  // Check if state data is available
  if (!law) {
    return {
      error: true,
      message: 'State data not available yet. Coming in Phase 2!'
    };
  }
  
  // Initialize result object
  const result = {
    eligible: false,
    state: law.name,
    age: age,
    message: '',
    requirements: [],
    legalCode: law.legalCode,
    waitTime: null
  };
  
  // Check if user meets minimum age
  if (age >= law.minAge) {
    result.eligible = true;
    result.message = `You can legally get a tattoo in ${law.name}!`;
    result.requirements = [
      'Bring valid government-issued photo ID',
      'Choose a licensed and reputable tattoo parlor',
      'Ensure the facility follows health and safety regulations'
    ];
  } else {
    result.waitTime = law.minAge - age;
    
    // Check if parental consent helps
    if (law.parentalConsentAllowed && hasConsent) {
      if (law.parentalPresenceRequired && !hasPresence) {
        result.message = `In ${law.name}, parental consent requires parental presence during the procedure.`;
        result.requirements = [
          'Parent or legal guardian must be present',
          'Written consent form required',
          'Parent must bring valid ID'
        ];
      } else {
        result.eligible = true;
        result.message = `With parental consent, you can get a tattoo in ${law.name}.`;
        result.requirements = [
          'Parent or legal guardian must provide written consent',
          law.parentalPresenceRequired ? 'Parent must be present during procedure' : 'Parent presence may be required',
          'Both you and parent must bring valid ID'
        ];
      }
    } else {
      result.message = `You cannot legally get a tattoo in ${law.name} at age ${age}.`;
      result.requirements = [
        `Minimum age in ${law.name}: ${law.minAge} years old`,
        law.parentalConsentAllowed ? 'Parental consent is not sufficient at your age' : 'Parental consent does not override age requirement',
        `Wait time: ${result.waitTime} year${result.waitTime > 1 ? 's' : ''}`
      ];
    }
  }
  
  return result;
}

// ========================================
// DISPLAY RESULT FUNCTION
// ========================================

function displayResult(result) {
  const resultDiv = document.getElementById('toolResult');
  const placeholderDiv = document.getElementById('toolPlaceholder');
  
  // Hide placeholder if it exists
  if (placeholderDiv) {
    placeholderDiv.classList.add('hidden');
  }
  
  // Handle error state
  if (result.error) {
    resultDiv.innerHTML = `
      <div class="result-card result-error">
        <div class="result-icon">⚠️</div>
        <h3>Not Available Yet</h3>
        <p>${result.message}</p>
      </div>
    `;
    resultDiv.classList.remove('hidden');
    return;
  }
  
  // Determine status styling
  const statusClass = result.eligible ? 'result-success' : 'result-denied';
  const statusIcon = result.eligible ? '✓' : '✗';
  
  // Build HTML
  let html = `
    <div class="result-card ${statusClass}">
      <div class="result-header">
        <div class="result-icon">${statusIcon}</div>
        <h3>${result.message}</h3>
      </div>
      
      <div class="result-body">
        <div class="result-info">
          <p><strong>State:</strong> ${result.state}</p>
          <p><strong>Your Age:</strong> ${result.age} years old</p>
          <p><strong>Legal Code:</strong> ${result.legalCode}</p>
        </div>
        
        <div class="result-requirements">
          <h4>${result.eligible ? 'Requirements' : 'Important Information'}:</h4>
          <ul>
            ${result.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
  `;
  
  // Add wait time if not eligible
  if (!result.eligible && result.waitTime) {
    const waitYears = result.waitTime;
    html += `
        <div class="result-wait">
          <p class="wait-message">
            You can get a tattoo in <strong>${waitYears} year${waitYears > 1 ? 's' : ''}</strong>.
          </p>
        </div>
    `;
  }
  
  html += `
      </div>
      
      <div class="result-footer">
        <p class="disclaimer">
          <strong>Disclaimer:</strong> This tool provides general information based on current state laws. 
          Always verify with the tattoo parlor and local authorities before proceeding.
        </p>
      </div>
    </div>
  `;
  
  resultDiv.innerHTML = html;
  resultDiv.classList.remove('hidden');
  
  // Scroll to result on mobile
  if (window.innerWidth < 768) {
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ========================================
// EVENT LISTENERS (DOM READY)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Main tool form (tool.html)
  const toolForm = document.getElementById('ageCheckerForm');
  if (toolForm) {
    toolForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const state = document.getElementById('stateSelect').value;
      const age = parseInt(document.getElementById('ageInput').value);
      const hasConsent = document.getElementById('parentalConsent').checked;
      const hasPresence = document.getElementById('parentPresent').checked;
      
      // Validation
      if (!state || !age) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (age < 10 || age > 25) {
        alert('Please enter a valid age between 10 and 25');
        return;
      }
      
      // Check eligibility
      const result = checkEligibility(state, age, hasConsent, hasPresence);
      displayResult(result);
      
      // Track analytics
      if (window.trackEvent) {
        window.trackEvent('tool_check', state, age, result.eligible);
      }
    });
  }
  
  // Quick check form (homepage)
  const quickForm = document.getElementById('quickCheck');
  if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const state = document.getElementById('quickState').value;
      const age = parseInt(document.getElementById('quickAge').value);
      
      // Validation
      if (!state || !age) {
        alert('Please select a state and enter your age');
        return;
      }
      
      if (age < 10 || age > 25) {
        alert('Please enter a valid age between 10 and 25');
        return;
      }
      
      // Quick check uses default values for consent
      const result = checkEligibility(state, age, false, false);
      
      const quickResult = document.getElementById('quickResult');
      if (result.eligible) {
        quickResult.innerHTML = `
          <div class="quick-success">
            ✓ At ${age}, you can get a tattoo in ${result.state}!
            <a href="tool.html">See full details →</a>
          </div>
        `;
      } else {
        quickResult.innerHTML = `
          <div class="quick-denied">
            ✗ At ${age}, you cannot get a tattoo in ${result.state}.
            <a href="tool.html">Check full requirements →</a>
          </div>
        `;
      }
      
      quickResult.classList.remove('hidden');
      
      // Track analytics
      if (window.trackEvent) {
        window.trackEvent('quick_check', state, age);
      }
    });
  }
  
  // Alabama-specific check (alabama.html)
  const alabamaForm = document.getElementById('alabamaAgeCheck');
  if (alabamaForm) {
    alabamaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const age = parseInt(document.getElementById('userAge').value);
      const hasConsent = document.getElementById('parentalConsent').checked;
      
      // Validation
      if (!age) {
        alert('Please enter your age');
        return;
      }
      
      if (age < 10 || age > 25) {
        alert('Please enter a valid age between 10 and 25');
        return;
      }
      
      const resultDiv = document.getElementById('toolResult');
      resultDiv.classList.remove('hidden');
      
      // Alabama-specific logic
      if (age >= 18) {
        resultDiv.innerHTML = `
          <div class="result-success">
            <h3>✓ You Can Get a Tattoo in Alabama</h3>
            <p>At ${age} years old, you meet Alabama's minimum age requirement.</p>
            <ul>
              <li>Bring valid government-issued ID</li>
              <li>Choose a licensed tattoo parlor</li>
              <li>Follow aftercare instructions</li>
            </ul>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `
          <div class="result-error">
            <h3>✗ Not Eligible in Alabama</h3>
            <p>At ${age} years old, you cannot legally get a tattoo in Alabama.</p>
            <p><strong>Why?</strong> Alabama requires you to be 18. ${hasConsent ? 'Parental consent does not change this requirement.' : ''}</p>
            <p class="wait-time">You can get a tattoo in ${18 - age} year${18 - age > 1 ? 's' : ''}.</p>
          </div>
        `;
      }
      
      // Track analytics
      if (window.trackEvent) {
        window.trackEvent('age_check', 'alabama', age);
      }
    });
  }
});
