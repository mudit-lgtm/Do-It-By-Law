/**
 * Standardize Header/Footer + Implement AEO/GEO Optimizations
 * 
 * Tasks:
 * 1. Extract homepage navigation template
 * 2. Apply to all state pages, hub pages, age guides
 * 3. Add FAQPage schema (8-10 questions per state)
 * 4. Add voice search blocks
 * 5. Add People Also Ask sections
 */

const fs = require('fs');
const path = require('path');

// Standard navigation HTML (from homepage)
const standardNav = `  <nav class="main-nav">
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
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Resources <span class="dropdown-arrow">▼</span></a>
          <ul class="dropdown-menu">
            <li><a href="./strictest-tattoo-age-laws.html">Strictest State Laws</a></li>
            <li><a href="./most-lenient-tattoo-age-laws.html">Most Lenient Laws</a></li>
            <li><a href="./states-allowing-16-year-olds.html">States Allowing 16+</a></li>
            <li class="dropdown-divider"></li>
            <li><a href="./can-you-get-tattoo-at-15.html">Can You Get Tattoo at 15?</a></li>
            <li><a href="./can-you-get-tattoo-at-16.html">Can You Get Tattoo at 16?</a></li>
            <li><a href="./can-you-get-tattoo-at-17.html">Can You Get Tattoo at 17?</a></li>
          </ul>
        </li>
        <li><a href="./piercing/index.html">Piercing</a></li>
        <li><a href="./tattoo-directory.html">Directory</a></li>
        <li><a href="./blog/index.html">Blog</a></li>
      </ul>
    </div>
  </nav>`;

const standardFooter = `    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3><i class="fas fa-balance-scale"></i> Do It By Law</h3>
                <p>Your trusted source for tattoo age laws and legal requirements across all 50 US states.</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="./index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="./tool.html"><i class="fas fa-calculator"></i> Age Checker</a></li>
                    <li><a href="./consent-form.html"><i class="fas fa-file-alt"></i> Consent Form</a></li>
                    <li><a href="./map.html"><i class="fas fa-map"></i> Interactive Map</a></li>
                    <li><a href="./about.html"><i class="fas fa-info-circle"></i> About Us</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Legal Resources</h4>
                <ul>
                    <li><a href="./strictest-tattoo-age-laws.html">Strictest State Laws</a></li>
                    <li><a href="./most-lenient-tattoo-age-laws.html">Most Lenient Laws</a></li>
                    <li><a href="./states-allowing-16-year-olds.html">States Allowing 16+</a></li>
                    <li><a href="./faq.html">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Stay Updated</h4>
                <p>Laws change. Bookmark this page and check back regularly for updates.</p>
                <p style="margin-top: 1rem;">
                    <a href="./newsletter.html" class="cta-button"><i class="fas fa-envelope"></i> Subscribe to Updates</a>
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Do It By Law. All rights reserved. | <a href="./privacy.html">Privacy Policy</a> | <a href="./terms.html">Terms of Use</a></p>
            <p style="font-size: 0.85rem; opacity: 0.8;">Providing legal information, not legal advice. Consult an attorney for specific legal guidance.</p>
        </div>
    </footer>

  <script src="js/navigation.js"></script>`;

// All 50 US states
const states = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
  'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
  'newhampshire', 'newjersey', 'newmexico', 'newyork', 'northcarolina', 'northdakota',
  'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhodeisland', 'southcarolina',
  'southdakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington',
  'westvirginia', 'wisconsin', 'wyoming'
];

const stateNames = {
  'alabama': 'Alabama', 'alaska': 'Alaska', 'arizona': 'Arizona', 'arkansas': 'Arkansas',
  'california': 'California', 'colorado': 'Colorado', 'connecticut': 'Connecticut',
  'delaware': 'Delaware', 'florida': 'Florida', 'georgia': 'Georgia', 'hawaii': 'Hawaii',
  'idaho': 'Idaho', 'illinois': 'Illinois', 'indiana': 'Indiana', 'iowa': 'Iowa',
  'kansas': 'Kansas', 'kentucky': 'Kentucky', 'louisiana': 'Louisiana', 'maine': 'Maine',
  'maryland': 'Maryland', 'massachusetts': 'Massachusetts', 'michigan': 'Michigan',
  'minnesota': 'Minnesota', 'mississippi': 'Mississippi', 'missouri': 'Missouri',
  'montana': 'Montana', 'nebraska': 'Nebraska', 'nevada': 'Nevada',
  'newhampshire': 'New Hampshire', 'newjersey': 'New Jersey', 'newmexico': 'New Mexico',
  'newyork': 'New York', 'northcarolina': 'North Carolina', 'northdakota': 'North Dakota',
  'ohio': 'Ohio', 'oklahoma': 'Oklahoma', 'oregon': 'Oregon', 'pennsylvania': 'Pennsylvania',
  'rhodeisland': 'Rhode Island', 'southcarolina': 'South Carolina', 'southdakota': 'South Dakota',
  'tennessee': 'Tennessee', 'texas': 'Texas', 'utah': 'Utah', 'vermont': 'Vermont',
  'virginia': 'Virginia', 'washington': 'Washington', 'westvirginia': 'West Virginia',
  'wisconsin': 'Wisconsin', 'wyoming': 'Wyoming'
};

// FAQs for each state (generic template - customize per state)
function generateStateFAQs(stateName) {
  return [
    {
      question: `What is the legal tattoo age in ${stateName}?`,
      answer: `In ${stateName}, you must be 18 years old to get a tattoo without parental consent. Check the specific state laws for any parental consent exceptions for ages 16-17.`
    },
    {
      question: `Can I get a tattoo at 16 in ${stateName} with parental consent?`,
      answer: `This depends on ${stateName}'s specific laws. Some states allow tattoos at 16 with documented parental consent and presence, while others require age 18 with no exceptions.`
    },
    {
      question: `What documents do I need for parental consent in ${stateName}?`,
      answer: `Typical requirements include government-issued ID for both minor and parent, proof of relationship (birth certificate), completed consent form, and parent must be physically present during the procedure.`
    },
    {
      question: `Are medical tattoos allowed for minors in ${stateName}?`,
      answer: `Yes. All states, including ${stateName}, permit medical tattoos for minors when performed by licensed physicians for legitimate medical purposes with parental consent.`
    },
    {
      question: `What are the penalties for tattoo artists who tattoo minors illegally in ${stateName}?`,
      answer: `Penalties typically include fines ($500-$5,000), potential jail time (up to 1 year), and license suspension or revocation. Specific penalties vary by state.`
    },
    {
      question: `Can an emancipated minor get a tattoo in ${stateName}?`,
      answer: `Emancipation status does not override cosmetic tattoo age minimums in most states. Even emancipated minors must meet the state's statutory minimum age for cosmetic tattoos.`
    },
    {
      question: `How can I verify if a tattoo studio in ${stateName} is licensed?`,
      answer: `Contact ${stateName}'s health department or regulatory board. Licensed studios should display their license prominently and provide license numbers upon request.`
    },
    {
      question: `What should I do if I got an illegal tattoo in ${stateName}?`,
      answer: `Seek medical attention if needed, document everything, and consider consulting a family law attorney. The tattoo artist may face legal consequences, and removal costs may be recoverable.`
    }
  ];
}

// Voice search block template
function generateVoiceSearchBlock(stateName) {
  return `
<!-- Voice Search Optimized Content (Hidden, for AI/Voice Assistants) -->
<div class="voice-search-optimized" style="display: none;" aria-hidden="true">
  <h2>Quick Answers for Voice Search</h2>
  <p><strong>Can you get a tattoo at 16 in ${stateName}?</strong> Check ${stateName}'s specific laws. Some states allow tattoos at 16 with parental consent, while others require age 18.</p>
  <p><strong>What is the legal tattoo age in ${stateName}?</strong> The legal age for tattoos in ${stateName} is typically 18 years old, though parental consent exceptions may apply for ages 16-17 in some states.</p>
  <p><strong>Do you need parental consent for tattoos in ${stateName}?</strong> Parental consent requirements vary by state. Check ${stateName}'s specific laws for consent rules and age exceptions.</p>
</div>`;
}

// People Also Ask section template
function generatePeopleAlsoAsk(stateName) {
  return `
<!-- People Also Ask Section (AEO Optimization) -->
<section class="people-also-ask" style="background: #f9fafb; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
  <h2 style="color: #1f2937; margin-bottom: 1.5rem;"><i class="fas fa-question-circle"></i> People Also Ask About ${stateName} Tattoo Laws</h2>
  
  <div class="paa-item" style="margin-bottom: 1.5rem;">
    <h3 style="color: #667eea; font-size: 1.1rem; margin-bottom: 0.5rem;">How old do you have to be to get a tattoo in ${stateName}?</h3>
    <p style="color: #4b5563; line-height: 1.6;">The minimum age for tattoos in ${stateName} is typically 18 years old. Some states allow younger individuals (16-17) with documented parental consent.</p>
  </div>
  
  <div class="paa-item" style="margin-bottom: 1.5rem;">
    <h3 style="color: #667eea; font-size: 1.1rem; margin-bottom: 0.5rem;">Can parents give permission for minors to get tattoos in ${stateName}?</h3>
    <p style="color: #4b5563; line-height: 1.6;">Parental consent effectiveness depends on state law. Check ${stateName}'s specific regulations to see if parental consent allows tattoos for 16-17 year olds.</p>
  </div>
  
  <div class="paa-item" style="margin-bottom: 1.5rem;">
    <h3 style="color: #667eea; font-size: 1.1rem; margin-bottom: 0.5rem;">What happens if you get a tattoo underage in ${stateName}?</h3>
    <p style="color: #4b5563; line-height: 1.6;">The tattoo artist faces criminal charges, fines, and license suspension. Minors who lie about their age may face fraud charges. Parents may need to cover removal costs.</p>
  </div>
</section>`;
}

// Process a single file
function processFile(filename, isStatePage = false, stateName = '') {
  const filepath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⏭️  SKIP: ${filename} not found`);
    return false;
  }
  
  let html = fs.readFileSync(filepath, 'utf8');
  let modified = false;
  
  // 1. Replace navigation
  if (html.includes('<nav')) {
    const navRegex = /<nav[^>]*>[\s\S]*?<\/nav>/;
    if (navRegex.test(html)) {
      html = html.replace(navRegex, standardNav);
      modified = true;
      console.log(`  ✅ Updated navigation in ${filename}`);
    }
  }
  
  // 2. Replace footer
  if (html.includes('<footer')) {
    const footerRegex = /<footer[\s\S]*?<\/footer>/;
    if (footerRegex.test(html)) {
      html = html.replace(footerRegex, standardFooter);
      modified = true;
      console.log(`  ✅ Updated footer in ${filename}`);
    }
  }
  
  // 3. Add FAQPage schema (if state page and doesn't have it)
  if (isStatePage && !html.includes('"@type": "FAQPage"')) {
    const faqs = generateStateFAQs(stateName);
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    
    const schemaTag = `\n<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;
    
    // Insert before </head>
    html = html.replace('</head>', `${schemaTag}\n</head>`);
    modified = true;
    console.log(`  ✅ Added FAQPage schema (${faqs.length} questions) to ${filename}`);
  }
  
  // 4. Add voice search block (if state page and doesn't have it)
  if (isStatePage && !html.includes('voice-search-optimized')) {
    const voiceBlock = generateVoiceSearchBlock(stateName);
    // Insert before footer
    html = html.replace(/<footer/, `${voiceBlock}\n\n    <footer`);
    modified = true;
    console.log(`  ✅ Added voice search block to ${filename}`);
  }
  
  // 5. Add People Also Ask section (if state page and doesn't have it)
  if (isStatePage && !html.includes('people-also-ask')) {
    const paaSection = generatePeopleAlsoAsk(stateName);
    // Insert before voice search block or footer
    if (html.includes('voice-search-optimized')) {
      html = html.replace(/<!-- Voice Search/, `${paaSection}\n\n<!-- Voice Search`);
    } else {
      html = html.replace(/<footer/, `${paaSection}\n\n    <footer`);
    }
    modified = true;
    console.log(`  ✅ Added People Also Ask section to ${filename}`);
  }
  
  if (modified) {
    fs.writeFileSync(filepath, html, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
console.log('🚀 Starting header/footer standardization + AEO/GEO implementation...\n');

let totalUpdated = 0;

// 1. Update all 50 state pages
console.log('📍 Processing state pages...');
states.forEach(stateKey => {
  const filename = `${stateKey}.html`;
  const stateName = stateNames[stateKey];
  if (processFile(filename, true, stateName)) {
    totalUpdated++;
  }
});

// 2. Update hub pages
console.log('\n📊 Processing hub pages...');
['strictest-tattoo-age-laws.html', 'most-lenient-tattoo-age-laws.html', 'states-allowing-16-year-olds.html'].forEach(filename => {
  if (processFile(filename, false)) {
    totalUpdated++;
  }
});

// 3. Update age guide pages
console.log('\n🔢 Processing age guide pages...');
['can-you-get-tattoo-at-15.html', 'can-you-get-tattoo-at-16.html', 'can-you-get-tattoo-at-17.html'].forEach(filename => {
  if (processFile(filename, false)) {
    totalUpdated++;
  }
});

console.log(`\n✅ COMPLETE: Updated ${totalUpdated} files`);
console.log('📄 Changes include:');
console.log('   - Standardized navigation with Resources dropdown');
console.log('   - Standardized footer with quick links');
console.log('   - FAQPage schema (8 questions per state page)');
console.log('   - Voice search optimized blocks');
console.log('   - People Also Ask sections');
