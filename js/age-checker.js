
// ========================================
// AGE INPUT FIX - Allow Manual Typing
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Fix all age inputs to allow typing
  const ageInputs = document.querySelectorAll('input[type="number"]');
  
  ageInputs.forEach(function(input) {
    // Change to text input for better mobile support
    if (input.id && (input.id.toLowerCase().includes('age') || input.placeholder && input.placeholder.toLowerCase().includes('age'))) {
      input.type = 'text';
      input.inputMode = 'numeric';
      input.pattern = '[0-9]*';
      input.autocomplete = 'off';
      
      // Only allow numbers
      input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value && (parseInt(this.value) < 10 || parseInt(this.value) > 100)) {
          // Allow typing but don't clear
        }
      });
      
      // Prevent mousewheel
      input.addEventListener('wheel', function(e) {
        e.preventDefault();
      });
    }
  });

  // ========================================
  // ACTIVITY TYPE INTEGRATION - FIXED
  // ========================================
  const activityRadios = document.querySelectorAll('input[name="activityType"]');
  const quickCheckForm = document.getElementById('quickCheck');
  
  if (activityRadios.length > 0 && quickCheckForm) {
    let selectedActivity = 'tattoo'; // default
    
    activityRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        selectedActivity = this.value;
        console.log('Activity type changed to:', selectedActivity);
      });
    });
    
    quickCheckForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const stateSelect = document.getElementById('quickState');
      const ageInput = document.getElementById('quickAge');
      
      if (!stateSelect || !ageInput) return;
      
      const state = stateSelect.value;
      const age = parseInt(ageInput.value);
      
      if (!state || !age || age < 10 || age > 100) {
        alert('Please select a state and enter a valid age (10-100)');
        return;
      }
      
      const stateName = stateSelect.options[stateSelect.selectedIndex].text;
      let message = '';
      let eligible = false;
      let bgColor = '#fee2e2';
      let borderColor = '#dc2626';
      let textColor = '#991b1b';
      
      // Define consent states for tattoos
      const tattooConsentStates = [
        'colorado', 'florida', 'idaho', 'kansas', 'nevada', 'oregon',
        'arkansas', 'iowa', 'maine', 'minnesota', 'montana', 'northdakota',
        'ohio', 'oklahoma', 'rhodeisland', 'southcarolina', 'texas', 'utah', 'wisconsin'
      ];
      
      switch(selectedActivity) {
        case 'tattoo':
          if (age >= 18) {
            eligible = true;
            message = '✅ <strong>You are eligible for a tattoo in ' + stateName + '.</strong><br>You can get a tattoo without parental consent at age 18+.';
            bgColor = '#d1fae5';
            borderColor = '#059669';
            textColor = '#065f46';
          } else {
            if (tattooConsentStates.includes(state.toLowerCase())) {
              message = '⚠️ <strong>Parental consent may be allowed in ' + stateName + '.</strong><br>Most states allow ages 16-17 with notarized parental consent and presence. Check full requirements for your specific age.';
              bgColor = '#fef3c7';
              borderColor = '#f59e0b';
              textColor = '#92400e';
            } else {
              message = '❌ <strong>You must be 18+ to get a tattoo in ' + stateName + '.</strong><br>This state does not allow tattooing of minors, even with parental consent.';
            }
          }
          break;
          
        case 'piercing-ear':
          if (age >= 18) {
            eligible = true;
            message = '✅ <strong>You can get ear piercings in ' + stateName + '.</strong><br>No restrictions for adults 18+.';
            bgColor = '#d1fae5';
            borderColor = '#059669';
            textColor = '#065f46';
          } else if (age >= 13) {
            message = '⚠️ <strong>Ear piercing typically allowed with parental consent in ' + stateName + '.</strong><br>Most shops allow ages 13+ with parent present and consent. Some may require age 16+.';
            bgColor = '#fef3c7';
            borderColor = '#f59e0b';
            textColor = '#92400e';
          } else {
            message = '⚠️ <strong>Ear piercing under 13 requires parental presence in ' + stateName + '.</strong><br>Parent must be present during the procedure. Some shops have higher age requirements.';
            bgColor = '#fef3c7';
            borderColor = '#f59e0b';
            textColor = '#92400e';
          }
          break;
          
        case 'piercing-body':
          if (age >= 18) {
            eligible = true;
            message = '✅ <strong>You are eligible for body piercings in ' + stateName + '.</strong><br>No restrictions for adults 18+.';
            bgColor = '#d1fae5';
            borderColor = '#059669';
            textColor = '#065f46';
          } else if (age >= 16) {
            message = '⚠️ <strong>Body piercings may be allowed with parental consent in ' + stateName + '.</strong><br>Age 16-17 typically allowed with notarized parental consent and presence. Check specific piercing type.';
            bgColor = '#fef3c7';
            borderColor = '#f59e0b';
            textColor = '#92400e';
          } else {
            message = '❌ <strong>Body piercings typically not allowed under age 16 in ' + stateName + '.</strong><br>Most states prohibit body piercings (excluding ears) for minors under 16, even with consent.';
          }
          break;
          
        case 'body-mod':
          if (age >= 18) {
            eligible = true;
            message = '✅ <strong>You are of legal age for body modifications in ' + stateName + '.</strong><br>Adults 18+ can get body modifications without restrictions.';
            bgColor = '#d1fae5';
            borderColor = '#059669';
            textColor = '#065f46';
          } else {
            message = '❌ <strong>Body modifications are prohibited for minors in all states.</strong><br>Scarification, branding, tongue splitting, and other body modifications are illegal for anyone under 18, even with parental consent.';
          }
          break;
      }
      
      const resultDiv = document.getElementById('quickResult');
      if (resultDiv) {
        resultDiv.innerHTML = '<div style="padding: 1.5rem; border-radius: 8px; background: ' + bgColor + '; border-left: 4px solid ' + borderColor + ';"><p style="margin: 0; font-weight: 600; color: ' + textColor + ';">' + message + '</p><p style="margin: 0.75rem 0 0 0; font-size: 0.875rem; color: #64748b;"><a href="states/' + state + '.html" style="color: #2563eb; font-weight: 600; text-decoration: none;">View full ' + stateName + ' requirements →</a></p></div>';
        resultDiv.classList.remove('hidden');
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
