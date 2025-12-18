const fs = require('fs');
const path = require('path');

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
    // Convert Windows backslashes to forward slashes
    let cleanPath = file.replace(/\\/g, '/');
    
    // Remove leading './'
    cleanPath = cleanPath.replace(/^\.\//, '');
    
    // For index.html, use empty string (will become just /)
    if (cleanPath === 'index.html') {
        cleanPath = '';
    }
    
    // Build proper URL with leading slash
    const url = cleanPath ? `${baseUrl}/${cleanPath}` : `${baseUrl}/`;
    
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

console.log(`✅ Sitemap generated: ${htmlFiles.length} URLs`);
console.log('✅ Sample URLs:');
console.log('   - https://tattoo.doitbylaw.com/');
console.log('   - https://tattoo.doitbylaw.com/alabama.html');
console.log('   - https://tattoo.doitbylaw.com/states/alabama.html');
console.log(`✅ All URLs have priority 1.0 and date ${currentDate}`);

