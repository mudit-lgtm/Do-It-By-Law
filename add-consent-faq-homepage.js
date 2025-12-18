const fs = require('fs');

console.log('7️⃣ Adding consent form to homepage resources section...');

let indexContent = fs.readFileSync('index.html', 'utf8');

// Add consent form card to resources section
const consentFormCard = `
          <a href="consent-form.html" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 8px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📄</div>
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Consent Form Generator</h3>
            <p style="font-size: 0.9rem; opacity: 0.9;">Free download</p>
          </a>
          `;

indexContent = indexContent.replace(
  /(<a href="map\.html"[^>]*>[\s\S]*?<\/a>)\s*<\/div>/i,
  '$1' + consentFormCard + '\n        </div>'
);

console.log('   ✅ Added consent form to resources section\n');

console.log('8️⃣ Adding piercing and body modification FAQs with schema...');

// Add comprehensive FAQs with schema
const newFAQSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How old do you have to be to get a tattoo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In most US states, you must be 18 years old to get a tattoo. Some states allow minors aged 16-17 to get tattooed with written parental consent and parental presence during the procedure."
        }
      },
      {
        "@type": "Question",
        "name": "Can minors get tattoos with parental consent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the state. States like Alabama prohibit tattooing minors entirely, even with parental consent. Other states like Florida allow it at age 16 with notarized parental consent."
        }
      },
      {
        "@type": "Question",
        "name": "What age can you get your ears pierced?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ear piercings are typically allowed at age 13 or younger with parental consent in most states. Many parents choose to pierce infants' ears, which is legal with parental authorization."
        }
      },
      {
        "@type": "Question",
        "name": "Can you get a nose piercing at 16?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most states allow nose piercings at age 16 with written parental consent and parental presence. Some states require you to be 18 regardless of parental consent."
        }
      },
      {
        "@type": "Question",
        "name": "What is the legal age for body piercings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Body piercings (navel, eyebrow, lip, tongue) typically require you to be 16-18 years old depending on the state. Most states require notarized parental consent and parental presence for minors."
        }
      },
      {
        "@type": "Question",
        "name": "Can you get a belly button piercing at 15?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most states prohibit navel piercings for anyone under 16, even with parental consent. Some states require you to be 18 years old with no exceptions."
        }
      },
      {
        "@type": "Question",
        "name": "What age can you get body modifications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Body modifications like scarification, branding, and tongue splitting require you to be 18 years old in all states with no parental consent exceptions."
        }
      },
      {
        "@type": "Question",
        "name": "Is tongue splitting legal for minors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Tongue splitting is prohibited for anyone under 18 in all US states, regardless of parental consent. This is due to significant health risks and permanent consequences."
        }
      },
      {
        "@type": "Question",
        "name": "Do piercing laws differ from tattoo laws?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Piercing laws are generally less restrictive than tattoo laws. Ear piercings may be allowed for young children with parental consent, while tattoos typically require age 16-18."
        }
      }
    ]
  }
  </script>`;

// Replace old FAQ schema
if (indexContent.includes('"@type": "FAQPage"')) {
  indexContent = indexContent.replace(
    /<script type="application\/ld\+json">\s*\{[^}]*"@type":\s*"FAQPage"[^<]*<\/script>/s,
    newFAQSchema
  );
}

// Add new FAQs to FAQ section
const newFAQs = `
        <details class="faq-item">
          <summary>What age can you get your ears pierced?</summary>
          <p>Ear piercings are typically allowed at age 13 or younger with parental consent in most states. Many parents choose to pierce infants' ears, which is legal with parental authorization. Requirements vary by state.</p>
        </details>
        
        <details class="faq-item">
          <summary>Can you get a nose piercing at 16?</summary>
          <p>Most states allow nose piercings at age 16 with written parental consent and parental presence. Some states require you to be 18 regardless of parental consent. Check your state's specific body piercing laws.</p>
        </details>
        
        <details class="faq-item">
          <summary>What is the legal age for body piercings like navel or eyebrow?</summary>
          <p>Body piercings (navel, eyebrow, lip, tongue) typically require you to be 16-18 years old depending on the state. Most states require notarized parental consent and parental presence for minors. Some states prohibit body piercings for anyone under 18.</p>
        </details>
        
        <details class="faq-item">
          <summary>Can you get body modifications like scarification at 17?</summary>
          <p>No. Body modifications like scarification, branding, and tongue splitting require you to be 18 years old in all states with absolutely no parental consent exceptions. These procedures carry significant health risks.</p>
        </details>
        
        <details class="faq-item">
          <summary>Do piercing laws differ from tattoo laws?</summary>
          <p>Yes. Piercing laws are generally less restrictive than tattoo laws. Ear piercings may be allowed for young children with parental consent, while tattoos typically require age 16-18. Body modifications have the strictest requirements at 18+ only.</p>
        </details>
      </div>
    </div>
  </section>`;

indexContent = indexContent.replace(
  /(<details class="faq-item">[\s\S]*?<\/details>\s*){6}\s*<\/div>\s*<\/div>\s*<\/section>/i,
  (match) => {
    return match.replace('</div>\n    </div>\n  </section>', newFAQs);
  }
);

fs.writeFileSync('index.html', indexContent);
console.log('   ✅ Added 5 new FAQs with comprehensive schema\n');

console.log('✅ Issues 7-8 completed!\n');
