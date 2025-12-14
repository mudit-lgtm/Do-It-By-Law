// ========================================
// NAVIGATION & UI INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Mobile Menu Toggle (FIXED)
  // ========================================
  
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
      
      // Track event
      if (window.trackEvent) {
        window.trackEvent('mobile_menu_toggle', navMenu.classList.contains('active') ? 'open' : 'close');
      }
    });
    
    // Close mobile menu when clicking a link
    const navLinkItems = navMenu.querySelectorAll('a');
    navLinkItems.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          navMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  }
});

// Age Input Fix - Prevent auto-change to 100
document.addEventListener('DOMContentLoaded', function() {
  const ageInputs = document.querySelectorAll('input[type="number"][id*="age" i], input[type="number"][id*="Age"]');
  
  ageInputs.forEach(function(input) {
    // Remove problematic attributes
    input.removeAttribute('max');
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('pattern', '[0-9]*');
    
    // Prevent auto-fill
    input.setAttribute('autocomplete', 'off');
    
    // Allow manual typing without interference
    input.addEventListener('input', function(e) {
      const value = e.target.value;
      if (value && (parseInt(value) < 10 || parseInt(value) > 100)) {
        e.target.value = '';
      }
    });
    
    // Prevent mousewheel changes
    input.addEventListener('wheel', function(e) {
      e.preventDefault();
    });
  });
});

// Activity Type Integration
document.addEventListener('DOMContentLoaded', function() {
  const activityRadios = document.querySelectorAll('input[name="activityType"]');
  const quickCheckForm = document.getElementById('quickCheck');
  
  if (activityRadios.length > 0 && quickCheckForm) {
    let selectedActivity = 'tattoo'; // default
    
    activityRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        selectedActivity = this.value;
        console.log('Activity changed to:', selectedActivity);
      });
    });
    
    quickCheckForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const state = document.getElementById('quickState').value;
      const age = parseInt(document.getElementById('quickAge').value);
      
      if (!state || !age) {
        alert('Please select a state and enter your age');
        return;
      }
      
      // Different logic based on activity type
      let message = '';
      let eligible = false;
      
      switch(selectedActivity) {
        case 'tattoo':
          // Standard tattoo logic (existing)
          if (age >= 18) {
            eligible = true;
            message = `✅ You are eligible for a tattoo in ${state.toUpperCase()}. You can get a tattoo without parental consent.`;
          } else {
            // Check state-specific rules
            const consentStates = ['florida', 'colorado', 'idaho', 'kansas', 'nevada', 'oregon'];
            if (consentStates.includes(state.toLowerCase())) {
              message = `⚠️ In ${state.toUpperCase()}, minors may get tattoos with parental consent. Age 16-17 typically allowed. Check full requirements.`;
            } else {
              message = `❌ You must be 18+ to get a tattoo in ${state.toUpperCase()}. No exceptions for minors.`;
            }
          }
          break;
          
        case 'piercing-ear':
          // Ear piercing logic (generally more lenient)
          if (age >= 18) {
            eligible = true;
            message = `✅ You can get ear piercings without restrictions in ${state.toUpperCase()}.`;
          } else if (age >= 13) {
            message = `⚠️ Ear piercing for minors typically requires parental consent in ${state.toUpperCase()}. Most shops allow ages 13+ with parent present.`;
          } else {
            message = `⚠️ Ear piercing under age 13 requires parental presence in ${state.toUpperCase()}. Some shops may have higher age requirements.`;
          }
          break;
          
        case 'piercing-body':
          // Body piercing logic (similar to tattoo but varies)
          if (age >= 18) {
            eligible = true;
            message = `✅ You are eligible for body piercings in ${state.toUpperCase()} without restrictions.`;
          } else {
            message = `⚠️ Body piercings for minors in ${state.toUpperCase()} typically require parental consent and presence. Age 16+ most common. Check specific piercing laws.`;
          }
          break;
          
        case 'body-mod':
          // Body modification (most restrictive)
          if (age >= 18) {
            eligible = true;
            message = `✅ You are of legal age for body modifications in ${state.toUpperCase()}.`;
          } else {
            message = `❌ Body modifications (scarification, branding, etc.) are generally prohibited for minors in all states, including ${state.toUpperCase()}, even with parental consent.`;
          }
          break;
      }
      
      const resultDiv = document.getElementById('quickResult');
      resultDiv.innerHTML = `
        <div style="padding: 1.5rem; border-radius: 8px; background: ${eligible ? '#d1fae5' : '#fee2e2'}; border-left: 4px solid ${eligible ? '#059669' : '#dc2626'};">
          <p style="margin: 0; font-weight: 600; color: ${eligible ? '#065f46' : '#991b1b'};">${message}</p>
          <p style="margin: 0.75rem 0 0 0; font-size: 0.875rem; color: #64748b;">
            <a href="states/${state}.html" style="color: #2563eb; font-weight: 600;">View full ${state.toUpperCase()} requirements →</a>
          </p>
        </div>
      `;
      resultDiv.classList.remove('hidden');
      
      // Scroll to result
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
