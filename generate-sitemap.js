const fs = require('fs');

const baseUrl = 'https://doitbylaw.com';
const currentDate = new Date().toISOString().split('T')[0];

// Core pages
const corePages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'tool.html', priority: '0.9', changefreq: 'weekly' },
    { url: 'comparison.html', priority: '0.9', changefreq: 'weekly' },
    { url: 'tools.html', priority: '0.8', changefreq: 'monthly' },
    { url: 'map.html', priority: '0.9', changefreq: 'weekly' },
    { url: 'search.html', priority: '0.9', changefreq: 'weekly' },
    { url: 'faq.html', priority: '0.9', changefreq: 'weekly' },
    { url: 'consent-form-generator.html', priority: '0.9', changefreq: 'monthly' },
    { url: 'newsletter.html', priority: '0.7', changefreq: 'monthly' }
];

// Blog pages
const blogPages = [
    { url: 'blog/index.html', priority: '0.8', changefreq: 'weekly' },
    { url: 'blog/tattoo-age-myths.html', priority: '0.8', changefreq: 'monthly' },
    { url: 'blog/state-comparison-2025.html', priority: '0.8', changefreq: 'monthly' },
    { url: 'blog/parental-consent-guide.html', priority: '0.8', changefreq: 'monthly' },
    { url: 'blog/tattoo-removal-minors.html', priority: '0.8', changefreq: 'monthly' },
    { url: 'blog/choosing-safe-parlor.html', priority: '0.8', changefreq: 'monthly' }
];

// Guide pages
const guidePages = [
    { url: 'guides/getting-first-tattoo-underage.html', priority: '0.8', changefreq: 'monthly' }
];

// State pages (all 50)
const states = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 
    'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 
    'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 
    'missouri', 'montana', 'nebraska', 'nevada', 'newhampshire', 'newjersey', 'newmexico', 
    'newyork', 'northcarolina', 'northdakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 
    'rhodeisland', 'southcarolina', 'southdakota', 'tennessee', 'texas', 'utah', 'vermont', 
    'virginia', 'washington', 'westvirginia', 'wisconsin', 'wyoming'
];

const statePages = states.map(state => ({
    url: `${state}.html`,
    priority: '0.8',
    changefreq: 'monthly'
}));

const allPages = [...corePages, ...blogPages, ...guidePages, ...statePages];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

allPages.forEach(page => {
    sitemap += `    <url>
        <loc>${baseUrl}/${page.url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
`;
});

sitemap += '</urlset>';

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`✅ Sitemap generated with ${allPages.length} URLs (${corePages.length} core + ${blogPages.length} blog + ${guidePages.length} guides + ${statePages.length} state pages)`);
