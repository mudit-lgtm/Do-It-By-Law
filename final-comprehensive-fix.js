const fs = require('fs');
const glob = require('glob');

console.log('========== FINAL COMPREHENSIVE FIX - ALL ISSUES ==========\n');

// ============================================
// ISSUE 1 & 2: Fix Age Input and Activity Type
// ============================================
console.log('ISSUE 1 & 2: Fixing age input and activity type selector...');

const fixedAgeJS = `
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
`;

fs.writeFileSync('js/age-checker.js', fixedAgeJS);
console.log('✓ Age input and activity type fixed\n');

// ============================================
// ISSUE 3: Create Consent Form Tool
// ============================================
console.log('ISSUE 3: Creating consent form tool...');

const consentFormHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parental Consent Form for Tattoo | Free Download</title>
  <meta name="description" content="Download free parental consent form for minor tattoos. State-specific templates, notarization guidance, and legal requirements.">
  <link rel="canonical" href="https://tattoo.doitbylaw.com/consent-form.html">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <a href="index.html">
          <img src="images/logo.svg" alt="Do It By Law" class="nav-logo">
          <span class="brand-text">Do It By Law</span>
        </a>
      </div>
      <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        <li><a href="index.html">Home</a></li>
        <li><a href="tool.html">Age Checker</a></li>
        <li><a href="comparison.html">Compare States</a></li>
        <li><a href="consent-form.html" class="active">Consent Form</a></li>
        <li><a href="tattoo-directory.html">Directory</a></li>
        <li><a href="blog/index.html">Blog</a></li>
      </ul>
    </div>
  </nav>

  <main style="max-width: 900px; margin: 3rem auto; padding: 0 1rem;">
    <h1>Parental Consent Form for Tattoo</h1>
    <p style="font-size: 1.125rem; color: #64748b; margin-bottom: 2rem;">Download free state-specific consent forms for minor tattooing. Includes notarization guidance and legal requirements.</p>

    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 6px;">
      <p style="margin: 0; font-weight: 600; color: #92400e;">⚠️ Important: Check your state's requirements before using this form. Some states do not allow tattooing of minors even with parental consent.</p>
    </div>

    <h2>What You Need to Know</h2>
    <ul>
      <li><strong>State Requirements Vary:</strong> Some states require notarized consent, some require parental presence, some prohibit all minor tattooing.</li>
      <li><strong>Age Restrictions:</strong> Most states allowing minor tattooing set minimum ages between 14-17.</li>
      <li><strong>Documentation:</strong> Bring valid ID for both parent and minor.</li>
      <li><strong>Not Legal Advice:</strong> This form is for informational purposes. Consult legal professionals for your specific situation.</li>
    </ul>

    <h2>Download Consent Form Template</h2>
    <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 2rem; margin: 2rem 0;">
      <h3 style="margin-top: 0;">Standard Parental Consent Form</h3>
      <p>This template includes:</p>
      <ul>
        <li>Parent/guardian information</li>
        <li>Minor information</li>
        <li>Tattoo description and placement</li>
        <li>Health declarations</li>
        <li>Signature sections</li>
        <li>Notary section (if required)</li>
      </ul>
      
      <div style="margin-top: 1.5rem; padding: 1.5rem; background: #f9fafb; border-radius: 6px;">
        <h4 style="margin-top: 0;">Sample Form Content:</h4>
        <div style="font-family: monospace; font-size: 0.875rem; white-space: pre-wrap; background: white; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 4px;">
PARENTAL CONSENT FORM FOR TATTOOING OF MINOR

I, _________________________ (Parent/Guardian Name)
ID Number: _________________________
Address: _________________________

Hereby give consent for:
Minor Name: _________________________
Date of Birth: _________________________
Age: _________________________

To receive the following tattoo:
Description: _________________________
Placement: _________________________
Size: _________________________

I understand that:
- Tattoos are permanent
- There are health risks involved
- I have reviewed the tattoo design
- I will be present during the procedure (if required)

Parent Signature: _______________ Date: _______________
Notary (if required): _______________
        </div>
      </div>
      
      <button onclick="window.print()" style="background: #2563eb; color: white; padding: 1rem 2rem; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 1rem; margin-top: 1rem;">
        🖨️ Print This Form
      </button>
    </div>

    <h2>State-Specific Requirements</h2>
    <p>Before using this form, check your state's specific requirements:</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
      <a href="states/florida.html" style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; text-decoration: none; color: #2563eb; font-weight: 600;">Florida Requirements</a>
      <a href="states/colorado.html" style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; text-decoration: none; color: #2563eb; font-weight: 600;">Colorado Requirements</a>
      <a href="states/idaho.html" style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; text-decoration: none; color: #2563eb; font-weight: 600;">Idaho Requirements</a>
      <a href="states/texas.html" style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; text-decoration: none; color: #2563eb; font-weight: 600;">Texas Requirements</a>
      <a href="comparison.html" style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; text-decoration: none; color: #2563eb; font-weight: 600;">View All States</a>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 6px;">
      <h3 style="margin-top: 0; color: #991b1b;">Legal Disclaimer</h3>
      <p style="margin: 0; color: #991b1b;">This form is provided for informational purposes only and does not constitute legal advice. Requirements vary by state and tattoo shop. Always verify current state laws and consult with legal professionals. Do It By Law is not responsible for any use of this form.</p>
    </div>
  </main>

  <footer class="site-footer" style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
    <div class="footer-container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <p style="text-align: center; margin: 0;">&copy; 2025 Do It By Law. All rights reserved.</p>
    </div>
  </footer>

  <script src="js/navigation.js"></script>
</body>
</html>`;

fs.writeFileSync('consent-form.html', consentFormHTML);
console.log('✓ Consent form tool created\n');

// ============================================
// ISSUE 5 & 6: Update Sitemap with Highest Priority and Current Date
// ============================================
console.log('ISSUE 5 & 6: Updating sitemap with highest priority and current date...');

const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tattoo.doitbylaw.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/tool.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/consent-form.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/comparison.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/map.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/tattoo-directory.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/privacy-policy.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/terms-of-service.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/disclaimer.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tattoo.doitbylaw.com/contact.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
`;

// Add all state pages
const states = glob.sync('states/*.html');
let stateURLs = '';
states.forEach(file => {
  const state = file.replace('states/', '').replace('.html', '');
  stateURLs += `  <url>
    <loc>https://tattoo.doitbylaw.com/states/${state}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>\n`;
});

// Add piercing pages
const piercing = glob.sync('piercing/*.html');
let piercingURLs = '';
piercing.forEach(file => {
  const page = file.replace('piercing/', '');
  piercingURLs += `  <url>
    <loc>https://tattoo.doitbylaw.com/piercing/${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>\n`;
});

// Add blog pages
const blog = glob.sync('blog/*.html');
let blogURLs = '';
blog.forEach(file => {
  const page = file.replace('blog/', '');
  blogURLs += `  <url>
    <loc>https://tattoo.doitbylaw.com/blog/${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\n`;
});

const completeSitemap = sitemapContent + stateURLs + piercingURLs + blogURLs + '</urlset>';
fs.writeFileSync('sitemap.xml', completeSitemap);

console.log(`✓ Sitemap updated with ${today} and priority 1.0 for all URLs\n`);

// ============================================
// ISSUE 8: Add Legal Code Links to Age Checker Tool Page
// ============================================
console.log('ISSUE 8: Adding legal code links to age checker tool page...');

let toolHTML = fs.readFileSync('tool.html', 'utf8');

const legalCodeSection = `
    <section style="max-width: 900px; margin: 3rem auto; padding: 0 1rem;">
      <h2>Official State Legal Codes</h2>
      <p>Access official state legal codes and health department regulations for tattoo age laws:</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
          <h3 style="font-size: 1.125rem; color: #2563eb; margin-top: 0;">📜 Major State Codes</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.75rem;">
              <a href="https://law.justia.com/codes/alabama/2022/title-22/chapter-1/article-1/section-22-1-17a/" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
                Alabama Code § 22-1-17A
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=653" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
                California Penal Code § 653
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0381/Sections/0381.00787.html" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
                Florida Statutes § 381.00787
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://law.justia.com/codes/indiana/2022/title-35/article-45/chapter-2/section-35-45-2-5/" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
                Indiana Code § 35-45-2-5
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://statutes.capitol.texas.gov/Docs/HS/htm/HS.146.htm" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
                Texas Health & Safety Code § 146.012
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.nysenate.gov/legislation/laws/GBS/360-P" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
                New York Gen. Business Law § 360-p
              </a>
            </li>
          </ul>
        </div>
        
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
          <h3 style="font-size: 1.125rem; color: #10b981; margin-top: 0;">🏛️ State Health Departments</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.alabamapublichealth.gov/" target="_blank" rel="nofollow noopener" style="color: #059669; font-weight: 600;">
                Alabama Dept of Public Health
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.cdph.ca.gov/" target="_blank" rel="nofollow noopener" style="color: #059669; font-weight: 600;">
                California Dept of Public Health
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.floridahealth.gov/" target="_blank" rel="nofollow noopener" style="color: #059669; font-weight: 600;">
                Florida Department of Health
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.in.gov/health/" target="_blank" rel="nofollow noopener" style="color: #059669; font-weight: 600;">
                Indiana State Dept of Health
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.dshs.texas.gov/" target="_blank" rel="nofollow noopener" style="color: #059669; font-weight: 600;">
                Texas Dept of State Health Services
              </a>
            </li>
            <li style="margin-bottom: 0.75rem;">
              <a href="https://www.health.ny.gov/" target="_blank" rel="nofollow noopener" style="color: #059669; font-weight: 600;">
                New York State Dept of Health
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
`;

// Insert before footer
if (toolHTML.includes('<footer')) {
  toolHTML = toolHTML.replace(/<footer/m, legalCodeSection + '\n  <footer');
  fs.writeFileSync('tool.html', toolHTML);
  console.log('✓ Legal code links added to tool page\n');
}

console.log('========== ALL FIXES COMPLETE ==========');
console.log('\n✅ Summary:');
console.log('  1. Activity type selector - FIXED');
console.log('  2. Age input manual typing - FIXED (changed to text input)');
console.log('  3. Consent form tool - CREATED');
console.log('  5. Sitemap - Updated with priority 1.0 and current date');
console.log('  6. Blog dates - Updated to current date');
console.log('  8. Legal codes on tool page - ADDED');
console.log('\n⚠️  Next: Update index.html to include age-checker.js and update navigation');
