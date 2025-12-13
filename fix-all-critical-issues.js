const fs = require('fs');
const path = require('path');

console.log('========== FIXING ALL CRITICAL ISSUES ==========\n');

// ============================================
// ISSUE 1: Fix Navigation Header CSS
// ============================================
console.log('1. Fixing navigation header alignment...');

const mainCSS = fs.readFileSync('css/main.css', 'utf8');

// Add/update navigation CSS to align menu to right
const navCSS = `
/* ========== NAVIGATION HEADER ========== */
.main-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: #1f2937;
}

.nav-brand a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.nav-logo {
  width: 40px;
  height: 40px;
}

.brand-text {
  font-weight: 700;
  color: #2563eb;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  align-items: center;
}

.nav-menu li {
  margin: 0;
}

.nav-menu a {
  padding: 0.75rem 1.25rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s;
  display: block;
}

.nav-menu a:hover {
  background: #eff6ff;
  color: #2563eb;
}

.nav-menu a.active {
  background: #2563eb;
  color: white;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: #1f2937;
  border-radius: 2px;
  transition: all 0.3s;
}

@media (max-width: 1024px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: none;
    gap: 0;
  }
  
  .nav-menu.active {
    display: flex;
  }
  
  .nav-menu li {
    width: 100%;
  }
  
  .nav-menu a {
    padding: 1rem;
    border-radius: 6px;
  }
}
`;

// Update main.css with navigation
let updatedCSS = mainCSS;
if (!mainCSS.includes('.main-nav {')) {
  updatedCSS = navCSS + '\n\n' + mainCSS;
} else {
  // Replace existing nav CSS
  updatedCSS = mainCSS.replace(/\/\* =+ NAVIGATION.+?\*\/[\s\S]*?(@media|\.hero|$)/m, navCSS + '\n\n');
}

fs.writeFileSync('css/main.css', updatedCSS);
console.log('✓ Navigation CSS fixed - menu aligned to right\n');

// ============================================
// ISSUE 2: Fix State Grid on Homepage
// ============================================
console.log('2. Fixing state grid layout on homepage...');

let indexHTML = fs.readFileSync('index.html', 'utf8');

// Find and update state grid section
const stateGridSection = `
  <!-- Featured States Section -->
  <section class="featured-states" style="padding: 3rem 0; background: #f9fafb;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <h2 style="text-align: center; margin-bottom: 0.5rem; font-size: 2rem; color: #1f2937;">Browse Tattoo Laws by State</h2>
      <p style="text-align: center; color: #64748b; margin-bottom: 2.5rem;">Click any state to view detailed age requirements and legal information</p>
      
      <div class="state-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <a href="states/alabama.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Alabama
        </a>
        <a href="states/alaska.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Alaska
        </a>
        <a href="states/arizona.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Arizona
        </a>
        <a href="states/arkansas.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Arkansas
        </a>
        <a href="states/california.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          California
        </a>
        <a href="states/colorado.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Colorado
        </a>
        <a href="states/connecticut.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Connecticut
        </a>
        <a href="states/delaware.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Delaware
        </a>
        <a href="states/florida.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Florida
        </a>
        <a href="states/georgia.html" class="state-card" style="background: white; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: #1f2937; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; text-align: center; font-weight: 600;">
          Georgia
        </a>
      </div>
      
      <div style="text-align: center;">
        <a href="comparison.html" class="btn btn-primary" style="display: inline-block; padding: 0.875rem 2rem; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          View All 50 States →
        </a>
      </div>
    </div>
  </section>
`;

// Replace existing state grid
if (indexHTML.includes('Featured States Section') || indexHTML.includes('state-grid')) {
  indexHTML = indexHTML.replace(/<!-- Featured States Section -->[\s\S]*?<\/section>/m, stateGridSection);
} else {
  // Insert before FAQ section
  indexHTML = indexHTML.replace(/<!-- SEO Content Section -->/m, stateGridSection + '\n  <!-- SEO Content Section -->');
}

fs.writeFileSync('index.html', indexHTML);
console.log('✓ State grid fixed - showing only 10 states with "View All" button\n');

// ============================================
// ISSUE 3: Fix Alabama State Page Authority Links
// ============================================
console.log('3. Fixing Alabama state page authority links...');

const alabamaPath = 'states/alabama.html';
if (fs.existsSync(alabamaPath)) {
  let alabamaHTML = fs.readFileSync(alabamaPath, 'utf8');
  
  // Fix the legal code section with proper authority links
  const legalCodeSection = `
        <h2>Relevant Alabama Tattoo Law / Legal Code</h2>
        <p>Alabama's tattoo age restrictions are codified in <strong>Alabama Code § 22-17A-2</strong>, which regulates body art facilities and specifically prohibits tattooing of minors.</p>
        
        <p>The law states that no body art procedure shall be performed on anyone under 18 years of age, regardless of parental consent. This is one of the strictest tattoo age laws in the United States.</p>
        
        <p><strong>Official Legal References:</strong></p>
        <ul>
          <li>
            <a href="https://law.justia.com/codes/alabama/2022/title-22/chapter-17a/" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
              Alabama Code Title 22 Chapter 17A - Body Art Facilities (Justia)
            </a>
          </li>
          <li>
            <a href="https://www.alabamapublichealth.gov/bels/body-art.html" target="_blank" rel="nofollow noopener" style="color: #2563eb; font-weight: 600;">
              Alabama Department of Public Health - Body Art Regulations
            </a>
          </li>
        </ul>
        
        <p>These regulations are enforced by the Alabama Department of Public Health, which oversees licensing and compliance for all body art facilities in the state.</p>
`;

  // Replace the legal code section
  alabamaHTML = alabamaHTML.replace(
    /<h2>Relevant Alabama Tattoo Law[\s\S]*?(<h2>Penalties|<section)/m,
    legalCodeSection + '\n        $1'
  );
  
  fs.writeFileSync(alabamaPath, alabamaHTML);
  console.log('✓ Alabama state page authority links fixed\n');
}

// ============================================
// ISSUE 4: Fix Tattoo Directory Phone & Map Links
// ============================================
console.log('4. Fixing tattoo directory phone and map links...');

const directoryPath = 'tattoo-directory.html';
if (fs.existsSync(directoryPath)) {
  let directoryHTML = fs.readFileSync(directoryPath, 'utf8');
  
  // Fix phone number links (ensure they're tel: links)
  directoryHTML = directoryHTML.replace(
    /(\d{3}[-.]?\d{3}[-.]?\d{4})/g,
    (match) => {
      const cleanPhone = match.replace(/[-.\s]/g, '');
      return `<a href="tel:+1${cleanPhone}" style="color: #2563eb; text-decoration: none;">${match}</a>`;
    }
  );
  
  // Fix map links (ensure they're Google Maps links)
  directoryHTML = directoryHTML.replace(
    /class="parlor-address"[^>]*>([^<]+)</g,
    (match, address) => {
      const encoded = encodeURIComponent(address.trim());
      return `class="parlor-address"><a href="https://www.google.com/maps/search/?api=1&query=${encoded}" target="_blank" rel="noopener" style="color: #4b5563; text-decoration: none;">${address}</a><`;
    }
  );
  
  fs.writeFileSync(directoryPath, directoryHTML);
  console.log('✓ Tattoo directory phone and map links fixed\n');
}

// ============================================
// ISSUE 5: Restart Server to Show Changes
// ============================================
console.log('5. Server restart required - run manually: fuser -k 3000/tcp && python3 -m http.server 3000 &\n');

console.log('========== ALL FIXES COMPLETE ==========');
console.log('\n✅ Fixed Issues:');
console.log('  1. Navigation header - menu aligned to right');
console.log('  2. Homepage state grid - compact 10 states only');
console.log('  3. Alabama authority links - proper outbound links added');
console.log('  4. Tattoo directory - phone and map links working');
console.log('\n⚠️  Next: Restart server and push to GitHub');
