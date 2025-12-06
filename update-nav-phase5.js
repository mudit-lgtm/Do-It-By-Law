const fs = require('fs');
const path = require('path');
const glob = require('glob');

// New navigation HTML with Phase 5 additions
const newNav = `            <ul class="nav-links">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../tool.html">Age Checker</a></li>
                <li><a href="../map.html">Map</a></li>
                <li><a href="../piercing/index.html">Piercing Laws</a></li>
                <li><a href="../tattoo-directory.html">Directory</a></li>
                <li><a href="../faq.html">FAQ</a></li>
                <li><a href="../blog/index.html">Blog</a></li>
                <li><a href="../about.html">About</a></li>
            </ul>`;

const newNavRoot = `            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="tool.html">Age Checker</a></li>
                <li><a href="map.html">Map</a></li>
                <li><a href="piercing/index.html">Piercing Laws</a></li>
                <li><a href="tattoo-directory.html">Directory</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="blog/index.html">Blog</a></li>
                <li><a href="about.html">About</a></li>
            </ul>`;

// Function to update navigation in file
function updateNavigation(filePath, navHtml) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Pattern to match the nav links section
        const navPattern = /<ul class="nav-links">[\s\S]*?<\/ul>/;
        
        if (navPattern.test(content)) {
            content = content.replace(navPattern, navHtml);
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Get all HTML files
const rootFiles = glob.sync('*.html', { cwd: __dirname });
const blogFiles = glob.sync('blog/*.html', { cwd: __dirname });
const guideFiles = glob.sync('guides/*.html', { cwd: __dirname });
const piercingFiles = glob.sync('piercing/*.html', { cwd: __dirname });

let updated = 0;
let total = 0;

console.log('Updating navigation for Phase 5...\n');

// Update root files
console.log('Root directory files:');
rootFiles.forEach(file => {
    total++;
    if (updateNavigation(path.join(__dirname, file), newNavRoot)) {
        updated++;
        console.log(`✓ ${file}`);
    }
});

// Update blog files
console.log('\nBlog directory files:');
blogFiles.forEach(file => {
    total++;
    if (updateNavigation(path.join(__dirname, file), newNav)) {
        updated++;
        console.log(`✓ ${file}`);
    }
});

// Update guide files
console.log('\nGuides directory files:');
guideFiles.forEach(file => {
    total++;
    if (updateNavigation(path.join(__dirname, file), newNav)) {
        updated++;
        console.log(`✓ ${file}`);
    }
});

// Update piercing files
console.log('\nPiercing directory files:');
piercingFiles.forEach(file => {
    total++;
    if (updateNavigation(path.join(__dirname, file), newNav)) {
        updated++;
        console.log(`✓ ${file}`);
    }
});

console.log(`\n✅ Navigation update complete!`);
console.log(`Updated ${updated} out of ${total} files`);
