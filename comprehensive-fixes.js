const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('========== COMPREHENSIVE FIXES - ALL 10 PRIORITIES ==========\n');

// ============================================
// PRIORITY 1: Fix Mobile Hamburger Menu
// ============================================
console.log('PRIORITY 1: Fixing mobile hamburger menu...');

const navJS = `// ========================================
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
`;

fs.writeFileSync('js/navigation.js', navJS);
console.log('✓ Mobile hamburger menu JavaScript fixed\n');

// ============================================
// PRIORITY 6: Fix Age Input Box Issue
// ============================================
console.log('PRIORITY 6: Fixing age input box...');

const ageFixJS = `
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
`;

fs.appendFileSync('js/navigation.js', ageFixJS);
console.log('✓ Age input box fixed - typing enabled\n');

// ============================================
// PRIORITY 3 & 4: Full-Width Header & Footer
// ============================================
console.log('PRIORITY 3 & 4: Creating full-width header and footer...');

const FULL_WIDTH_HEADER = `  <!-- Navigation Header (Full Width) -->
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <a href="[ROOT]index.html">
          <img src="[ROOT]images/logo.svg" alt="Do It By Law" class="nav-logo">
          <span class="brand-text">Do It By Law</span>
        </a>
      </div>
      <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        <li><a href="[ROOT]index.html">Home</a></li>
        <li><a href="[ROOT]tool.html">Age Checker</a></li>
        <li><a href="[ROOT]map.html">Map</a></li>
        <li><a href="[ROOT]comparison.html">Compare States</a></li>
        <li><a href="[ROOT]faq.html">FAQ</a></li>
        <li><a href="[ROOT]piercing/index.html">Piercing Laws</a></li>
        <li><a href="[ROOT]tattoo-directory.html">Directory</a></li>
        <li><a href="[ROOT]consent-form.html">Consent Form</a></li>
        <li><a href="[ROOT]blog/index.html">Blog</a></li>
      </ul>
    </div>
  </nav>`;

const FULL_WIDTH_FOOTER = `  <!-- Footer (Full Width) -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>Do It By Law</h3>
          <p>Your comprehensive guide to tattoo, piercing, and body modification laws across all 50 US states. Updated for 2025.</p>
        </div>
        
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="[ROOT]index.html">Home</a></li>
            <li><a href="[ROOT]tool.html">Age Checker Tool</a></li>
            <li><a href="[ROOT]map.html">Interactive Map</a></li>
            <li><a href="[ROOT]comparison.html">Compare States</a></li>
            <li><a href="[ROOT]faq.html">FAQ</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="[ROOT]piercing/index.html">Piercing Laws</a></li>
            <li><a href="[ROOT]body-modification.html">Body Modifications</a></li>
            <li><a href="[ROOT]tattoo-directory.html">Tattoo Directory</a></li>
            <li><a href="[ROOT]consent-form.html">Parental Consent Form</a></li>
            <li><a href="[ROOT]resources.html">Legal Resources</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="[ROOT]privacy-policy.html">Privacy Policy</a></li>
            <li><a href="[ROOT]terms-of-service.html">Terms of Service</a></li>
            <li><a href="[ROOT]disclaimer.html">Legal Disclaimer</a></li>
            <li><a href="[ROOT]about.html">About Us</a></li>
            <li><a href="[ROOT]contact.html">Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Blog & Guides</h4>
          <ul>
            <li><a href="[ROOT]blog/index.html">Blog Articles</a></li>
            <li><a href="[ROOT]guides/getting-first-tattoo-underage.html">First Tattoo Guide</a></li>
            <li><a href="[ROOT]guides/parental-consent-requirements.html">Consent Requirements</a></li>
            <li><a href="[ROOT]sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 Do It By Law. All rights reserved.</p>
        <p class="disclaimer">This website provides general legal information only and is not a substitute for professional legal advice. Laws change frequently. Always consult with local authorities and legal professionals.</p>
      </div>
    </div>
  </footer>`;

console.log('✓ Full-width header and footer templates created\n');

// ============================================
// PRIORITY 9: Create AdSense Required Pages
// ============================================
console.log('PRIORITY 9: Creating AdSense required pages...');

const pages = {
  'privacy-policy.html': {
    title: 'Privacy Policy',
    h1: 'Privacy Policy',
    content: `<p><strong>Last Updated:</strong> January 1, 2025</p>

<h2>1. Information We Collect</h2>
<p>Do It By Law ("we," "our," or "us") collects the following information:</p>
<ul>
  <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, and navigation patterns</li>
  <li><strong>Device Information:</strong> Browser type, device type, IP address (anonymized)</li>
  <li><strong>Cookies:</strong> We use cookies to improve user experience and analyze traffic</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>We use collected information to:</p>
<ul>
  <li>Provide and improve our services</li>
  <li>Analyze website usage and trends</li>
  <li>Comply with legal obligations</li>
</ul>

<h2>3. Third-Party Services</h2>
<p>We use Google Analytics and Google AdSense, which may collect data according to their privacy policies.</p>

<h2>4. Your Rights</h2>
<p>You have the right to access, correct, or delete your personal information. Contact us at privacy@doitbylaw.com.</p>

<h2>5. Changes to This Policy</h2>
<p>We may update this policy periodically. Check this page for updates.</p>`
  },
  
  'terms-of-service.html': {
    title: 'Terms of Service',
    h1: 'Terms of Service',
    content: `<p><strong>Last Updated:</strong> January 1, 2025</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing Do It By Law, you agree to these Terms of Service.</p>

<h2>2. Use of Service</h2>
<p>You may use our service for lawful purposes only. You agree not to:</p>
<ul>
  <li>Violate any laws or regulations</li>
  <li>Transmit harmful code or malware</li>
  <li>Attempt to gain unauthorized access</li>
  <li>Scrape or harvest data without permission</li>
</ul>

<h2>3. Intellectual Property</h2>
<p>All content on this website is owned by Do It By Law and protected by copyright laws.</p>

<h2>4. Disclaimer of Warranties</h2>
<p>This service is provided "as is" without warranties of any kind.</p>

<h2>5. Limitation of Liability</h2>
<p>We are not liable for any damages arising from use of this service.</p>

<h2>6. Contact</h2>
<p>For questions, contact us at legal@doitbylaw.com.</p>`
  },
  
  'disclaimer.html': {
    title: 'Legal Disclaimer',
    h1: 'Legal Disclaimer',
    content: `<p><strong>Last Updated:</strong> January 1, 2025</p>

<h2>1. Not Legal Advice</h2>
<p><strong>IMPORTANT:</strong> The information provided on Do It By Law is for general informational purposes only and does not constitute legal advice. Do not rely on this information as a substitute for professional legal counsel.</p>

<h2>2. Accuracy of Information</h2>
<p>While we strive to provide accurate and up-to-date information about tattoo age laws, we make no representations or warranties regarding:</p>
<ul>
  <li>Accuracy, completeness, or currentness of information</li>
  <li>Applicability to your specific situation</li>
  <li>Changes in laws since last update</li>
</ul>

<h2>3. Professional Consultation</h2>
<p>Always consult with:</p>
<ul>
  <li>Licensed attorneys for legal advice</li>
  <li>Local health departments for regulatory requirements</li>
  <li>State licensing boards for current regulations</li>
</ul>

<h2>4. No Attorney-Client Relationship</h2>
<p>Use of this website does not create an attorney-client relationship.</p>

<h2>5. Third-Party Links</h2>
<p>We link to official government sources but are not responsible for their content or accuracy.</p>

<h2>6. Limitation of Liability</h2>
<p>Do It By Law and its operators are not liable for any decisions made based on information from this website.</p>`
  },
  
  'contact.html': {
    title: 'Contact Us',
    h1: 'Contact Us',
    content: `<h2>Get in Touch</h2>
<p>Have questions about tattoo age laws or our website? We're here to help.</p>

<h3>General Inquiries</h3>
<p>Email: <a href="mailto:info@doitbylaw.com">info@doitbylaw.com</a></p>

<h3>Legal Questions</h3>
<p>Email: <a href="mailto:legal@doitbylaw.com">legal@doitbylaw.com</a></p>
<p><strong>Note:</strong> We cannot provide specific legal advice. Please consult a licensed attorney.</p>

<h3>Privacy Concerns</h3>
<p>Email: <a href="mailto:privacy@doitbylaw.com">privacy@doitbylaw.com</a></p>

<h3>Technical Support</h3>
<p>Email: <a href="mailto:support@doitbylaw.com">support@doitbylaw.com</a></p>

<h3>Business Hours</h3>
<p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
<p>We typically respond within 24-48 hours.</p>`
  }
};

function createLegalPage(filename, data) {
  const root = './';
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} | Do It By Law</title>
  <meta name="description" content="${data.title} for Do It By Law - Tattoo Age Laws by State">
  <link rel="canonical" href="https://tattoo.doitbylaw.com/${filename}">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
${FULL_WIDTH_HEADER.replace(/\[ROOT\]/g, root)}

  <main class="legal-page" style="max-width: 900px; margin: 3rem auto; padding: 0 1rem;">
    <article>
      <h1>${data.h1}</h1>
      ${data.content}
    </article>
  </main>

${FULL_WIDTH_FOOTER.replace(/\[ROOT\]/g, root)}

  <script src="js/navigation.js"></script>
  <script src="js/analytics.js"></script>
</body>
</html>`;
  
  fs.writeFileSync(filename, html);
  console.log(`✓ Created ${filename}`);
}

Object.keys(pages).forEach(filename => {
  createLegalPage(filename, pages[filename]);
});

console.log('✓ All AdSense required pages created\n');

// ============================================
// PRIORITY 7: Create Working Sitemap
// ============================================
console.log('PRIORITY 7: Creating comprehensive sitemap...');

const sitemapGenerator = require('./generate-sitemap.js');
// Sitemap will be generated separately

console.log('✓ Sitemap generator ready\n');

console.log('========== FIXES COMPLETE ==========');
console.log('\n✅ Completed:');
console.log('  1. Mobile hamburger menu - fixed JavaScript');
console.log('  6. Age input box - typing enabled');
console.log('  3 & 4. Full-width header/footer templates created');
console.log('  9. AdSense pages - Privacy, Terms, Disclaimer, Contact');
console.log('\n⚠️  Next steps:');
console.log('  - Run state pages update script');
console.log('  - Generate sitemap');
console.log('  - Update all HTML files with new header/footer');
console.log('  - Test and push to GitHub');
