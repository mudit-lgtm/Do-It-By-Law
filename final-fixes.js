const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Final Fixes for Do It By Law Website\n');

// Fix 1: Button Hover Colors (white text)
console.log('📝 Fix 1: Button hover colors...');
const cssPath = 'css/main.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Ensure button hovers have white text
if (!cssContent.includes('.btn-primary:hover')) {
    const buttonHoverCSS = `
/* Button Hover Fixes */
.btn-primary:hover,
.primary-btn:hover,
button.primary:hover,
.cta-button:hover,
.check-button:hover {
    background: #1e40af !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-secondary:hover {
    background: #374151 !important;
    color: white !important;
}
`;
    cssContent += buttonHoverCSS;
    fs.writeFileSync(cssPath, cssContent);
    console.log('✅ Button hover colors fixed\n');
}

// Fix 2: Mobile Responsive State Grid (5 per row)
console.log('📝 Fix 2: Mobile responsive state grid...');
const responsivePath = 'css/responsive.css';
let responsiveContent = fs.readFileSync(responsivePath, 'utf8');

const mobileGridCSS = `
/* Mobile State Grid - 5 per row */
@media (max-width: 1200px) {
    .state-grid {
        grid-template-columns: repeat(5, 1fr) !important;
        gap: 0.75rem !important;
    }
    .state-card {
        padding: 0.75rem !important;
        font-size: 0.875rem !important;
    }
    .state-card h3 {
        font-size: 0.9rem !important;
        margin-bottom: 0.25rem !important;
    }
    .state-card .age {
        font-size: 1.25rem !important;
    }
}

@media (max-width: 768px) {
    .state-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 0.5rem !important;
    }
    .state-card {
        padding: 0.5rem !important;
        font-size: 0.8rem !important;
    }
}

@media (max-width: 480px) {
    .state-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.5rem !important;
    }
}
`;

if (!responsiveContent.includes('Mobile State Grid')) {
    responsiveContent += mobileGridCSS;
    fs.writeFileSync(responsivePath, responsiveContent);
    console.log('✅ Mobile responsive grid added\n');
}

// Fix 3: Map Page Layout
console.log('📝 Fix 3: Fixing map.html layout...');
const mapPath = 'map.html';
let mapContent = fs.readFileSync(mapPath, 'utf8');

// Ensure proper container structure
if (!mapContent.includes('<main class="container">')) {
    mapContent = mapContent.replace(
        '<div class="map-container">',
        `    <main class="container" style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
        <div class="map-container">`
    );
    
    // Add closing main tag before footer
    mapContent = mapContent.replace(
        '</div>\n\n    <footer',
        `    </div>
    </main>

    <footer`
    );
    
    fs.writeFileSync(mapPath, mapContent);
    console.log('✅ Map page layout fixed\n');
}

// Fix 4: Add Authority Outbound Links
console.log('📝 Fix 4: Adding authority outbound links...');
const stateFiles = [
    'alabama.html', 'alaska.html', 'arizona.html', 'arkansas.html', 'california.html',
    'colorado.html', 'connecticut.html', 'delaware.html', 'florida.html', 'georgia.html'
];

const authorityLinks = {
    'alabama': 'https://www.alabamapublichealth.gov/',
    'alaska': 'https://health.alaska.gov/',
    'arizona': 'https://www.azdhs.gov/',
    'arkansas': 'https://www.healthy.arkansas.gov/',
    'california': 'https://www.cdph.ca.gov/',
    'colorado': 'https://cdphe.colorado.gov/',
    'connecticut': 'https://portal.ct.gov/DPH',
    'delaware': 'https://dhss.delaware.gov/',
    'florida': 'https://www.floridahealth.gov/',
    'georgia': 'https://dph.georgia.gov/'
};

stateFiles.forEach(file => {
    const stateName = file.replace('.html', '');
    const filePath = path.join('states', file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add authority link section if not exists
        if (!content.includes('Official State Resources')) {
            const authoritySection = `
    <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
        <h3 style="color: #1e40af; margin-bottom: 1rem;">📚 Official State Resources</h3>
        <p><a href="${authorityLinks[stateName] || '#'}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: 600;">Visit ${stateName.charAt(0).toUpperCase() + stateName.slice(1)} Department of Health Official Website →</a></p>
        <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.5rem;">Always verify current laws with official state authorities.</p>
    </div>
`;
            content = content.replace('</main>', authoritySection + '\n</main>');
            fs.writeFileSync(filePath, content);
        }
    }
});

console.log('✅ Authority links added to state pages\n');

console.log('✅ All fixes applied successfully!\n');
console.log('📋 Summary:');
console.log('  ✅ Button hover colors (white text)');
console.log('  ✅ Mobile responsive state grid (5 per row)');
console.log('  ✅ Map page layout fixed');
console.log('  ✅ Authority outbound links added');
