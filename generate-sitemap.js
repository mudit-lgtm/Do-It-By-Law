const fs = require('fs');
const path = require('path');

console.log('🗺️ Generating Comprehensive Sitemap for doitbylaw.com\n');

const baseURL = 'https://doitbylaw.com';
const today = new Date().toISOString().split('T')[0];

// Collect all HTML files
const pages = [];

// Core pages
const corePages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/tool.html', priority: '1.0', changefreq: 'daily' },
    { url: '/map.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/comparison.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/faq.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/about.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/resources.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/body-modification.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/tattoo-directory.html', priority: '0.8', changefreq: 'weekly' },
];

pages.push(...corePages);

// Piercing pages
const piercingPages = [
    { url: '/piercing/index.html', priority: '0.9', changefreq: 'weekly' }
];

// Add all 50 state piercing pages
const states = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california',
    'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
    'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
    'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
    'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
    'montana', 'nebraska', 'nevada', 'newhampshire', 'newjersey',
    'newmexico', 'newyork', 'northcarolina', 'northdakota', 'ohio',
    'oklahoma', 'oregon', 'pennsylvania', 'rhodeisland', 'southcarolina',
    'southdakota', 'tennessee', 'texas', 'utah', 'vermont',
    'virginia', 'washington', 'westvirginia', 'wisconsin', 'wyoming'
];

states.forEach(state => {
    piercingPages.push({
        url: `/piercing/${state}.html`,
        priority: '0.7',
        changefreq: 'monthly'
    });
});

pages.push(...piercingPages);

// Blog pages
const blogPages = [
    { url: '/blog/index.html', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog/tattoo-age-myths.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog/state-comparison-2025.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog/parental-consent-guide.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog/tattoo-removal-minors.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog/choosing-safe-parlor.html', priority: '0.7', changefreq: 'monthly' },
];

pages.push(...blogPages);

// State pages (if they exist in states directory)
const statesDir = path.join(__dirname, 'states');
if (fs.existsSync(statesDir)) {
    const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.html'));
    stateFiles.forEach(file => {
        pages.push({
            url: `/states/${file}`,
            priority: '0.8',
            changefreq: 'monthly'
        });
    });
}

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

pages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseURL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

// Write sitemap
fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ Sitemap generated successfully!');
console.log(`📄 Total URLs: ${pages.length}`);
console.log(`🌐 Base URL: ${baseURL}`);
console.log(`📅 Last modified: ${today}`);
console.log('\n📋 Page breakdown:');
console.log(`   - Core pages: ${corePages.length}`);
console.log(`   - Piercing pages: ${piercingPages.length}`);
console.log(`   - Blog pages: ${blogPages.length}`);
console.log(`   - State pages: ${pages.length - corePages.length - piercingPages.length - blogPages.length}`);

// Also generate robots.txt
const robotsTxt = `# Do It By Law - Robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseURL}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin or temporary files
Disallow: /admin/
Disallow: /tmp/
Disallow: /*.js$
Disallow: /*.css$
`;

fs.writeFileSync('robots.txt', robotsTxt);
console.log('\n✅ robots.txt generated successfully!');
