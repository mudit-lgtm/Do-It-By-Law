// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle aria-expanded for accessibility
      const isExpanded = navMenu.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav-container')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when window resizes
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// Activity Type Integration for Homepage
if (document.getElementById('quickCheck')) {
  const form = document.getElementById('quickCheck');
  const activityRadios = document.querySelectorAll('input[name="activityType"]');
  const quickResult = document.getElementById('quickResult');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const state = document.getElementById('quickState').value;
    const age = parseInt(document.getElementById('quickAge').value);
    const activityType = document.querySelector('input[name="activityType"]:checked').value;
    
    if (!state || !age) {
      quickResult.innerHTML = '<div class="error">Please select a state and enter your age</div>';
      quickResult.classList.remove('hidden');
      return;
    }
    
    let resultHTML = '';
    
    switch(activityType) {
      case 'tattoo':
        // Use existing tattoo logic from age-checker.js
        const tattooData = getStateData(state);
        if (tattooData) {
          const eligible = checkEligibility(age, tattooData);
          resultHTML = formatResult(eligible, tattooData, age);
        }
        break;
      
      case 'piercing-ear':
        if (age >= 13) {
          resultHTML = `
            <div class="result-success">
              <h3>✅ Eligible for Ear Piercing</h3>
              <p>Ear piercings are typically allowed at age 13+ with parental consent in most states.</p>
              <p><strong>Requirements:</strong></p>
              <ul>
                <li>Written parental consent required for minors</li>
                <li>Parent/guardian should be present</li>
                <li>Valid ID verification</li>
              </ul>
            </div>
          `;
        } else {
          resultHTML = `
            <div class="result-error">
              <h3>❌ Not Eligible Yet</h3>
              <p>Most states require you to be at least 13 years old for ear piercings.</p>
              <p>You need to wait ${13 - age} more year(s).</p>
            </div>
          `;
        }
        break;
      
      case 'piercing-body':
        if (age >= 16) {
          resultHTML = `
            <div class="result-success">
              <h3>✅ Eligible for Body Piercing</h3>
              <p>Body piercings are typically allowed at age 16+ with parental consent in most states.</p>
              <p><strong>Requirements:</strong></p>
              <ul>
                <li>Written and notarized parental consent</li>
                <li>Parent/guardian must be present</li>
                <li>Valid ID verification for both</li>
              </ul>
            </div>
          `;
        } else {
          resultHTML = `
            <div class="result-error">
              <h3>❌ Not Eligible Yet</h3>
              <p>Most states require you to be at least 16 years old for body piercings.</p>
              <p>You need to wait ${16 - age} more year(s).</p>
            </div>
          `;
        }
        break;
      
      case 'body-mod':
        if (age >= 18) {
          resultHTML = `
            <div class="result-success">
              <h3>✅ Eligible for Body Modification</h3>
              <p>You are legally able to get body modifications (scarification, branding, tongue splitting, etc.) in most states.</p>
              <p><strong>Note:</strong> Body modifications are strictly 18+ only. No parental consent exceptions.</p>
            </div>
          `;
        } else {
          resultHTML = `
            <div class="result-error">
              <h3>❌ Not Eligible Yet</h3>
              <p>All states require you to be 18 years old for body modifications. No parental consent exceptions apply.</p>
              <p>You need to wait ${18 - age} more year(s).</p>
            </div>
          `;
        }
        break;
    }
    
    quickResult.innerHTML = resultHTML;
    quickResult.classList.remove('hidden');
    quickResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// Helper functions (if not already defined in age-checker.js)
function getStateData(state) {
  // This should reference the actual state data
  if (typeof stateData !== 'undefined' && stateData[state]) {
    return stateData[state];
  }
  return null;
}

function checkEligibility(age, stateData) {
  if (age >= 18) return true;
  if (age >= stateData.minAge && stateData.parentalConsent) return 'with-consent';
  return false;
}

function formatResult(eligible, stateData, age) {
  if (eligible === true) {
    return `
      <div class="result-success">
        <h3>✅ Eligible for Tattoo</h3>
        <p>You meet the age requirement to get a tattoo in ${stateData.name}.</p>
      </div>
    `;
  } else if (eligible === 'with-consent') {
    return `
      <div class="result-warning">
        <h3>⚠️ Eligible with Parental Consent</h3>
        <p>You can get a tattoo in ${stateData.name} with parental consent and presence.</p>
      </div>
    `;
  } else {
    return `
      <div class="result-error">
        <h3>❌ Not Eligible Yet</h3>
        <p>You need to wait ${stateData.minAge - age} more year(s).</p>
      </div>
    `;
  }
}
