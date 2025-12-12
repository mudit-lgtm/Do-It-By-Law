const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Standard header navigation HTML
const STANDARD_HEADER = `  <!-- Navigation -->
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
        <li><a href="[ROOT]comparison.html">Compare</a></li>
        <li><a href="[ROOT]faq.html">FAQ</a></li>
        <li><a href="[ROOT]piercing/index.html">Piercing</a></li>
        <li><a href="[ROOT]tattoo-directory.html">Directory</a></li>
        <li><a href="[ROOT]blog/index.html">Blog</a></li>
      </ul>
    </div>
  </nav>`;

function getRootPath(filepath) {
  const depth = (filepath.match(/\//g) || []).length;
  if (depth === 0) return './';
  if (depth === 1) return '../';
  if (depth === 2) return '../../';
  return '../../../';
}

function standardizeHeader(filepath) {
  try {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Skip if already has correct header
    if (content.includes('<nav class="main-nav">') && 
        content.includes('Age Checker') && 
        content.includes('Piercing</a>') &&
        content.includes('Directory</a>')) {
      console.log(`✓ ${filepath} - Already standardized`);
      return;
    }
    
    const root = getRootPath(filepath);
    const header = STANDARD_HEADER.replace(/\[ROOT\]/g, root);
    
    // Find and replace various header patterns
    const patterns = [
      // Pattern 1: navbar with container
      /<nav class="navbar">[\s\S]*?<\/nav>/m,
      // Pattern 2: main-nav variations
      /<nav class="main-nav">[\s\S]*?<\/nav>/m,
      // Pattern 3: Simple nav
      /<nav>[\s\S]*?<\/nav>/m
    ];
    
    let replaced = false;
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, header);
        replaced = true;
        break;
      }
    }
    
    if (!replaced) {
      // Insert after <body> tag if no nav found
      content = content.replace(/<body[^>]*>/, (match) => match + '\n' + header);
    }
    
    fs.writeFileSync(filepath, content);
    console.log(`✓ ${filepath} - Header standardized`);
    
  } catch (error) {
    console.error(`✗ ${filepath} - Error: ${error.message}`);
  }
}

// Get all HTML files
const files = [
  'index.html',
  'tool.html',
  'map.html',
  'comparison.html',
  'faq.html',
  'about.html',
  'resources.html',
  'tattoo-directory.html',
  'body-modification.html',
  ...glob.sync('states/*.html'),
  ...glob.sync('guides/*.html'),
  ...glob.sync('blog/*.html'),
  ...glob.sync('piercing/*.html')
].filter(fs.existsSync);

console.log(`Found ${files.length} HTML files to process\n`);

files.forEach(file => standardizeHeader(file));

console.log(`\n========== HEADER STANDARDIZATION COMPLETE ==========`);
console.log(`✓ Processed ${files.length} files`);
console.log(`✓ Consistent navigation across all pages`);
console.log(`✓ Includes: Home, Age Checker, Map, Compare, FAQ, Piercing, Directory, Blog`);
