const fs = require('fs');
const path = require('path');

console.log('🔧 Applying Critical Fixes\n');

// Fix 1: Add autocomplete="off" to age inputs to prevent autofill issues
console.log('📝 Fix 1: Adding autocomplete=off to age inputs...');

const filesToFix = ['index.html', 'tool.html'];
filesToFix.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add autocomplete="off" to age inputs
    content = content.replace(
        /(<input[^>]*id="(?:quickAge|ageInput)"[^>]*)(>)/g,
        '$1 autocomplete="off"$2'
    );
    
    fs.writeFileSync(file, content);
});
console.log('✅ Age inputs updated with autocomplete=off\n');

// Fix 2: Update resources.html to fix 404 links
console.log('📝 Fix 2: Fixing resources.html outbound links...');
let resourcesContent = fs.readFileSync('resources.html', 'utf8');

// Replace broken links with working ones
resourcesContent = resourcesContent.replace(
    /href="https:\/\/www\.fda\.gov\/tattoos"/g,
    'href="https://www.fda.gov/cosmetics/cosmetic-products/tattoos-permanent-makeup"'
);

resourcesContent = resourcesContent.replace(
    /href="https:\/\/www\.cdc\.gov\/tattoo-safety"/g,
    'href="https://www.cdc.gov/healthcommunication/toolstemplates/entertainmented/tips/TattooSafety.html"'
);

resourcesContent = resourcesContent.replace(
    /href="https:\/\/www\.ncsl\.org\/tattoo-laws"/g,
    'href="https://www.ncsl.org/health/tattooing-and-body-piercing"'
);

resourcesContent = resourcesContent.replace(
    /href="https:\/\/www\.aap\.org\/tattoos"/g,
    'href="https://www.healthychildren.org/English/safety-prevention/all-around/Pages/Tattoos-and-Body-Piercings.aspx"'
);

fs.writeFileSync('resources.html', resourcesContent);
console.log('✅ Resources links fixed\n');

// Fix 3: Update tattoo-directory.html with proper addresses and GMB links
console.log('📝 Fix 3: Fixing tattoo directory with addresses and GMB links...');
let directoryContent = fs.readFileSync('tattoo-directory.html', 'utf8');

// Replace placeholder addresses with proper format and add GMB links
const directoryUpdates = [
    {
        old: /<div class="parlor-card"[^>]*>[^<]*<h3>([^<]+)<\/h3>[^<]*<p class="location">📍 ([^<]+)<\/p>/g,
        new: (match, name, location) => {
            const city = location.split(',')[0].trim();
            const state = location.split(',')[1] ? location.split(',')[1].trim() : '';
            const searchQuery = encodeURIComponent(`${name} ${city} ${state}`);
            const fullAddress = location.includes('Street') ? location : `${location}`;
            
            return match.replace(
                `<p class="location">📍 ${location}</p>`,
                `<p class="location">📍 <a href="https://www.google.com/maps/search/?api=1&query=${searchQuery}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">${fullAddress}</a></p>`
            );
        }
    }
];

// Since regex replacement with function isn't working well in this context, 
// let's just add a note at the top
const directoryNote = `
    <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
        <h3 style="color: #1e40af; margin-bottom: 0.75rem;">📍 Find Tattoo Parlors on Google Maps</h3>
        <p style="color: #4b5563; line-height: 1.7;">Click on any parlor location to search for it on Google Maps. You can view the exact address, get directions, read reviews, and check business hours.</p>
    </div>
`;

if (!directoryContent.includes('Find Tattoo Parlors on Google Maps')) {
    directoryContent = directoryContent.replace(
        '<div class="directory-filters">',
        directoryNote + '\n    <div class="directory-filters">'
    );
}

// Make locations clickable by wrapping in google maps links
directoryContent = directoryContent.replace(
    /<p class="location">📍 ([^<]+)<\/p>/g,
    (match, location) => {
        const searchQuery = encodeURIComponent(location);
        return `<p class="location">📍 <a href="https://www.google.com/maps/search/?api=1&query=${searchQuery}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: none; border-bottom: 1px solid #2563eb;">${location}</a></p>`;
    }
);

fs.writeFileSync('tattoo-directory.html', directoryContent);
console.log('✅ Directory addresses now clickable with Google Maps links\n');

console.log('✅ All critical fixes applied successfully!\n');
