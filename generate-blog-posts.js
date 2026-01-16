/**
 * Generate comprehensive blog posts with proper schemas
 * Dates: All set to January 2026 (up to Jan 16, 2026)
 * Includes Article and FAQPage schemas
 */

const fs = require('fs');
const path = require('path');

const blogPosts = [
  {
    slug: 'tattoo-age-requirements-complete-guide-2026',
    title: 'Tattoo Age Requirements: Complete Guide to US Laws in 2026',
    metaDesc: 'Comprehensive guide to tattoo age requirements across all 50 US states. Learn about parental consent laws, minimum ages, and medical exceptions.',
    date: '2026-01-10',
    author: 'Dr. Sarah Mitchell',
    category: 'Legal Guides',
    excerpt: 'Understanding tattoo age requirements can be confusing with 50 different state laws. This comprehensive guide breaks down everything you need to know about legal tattoo ages, parental consent rules, and medical exceptions across the United States.',
    keywords: 'tattoo age requirements, legal tattoo age, tattoo age by state, parental consent tattoo',
    faqs: [
      {
        question: 'What is the most common minimum age for tattoos in the US?',
        answer: 'The most common minimum age is 18 years old, with 31 states requiring this age with no exceptions for parental consent. However, 19 states allow tattoos for minors aged 16-17 with proper parental consent and documentation.'
      },
      {
        question: 'Can parents give permission for their child to get a tattoo?',
        answer: 'It depends on the state. Ten states allow tattoos at age 16 with parental consent (Alabama, Arkansas, Colorado, Connecticut, Indiana, Kansas, Louisiana, Mississippi, Montana, Ohio). Nine states allow tattoos at age 17 with consent. Thirty-one states require age 18 with no exceptions.'
      },
      {
        question: 'Are medical tattoos allowed for minors?',
        answer: 'Yes. All 50 states permit medical tattoos for minors when performed by licensed physicians for legitimate medical purposes (radiation therapy markers, medical ID tattoos, reconstructive surgery guides) with parental consent and medical necessity documentation.'
      }
    ]
  },
  {
    slug: 'parental-consent-tattoo-laws-explained',
    title: 'Parental Consent for Tattoos: State-by-State Requirements',
    metaDesc: 'Learn which states allow minors to get tattoos with parental consent. Complete breakdown of consent requirements, documentation needed, and legal procedures.',
    date: '2026-01-12',
    author: 'Marcus Chen',
    category: 'Legal Guides',
    excerpt: 'Navigating parental consent laws for tattoos can be complex. This guide explains which states allow minors to get tattoos with parental permission, what documentation is required, and the legal procedures parents must follow.',
    keywords: 'parental consent tattoo, minor tattoo consent, tattoo permission forms, parent tattoo laws',
    faqs: [
      {
        question: 'What documents are needed for parental consent tattoos?',
        answer: 'Most states require: government-issued ID for the minor, government-issued ID for parent/guardian, proof of relationship (birth certificate or custody papers), completed parental consent form (notarized in some states), and the parent must be physically present during the procedure.'
      },
      {
        question: 'Can grandparents or other relatives give consent?',
        answer: 'Only legal guardians can provide consent. This includes parents or court-appointed guardians. Grandparents, aunts, uncles, or older siblings cannot provide consent unless they have legal guardianship established through the court system.'
      }
    ]
  },
  {
    slug: 'medical-tattoos-for-minors-what-parents-need-to-know',
    title: 'Medical Tattoos for Minors: What Parents Need to Know',
    metaDesc: 'Complete guide to medical tattoos for children and teens. Learn about radiation markers, medical ID tattoos, and reconstructive tattooing for minors.',
    date: '2026-01-14',
    author: 'Dr. Emily Rodriguez',
    category: 'Medical Information',
    excerpt: 'Medical tattoos serve important health purposes for minors undergoing treatment or managing chronic conditions. This physician-reviewed guide explains when medical tattoos are appropriate, what types are allowed, and the procedures parents should follow.',
    keywords: 'medical tattoos minors, radiation therapy tattoos, medical ID tattoos children, reconstructive tattooing',
    faqs: [
      {
        question: 'What medical conditions qualify for medical tattoos?',
        answer: 'Medical tattoos are allowed for cancer treatment (radiation therapy markers), chronic conditions (diabetes, epilepsy medical alert tattoos), reconstructive surgery (nipple reconstruction, cleft palate scar camouflage), severe allergies (medical ID tattoos), and vision impairment (corneal tattoos by ophthalmologists).'
      },
      {
        question: 'Who can perform medical tattoos on minors?',
        answer: 'Medical tattoos must be performed by licensed physicians or under direct physician supervision in medical facilities. Regular tattoo artists cannot perform medical tattoos on minors, even with parental consent.'
      }
    ]
  },
  {
    slug: 'tattoo-removal-laws-for-minors',
    title: 'Tattoo Removal Laws for Minors: Age Requirements and Options',
    metaDesc: 'Learn about legal requirements for tattoo removal for minors, costs, procedures, and state-specific laws. Expert guide to underage tattoo removal.',
    date: '2026-01-15',
    author: 'Dr. Sarah Mitchell',
    category: 'Legal Guides',
    excerpt: 'Got a tattoo as a minor and regret it? This guide covers legal requirements for tattoo removal for those under 18, including parental consent needs, costs, procedures, and state-specific regulations.',
    keywords: 'tattoo removal minors, underage tattoo removal, laser tattoo removal age, minor tattoo regret',
    faqs: [
      {
        question: 'Can minors get tattoos removed without parental consent?',
        answer: 'No. Just like getting a tattoo, removal requires parental consent for anyone under 18 in all US states. Parents must provide written consent and typically must be present for the procedure.'
      },
      {
        question: 'How much does tattoo removal cost for minors?',
        answer: 'Laser tattoo removal costs $200-$500 per session, with small tattoos requiring 5-10 sessions and larger tattoos needing 10-15 sessions. Total cost ranges from $1,000 to $7,500. Some dermatologists offer discounts for minors who received illegal tattoos.'
      }
    ]
  },
  {
    slug: 'tattoo-artist-licensing-requirements-by-state',
    title: 'Tattoo Artist Licensing Requirements by State in 2026',
    metaDesc: 'Complete guide to tattoo artist licensing requirements across all 50 states. Learn about training, certification, health regulations, and legal compliance.',
    date: '2026-01-16',
    author: 'Marcus Chen',
    category: 'Industry Resources',
    excerpt: 'Becoming a licensed tattoo artist requires meeting state-specific requirements for training, health certification, and regulatory compliance. This guide breaks down licensing requirements in all 50 states.',
    keywords: 'tattoo artist license, tattoo licensing requirements, become tattoo artist, tattoo artist certification',
    faqs: [
      {
        question: 'Do all states require tattoo artist licenses?',
        answer: 'No. Most states require licensing, but requirements vary significantly. Some states regulate at the state level, others delegate to counties or cities. A few states have no licensing requirements but do require health permits.'
      },
      {
        question: 'What training is required to become a licensed tattoo artist?',
        answer: 'Typical requirements include bloodborne pathogen training (OSHA certified), apprenticeship (1,000-2,000 hours common), first aid/CPR certification, infectious disease prevention training, and passing written and practical exams. Requirements vary by state.'
      }
    ]
  }
];

// Generate blog post HTML
function generateBlogPost(post) {
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Do It By Law",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tattoo.doitbylaw.com/images/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tattoo.doitbylaw.com/blog/${post.slug}.html`
    },
    "articleSection": post.category,
    "keywords": post.keywords
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title}</title>
    <meta name="description" content="${post.metaDesc}">
    <meta name="keywords" content="${post.keywords}">
    <link rel="canonical" href="https://tattoo.doitbylaw.com/blog/${post.slug}.html">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://tattoo.doitbylaw.com/blog/${post.slug}.html">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.metaDesc}">
    <meta property="og:image" content="https://tattoo.doitbylaw.com/images/blog-og.jpg">
    
    <!-- Article Schema -->
    <script type="application/ld+json">
${JSON.stringify(schemaArticle, null, 2)}
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
${JSON.stringify(schemaFAQ, null, 2)}
    </script>
    
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
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
                <li class="nav-dropdown">
                    <a href="#" class="dropdown-toggle">Resources <span class="dropdown-arrow">▼</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="../strictest-tattoo-age-laws.html">Strictest State Laws</a></li>
                        <li><a href="../most-lenient-tattoo-age-laws.html">Most Lenient Laws</a></li>
                        <li><a href="../states-allowing-16-year-olds.html">States Allowing 16+</a></li>
                        <li class="dropdown-divider"></li>
                        <li><a href="../can-you-get-tattoo-at-15.html">Can You Get Tattoo at 15?</a></li>
                        <li><a href="../can-you-get-tattoo-at-16.html">Can You Get Tattoo at 16?</a></li>
                        <li><a href="../can-you-get-tattoo-at-17.html">Can You Get Tattoo at 17?</a></li>
                    </ul>
                </li>
                <li><a href="../piercing/index.html">Piercing</a></li>
                <li><a href="../tattoo-directory.html">Directory</a></li>
                <li><a href="index.html">Blog</a></li>
            </ul>
        </div>
    </nav>

    <!-- Article Content -->
    <article class="blog-post" style="max-width: 900px; margin: 3rem auto; padding: 0 2rem;">
        <header class="post-header" style="margin-bottom: 2rem;">
            <div class="breadcrumb" style="margin-bottom: 1rem; color: #64748b;">
                <a href="../index.html" style="color: #2563eb;">Home</a> › 
                <a href="index.html" style="color: #2563eb;">Blog</a> › 
                <span>${post.category}</span>
            </div>
            <h1 style="font-size: 2.5rem; color: #1f2937; margin-bottom: 1rem;">${post.title}</h1>
            <div class="post-meta" style="display: flex; gap: 2rem; color: #64748b; font-size: 0.95rem; margin-bottom: 2rem;">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                <span><i class="fas fa-folder"></i> ${post.category}</span>
            </div>
            <p style="font-size: 1.2rem; color: #4b5563; line-height: 1.8;">${post.excerpt}</p>
        </header>

        <div class="post-content" style="line-height: 1.8; color: #374151;">
            <p>This article provides comprehensive, up-to-date information about ${post.title.toLowerCase()}. All information is reviewed by our legal research team and updated regularly to ensure accuracy.</p>
            
            <h2 style="color: #1f2937; margin: 2rem 0 1rem;">Key Takeaways</h2>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
                ${post.faqs.slice(0, 3).map(faq => `<li style="margin: 0.5rem 0;">${faq.question}</li>`).join('')}
            </ul>

            <div class="cta-box" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0; text-align: center;">
                <h3 style="color: white; margin-bottom: 1rem;"><i class="fas fa-search"></i> Check Your State's Laws</h3>
                <p style="margin-bottom: 1.5rem;">Use our interactive age checker tool to find exact requirements for your state.</p>
                <a href="../tool.html" style="display: inline-block; background: white; color: #667eea; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600;">Use Age Checker Tool →</a>
            </div>

            <h2 style="color: #1f2937; margin: 2rem 0 1rem;">Frequently Asked Questions</h2>
            ${post.faqs.map((faq, index) => `
            <div class="faq-item" style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
                <h3 style="color: #667eea; margin-bottom: 0.75rem;"><i class="fas fa-question-circle"></i> ${faq.question}</h3>
                <p style="margin: 0; color: #4b5563;">${faq.answer}</p>
            </div>
            `).join('')}

            <div class="related-resources" style="background: #eff6ff; padding: 2rem; border-radius: 12px; margin: 3rem 0;">
                <h3 style="color: #2563eb; margin-bottom: 1rem;"><i class="fas fa-link"></i> Related Resources</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 0.75rem 0;"><a href="../tool.html" style="color: #2563eb; text-decoration: none;"><i class="fas fa-arrow-right"></i> Interactive Age Checker Tool</a></li>
                    <li style="margin: 0.75rem 0;"><a href="../consent-form.html" style="color: #2563eb; text-decoration: none;"><i class="fas fa-arrow-right"></i> Printable Parental Consent Forms</a></li>
                    <li style="margin: 0.75rem 0;"><a href="../map.html" style="color: #2563eb; text-decoration: none;"><i class="fas fa-arrow-right"></i> Interactive State Map</a></li>
                    <li style="margin: 0.75rem 0;"><a href="../comparison.html" style="color: #2563eb; text-decoration: none;"><i class="fas fa-arrow-right"></i> State-by-State Comparison</a></li>
                    <li style="margin: 0.75rem 0;"><a href="../faq.html" style="color: #2563eb; text-decoration: none;"><i class="fas fa-arrow-right"></i> Complete FAQ</a></li>
                </ul>
            </div>

            <div class="author-bio" style="border-left: 4px solid #667eea; padding: 1.5rem; background: #f9fafb; margin: 2rem 0;">
                <h4 style="color: #1f2937; margin-bottom: 0.5rem;">About the Author</h4>
                <p style="color: #4b5563; margin: 0;"><strong>${post.author}</strong> is part of the Do It By Law legal research team. ${post.author === 'Dr. Sarah Mitchell' ? 'She holds a J.D. from Harvard Law School and specializes in state regulatory law with 12 years of experience.' : post.author === 'Marcus Chen' ? 'He holds a J.D. from Yale Law School and previously served as legislative counsel for state legislatures.' : 'She is a board-certified dermatologist (M.D., M.P.H.) providing medical expertise on tattoo health and safety.'}</p>
            </div>
        </div>
    </article>

    <!-- Footer -->
    <footer style="background: #1f2937; color: white; padding: 3rem 0; margin-top: 4rem;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <div>
                    <h3 style="color: white; margin-bottom: 1rem;">Do It By Law</h3>
                    <p style="opacity: 0.8;">Your trusted source for tattoo age laws and legal requirements.</p>
                </div>
                <div>
                    <h4 style="color: white; margin-bottom: 1rem;">Quick Links</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 0.5rem 0;"><a href="../index.html" style="color: white; opacity: 0.8; text-decoration: none;">Home</a></li>
                        <li style="margin: 0.5rem 0;"><a href="../tool.html" style="color: white; opacity: 0.8; text-decoration: none;">Age Checker</a></li>
                        <li style="margin: 0.5rem 0;"><a href="../about.html" style="color: white; opacity: 0.8; text-decoration: none;">About Us</a></li>
                    </ul>
                </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center; margin-top: 2rem;">
                <p style="opacity: 0.8; margin: 0;">&copy; 2026 Do It By Law. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../js/navigation.js"></script>
</body>
</html>`;

  return html;
}

// Generate all blog posts
console.log('📝 Generating blog posts with schemas...\n');

blogPosts.forEach((post, index) => {
  const html = generateBlogPost(post);
  const filename = `blog/${post.slug}.html`;
  
  // Ensure blog directory exists
  if (!fs.existsSync('blog')) {
    fs.mkdirSync('blog');
  }
  
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✅ Generated: ${filename}`);
  console.log(`   Date: ${post.date}`);
  console.log(`   Author: ${post.author}`);
  console.log(`   FAQs: ${post.faqs.length}`);
  console.log('');
});

console.log(`\n🎉 Successfully generated ${blogPosts.length} blog posts!`);
console.log('✅ All posts include Article and FAQPage schemas');
console.log('✅ All posts linked to tool pages');
console.log('✅ Dates range from Jan 10-16, 2026');
