// Age Checker functionality
document.addEventListener('DOMContentLoaded', function() {

  // ---------- Shared helper: look up a state's law data safely ----------
  function getStateInfo(stateKey) {
    if (typeof stateLaws !== 'undefined' && stateLaws[stateKey]) {
      return stateLaws[stateKey];
    }
    return null;
  }

  // ---------- Shared helper: build the result message for tattoos ----------
  // hasConsent / hasPresence are optional (the homepage widget doesn't ask,
  // the full tool page does) - when not provided we assume the user will
  // confirm details on the full /tool page.
  function buildTattooResult(data, stateKey, age, hasConsent, hasPresence) {

    // 18+ is always fully eligible, in every state, with no consent needed.
    if (age >= 18) {
      return `
        <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✅ Eligible for Tattoo</h3>
          <p style="margin: 0;">You meet the age requirement to get a tattoo in ${data.name}. No parental consent needed.</p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; opacity: 0.85;">Legal code: ${data.legalCode}</p>
          <a href="states/${stateKey}.html" style="display: inline-block; margin-top: 1rem; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View ${data.name} Laws →</a>
        </div>
      `;
    }

    // Some states allow a younger age with documented parental consent.
    if (data.parentalConsentAllowed && data.consentAge !== null && age >= data.consentAge) {

      if (hasConsent === false) {
        return `
          <div style="background: #fef3c7; color: #92400e; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">⚠️ Eligible — Parental Consent Required</h3>
            <p style="margin: 0 0 0.5rem 0;">At ${age}, you can get a tattoo in ${data.name}, but only with documented parental or guardian consent.</p>
            <a href="consent-form.html" style="display: inline-block; margin-top: 1rem; background: #f59e0b; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Generate Consent Form →</a>
          </div>
        `;
      }

      if (data.parentalPresenceRequired && hasPresence === false) {
        return `
          <div style="background: #fef3c7; color: #92400e; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">⚠️ Almost There — Presence Also Required</h3>
            <p style="margin: 0;">${data.name} requires a parent or guardian to be physically present during the procedure, not just to sign consent. Check that box once it's arranged.</p>
          </div>
        `;
      }

      return `
        <div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✅ Eligible With Parental Consent</h3>
          <p style="margin: 0 0 0.5rem 0;">You can get a tattoo in ${data.name} with:</p>
          <ul style="margin: 0.5rem 0 0 1.5rem;">
            <li>Written parental/guardian consent</li>
            <li>Parent/guardian present during procedure</li>
            <li>Valid ID for both minor and parent</li>
          </ul>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; opacity: 0.85;">Legal code: ${data.legalCode}</p>
          <a href="states/${stateKey}.html" style="display: inline-block; margin-top: 1rem; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View ${data.name} Laws →</a>
        </div>
      `;
    }

    // Not eligible yet - work out the real next milestone age for this state.
    const nextAge = (data.parentalConsentAllowed && data.consentAge !== null) ? data.consentAge : 18;
    const yearsToWait = Math.max(nextAge - age, 0);
    return `
      <div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">❌ Not Eligible Yet</h3>
        <p style="margin: 0;">You need to wait ${yearsToWait} more year(s) to get a tattoo in ${data.name}.</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Minimum age: ${nextAge} years old${data.parentalConsentAllowed ? ' (with parental consent)' : ''}</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; opacity: 0.85;">Legal code: ${data.legalCode}</p>
      </div>
    `;
  }

  // ===========================================================
  // Homepage quick check ("Check Your Eligibility Now" widget)
  // ===========================================================
  const quickForm = document.getElementById('quickCheck');
  if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const state = document.getElementById('quickState').value;
      const age = parseInt(document.getElementById('quickAge').value, 10);
      const activityType = document.querySelector('input[name="activityType"]:checked')?.value || 'tattoo';
      const resultDiv = document.getElementById('quickResult');

      if (!state || !age) {
        resultDiv.innerHTML = '<div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 6px; margin-top: 1rem;">Please select a state and enter your age</div>';
        resultDiv.classList.remove('hidden');
        return;
      }

      let resultHTML = '';

      switch (activityType) {
        case 'tattoo': {
          const data = getStateInfo(state);
          if (data) {
            // The homepage widget doesn't ask about consent/presence yet,
            // so point people to the full tool for those details when relevant.
            resultHTML = buildTattooResult(data, state, age, undefined, undefined);
          } else if (age >= 18) {
            resultHTML = '<div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;"><h3 style="margin: 0 0 0.5rem 0;">✅ Eligible</h3><p style="margin: 0;">You are 18+ and eligible for tattoos in most states.</p></div>';
          } else {
            resultHTML = '<div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;"><h3 style="margin: 0 0 0.5rem 0;">❌ Not Eligible</h3><p style="margin: 0;">Most states require you to be 18 years old for tattoos.</p></div>';
          }
          break;
        }

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

  // ===========================================================
  // Dedicated /tool.html page ("Tattoo Age Checker Tool")
  // This previously did nothing at all when submitted - now it
  // actually reads the form and shows a real result.
  // ===========================================================
  const toolForm = document.getElementById('ageCheckerForm');
  if (toolForm) {
    toolForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const state = document.getElementById('stateSelect').value;
      const ageField = document.getElementById('ageInput').value;
      const age = parseInt(ageField, 10);
      const hasConsent = document.getElementById('parentalConsent').checked;
      const hasPresence = document.getElementById('parentPresent').checked;

      const resultDiv = document.getElementById('toolResult');
      const placeholder = document.getElementById('toolPlaceholder');

      if (!state || !ageField || isNaN(age)) {
        resultDiv.innerHTML = '<div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 6px;">Please select a state and enter your age.</div>';
        resultDiv.classList.remove('hidden');
        resultDiv.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        return;
      }

      const data = getStateInfo(state);
      let resultHTML;

      if (data) {
        resultHTML = buildTattooResult(data, state, age, hasConsent, hasPresence);
      } else if (age >= 18) {
        resultHTML = '<div style="background: #d1fae5; color: #065f46; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;"><h3 style="margin: 0 0 0.5rem 0;">✅ Eligible</h3><p style="margin: 0;">You are 18+ and eligible for tattoos in most states.</p></div>';
      } else {
        resultHTML = '<div style="background: #fee2e2; color: #991b1b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;"><h3 style="margin: 0 0 0.5rem 0;">❌ Not Eligible</h3><p style="margin: 0;">Most states require you to be 18 years old for tattoos.</p></div>';
      }

      resultDiv.innerHTML = resultHTML;
      resultDiv.classList.remove('hidden');
      resultDiv.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
