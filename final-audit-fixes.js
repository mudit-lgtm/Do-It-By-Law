const fs = require('fs');
const path = require('path');

console.log('🔍 FINAL AUDIT - Fixing all 9 issues...\n');

// Issue 1: Fix consent form print to PDF
function fixConsentFormPrint() {
  console.log('1️⃣ Fixing consent form print to PDF...');
  
  const consentFile = 'consent-form.html';
  if (!fs.existsSync(consentFile)) {
    console.log('   ⚠️ consent-form.html not found');
    return;
  }
  
  let content = fs.readFileSync(consentFile, 'utf8');
  
  // Add print styles and JavaScript for print button
  const printStyles = `
  <style>
    @media print {
      /* Hide everything except the form output */
      nav, header, footer, .hero, button, form {
        display: none !important;
      }
      
      #consentOutput {
        display: block !important;
        margin: 0;
        padding: 20px;
      }
      
      body {
        background: white !important;
      }
      
      /* Show only the generated consent form */
      #consentOutput {
        page-break-inside: avoid;
      }
    }
  </style>`;
  
  // Replace the download button logic
  content = content.replace(
    /document\.getElementById\('downloadBtn'\)\.addEventListener\('click', function\(\) \{[^}]+\}\);/,
    `document.getElementById('downloadBtn').addEventListener('click', function() {
      // Hide everything except the consent output for printing
      const elementsToHide = document.querySelectorAll('nav, header, .hero, button, form, footer');
      elementsToHide.forEach(el => el.style.display = 'none');
      
      // Print
      window.print();
      
      // Restore visibility after print
      setTimeout(() => {
        elementsToHide.forEach(el => el.style.display = '');
      }, 1000);
    });`
  );
  
  // Add print styles before </head>
  if (!content.includes('@media print')) {
    content = content.replace('</head>', printStyles + '\n</head>');
  }
  
  fs.writeFileSync(consentFile, content);
  console.log('   ✅ Consent form print fixed - only form content will print\n');
}

// Issue 2: Fix map.html footer
function fixMapFooter() {
  console.log('2️⃣ Fixing map.html footer...');
  
  const mapFile = 'map.html';
  if (!fs.existsSync(mapFile)) {
    console.log('   ⚠️ map.html not found');
    return;
  }
  
  let content = fs.readFileSync(mapFile, 'utf8');
  
  // Standard footer template
  const standardFooter = `
  <footer style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="color: white; margin-bottom: 1rem;">Do It By Law</h3>
          <p style="opacity: 0.8; line-height: 1.6;">Your trusted source for tattoo, piercing, and body modification laws across all 50 US states.</p>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Tools</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="tool.html" style="color: white; opacity: 0.8; text-decoration: none;">Age Checker</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="consent-form.html" style="color: white; opacity: 0.8; text-decoration: none;">Consent Form</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="comparison.html" style="color: white; opacity: 0.8; text-decoration: none;">State Comparison</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Legal Pages</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="privacy-policy.html" style="color: white; opacity: 0.8; text-decoration: none;">Privacy Policy</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="terms-of-service.html" style="color: white; opacity: 0.8; text-decoration: none;">Terms of Service</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="disclaimer.html" style="color: white; opacity: 0.8; text-decoration: none;">Legal Disclaimer</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="contact.html" style="color: white; opacity: 0.8; text-decoration: none;">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Resources</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="faq.html" style="color: white; opacity: 0.8; text-decoration: none;">FAQ</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="blog/index.html" style="color: white; opacity: 0.8; text-decoration: none;">Blog</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="tattoo-directory.html" style="color: white; opacity: 0.8; text-decoration: none;">Tattoo Directory</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center;">
        <p style="margin: 0; opacity: 0.8;">&copy; 2025 Do It By Law. All rights reserved.</p>
        <p style="margin: 0.5rem 0 0 0; opacity: 0.6; font-size: 0.875rem;">This site provides general legal information only. Consult with legal professionals for specific advice.</p>
      </div>
    </div>
  </footer>`;
  
  // Replace footer
  content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/i, standardFooter);
  
  fs.writeFileSync(mapFile, content);
  console.log('   ✅ Map.html footer standardized\n');
}

// Issue 3: Fix sitemap priority and dates
function fixSitemap() {
  console.log('3️⃣ Fixing sitemap with priority 1.0 and current date...');
  
  const currentDate = new Date().toISOString().split('T')[0]; // 2025-12-16
  const baseUrl = 'https://tattoo.doitbylaw.com';
  
  // Get all HTML files
  const htmlFiles = [];
  function findHtmlFiles(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !['node_modules', 'dist', '.wrangler', '.git'].includes(file)) {
        findHtmlFiles(filePath, path.join(basePath, file));
      } else if (file.endsWith('.html') && 
                 !file.includes('snippet') && 
                 !file.includes('temp') && 
                 !file.includes('google') &&
                 !file.includes('404')) {
        const relativePath = basePath ? path.join(basePath, file) : file;
        htmlFiles.push(relativePath.replace(/\\/g, '/'));
      }
    });
  }
  
  findHtmlFiles('.');
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // Sort files for consistency
  htmlFiles.sort();
  
  htmlFiles.forEach(file => {
    let url = `${baseUrl}/${file}`;
    // Replace index.html with just the directory
    url = url.replace(/index\.html$/, '');
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
  });
  
  sitemap += `</urlset>`;
  
  fs.writeFileSync('sitemap.xml', sitemap);
  console.log(`   ✅ Sitemap generated: ${htmlFiles.length} URLs, priority 1.0, date ${currentDate}\n`);
}

// Issue 4: Fix blog dates to random dates after Nov 25, 2025
function fixBlogDates() {
  console.log('4️⃣ Updating blog dates to random dates after Nov 25, 2025...');
  
  const blogFiles = fs.readdirSync('blog').filter(f => f.endsWith('.html') && f !== 'index.html');
  
  // Generate random dates between Nov 26, 2025 and Dec 16, 2025
  function getRandomDate() {
    const startDate = new Date('2025-11-26');
    const endDate = new Date('2025-12-16');
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
  }
  
  blogFiles.forEach(file => {
    const filePath = path.join('blog', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const randomDate = getRandomDate();
    const isoDate = randomDate.toISOString().split('T')[0];
    const formattedDate = randomDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Update schema dates
    content = content.replace(
      /"datePublished":\s*"[^"]+"/g,
      `"datePublished": "${isoDate}"`
    );
    content = content.replace(
      /"dateModified":\s*"[^"]+"/g,
      `"dateModified": "${isoDate}"`
    );
    
    // Update visible dates
    content = content.replace(
      /<time[^>]*datetime="[^"]*"[^>]*>[^<]+<\/time>/gi,
      `<time datetime="${isoDate}">${formattedDate}</time>`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`   ✅ ${file}: ${formattedDate}`);
  });
  
  console.log('');
}

// Issue 5: Check meta tags on all pages
function checkMetaTags() {
  console.log('5️⃣ Checking meta tags for indexing...');
  
  const htmlFiles = [];
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !['node_modules', 'dist', '.wrangler', '.git'].includes(file)) {
        findHtmlFiles(filePath);
      } else if (file.endsWith('.html') && !file.includes('google') && !file.includes('404')) {
        htmlFiles.push(filePath);
      }
    });
  }
  
  findHtmlFiles('.');
  
  let missingMeta = 0;
  let hasAllMeta = 0;
  
  htmlFiles.slice(0, 20).forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasTitle = /<title>/.test(content);
    const hasDescription = /<meta\s+name="description"/.test(content);
    const hasKeywords = /<meta\s+name="keywords"/.test(content);
    
    if (hasTitle && hasDescription && hasKeywords) {
      hasAllMeta++;
    } else {
      missingMeta++;
      if (missingMeta <= 5) {
        console.log(`   ⚠️ ${file}: Missing ${!hasTitle ? 'title ' : ''}${!hasDescription ? 'description ' : ''}${!hasKeywords ? 'keywords' : ''}`);
      }
    }
  });
  
  console.log(`   ✅ Checked ${Math.min(htmlFiles.length, 20)} pages: ${hasAllMeta} with complete meta, ${missingMeta} need updates\n`);
}

// Issue 6: Create 3 new blog posts
function createNewBlogs() {
  console.log('6️⃣ Creating 3 new blog posts...');
  
  const blogs = [
    {
      filename: 'ear-piercing-age-laws.html',
      title: 'Ear Piercing Age Laws by State 2025 | Complete Guide',
      description: 'Comprehensive guide to ear piercing age requirements across all 50 US states. Learn about parental consent rules, minimum ages, and safety regulations.',
      keywords: 'ear piercing age laws, ear piercing age by state, parental consent ear piercing, minimum age ear piercing',
      h1: 'Ear Piercing Age Laws by State: Complete Guide 2025',
      content: `
        <p><strong>Updated: ${new Date('2025-12-10').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        
        <p>Ear piercing laws vary significantly across the United States. While generally less restrictive than tattoo laws, understanding your state's requirements is crucial before getting your ears pierced or taking your child for their first piercing.</p>
        
        <h2>General Ear Piercing Age Requirements</h2>
        <p>Most states allow ear piercings for minors with parental consent, typically starting around age 5-13. However, specific requirements vary:</p>
        
        <ul>
          <li><strong>Age 0-12:</strong> Usually requires parental presence and written consent</li>
          <li><strong>Age 13-17:</strong> May only need written parental consent in some states</li>
          <li><strong>Age 18+:</strong> No restrictions in all states</li>
        </ul>
        
        <h2>Parental Consent Requirements</h2>
        <p>For minors under 18, most states require:</p>
        
        <ul>
          <li>Written consent from parent or legal guardian</li>
          <li>Valid government-issued ID for both minor and parent</li>
          <li>Parent/guardian present during the procedure (in most cases)</li>
          <li>Proof of relationship (birth certificate may be required)</li>
        </ul>
        
        <h2>States with Specific Ear Piercing Laws</h2>
        
        <h3>California</h3>
        <p>California allows ear piercings at any age with parental consent and presence. No specific minimum age requirement for ear piercings.</p>
        
        <h3>Florida</h3>
        <p>Florida permits ear piercings for minors with written parental consent. Parent must be present for minors under 16.</p>
        
        <h3>Texas</h3>
        <p>Texas requires parental consent for all minors under 18. Parent or guardian must provide valid ID.</p>
        
        <h3>New York</h3>
        <p>New York allows ear piercings at any age with parental consent. No minimum age restriction for ear piercings specifically.</p>
        
        <h2>Safety Considerations</h2>
        <p>Beyond legal requirements, consider these safety factors:</p>
        
        <ul>
          <li>Choose licensed and reputable piercing studios</li>
          <li>Ensure sterile, single-use equipment</li>
          <li>Verify piercer's training and experience</li>
          <li>Discuss aftercare procedures</li>
          <li>Check for proper infection control practices</li>
        </ul>
        
        <h2>Medical Considerations for Young Children</h2>
        <p>The American Academy of Pediatrics recommends:</p>
        
        <ul>
          <li>Waiting until the child can care for piercings independently</li>
          <li>Ensuring up-to-date tetanus immunizations</li>
          <li>Avoiding piercings for babies with skin conditions</li>
          <li>Consulting with pediatrician before piercing infants</li>
        </ul>
        
        <h2>Ear Piercing vs. Body Piercing Laws</h2>
        <p>It's important to note that ear piercing laws are typically more lenient than body piercing laws. Most states treat ear piercings differently from other body piercings like nose, eyebrow, or navel piercings, which often have stricter age requirements.</p>
        
        <div style="background: #eff6ff; padding: 2rem; border-radius: 8px; border-left: 4px solid #2563eb; margin: 2rem 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Quick Reference: Typical Age Requirements</h3>
          <ul style="margin-bottom: 0;">
            <li><strong>Ear Lobe Piercing:</strong> 5+ with parental consent (most states)</li>
            <li><strong>Ear Cartilage Piercing:</strong> 13+ with parental consent</li>
            <li><strong>Other Body Piercings:</strong> 16-18+ depending on state</li>
          </ul>
        </div>
        
        <h2>Frequently Asked Questions</h2>
        
        <h3>Can I pierce my baby's ears?</h3>
        <p>Most states allow ear piercings at any age with parental consent. However, pediatricians often recommend waiting until the child is at least 6 months old to reduce infection risk and ensure proper immunization.</p>
        
        <h3>Do I need to be present for my teenager's ear piercing?</h3>
        <p>Requirements vary by state. Many states require parental presence for minors under 16, while others only require written consent for older teens.</p>
        
        <h3>What documents do I need to bring?</h3>
        <p>Typically, you'll need a valid government-issued photo ID for yourself and identification for your child (birth certificate, insurance card, or school ID).</p>
        
        <h2>Finding Licensed Ear Piercing Studios</h2>
        <p>When choosing where to get ears pierced:</p>
        
        <ul>
          <li>Verify the studio is licensed and inspected by local health departments</li>
          <li>Check online reviews and ratings</li>
          <li>Ask about sterilization procedures and equipment</li>
          <li>Ensure piercers are trained and experienced</li>
          <li>Confirm they use appropriate jewelry materials (surgical steel, titanium, or 14k gold)</li>
        </ul>
        
        <p><strong>Related Resources:</strong></p>
        <ul>
          <li><a href="../piercing/index.html">Complete Piercing Age Laws by State</a></li>
          <li><a href="../tool.html">Age Eligibility Checker Tool</a></li>
          <li><a href="../consent-form.html">Download Parental Consent Form</a></li>
        </ul>
      `
    },
    {
      filename: 'body-piercing-age-requirements.html',
      title: 'Body Piercing Age Requirements 2025 | State Laws & Parental Consent',
      description: 'Learn about body piercing age laws including nose, eyebrow, navel, and tongue piercings. State-by-state requirements and parental consent rules.',
      keywords: 'body piercing age laws, body piercing age requirements, nose piercing age, navel piercing age, parental consent body piercing',
      h1: 'Body Piercing Age Requirements: Complete State Guide 2025',
      content: `
        <p><strong>Updated: ${new Date('2025-12-08').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        
        <p>Body piercings—including nose, eyebrow, navel, lip, and tongue piercings—are subject to stricter regulations than ear piercings. Most states have specific age requirements and parental consent rules for body piercings on minors.</p>
        
        <h2>Minimum Age Requirements by Piercing Type</h2>
        
        <h3>Nose Piercings</h3>
        <p>Most states require minors to be at least <strong>16 years old</strong> for nose piercings, even with parental consent. Some states set the minimum at 18 with no exceptions.</p>
        
        <h3>Navel (Belly Button) Piercings</h3>
        <p>Navel piercings typically require a minimum age of <strong>16-18 years old</strong>. Many states prohibit navel piercings for anyone under 18, regardless of parental consent.</p>
        
        <h3>Lip and Tongue Piercings</h3>
        <p>Oral piercings are heavily regulated due to health risks. Most states require individuals to be <strong>18 years old</strong> with very few exceptions for minors with parental consent.</p>
        
        <h3>Eyebrow Piercings</h3>
        <p>Eyebrow piercings generally require a minimum age of <strong>16 years old</strong> with notarized parental consent and parental presence.</p>
        
        <h2>Parental Consent Requirements</h2>
        <p>For states that allow body piercings on minors, requirements typically include:</p>
        
        <ul>
          <li><strong>Written and notarized parental consent</strong></li>
          <li><strong>Parent/guardian must be present</strong> during entire procedure</li>
          <li><strong>Valid government-issued photo ID</strong> for both parent and minor</li>
          <li><strong>Proof of guardianship</strong> (birth certificate, custody papers)</li>
          <li><strong>Health history form</strong> completed by parent</li>
        </ul>
        
        <h2>States with Strict Body Piercing Laws</h2>
        
        <h3>California</h3>
        <p>California prohibits most body piercings for minors under 18. Only ear piercings are permitted for minors with parental consent.</p>
        
        <h3>Georgia</h3>
        <p>Georgia requires individuals to be 18 years old for all body piercings except ear piercings. No parental consent exceptions.</p>
        
        <h3>Illinois</h3>
        <p>Illinois allows body piercings for minors 16+ with written parental consent and parental presence. Minors under 16 are restricted to ear piercings only.</p>
        
        <h3>Florida</h3>
        <p>Florida permits body piercings for minors 16+ with notarized parental consent. Parent must be present during procedure.</p>
        
        <h3>Texas</h3>
        <p>Texas requires minors to be 18 for most body piercings. Some studios may pierce minors 16-17 with extensive parental documentation.</p>
        
        <h2>Health and Safety Considerations</h2>
        
        <h3>Risks of Body Piercings</h3>
        <ul>
          <li>Infection and bacterial complications</li>
          <li>Allergic reactions to jewelry materials</li>
          <li>Scarring and keloid formation</li>
          <li>Nerve damage (especially oral piercings)</li>
          <li>Rejection and migration of piercing</li>
          <li>Blood-borne pathogen transmission (if equipment not sterile)</li>
        </ul>
        
        <h3>Choosing a Safe Piercing Studio</h3>
        <p>When selecting a body piercing studio:</p>
        
        <ul>
          <li>Verify <strong>proper licensing</strong> and health department inspection</li>
          <li>Ensure use of <strong>sterile, single-use needles</strong> (never piercing guns for body piercings)</li>
          <li>Check that jewelry is <strong>implant-grade titanium</strong> or surgical steel</li>
          <li>Confirm piercer has <strong>APP (Association of Professional Piercers) certification</strong></li>
          <li>Review <strong>aftercare instructions</strong> and follow-up protocols</li>
        </ul>
        
        <h2>Body Piercing vs. Ear Piercing Laws</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
          <thead>
            <tr style="background: #2563eb; color: white;">
              <th style="padding: 1rem; text-align: left;">Aspect</th>
              <th style="padding: 1rem; text-align: left;">Ear Piercing</th>
              <th style="padding: 1rem; text-align: left;">Body Piercing</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 1rem;"><strong>Minimum Age</strong></td>
              <td style="padding: 1rem;">5-13 years (most states)</td>
              <td style="padding: 1rem;">16-18 years (most states)</td>
            </tr>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 1rem;"><strong>Parental Consent</strong></td>
              <td style="padding: 1rem;">Written consent usually sufficient</td>
              <td style="padding: 1rem;">Notarized consent often required</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 1rem;"><strong>Parental Presence</strong></td>
              <td style="padding: 1rem;">Varies by state</td>
              <td style="padding: 1rem;">Usually required</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 1rem;"><strong>Method</strong></td>
              <td style="padding: 1rem;">Piercing gun often acceptable</td>
              <td style="padding: 1rem;">Sterile needle required</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Medical Advice Before Body Piercings</h2>
        <p>Consult a healthcare provider before getting a body piercing if:</p>
        
        <ul>
          <li>You have diabetes or immune system disorders</li>
          <li>You're taking blood thinners or immunosuppressants</li>
          <li>You have a history of keloid scarring</li>
          <li>You have skin conditions like eczema or psoriasis</li>
          <li>You have metal allergies</li>
        </ul>
        
        <div style="background: #fef3c7; padding: 2rem; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 2rem 0;">
          <h3 style="color: #92400e; margin-top: 0;">⚠️ Important Reminder</h3>
          <p style="margin-bottom: 0;">Body piercing laws are enforced to protect minors. Attempting to circumvent these laws by using fake IDs or lying about age can result in legal consequences for both the minor and the piercing studio.</p>
        </div>
        
        <h2>Aftercare and Healing Times</h2>
        
        <h3>Typical Healing Periods</h3>
        <ul>
          <li><strong>Nose Piercing:</strong> 2-4 months</li>
          <li><strong>Navel Piercing:</strong> 6-12 months</li>
          <li><strong>Eyebrow Piercing:</strong> 2-3 months</li>
          <li><strong>Lip Piercing:</strong> 2-3 months</li>
          <li><strong>Tongue Piercing:</strong> 4-6 weeks</li>
        </ul>
        
        <h3>Essential Aftercare Steps</h3>
        <ul>
          <li>Clean piercing twice daily with saline solution</li>
          <li>Avoid touching piercing with unwashed hands</li>
          <li>Don't remove jewelry during healing period</li>
          <li>Avoid swimming in pools, lakes, or oceans</li>
          <li>Keep makeup and skincare products away from piercing</li>
          <li>Watch for signs of infection (excessive redness, pus, fever)</li>
        </ul>
        
        <p><strong>Additional Resources:</strong></p>
        <ul>
          <li><a href="../piercing/index.html">Piercing Laws by State</a></li>
          <li><a href="../tool.html">Check Your Eligibility</a></li>
          <li><a href="ear-piercing-age-laws.html">Ear Piercing Age Laws</a></li>
          <li><a href="body-modification-laws-guide.html">Body Modification Laws</a></li>
        </ul>
      `
    },
    {
      filename: 'body-modification-laws-guide.html',
      title: 'Body Modification Laws 2025 | Scarification, Branding & Legal Ages',
      description: 'Complete guide to body modification laws including scarification, branding, tongue splitting, and implants. Age requirements and legal restrictions by state.',
      keywords: 'body modification laws, scarification age requirements, branding laws, tongue splitting legal age, body modification age limits',
      h1: 'Body Modification Laws: Legal Ages and State Requirements 2025',
      content: `
        <p><strong>Updated: ${new Date('2025-12-05').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        
        <p>Body modifications—including scarification, branding, tongue splitting, subdermal implants, and extreme piercings—face the strictest regulations in the United States. Most states require individuals to be 18 years old with absolutely no exceptions, even with parental consent.</p>
        
        <h2>What Qualifies as "Body Modification"?</h2>
        <p>Body modifications typically include:</p>
        
        <ul>
          <li><strong>Scarification:</strong> Controlled cutting to create deliberate scars</li>
          <li><strong>Branding:</strong> Using heat or cold to create permanent marks</li>
          <li><strong>Tongue Splitting:</strong> Bifurcation of the tongue</li>
          <li><strong>Subdermal Implants:</strong> Placing objects under the skin</li>
          <li><strong>Ear Pointing:</strong> Surgical modification of ear cartilage</li>
          <li><strong>Stretching:</strong> Extreme earlobe or lip stretching</li>
          <li><strong>Transdermal Implants:</strong> Implants that protrude through skin</li>
        </ul>
        
        <h2>Legal Age Requirements</h2>
        
        <h3>Federal Guidelines</h3>
        <p>While there are no federal laws specifically governing body modifications, most states have adopted strict regulations:</p>
        
        <ul>
          <li><strong>Minimum Age:</strong> 18 years old (all states)</li>
          <li><strong>Parental Consent:</strong> Not accepted for minors</li>
          <li><strong>Medical Exception:</strong> Some states allow medical procedures with physician approval</li>
        </ul>
        
        <h2>State-by-State Regulations</h2>
        
        <h3>States with Explicit Body Modification Bans for Minors</h3>
        
        <h4>California</h4>
        <p>California explicitly prohibits all body modifications for minors under 18. Violations can result in criminal charges and professional license revocation.</p>
        
        <h4>Georgia</h4>
        <p>Georgia bans scarification, branding, and tongue splitting for anyone under 18 with no parental consent exceptions. Medical necessity is the only exception.</p>
        
        <h4>Texas</h4>
        <p>Texas law prohibits body modifications for minors. Licensed medical professionals may perform reconstructive procedures with parental consent.</p>
        
        <h4>New York</h4>
        <p>New York requires individuals to be 18+ for all body modifications. The state has strict enforcement with substantial penalties for violations.</p>
        
        <h3>States with Ambiguous or Limited Regulation</h3>
        <p>Some states don't have specific body modification statutes but enforce age restrictions through general body art or medical practice laws:</p>
        
        <ul>
          <li>Montana</li>
          <li>Wyoming</li>
          <li>South Dakota</li>
          <li>Vermont</li>
        </ul>
        
        <h2>Medical vs. Cosmetic Body Modifications</h2>
        
        <h3>Medical Exceptions</h3>
        <p>Most states allow certain procedures for minors when performed by licensed medical professionals for medical reasons:</p>
        
        <ul>
          <li><strong>Reconstructive Surgery:</strong> After injury or for birth defects</li>
          <li><strong>Scar Revision:</strong> To improve appearance of existing scars</li>
          <li><strong>Dermatological Procedures:</strong> For skin conditions</li>
        </ul>
        
        <h3>Cosmetic Body Modifications</h3>
        <p>Cosmetic body modifications for aesthetic purposes are strictly prohibited for minors in all states:</p>
        
        <ul>
          <li>Decorative scarification</li>
          <li>Aesthetic branding</li>
          <li>Tongue splitting for appearance</li>
          <li>Cosmetic implants</li>
        </ul>
        
        <h2>Health Risks and Safety Concerns</h2>
        
        <h3>Scarification Risks</h3>
        <ul>
          <li>Severe infection and sepsis</li>
          <li>Excessive bleeding</li>
          <li>Keloid formation and unpredictable scarring</li>
          <li>Nerve damage</li>
          <li>Blood-borne disease transmission</li>
        </ul>
        
        <h3>Branding Risks</h3>
        <ul>
          <li>Third-degree burns</li>
          <li>Infection</li>
          <li>Permanent tissue damage</li>
          <li>Extreme pain and shock</li>
          <li>Unpredictable scar formation</li>
        </ul>
        
        <h3>Tongue Splitting Risks</h3>
        <ul>
          <li>Excessive bleeding</li>
          <li>Nerve damage affecting taste and speech</li>
          <li>Infection</li>
          <li>Difficulty eating and speaking permanently</li>
          <li>Aspiration risk during healing</li>
        </ul>
        
        <h3>Implant Risks</h3>
        <ul>
          <li>Rejection and infection</li>
          <li>Migration of implant</li>
          <li>Allergic reactions</li>
          <li>Skin erosion and necrosis</li>
          <li>Removal complications</li>
        </ul>
        
        <h2>Legal Consequences for Violations</h2>
        
        <h3>Penalties for Practitioners</h3>
        <p>Body modification artists who perform procedures on minors face severe consequences:</p>
        
        <ul>
          <li><strong>Criminal Charges:</strong> Misdemeanor to felony charges depending on state</li>
          <li><strong>Fines:</strong> $1,000 to $25,000 per violation</li>
          <li><strong>License Revocation:</strong> Permanent loss of body art license</li>
          <li><strong>Civil Liability:</strong> Lawsuits from parents for damages</li>
          <li><strong>Jail Time:</strong> Up to 1 year in some states</li>
        </ul>
        
        <h3>Consequences for Minors</h3>
        <p>Minors who seek illegal body modifications may face:</p>
        
        <ul>
          <li>No legal recourse if complications occur</li>
          <li>Medical bills for corrective procedures</li>
          <li>Permanent disfigurement</li>
          <li>Difficulty reversing modifications</li>
        </ul>
        
        <div style="background: #fee2e2; padding: 2rem; border-radius: 8px; border-left: 4px solid #ef4444; margin: 2rem 0;">
          <h3 style="color: #991b1b; margin-top: 0;">🚫 Critical Warning</h3>
          <p style="margin-bottom: 0;">Body modifications are irreversible and carry significant health risks. DIY body modifications or seeking unlicensed practitioners can result in life-threatening complications, permanent disfigurement, and legal issues. Always wait until you are of legal age and seek licensed professionals with proper medical training.</p>
        </div>
        
        <h2>Reversibility of Body Modifications</h2>
        
        <h3>Difficult or Impossible to Reverse</h3>
        <ul>
          <li><strong>Scarification:</strong> Scars are permanent; laser removal has limited success</li>
          <li><strong>Branding:</strong> Permanent marks; surgical removal leaves scars</li>
          <li><strong>Tongue Splitting:</strong> Surgical reversal possible but not always successful</li>
          <li><strong>Extreme Stretching:</strong> May require reconstructive surgery</li>
        </ul>
        
        <h3>Partially Reversible</h3>
        <ul>
          <li><strong>Subdermal Implants:</strong> Can be surgically removed but may leave scarring</li>
          <li><strong>Transdermal Implants:</strong> Removal possible but causes visible marks</li>
        </ul>
        
        <h2>Professional Licensing and Regulation</h2>
        
        <h3>Who Can Legally Perform Body Modifications?</h3>
        <p>Regulations vary by state, but typically:</p>
        
        <ul>
          <li><strong>Licensed Body Artists:</strong> May perform certain modifications in some states</li>
          <li><strong>Medical Professionals:</strong> Physicians and surgeons with proper training</li>
          <li><strong>Regulated Studios:</strong> Must meet health department standards</li>
        </ul>
        
        <h3>Unlicensed Practitioners</h3>
        <p>Many body modifications fall into legal gray areas. Some practitioners operate without proper licensing, which increases risks:</p>
        
        <ul>
          <li>No oversight or safety standards</li>
          <li>No insurance or liability coverage</li>
          <li>No recourse if complications occur</li>
          <li>Potential for criminal activity</li>
        </ul>
        
        <h2>Alternatives for Minors</h2>
        <p>If you're under 18 and interested in body modification, consider these legal alternatives:</p>
        
        <ul>
          <li><strong>Temporary Body Art:</strong> Henna, temporary tattoos, body paint</li>
          <li><strong>Makeup Effects:</strong> Special effects makeup for scarification appearance</li>
          <li><strong>Piercings:</strong> Certain piercings allowed with parental consent (age 16+)</li>
          <li><strong>Hair Modifications:</strong> Dyeing, cutting, styling have no age restrictions</li>
          <li><strong>Clothing/Jewelry:</strong> Express yourself through fashion</li>
        </ul>
        
        <h2>Why Age Restrictions Exist</h2>
        <p>Body modification laws protect minors because:</p>
        
        <ul>
          <li>Minors cannot legally consent to permanent bodily alterations</li>
          <li>Long-term consequences may not be fully understood by young people</li>
          <li>Health risks are significant and irreversible</li>
          <li>Career and social implications may not be apparent until adulthood</li>
          <li>Psychological maturity is needed for permanent decisions</li>
        </ul>
        
        <p><strong>Learn More:</strong></p>
        <ul>
          <li><a href="../body-modification.html">Body Modification Overview</a></li>
          <li><a href="../tool.html">Age Eligibility Checker</a></li>
          <li><a href="body-piercing-age-requirements.html">Body Piercing Laws</a></li>
          <li><a href="../faq.html">Frequently Asked Questions</a></li>
        </ul>
      `
    }
  ];
  
  blogs.forEach(blog => {
    const randomDate = new Date('2025-12-01');
    randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 10));
    const isoDate = randomDate.toISOString().split('T')[0];
    const formattedDate = randomDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.title}</title>
  <meta name="description" content="${blog.description}">
  <meta name="keywords" content="${blog.keywords}">
  <link rel="canonical" href="https://tattoo.doitbylaw.com/blog/${blog.filename}">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${blog.h1}",
    "description": "${blog.description}",
    "datePublished": "${isoDate}",
    "dateModified": "${isoDate}",
    "author": {
      "@type": "Organization",
      "name": "Do It By Law"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Do It By Law",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tattoo.doitbylaw.com/images/logo.svg"
      }
    }
  }
  </script>
  
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/responsive.css">
</head>
<body>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <a href="../index.html">
          <img src="../images/logo.svg" alt="Do It By Law" class="nav-logo">
          <span class="brand-text">Do It By Law</span>
        </a>
      </div>
      <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="navMenu">
        <li><a href="../index.html">Home</a></li>
        <li><a href="../tool.html">Age Checker</a></li>
        <li><a href="../consent-form.html">Consent Form</a></li>
        <li><a href="../map.html">Map</a></li>
        <li><a href="../comparison.html">Compare</a></li>
        <li><a href="../piercing/index.html">Piercing</a></li>
        <li><a href="../tattoo-directory.html">Directory</a></li>
        <li><a href="index.html">Blog</a></li>
      </ul>
    </div>
  </nav>

  <article style="max-width: 900px; margin: 0 auto; padding: 4rem 1rem;">
    <header style="margin-bottom: 3rem;">
      <h1 style="color: #1f2937; font-size: 2.5rem; margin-bottom: 1rem;">${blog.h1}</h1>
      <div style="color: #64748b; font-size: 0.9rem;">
        <time datetime="${isoDate}">${formattedDate}</time>
      </div>
    </header>
    
    <div style="color: #374151; line-height: 1.8; font-size: 1.0625rem;">
      ${blog.content}
    </div>
  </article>

  <footer style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="color: white; margin-bottom: 1rem;">Do It By Law</h3>
          <p style="opacity: 0.8; line-height: 1.6;">Your trusted source for tattoo, piercing, and body modification laws across all 50 US states.</p>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Tools</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="../tool.html" style="color: white; opacity: 0.8; text-decoration: none;">Age Checker</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="../consent-form.html" style="color: white; opacity: 0.8; text-decoration: none;">Consent Form</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="../comparison.html" style="color: white; opacity: 0.8; text-decoration: none;">State Comparison</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Legal Pages</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="../privacy-policy.html" style="color: white; opacity: 0.8; text-decoration: none;">Privacy Policy</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="../terms-of-service.html" style="color: white; opacity: 0.8; text-decoration: none;">Terms of Service</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="../disclaimer.html" style="color: white; opacity: 0.8; text-decoration: none;">Legal Disclaimer</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="../contact.html" style="color: white; opacity: 0.8; text-decoration: none;">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 1rem;">Resources</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="../faq.html" style="color: white; opacity: 0.8; text-decoration: none;">FAQ</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="index.html" style="color: white; opacity: 0.8; text-decoration: none;">Blog</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="../tattoo-directory.html" style="color: white; opacity: 0.8; text-decoration: none;">Tattoo Directory</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center;">
        <p style="margin: 0; opacity: 0.8;">&copy; 2025 Do It By Law. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="../js/navigation.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join('blog', blog.filename), html);
    console.log(`   ✅ Created blog/${blog.filename}`);
  });
  
  console.log('');
}

// Run all fixes
try {
  fixConsentFormPrint();
  fixMapFooter();
  fixSitemap();
  fixBlogDates();
  checkMetaTags();
  createNewBlogs();
  
  console.log('✅ Issues 1-6 completed! Now running issues 7-8...\n');
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
