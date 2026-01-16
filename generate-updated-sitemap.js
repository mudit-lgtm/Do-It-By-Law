const fs = require('fs');
const path = require('path');

// Today's date
const today = '2026-01-16';

// Find all HTML files
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html') && file !== '404.html')
  .sort();

const baseUrl = 'https://tattoo.doitbylaw.com';

// High-priority pages (new pages and key resources)
const highPriorityPages = [
  'index.html',
  'tool.html',
  'consent-form.html',
  'map.html',
  'comparison.html',
  'strictest-tattoo-age-laws.html',
  'most-lenient-tattoo-age-laws.html',
  'states-allowing-16-year-olds.html',
  'can-you-get-tattoo-at-15.html',
  'can-you-get-tattoo-at-16.html',
  'can-you-get-tattoo-at-17.html',
  'about.html',
  'faq.html'
];

// State pages
const statePages = htmlFiles.filter(f => {
  const stateName = f.replace('.html', '').toLowerCase();
  return ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 
          'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho',
          'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana',
          'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota',
          'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
          'newhampshire', 'newjersey', 'newmexico', 'newyork', 
          'northcarolina', 'northdakota', 'ohio', 'oklahoma', 'oregon',
          'pennsylvania', 'rhodeisland', 'southcarolina', 'southdakota',
          'tennessee', 'texas', 'utah', 'vermont', 'virginia',
          'washington', 'westvirginia', 'wisconsin', 'wyoming'].includes(stateName);
});

// Determine priority
function getPriority(file) {
  if (file === 'index.html') return '1.0';
  if (highPriorityPages.includes(file)) return '0.95';
  if (statePages.includes(file)) return '0.85';
  if (file.startsWith('blog/')) return '0.75';
  return '0.70';
}

// Generate sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

htmlFiles.forEach(file => {
  const url = file === 'index.html' ? baseUrl : `${baseUrl}/${file}`;
  const priority = getPriority(file);
  const changefreq = file === 'index.html' ? 'daily' : 
                     highPriorityPages.includes(file) ? 'weekly' : 'monthly';
  
  sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');

console.log(`✅ Sitemap generated with ${htmlFiles.length} URLs`);
console.log(`📅 Last modified: ${today}`);
console.log(`🔝 High priority pages: ${highPriorityPages.length}`);
console.log(`📍 State pages: ${statePages.length}`);
console.log(`\n📊 Priority Distribution:`);
console.log(`   1.0: ${htmlFiles.filter(f => getPriority(f) === '1.0').length} pages`);
console.log(`   0.95: ${htmlFiles.filter(f => getPriority(f) === '0.95').length} pages`);
console.log(`   0.85: ${htmlFiles.filter(f => getPriority(f) === '0.85').length} pages`);
console.log(`   0.75: ${htmlFiles.filter(f => getPriority(f) === '0.75').length} pages`);
console.log(`   0.70: ${htmlFiles.filter(f => getPriority(f) === '0.70').length} pages`);
