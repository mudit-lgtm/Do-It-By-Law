const fs = require('fs');
const path = require('path');

// Find all HTML files in the root directory
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html') && file !== '404.html')
  .sort();

const baseUrl = 'https://tattoo.doitbylaw.com';
const today = new Date().toISOString().split('T')[0];

// Priority mapping
const priorityMap = {
  'index.html': '1.0',
  'consent-form.html': '0.9',
  'map.html': '0.9',
  'about.html': '0.8',
  'faq.html': '0.8',
  'strictest-tattoo-age-laws.html': '0.9',
  'most-lenient-tattoo-age-laws.html': '0.9',
  'states-allowing-16-year-olds.html': '0.9',
  'can-you-get-tattoo-at-15.html': '0.85',
  'can-you-get-tattoo-at-16.html': '0.85',
  'can-you-get-tattoo-at-17.html': '0.85'
};

// State pages get 0.85 priority
const statePriority = '0.85';

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

htmlFiles.forEach(file => {
  const url = file === 'index.html' ? baseUrl : `${baseUrl}/${file}`;
  const priority = priorityMap[file] || statePriority;
  
  sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');

console.log(`✅ Sitemap generated with ${htmlFiles.length} URLs`);
console.log(`📄 Total pages: ${htmlFiles.length}`);
console.log(`📅 Last modified: ${today}`);
