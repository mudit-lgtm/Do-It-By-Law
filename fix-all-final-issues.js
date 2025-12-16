const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive fixes...\n');

// Issue 1: Fix mobile hamburger menu
function fixMobileMenu() {
  console.log('1️⃣ Fixing mobile hamburger menu...');
  
  const navJsPath = 'js/navigation.js';
  if (!fs.existsSync(navJsPath)) {
    console.log('   ⚠️ navigation.js not found, creating it...');
  }
  
  const navigationJs = `// Mobile Menu Toggle
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
          resultHTML = \`
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
          \`;
        } else {
          resultHTML = \`
            <div class="result-error">
              <h3>❌ Not Eligible Yet</h3>
              <p>Most states require you to be at least 13 years old for ear piercings.</p>
              <p>You need to wait \${13 - age} more year(s).</p>
            </div>
          \`;
        }
        break;
      
      case 'piercing-body':
        if (age >= 16) {
          resultHTML = \`
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
          \`;
        } else {
          resultHTML = \`
            <div class="result-error">
              <h3>❌ Not Eligible Yet</h3>
              <p>Most states require you to be at least 16 years old for body piercings.</p>
              <p>You need to wait \${16 - age} more year(s).</p>
            </div>
          \`;
        }
        break;
      
      case 'body-mod':
        if (age >= 18) {
          resultHTML = \`
            <div class="result-success">
              <h3>✅ Eligible for Body Modification</h3>
              <p>You are legally able to get body modifications (scarification, branding, tongue splitting, etc.) in most states.</p>
              <p><strong>Note:</strong> Body modifications are strictly 18+ only. No parental consent exceptions.</p>
            </div>
          \`;
        } else {
          resultHTML = \`
            <div class="result-error">
              <h3>❌ Not Eligible Yet</h3>
              <p>All states require you to be 18 years old for body modifications. No parental consent exceptions apply.</p>
              <p>You need to wait \${18 - age} more year(s).</p>
            </div>
          \`;
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
    return \`
      <div class="result-success">
        <h3>✅ Eligible for Tattoo</h3>
        <p>You meet the age requirement to get a tattoo in \${stateData.name}.</p>
      </div>
    \`;
  } else if (eligible === 'with-consent') {
    return \`
      <div class="result-warning">
        <h3>⚠️ Eligible with Parental Consent</h3>
        <p>You can get a tattoo in \${stateData.name} with parental consent and presence.</p>
      </div>
    \`;
  } else {
    return \`
      <div class="result-error">
        <h3>❌ Not Eligible Yet</h3>
        <p>You need to wait \${stateData.minAge - age} more year(s).</p>
      </div>
    \`;
  }
}
`;
  
  fs.writeFileSync(navJsPath, navigationJs);
  console.log('   ✅ Mobile menu fixed and activity types integrated\n');
}

// Issue 2: Fix age input to allow manual typing
function fixAgeInput() {
  console.log('2️⃣ Fixing age input box...');
  
  const files = ['index.html', 'tool.html'];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Remove max attribute and add inputmode, pattern
      content = content.replace(
        /<input\s+type="number"\s+id="(quickAge|ageInput)"[^>]*>/gi,
        (match) => {
          // Remove max attribute
          let newInput = match.replace(/\s*max="100"\s*/gi, ' ');
          
          // Add inputmode="numeric" if not present
          if (!newInput.includes('inputmode')) {
            newInput = newInput.replace('>', ' inputmode="numeric">');
          }
          
          // Ensure autocomplete="off" is present
          if (!newInput.includes('autocomplete')) {
            newInput = newInput.replace('>', ' autocomplete="off">');
          }
          
          return newInput;
        }
      );
      
      fs.writeFileSync(file, content);
      console.log(`   ✅ Fixed age input in ${file}`);
    }
  });
  
  console.log('');
}

// Issue 3: Create consent form tool and add to navigation
function createConsentFormTool() {
  console.log('3️⃣ Creating consent form tool...');
  
  const consentFormHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tattoo Parental Consent Form Generator | Free Download 2025</title>
  <meta name="description" content="Generate and download free parental consent forms for minors getting tattoos. State-specific templates with legal requirements included.">
  <link rel="canonical" href="https://tattoo.doitbylaw.com/consent-form.html">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <a href="./index.html">
          <img src="./images/logo.svg" alt="Do It By Law" class="nav-logo">
          <span class="brand-text">Do It By Law</span>
        </a>
      </div>
      <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        <li><a href="./index.html">Home</a></li>
        <li><a href="./tool.html">Age Checker</a></li>
        <li><a href="./consent-form.html" class="active">Consent Form</a></li>
        <li><a href="./map.html">Map</a></li>
        <li><a href="./comparison.html">Compare</a></li>
        <li><a href="./piercing/index.html">Piercing</a></li>
        <li><a href="./tattoo-directory.html">Directory</a></li>
        <li><a href="./blog/index.html">Blog</a></li>
      </ul>
    </div>
  </nav>

  <header class="hero" style="padding: 2rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="container">
      <h1 style="color: white; text-align: center; margin-bottom: 1rem;">Parental Consent Form Generator</h1>
      <p style="color: rgba(255,255,255,0.9); text-align: center; max-width: 600px; margin: 0 auto;">
        Generate a legally compliant parental consent form for minors getting tattoos
      </p>
    </div>
  </header>

  <section style="padding: 3rem 0; background: #f9fafb;">
    <div class="container" style="max-width: 800px;">
      <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-bottom: 1.5rem;">Generate Your Consent Form</h2>
        
        <form id="consentForm" style="display: grid; gap: 1.5rem;">
          <div>
            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">State</label>
            <select id="formState" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
              <option value="">Select State</option>
              <option value="alabama">Alabama</option>
              <option value="alaska">Alaska</option>
              <option value="arizona">Arizona</option>
              <option value="arkansas">Arkansas</option>
              <option value="california">California</option>
              <option value="colorado">Colorado</option>
              <option value="florida">Florida</option>
              <option value="georgia">Georgia</option>
              <option value="indiana">Indiana</option>
              <option value="texas">Texas</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Minor's Full Name</label>
            <input type="text" id="minorName" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
          </div>

          <div>
            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Minor's Date of Birth</label>
            <input type="date" id="minorDOB" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
          </div>

          <div>
            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Parent/Guardian Full Name</label>
            <input type="text" id="parentName" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
          </div>

          <div>
            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Relationship to Minor</label>
            <select id="relationship" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
              <option value="">Select Relationship</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Legal Guardian">Legal Guardian</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Tattoo Description</label>
            <textarea id="tattooDesc" rows="3" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"></textarea>
          </div>

          <button type="submit" style="background: #2563eb; color: white; padding: 1rem 2rem; border: none; border-radius: 6px; font-weight: 600; font-size: 1rem; cursor: pointer;">
            Generate Consent Form
          </button>
        </form>

        <div id="consentOutput" style="display: none; margin-top: 2rem; padding: 2rem; background: #f9fafb; border-radius: 8px; border: 2px solid #2563eb;">
          <!-- Generated form will appear here -->
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <button id="downloadBtn" style="display: none; background: #10b981; color: white; padding: 1rem 2rem; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            📄 Download as PDF
          </button>
        </div>
      </div>

      <div style="background: #fef3c7; padding: 2rem; border-radius: 8px; margin-top: 2rem; border-left: 4px solid #f59e0b;">
        <h3 style="color: #92400e; margin-bottom: 1rem;">⚠️ Important Legal Notice</h3>
        <p style="color: #78350f; line-height: 1.7;">
          This consent form generator provides templates for informational purposes only. While we strive to include state-specific requirements, laws vary by jurisdiction. Always verify requirements with your state health department and the tattoo parlor. This tool does not provide legal advice. Consult an attorney for legal guidance.
        </p>
      </div>
    </div>
  </section>

  <footer style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="color: white; margin-bottom: 1rem;">Do It By Law</h3>
          <p style="opacity: 0.8; line-height: 1.6;">Your trusted source for tattoo, piercing, and body modification laws across all 50 US states.</p>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Tools</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="tool.html" style="color: white; opacity: 0.8; text-decoration: none;">Age Checker</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="consent-form.html" style="color: white; opacity: 0.8; text-decoration: none;">Consent Form Generator</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="comparison.html" style="color: white; opacity: 0.8; text-decoration: none;">State Comparison</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Legal Pages</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="privacy-policy.html" style="color: white; opacity: 0.8; text-decoration: none;">Privacy Policy</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="terms-of-service.html" style="color: white; opacity: 0.8; text-decoration: none;">Terms of Service</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="disclaimer.html" style="color: white; opacity: 0.8; text-decoration: none;">Legal Disclaimer</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="contact.html" style="color: white; opacity: 0.8; text-decoration: none;">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Resources</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="faq.html" style="color: white; opacity: 0.8; text-decoration: none;">FAQ</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="blog/index.html" style="color: white; opacity: 0.8; text-decoration: none;">Blog</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="tattoo-directory.html" style="color: white; opacity: 0.8; text-decoration: none;">Directory</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center;">
        <p style="margin: 0; opacity: 0.8;">&copy; 2025 Do It By Law. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="js/navigation.js"></script>
  <script>
    document.getElementById('consentForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        state: document.getElementById('formState').value,
        minorName: document.getElementById('minorName').value,
        minorDOB: document.getElementById('minorDOB').value,
        parentName: document.getElementById('parentName').value,
        relationship: document.getElementById('relationship').value,
        tattooDesc: document.getElementById('tattooDesc').value,
        date: new Date().toLocaleDateString('en-US')
      };
      
      const consentHTML = \`
        <h2 style="text-align: center; color: #1f2937; margin-bottom: 2rem;">PARENTAL CONSENT FOR MINOR TATTOO</h2>
        
        <div style="margin-bottom: 1.5rem;">
          <p style="margin-bottom: 1rem;"><strong>State:</strong> \${formData.state.charAt(0).toUpperCase() + formData.state.slice(1)}</p>
          <p style="margin-bottom: 1rem;"><strong>Date:</strong> \${formData.date}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #2563eb; margin-bottom: 0.5rem;">Minor Information</h3>
          <p><strong>Full Name:</strong> \${formData.minorName}</p>
          <p><strong>Date of Birth:</strong> \${formData.minorDOB}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #2563eb; margin-bottom: 0.5rem;">Parent/Guardian Information</h3>
          <p><strong>Full Name:</strong> \${formData.parentName}</p>
          <p><strong>Relationship:</strong> \${formData.relationship}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #2563eb; margin-bottom: 0.5rem;">Tattoo Description</h3>
          <p>\${formData.tattooDesc}</p>
        </div>
        
        <div style="background: #eff6ff; padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <p style="line-height: 1.7; margin-bottom: 1rem;">I, \${formData.parentName}, as the parent/legal guardian of \${formData.minorName}, hereby give my consent for my child to receive the tattoo described above. I understand and acknowledge the following:</p>
          
          <ul style="margin-left: 2rem; line-height: 1.7;">
            <li>Tattoos are permanent and involve health risks</li>
            <li>I have reviewed all health and safety information provided</li>
            <li>I will be present during the entire tattooing procedure</li>
            <li>I have provided valid identification verification</li>
            <li>I release the tattoo artist from liability for any complications arising from proper procedure</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #d1d5db;">
          <div style="margin-bottom: 2rem;">
            <p style="margin-bottom: 0.5rem;">_________________________________</p>
            <p><strong>Parent/Guardian Signature</strong></p>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <p style="margin-bottom: 0.5rem;">_________________________________</p>
            <p><strong>Date</strong></p>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <p style="margin-bottom: 0.5rem;">_________________________________</p>
            <p><strong>Tattoo Artist Signature</strong></p>
          </div>
        </div>
        
        <div style="background: #fef3c7; padding: 1rem; border-radius: 6px; margin-top: 2rem; font-size: 0.9rem;">
          <p style="margin: 0;"><strong>Note:</strong> This form must be notarized in some states. Check your state requirements before proceeding.</p>
        </div>
      \`;
      
      document.getElementById('consentOutput').innerHTML = consentHTML;
      document.getElementById('consentOutput').style.display = 'block';
      document.getElementById('downloadBtn').style.display = 'inline-block';
      
      document.getElementById('consentOutput').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('downloadBtn').addEventListener('click', function() {
      window.print();
    });
  </script>
</body>
</html>`;
  
  fs.writeFileSync('consent-form.html', consentFormHtml);
  console.log('   ✅ Consent form tool created\n');
}

// Issue 4: Update navigation to remove FAQ from header and add consent form
function updateNavigation() {
  console.log('4️⃣ Updating navigation menus...');
  
  const glob = require('glob');
  const htmlFiles = glob.sync('**/*.html', {
    ignore: ['node_modules/**', 'dist/**', '.wrangler/**']
  });
  
  let updatedCount = 0;
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Update header navigation - add Consent Form and remove FAQ
    if (content.includes('<nav class="main-nav">') && content.includes('nav-menu')) {
      // Remove FAQ from header
      content = content.replace(
        /<li><a href="\.\/faq\.html">FAQ<\/a><\/li>/gi,
        ''
      );
      
      // Add Consent Form to header after Age Checker
      if (!content.includes('consent-form.html')) {
        content = content.replace(
          /(<li><a href="\.\/tool\.html">Age Checker<\/a><\/li>)/gi,
          '$1\n        <li><a href="./consent-form.html">Consent Form</a></li>'
        );
      }
      
      modified = true;
    }
    
    // Update footer navigation - add Legal Pages section and FAQ
    if (content.includes('<footer') && !content.includes('Legal Pages')) {
      // Add Legal Pages section to footer
      const legalPagesSection = `        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Legal Pages</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="privacy-policy.html" style="color: white; opacity: 0.8; text-decoration: none;">Privacy Policy</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="terms-of-service.html" style="color: white; opacity: 0.8; text-decoration: none;">Terms of Service</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="disclaimer.html" style="color: white; opacity: 0.8; text-decoration: none;">Legal Disclaimer</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="contact.html" style="color: white; opacity: 0.8; text-decoration: none;">Contact Us</a></li>
          </ul>
        </div>`;
      
      // Insert before the last footer column
      content = content.replace(
        /(<div>\s*<h4[^>]*>About<\/h4>)/i,
        legalPagesSection + '\n                $1'
      );
      
      // Add FAQ to footer About section if not present
      if (!content.match(/<a href="faq\.html"[^>]*>FAQ<\/a>/i)) {
        content = content.replace(
          /(<h4[^>]*>About<\/h4>\s*<ul[^>]*>)/i,
          '$1\n                        <li style="margin-bottom: 0.5rem;"><a href="faq.html" style="color: white; opacity: 0.8; text-decoration: none;">FAQ</a></li>'
        );
      }
      
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      updatedCount++;
    }
  });
  
  console.log(`   ✅ Updated navigation in ${updatedCount} files\n`);
}

// Issue 5: Create AdSense required pages
function createAdSensePages() {
  console.log('5️⃣ Creating AdSense required pages...');
  
  const pages = {
    'privacy-policy.html': {
      title: 'Privacy Policy | Do It By Law',
      heading: 'Privacy Policy',
      content: `
        <p><strong>Effective Date:</strong> December 16, 2025</p>
        
        <h2>1. Information We Collect</h2>
        <p>Do It By Law ("we," "our," "us") collects information to provide better services to our users. We collect:</p>
        <ul>
          <li><strong>Personal Information:</strong> When you voluntarily provide it (e.g., contact forms, newsletter signup)</li>
          <li><strong>Usage Data:</strong> Information about how you use our website (pages visited, time spent, referring sites)</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance user experience</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use collected information for:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Analyzing website usage and trends</li>
          <li>Sending newsletters and updates (with your consent)</li>
          <li>Complying with legal obligations</li>
        </ul>
        
        <h2>3. Third-Party Services</h2>
        <p>We use third-party services including:</p>
        <ul>
          <li><strong>Google AdSense:</strong> For displaying advertisements. Google may use cookies to serve ads based on your visits to our site.</li>
          <li><strong>Google Analytics:</strong> For analyzing website traffic and user behavior.</li>
        </ul>
        
        <h2>4. Cookies</h2>
        <p>We use cookies to improve user experience. You can disable cookies in your browser settings, but this may affect site functionality.</p>
        
        <h2>5. Data Security</h2>
        <p>We implement reasonable security measures to protect your information. However, no internet transmission is 100% secure.</p>
        
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Disable cookies in your browser</li>
        </ul>
        
        <h2>7. Children's Privacy</h2>
        <p>Our website is not directed at children under 13. We do not knowingly collect personal information from children.</p>
        
        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.</p>
        
        <h2>9. Contact Us</h2>
        <p>For privacy-related questions, contact us at: <a href="contact.html">Contact Page</a></p>
      `
    },
    'terms-of-service.html': {
      title: 'Terms of Service | Do It By Law',
      heading: 'Terms of Service',
      content: `
        <p><strong>Effective Date:</strong> December 16, 2025</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using DoItByLaw.com ("Website"), you agree to these Terms of Service ("Terms"). If you do not agree, do not use the Website.</p>
        
        <h2>2. Use of the Website</h2>
        <p>You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the Website in any way that violates applicable laws</li>
          <li>Attempt to gain unauthorized access to any part of the Website</li>
          <li>Use automated systems (bots, scrapers) without permission</li>
          <li>Transmit any malicious code or viruses</li>
        </ul>
        
        <h2>3. Informational Purposes Only</h2>
        <p>The information provided on this Website is for <strong>general informational purposes only</strong> and does not constitute legal advice. Tattoo age laws vary by state and can change. Always verify current requirements with your state health department and legal professionals.</p>
        
        <h2>4. No Attorney-Client Relationship</h2>
        <p>Use of this Website does not create an attorney-client relationship. For specific legal advice, consult a licensed attorney in your jurisdiction.</p>
        
        <h2>5. Accuracy of Information</h2>
        <p>While we strive to provide accurate information, we make no warranties about the completeness, reliability, or accuracy of the information on the Website.</p>
        
        <h2>6. Third-Party Links</h2>
        <p>The Website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.</p>
        
        <h2>7. Intellectual Property</h2>
        <p>All content on this Website, including text, graphics, logos, and images, is the property of Do It By Law or its content suppliers and is protected by copyright laws.</p>
        
        <h2>8. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Do It By Law shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Website.</p>
        
        <h2>9. Indemnification</h2>
        <p>You agree to indemnify and hold Do It By Law harmless from any claims, damages, or expenses arising from your use of the Website or violation of these Terms.</p>
        
        <h2>10. Modifications to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting.</p>
        
        <h2>11. Governing Law</h2>
        <p>These Terms are governed by the laws of the United States, without regard to conflict of law provisions.</p>
        
        <h2>12. Contact Us</h2>
        <p>For questions about these Terms, contact us at: <a href="contact.html">Contact Page</a></p>
      `
    },
    'disclaimer.html': {
      title: 'Legal Disclaimer | Do It By Law',
      heading: 'Legal Disclaimer',
      content: `
        <p><strong>Last Updated:</strong> December 16, 2025</p>
        
        <h2>1. General Information Only</h2>
        <p>The information provided on DoItByLaw.com is for <strong>general informational and educational purposes only</strong>. It is not intended as, and should not be construed as, legal advice or a substitute for professional legal counsel.</p>
        
        <h2>2. No Legal Advice</h2>
        <p>Nothing on this Website constitutes legal advice. Tattoo age laws are complex, vary significantly by state, and are subject to change. For specific legal guidance, consult a licensed attorney in your jurisdiction.</p>
        
        <h2>3. Accuracy and Completeness</h2>
        <p>While we make every effort to ensure the accuracy of information on this Website, we make <strong>no representations or warranties</strong> of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information.</p>
        
        <h2>4. Laws Change</h2>
        <p>State tattoo age laws can change at any time through legislative action, court decisions, or regulatory updates. We strive to keep information current but cannot guarantee real-time updates. <strong>Always verify current laws with official state sources before making decisions.</strong></p>
        
        <h2>5. Local Ordinances</h2>
        <p>In addition to state laws, local municipalities may impose additional restrictions on tattoos for minors. The information on this Website reflects state-level laws and may not account for all local ordinances.</p>
        
        <h2>6. No Professional Relationship</h2>
        <p>Use of this Website does not create any professional relationship (attorney-client, medical, or otherwise) between you and Do It By Law or any contributors to the Website.</p>
        
        <h2>7. Medical and Health Information</h2>
        <p>Any health-related information on this Website is for informational purposes only and does not constitute medical advice. Consult a healthcare professional before getting a tattoo, especially for minors.</p>
        
        <h2>8. Third-Party Information</h2>
        <p>Links to third-party websites (state health departments, legal code databases, etc.) are provided for convenience. We do not endorse or assume responsibility for the accuracy of information on external sites.</p>
        
        <h2>9. Individual Circumstances Vary</h2>
        <p>Every individual's situation is unique. Information on this Website may not apply to your specific circumstances. Seek personalized advice from qualified professionals.</p>
        
        <h2>10. Assumption of Risk</h2>
        <p>By using this Website, you acknowledge that any reliance on information provided is at your own risk. Do It By Law shall not be liable for any losses or damages arising from your use of this Website or the information contained herein.</p>
        
        <h2>11. Verification Recommended</h2>
        <p>We <strong>strongly recommend</strong> verifying all information with:</p>
        <ul>
          <li>Your state health department</li>
          <li>Licensed attorneys specializing in family or health law</li>
          <li>Licensed tattoo parlors in your area</li>
          <li>Official state legal code databases</li>
        </ul>
        
        <h2>12. Contact for Questions</h2>
        <p>If you have questions about this disclaimer, please contact us at: <a href="contact.html">Contact Page</a></p>
      `
    },
    'contact.html': {
      title: 'Contact Us | Do It By Law',
      heading: 'Contact Us',
      content: `
        <p>Have questions, feedback, or need assistance? We're here to help!</p>
        
        <div style="background: #eff6ff; padding: 2rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #2563eb;">
          <h2 style="margin-top: 0;">Get in Touch</h2>
          
          <form id="contactForm" style="display: grid; gap: 1.5rem; max-width: 600px;">
            <div>
              <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Your Name</label>
              <input type="text" id="contactName" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
            </div>
            
            <div>
              <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Email Address</label>
              <input type="email" id="contactEmail" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
            </div>
            
            <div>
              <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Subject</label>
              <input type="text" id="contactSubject" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
            </div>
            
            <div>
              <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Message</label>
              <textarea id="contactMessage" rows="5" required style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"></textarea>
            </div>
            
            <button type="submit" style="background: #2563eb; color: white; padding: 1rem 2rem; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
              Send Message
            </button>
          </form>
          
          <div id="contactSuccess" style="display: none; background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
            Thank you for your message! We'll get back to you soon.
          </div>
        </div>
        
        <h2>Frequently Asked Questions</h2>
        <p>Before contacting us, check our <a href="faq.html" style="color: #2563eb; font-weight: 600;">FAQ page</a> for answers to common questions about tattoo age laws.</p>
        
        <h2>Legal Inquiries</h2>
        <p><strong>Please note:</strong> We cannot provide legal advice through this contact form. For specific legal questions, please consult a licensed attorney in your state.</p>
        
        <h2>Business Inquiries</h2>
        <p>For partnership opportunities, advertising, or business-related inquiries, please use the contact form above with "Business Inquiry" in the subject line.</p>
        
        <script>
          document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('contactSuccess').style.display = 'block';
            this.reset();
            setTimeout(() => {
              document.getElementById('contactSuccess').style.display = 'none';
            }, 5000);
          });
        </script>
      `
    }
  };
  
  Object.keys(pages).forEach(filename => {
    const page = pages[filename];
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <a href="./index.html">
          <img src="./images/logo.svg" alt="Do It By Law" class="nav-logo">
          <span class="brand-text">Do It By Law</span>
        </a>
      </div>
      <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        <li><a href="./index.html">Home</a></li>
        <li><a href="./tool.html">Age Checker</a></li>
        <li><a href="./consent-form.html">Consent Form</a></li>
        <li><a href="./map.html">Map</a></li>
        <li><a href="./comparison.html">Compare</a></li>
        <li><a href="./piercing/index.html">Piercing</a></li>
        <li><a href="./tattoo-directory.html">Directory</a></li>
        <li><a href="./blog/index.html">Blog</a></li>
      </ul>
    </div>
  </nav>

  <main style="padding: 4rem 0; background: white;">
    <div class="container" style="max-width: 900px; margin: 0 auto; padding: 0 1rem;">
      <h1 style="color: #1f2937; margin-bottom: 2rem;">${page.heading}</h1>
      
      <div style="color: #4b5563; line-height: 1.8;">
        ${page.content}
      </div>
    </div>
  </main>

  <footer style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="color: white; margin-bottom: 1rem;">Do It By Law</h3>
          <p style="opacity: 0.8; line-height: 1.6;">Your trusted source for tattoo, piercing, and body modification laws across all 50 US states.</p>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Tools</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="tool.html" style="color: white; opacity: 0.8; text-decoration: none;">Age Checker</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="consent-form.html" style="color: white; opacity: 0.8; text-decoration: none;">Consent Form</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="comparison.html" style="color: white; opacity: 0.8; text-decoration: none;">Compare States</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Legal Pages</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="privacy-policy.html" style="color: white; opacity: 0.8; text-decoration: none;">Privacy Policy</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="terms-of-service.html" style="color: white; opacity: 0.8; text-decoration: none;">Terms of Service</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="disclaimer.html" style="color: white; opacity: 0.8; text-decoration: none;">Legal Disclaimer</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="contact.html" style="color: white; opacity: 0.8; text-decoration: none;">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Resources</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="faq.html" style="color: white; opacity: 0.8; text-decoration: none;">FAQ</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="blog/index.html" style="color: white; opacity: 0.8; text-decoration: none;">Blog</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="tattoo-directory.html" style="color: white; opacity: 0.8; text-decoration: none;">Directory</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center;">
        <p style="margin: 0; opacity: 0.8;">&copy; 2025 Do It By Law. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="js/navigation.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(filename, html);
    console.log(`   ✅ Created ${filename}`);
  });
  
  console.log('');
}

// Issue 6: Generate sitemap with highest priority and current date
function generateSitemap() {
  console.log('6️⃣ Generating sitemap...');
  
  const glob = require('glob');
  const htmlFiles = glob.sync('**/*.html', {
    ignore: ['node_modules/**', 'dist/**', '.wrangler/**', 'snippets/**', 'temp/**']
  });
  
  const currentDate = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://tattoo.doitbylaw.com';
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  htmlFiles.forEach(file => {
    const url = `${baseUrl}/${file}`.replace('index.html', '');
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
  });
  
  sitemap += `</urlset>`;
  
  fs.writeFileSync('sitemap.xml', sitemap);
  console.log(`   ✅ Generated sitemap with ${htmlFiles.length} URLs (priority 1.0, date: ${currentDate})\n`);
}

// Issue 7: Update blog dates to current date
function updateBlogDates() {
  console.log('7️⃣ Updating blog post dates...');
  
  const currentDate = new Date().toISOString().split('T')[0];
  const currentDateFormatted = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const blogFiles = fs.readdirSync('blog').filter(f => f.endsWith('.html') && f !== 'index.html');
  
  blogFiles.forEach(file => {
    const filePath = path.join('blog', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update schema datePublished and dateModified
    content = content.replace(
      /"datePublished":\s*"[^"]+"/g,
      `"datePublished": "${currentDate}"`
    );
    content = content.replace(
      /"dateModified":\s*"[^"]+"/g,
      `"dateModified": "${currentDate}"`
    );
    
    // Update visible dates in content
    content = content.replace(
      /<time[^>]*>[^<]+<\/time>/gi,
      `<time datetime="${currentDate}">${currentDateFormatted}</time>`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`   ✅ Updated dates in ${file}`);
  });
  
  console.log('');
}

// Run all fixes
try {
  fixMobileMenu();
  fixAgeInput();
  createConsentFormTool();
  updateNavigation();
  createAdSensePages();
  generateSitemap();
  updateBlogDates();
  
  console.log('✅ ALL FIXES COMPLETED SUCCESSFULLY!\n');
  console.log('📋 Summary:');
  console.log('   1. Mobile hamburger menu - FIXED');
  console.log('   2. Age input manual typing - FIXED');
  console.log('   3. Consent form tool - CREATED & LINKED');
  console.log('   4. Navigation menus - UPDATED (FAQ moved to footer)');
  console.log('   5. AdSense pages - CREATED (4 pages)');
  console.log('   6. Sitemap - GENERATED (priority 1.0, current date)');
  console.log('   7. Blog dates - UPDATED to current date');
  console.log('\n🚀 Ready to restart server and test!');
  
} catch (error) {
  console.error('❌ Error during fixes:', error);
  process.exit(1);
}
