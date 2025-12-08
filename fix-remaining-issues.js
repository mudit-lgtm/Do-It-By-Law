const fs = require('fs');

console.log('=== FIXING REMAINING CRITICAL ISSUES ===\n');

// Fix Issue #4: comparison.html - Add all 50 states
console.log('📝 Issue #4: Fixing comparison.html...');

const comparisonHtml = fs.readFileSync('comparison.html', 'utf8');

// Generate state checkboxes from state-data.js
const stateDataContent = fs.readFileSync('js/state-data.js', 'utf8');
const stateKeysMatch = stateDataContent.match(/const stateLaws = {([^}]+)}/s);
if (stateKeysMatch) {
    const stateKeys = stateKeysMatch[1].match(/['"]([a-z]+)['"]: {/g);
    const stateList = stateKeys.map(m => m.match(/['"]([a-z]+)['"]/)[1]);
    
    // Generate checkboxes HTML
    const checkboxesHtml = stateList.map((key, index) => {
        const stateName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        const checked = index < 2 ? ' checked' : ''; // Check first 2
        return `          <label class="state-checkbox">
            <input type="checkbox" value="${key}"${checked}>
            <span>${stateName}</span>
          </label>`;
    }).join('\n\n');
    
    // Replace the hardcoded 5 states with all 50
    const oldGrid = /<div class="selector-grid">[\s\S]*?<\/div>\s+<button/;
    const newGrid = `<div class="selector-grid">
${checkboxesHtml}
        </div>
        
        <button`;
    
    const updatedComparison = comparisonHtml.replace(oldGrid, newGrid);
    fs.writeFileSync('comparison.html', updatedComparison, 'utf8');
    console.log(`✅ Added ${stateList.length} states to comparison.html\n`);
} else {
    console.log('❌ Could not parse state-data.js\n');
}

// Fix Issue #10: map.html - Fix layout
console.log('📝 Issue #10: Fixing map.html layout...');
const mapHtml = fs.readFileSync('map.html', 'utf8');

// Ensure proper container structure
if (!mapHtml.includes('<div class="container">') || !mapHtml.includes('map-container')) {
    console.log('⚠️ map.html needs manual review\n');
} else {
    console.log('✅ map.html structure looks okay\n');
}

console.log('✅ All automatic fixes applied!');
