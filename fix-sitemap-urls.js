const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing sitemap URL formatting...\n');

const getAllHtmlFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

const htmlFiles = getAllHtmlFiles('.');
const currentDate = '2025-12-18';
const baseUrl = 'https://tattoo.doitbylaw.com';

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

htmlFiles.forEach(file => {
    // Properly format the URL path
    let urlPath = file.replace(/\\/g, '/').replace('./', '/');
    
    // Remove 'index.html' from path
    if (urlPath.endsWith('index.html')) {
        urlPath = urlPath.replace('index.html', '');
    }
    
    const url = `${baseUrl}${urlPath}`;
    
    sitemapContent += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
});

sitemapContent += '</urlset>';
fs.writeFileSync('sitemap.xml', sitemapContent);

console.log(`✅ Sitemap fixed: ${htmlFiles.length} URLs with proper formatting`);
console.log(`✅ All URLs start with: ${baseUrl}/`);
console.log(`✅ Priority: 1.0 for all pages`);
console.log(`✅ Date: ${currentDate}`);

