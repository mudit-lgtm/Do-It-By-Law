const fs = require('fs');
const path = require('path');

// All 50 states data
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Piercing laws data for each state
const piercingLaws = {
  'Alabama': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present for minors' },
  'Alaska': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Notarized consent required' },
  'Arizona': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Valid ID required' },
  'Arkansas': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'California': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'No genital piercing under 18' },
  'Colorado': { ear: 'Any age w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Notarized parental consent' },
  'Connecticut': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Delaware': { ear: 'Any age w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Medical exemptions available' },
  'Florida': { ear: '16+ w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Parent must be present and consent notarized' },
  'Georgia': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Strict ID verification' },
  'Hawaii': { ear: 'Any age w/ consent', body: '14+ w/ consent', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Idaho': { ear: 'Any age w/ consent', body: '14+ w/ consent', genital: 'Prohibited', restrictions: 'Written parental consent' },
  'Illinois': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Consent must be notarized' },
  'Indiana': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Iowa': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Valid ID required' },
  'Kansas': { ear: 'Any age w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Medical exemptions available' },
  'Kentucky': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Louisiana': { ear: 'Any age w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Medical exemptions available' },
  'Maine': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Strict enforcement' },
  'Maryland': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Massachusetts': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Health regulations apply' },
  'Michigan': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Minnesota': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Written consent required' },
  'Mississippi': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Missouri': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Valid ID required' },
  'Montana': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Notarized consent required' },
  'Nebraska': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Nevada': { ear: 'Any age w/ consent', body: '14+ w/ consent', genital: 'Prohibited', restrictions: 'Written parental consent' },
  'New Hampshire': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Strict enforcement' },
  'New Jersey': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'New Mexico': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Valid ID required' },
  'New York': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Strict enforcement' },
  'North Carolina': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'North Dakota': { ear: 'Any age w/ consent', body: '14+ w/ consent', genital: 'Prohibited', restrictions: 'Written parental consent' },
  'Ohio': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Oklahoma': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Notarized consent required' },
  'Oregon': { ear: 'Any age w/ consent', body: '15+ w/ consent', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Pennsylvania': { ear: 'Any age w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Medical exemptions available' },
  'Rhode Island': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Strict enforcement' },
  'South Carolina': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'South Dakota': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Valid ID required' },
  'Tennessee': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Texas': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'No nipple/genital under 18' },
  'Utah': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Vermont': { ear: 'Any age w/ consent', body: '16+ w/ consent', genital: 'Prohibited', restrictions: 'Written parental consent' },
  'Virginia': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Washington': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Strict enforcement' },
  'West Virginia': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' },
  'Wisconsin': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Valid ID required' },
  'Wyoming': { ear: 'Any age w/ consent', body: '18+ only', genital: 'Prohibited', restrictions: 'Parent must be present' }
};

// Function to generate state piercing page
function generateStatePiercingPage(state) {
  const slug = state.toLowerCase().replace(/\s+/g, '');
  const laws = piercingLaws[state];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state} Piercing Age Laws 2025 | Complete Legal Guide</title>
    <meta name="description" content="${state} piercing age laws. Ear piercing, body piercing requirements, parental consent. Updated 2025.">
    <link rel="canonical" href="https://doitbylaw.com/piercing/${slug}.html">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/responsive.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="../index.html">
                    <img src="../images/logo.svg" alt="Legal Age Authority" width="40" height="40">
                    <span>Legal Age Authority</span>
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../tool.html">Age Checker</a></li>
                <li><a href="../map.html">Interactive Map</a></li>
                <li><a href="../search.html">Search</a></li>
                <li><a href="../comparison.html">Compare</a></li>
                <li><a href="../faq.html">FAQ</a></li>
                <li><a href="../blog/index.html">Blog</a></li>
            </ul>
        </div>
    </nav>

    <header style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: white; padding: 3rem 0;">
        <div class="container">
            <h1 style="color: white; margin-bottom: 0.5rem;">${state} Piercing Age Laws</h1>
            <p style="font-size: 1.1rem; opacity: 0.9;">Complete guide to ear and body piercing requirements in ${state}</p>
        </div>
    </header>

    <main class="container" style="max-width: 900px; margin: 2rem auto; padding: 0 1rem;">
        <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 1.5rem; margin-bottom: 2rem;">
            <h2 style="margin-top: 0; color: #1e40af;">Quick Summary</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div>
                    <strong style="color: #64748b;">👂 Ear Piercing:</strong>
                    <p style="margin: 0.5rem 0 0 0;">${laws.ear}</p>
                </div>
                <div>
                    <strong style="color: #64748b;">💍 Body Piercing:</strong>
                    <p style="margin: 0.5rem 0 0 0;">${laws.body}</p>
                </div>
                <div>
                    <strong style="color: #64748b;">🔞 Genital Piercing:</strong>
                    <p style="margin: 0.5rem 0 0 0;">${laws.genital}</p>
                </div>
            </div>
        </div>

        <section style="margin-bottom: 2rem;">
            <h2>Detailed Requirements</h2>
            
            <h3>Ear Piercing Requirements</h3>
            <p><strong>Minimum Age:</strong> ${laws.ear}</p>
            <p>Ear lobe piercing is generally the most permissive type of piercing in ${state}. Most establishments allow ear piercing at any age as long as a parent or legal guardian is present and provides consent.</p>
            
            <h3>Body Piercing Requirements</h3>
            <p><strong>Minimum Age:</strong> ${laws.body}</p>
            <p>Body piercings (including nose, eyebrow, navel, tongue) have stricter requirements. In ${state}, ${laws.body === '18+ only' ? 'you must be 18 or older to get a body piercing, with no exceptions for parental consent' : 'minors can get body piercings with proper parental consent and presence'}.</p>
            
            <h3>Genital Piercing</h3>
            <p><strong>Status:</strong> ${laws.genital}</p>
            <p>${state} prohibits genital piercing on anyone under 18 years old, regardless of parental consent. This includes nipple piercings in most cases.</p>
        </section>

        <section style="background: #fef3c7; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
            <h2 style="margin-top: 0; color: #92400e;">⚠️ Important Restrictions</h2>
            <p style="margin: 0;"><strong>${laws.restrictions}</strong></p>
            <p style="margin: 1rem 0 0 0; font-size: 0.9rem;">Always verify specific requirements with your chosen piercing studio, as individual establishments may have additional policies.</p>
        </section>

        <section style="margin-bottom: 2rem;">
            <h2>Parental Consent Requirements</h2>
            <p>When parental consent is required in ${state}, you typically need:</p>
            <ul>
                <li>Valid government-issued ID for both minor and parent</li>
                <li>Proof of guardianship (birth certificate, court documents, etc.)</li>
                <li>Parent/guardian must be physically present during the procedure</li>
                <li>Written consent form signed by parent/guardian</li>
                ${laws.restrictions.includes('Notarized') ? '<li><strong>Notarized consent document</strong></li>' : ''}
            </ul>
        </section>

        <section style="margin-bottom: 2rem;">
            <h2>Safety & Health Considerations</h2>
            <p>Before getting a piercing in ${state}, ensure:</p>
            <ul>
                <li>The piercing studio is properly licensed and regulated</li>
                <li>All equipment is sterile and single-use</li>
                <li>The piercer follows proper sanitation protocols</li>
                <li>You understand aftercare instructions</li>
                <li>You're aware of potential risks and complications</li>
            </ul>
        </section>

        <div style="background: #f3f4f6; padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
            <h2>Related Resources</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                <a href="../${slug}.html" style="background: white; padding: 1rem; border-radius: 8px; text-decoration: none; color: #2563eb; font-weight: 600;">
                    ${state} Tattoo Laws →
                </a>
                <a href="index.html" style="background: white; padding: 1rem; border-radius: 8px; text-decoration: none; color: #2563eb; font-weight: 600;">
                    All States Piercing Laws →
                </a>
                <a href="../faq.html" style="background: white; padding: 1rem; border-radius: 8px; text-decoration: none; color: #2563eb; font-weight: 600;">
                    Piercing FAQ →
                </a>
            </div>
        </div>
    </main>

    <footer style="background: #1f2937; color: white; padding: 3rem 0;">
        <div class="container">
            <p style="text-align: center; margin: 0;">&copy; 2025 Legal Age Authority. All rights reserved.</p>
        </div>
    </footer>

    <script src="../js/analytics.js"></script>
</body>
</html>`;
}

// Generate all 50 state piercing pages
console.log('Generating piercing state pages...');
states.forEach(state => {
  const slug = state.toLowerCase().replace(/\s+/g, '');
  const filename = path.join(__dirname, 'piercing', `${slug}.html`);
  const content = generateStatePiercingPage(state);
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Created: piercing/${slug}.html`);
});

// Update piercing index with all states
const piercingIndexContent = fs.readFileSync(path.join(__dirname, 'piercing', 'index.html'), 'utf8');
const stateCardsHtml = states.map(state => {
  const slug = state.toLowerCase().replace(/\s+/g, '');
  const laws = piercingLaws[state];
  return `                <a href="${slug}.html" style="background: white; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: inherit;">
                    <h3 style="color: #2563eb; margin: 0 0 0.5rem 0;">${state}</h3>
                    <p style="margin: 0; font-size: 0.9rem; color: #64748b;">Ear: ${laws.ear} | Body: ${laws.body}</p>
                </a>`;
}).join('\n\n');

const updatedPiercingIndex = piercingIndexContent.replace(
  /<!-- Add remaining 42 states here for brevity in this example -->[\s\S]*?<div style="grid-column: 1\/-1;/,
  stateCardsHtml + '\n            </div>\n            <div style="grid-column: 1/-1;'
);

fs.writeFileSync(path.join(__dirname, 'piercing', 'index.html'), updatedPiercingIndex, 'utf8');
console.log('Updated: piercing/index.html with all 50 states');

console.log('\n✅ Piercing pages generation complete!');
console.log(`Generated ${states.length} state-specific piercing pages`);
