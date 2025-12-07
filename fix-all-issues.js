const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('=== COMPREHENSIVE WEBSITE FIX SCRIPT ===\n');

// Standard components
const standardNav = `    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="INDEX_PATH">
                    <img src="IMAGES_PATHlogo.svg" alt="Do It By Law" width="40" height="40">
                    <span>Do It By Law</span>
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="INDEX_PATH">Home</a></li>
                <li><a href="TOOL_PATH">Age Checker</a></li>
                <li><a href="MAP_PATH">Map</a></li>
                <li><a href="PIERCING_PATH">Piercing Laws</a></li>
                <li><a href="DIRECTORY_PATH">Directory</a></li>
                <li><a href="FAQ_PATH">FAQ</a></li>
                <li><a href="BLOG_PATH">Blog</a></li>
                <li><a href="ABOUT_PATH">About</a></li>
            </ul>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>`;

const standardFooter = `    <footer style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                <div>
                    <h3 style="color: white; margin-bottom: 1rem;">Do It By Law</h3>
                    <p style="opacity: 0.8; line-height: 1.6;">Your trusted source for tattoo, piercing, and body modification laws across all 50 US states.</p>
                </div>
                <div>
                    <h4 style="color: white; margin-bottom: 1rem;">Quick Links</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="INDEX_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Home</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="TOOL_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Age Checker</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="MAP_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Interactive Map</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="COMPARISON_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Compare States</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style="color: white; margin-bottom: 1rem;">Resources</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="PIERCING_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Piercing Laws</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="BODY_MOD_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Body Modifications</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="DIRECTORY_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Tattoo Directory</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="RESOURCES_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Legal Resources</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style="color: white; margin-bottom: 1rem;">About</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="ABOUT_PATH" style="color: white; opacity: 0.8; text-decoration: none;">About Us</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="FAQ_PATH" style="color: white; opacity: 0.8; text-decoration: none;">FAQ</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="BLOG_PATH" style="color: white; opacity: 0.8; text-decoration: none;">Blog</a></li>
                    </ul>
                </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center;">
                <p style="margin: 0; opacity: 0.8;">&copy; 2025 Do It By Law. All rights reserved.</p>
                <p style="margin: 0.5rem 0 0 0; opacity: 0.6; font-size: 0.875rem;">This site provides general legal information only. Consult with legal professionals for specific advice.</p>
            </div>
        </div>
    </footer>`;

// Function to determine relative paths
function getRelativePaths(filePath) {
    const depth = (filePath.match(/\//g) || []).length;
    const prefix = depth === 0 ? '' : '../'.repeat(depth);
    
    return {
        INDEX_PATH: `${prefix}index.html`,
        TOOL_PATH: `${prefix}tool.html`,
        MAP_PATH: `${prefix}map.html`,
        PIERCING_PATH: `${prefix}piercing/index.html`,
        DIRECTORY_PATH: `${prefix}tattoo-directory.html`,
        FAQ_PATH: `${prefix}faq.html`,
        BLOG_PATH: `${prefix}blog/index.html`,
        ABOUT_PATH: `${prefix}about.html`,
        COMPARISON_PATH: `${prefix}comparison.html`,
        BODY_MOD_PATH: `${prefix}body-modification.html`,
        RESOURCES_PATH: `${prefix}resources.html`,
        IMAGES_PATH: `${prefix}images/`
    };
}

// Update navigation and footer in file
function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(__dirname, filePath);
        const paths = getRelativePaths(relativePath);
        
        // Replace Legal Age Authority with Do It By Law
        content = content.replace(/Legal Age Authority/g, 'Do It By Law');
        
        // Replace navigation
        let nav = standardNav;
        Object.keys(paths).forEach(key => {
            nav = nav.replace(new RegExp(key, 'g'), paths[key]);
        });
        
        const navPattern = /<nav class="navbar">[\s\S]*?<\/nav>/;
        if (navPattern.test(content)) {
            content = content.replace(navPattern, nav);
        }
        
        // Replace footer
        let footer = standardFooter;
        Object.keys(paths).forEach(key => {
            footer = footer.replace(new RegExp(key, 'g'), paths[key]);
        });
        
        const footerPattern = /<footer[\s\S]*?<\/footer>/;
        if (footerPattern.test(content)) {
            content = content.replace(footerPattern, footer);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Get all HTML files
const allFiles = [
    ...glob.sync('*.html', { cwd: __dirname }),
    ...glob.sync('blog/*.html', { cwd: __dirname }),
    ...glob.sync('guides/*.html', { cwd: __dirname }),
    ...glob.sync('piercing/*.html', { cwd: __dirname })
];

console.log(`Found ${allFiles.length} HTML files to update\n`);

let updated = 0;
allFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (updateFile(fullPath)) {
        updated++;
        console.log(`✓ ${file}`);
    }
});

console.log(`\n✅ Updated ${updated}/${allFiles.length} files`);
console.log('✅ Navigation and footer standardized');
console.log('✅ "Legal Age Authority" replaced with "Do It By Law"');
