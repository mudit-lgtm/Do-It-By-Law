// Age Checker functionality
document.addEventListener('DOMContentLoaded', function() {
  // Homepage quick check form
  const quickForm = document.getElementById('quickCheck');
  if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const state = document.getElementById('quickState').value;
      const age = parseInt(document.getElementById('quickAge').value);
      const activityType = document.querySelector('input[name="activityType"]:checked')?.value || 'tattoo';
      const resultDiv = document.getElementById('quickResult');
      
      if (!state || !age) {
        resultDiv.innerHTML = '<div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 6px; margin-top: 1rem;">Please select a state and enter your age</div>';
        resultDiv.classList.remove('hidden');
        return;
      }
      
      let resultHTML = '';
      
      // Handle different activity types
      switch(activityType) {
        case 'tattoo':
          // Get state-specific tattoo data
          if (typeof stateData !== 'undefined' && stateData[state]) {
            const data = stateData[state];
            const minAge = data.minAge || 18;
            const allowsConsent = data.parentalConsent || false;
            
            if (age >= 18) {
              resultHTML = `
                <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
                  <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✅ Eligible for Tattoo</h3>
                  <p style="margin: 0;">You meet the age requirement to get a tattoo in ${data.name}. No parental consent needed.</p>
                  <a href="states/${state}.html" style="display: inline-block; margin-top: 1rem; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View ${data.name} Laws →</a>
                </div>
              `;
            } else if (age >= minAge && allowsConsent) {
              resultHTML = `
                <div style="background: #fef3c7; color: #92400e; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
                  <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">⚠️ Eligible with Parental Consent</h3>
                  <p style="margin: 0 0 0.5rem 0;">You can get a tattoo in ${data.name} with:</p>
                  <ul style="margin: 0.5rem 0 0 1.5rem;">
                    <li>Written parental/guardian consent</li>
                    <li>Parent/guardian present during procedure</li>
                    <li>Valid ID for both minor and parent</li>
                  </ul>
                  <a href="consent-form.html" style="display: inline-block; margin-top: 1rem; background: #f59e0b; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Generate Consent Form →</a>
                </div>
              `;
            } else {
              const yearsToWait = minAge - age;
              resultHTML = `
                <div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
                  <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">❌ Not Eligible Yet</h3>
                  <p style="margin: 0;">You need to wait ${yearsToWait} more year(s) to get a tattoo in ${data.name}.</p>
                  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Minimum age: ${minAge} years old</p>
                </div>
              `;
            }
          } else {
            // Generic tattoo response if state not found
            if (age >= 18) {
              resultHTML = '<div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;"><h3 style="margin: 0 0 0.5rem 0;">✅ Eligible</h3><p style="margin: 0;">You are 18+ and eligible for tattoos in most states.</p></div>';
            } else {
              resultHTML = '<div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;"><h3 style="margin: 0 0 0.5rem 0;">❌ Not Eligible</h3><p style="margin: 0;">Most states require you to be 18 years old for tattoos.</p></div>';
            }
          }
          break;
          
        case 'piercing-ear':
          if (age >= 13) {
            resultHTML = `
              <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✅ Eligible for Ear Piercing</h3>
                <p style="margin: 0 0 0.5rem 0;">Ear piercings are typically allowed at age 13+ with parental consent in most states.</p>
                <p style="margin: 0.5rem 0 0 0; font-weight: 600;">Requirements:</p>
                <ul style="margin: 0.5rem 0 0 1.5rem;">
                  <li>Written parental consent required</li>
                  <li>Parent/guardian should be present</li>
                  <li>Valid ID verification</li>
                </ul>
                <a href="piercing/index.html" style="display: inline-block; margin-top: 1rem; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View Piercing Laws →</a>
              </div>
            `;
          } else {
            resultHTML = `
              <div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">❌ Not Eligible Yet</h3>
                <p style="margin: 0;">Most states require you to be at least 13 years old for ear piercings.</p>
                <p style="margin: 0.5rem 0 0 0;">You need to wait ${13 - age} more year(s).</p>
              </div>
            `;
          }
          break;
          
        case 'piercing-body':
          if (age >= 16) {
            resultHTML = `
              <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✅ Eligible for Body Piercing</h3>
                <p style="margin: 0 0 0.5rem 0;">Body piercings are typically allowed at age 16+ with parental consent in most states.</p>
                <p style="margin: 0.5rem 0 0 0; font-weight: 600;">Requirements:</p>
                <ul style="margin: 0.5rem 0 0 1.5rem;">
                  <li>Written and notarized parental consent</li>
                  <li>Parent/guardian must be present</li>
                  <li>Valid ID verification for both</li>
                </ul>
                <a href="piercing/index.html" style="display: inline-block; margin-top: 1rem; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View Piercing Laws →</a>
              </div>
            `;
          } else {
            resultHTML = `
              <div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">❌ Not Eligible Yet</h3>
                <p style="margin: 0;">Most states require you to be at least 16 years old for body piercings.</p>
                <p style="margin: 0.5rem 0 0 0;">You need to wait ${16 - age} more year(s).</p>
              </div>
            `;
          }
          break;
          
        case 'body-mod':
          if (age >= 18) {
            resultHTML = `
              <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✅ Eligible for Body Modification</h3>
                <p style="margin: 0;">You are legally able to get body modifications (scarification, branding, tongue splitting, etc.) in most states.</p>
                <p style="margin: 0.5rem 0 0 0; font-weight: 600;">Note: Body modifications are strictly 18+ only. No parental consent exceptions.</p>
                <a href="body-modification.html" style="display: inline-block; margin-top: 1rem; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View Body Mod Laws →</a>
              </div>
            `;
          } else {
            resultHTML = `
              <div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">❌ Not Eligible Yet</h3>
                <p style="margin: 0;">All states require you to be 18 years old for body modifications. No parental consent exceptions apply.</p>
                <p style="margin: 0.5rem 0 0 0;">You need to wait ${18 - age} more year(s).</p>
              </div>
            `;
          }
          break;
      }
      
      resultDiv.innerHTML = resultHTML;
      resultDiv.classList.remove('hidden');
      resultDiv.style.display = 'block';
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  
  // Tool page form (if exists)
  const toolForm = document.getElementById('ageCheckerForm');
  if (toolForm) {
    toolForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Tool page logic here (if needed)
    });
  }
});
