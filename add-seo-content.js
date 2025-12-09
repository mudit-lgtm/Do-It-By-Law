const fs = require('fs');

console.log('🚀 Adding Comprehensive SEO Content to Homepage\n');

const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// SEO Content Section to insert before FAQ
const seoContentSection = `
  <!-- SEO Content Sections -->
  <section class="seo-content" style="background: white; padding: 4rem 0;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
      
      <!-- What Age Can You Get a Tattoo -->
      <div style="margin-bottom: 4rem;">
        <h2 style="color: #1f2937; font-size: 2rem; margin-bottom: 1.5rem; text-align: center;">What Age Can You Get a Tattoo? Complete State-by-State Guide</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div style="background: #f9fafb; padding: 2rem; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h3 style="color: #2563eb; font-size: 1.25rem; margin-bottom: 1rem;">How Old Do You Have to Be to Get a Tattoo?</h3>
            <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1rem;">The legal age to get a tattoo varies by state in the United States. Most states require you to be <strong>18 years old</strong> to get a tattoo without parental consent. However, some states allow minors to get tattoos with parental consent, while others have complete bans on tattooing minors.</p>
            <a href="tool.html" style="color: #2563eb; font-weight: 600; text-decoration: none;">Check your state's age requirements →</a>
          </div>
          
          <div style="background: #f9fafb; padding: 2rem; border-radius: 8px; border-left: 4px solid #10b981;">
            <h3 style="color: #059669; font-size: 1.25rem; margin-bottom: 1rem;">Can You Get a Tattoo at 16 with Parental Consent?</h3>
            <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1rem;">In some states, <strong>16-year-olds can get tattoos</strong> with written parental consent and parental presence during the procedure. States like Arkansas, Colorado, and Nevada allow tattoos at 16 with proper parental authorization. Always verify current state laws before proceeding.</p>
            <a href="comparison.html" style="color: #059669; font-weight: 600; text-decoration: none;">Compare state laws →</a>
          </div>
          
          <div style="background: #f9fafb; padding: 2rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #d97706; font-size: 1.25rem; margin-bottom: 1rem;">Can a 14 Year Old Get a Tattoo with Parental Consent?</h3>
            <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1rem;">Most states <strong>do NOT allow 14-year-olds to get tattoos</strong>, even with parental consent. The minimum age in states that allow minor tattoos is typically 16 or 17 years old. States like Alabama, California, and Georgia prohibit all tattoos on minors under 18, with <strong>penalties up to $5,000</strong>.</p>
            <a href="faq.html" style="color: #d97706; font-weight: 600; text-decoration: none;">Read FAQ →</a>
          </div>
        </div>
      </div>
      
      <!-- Tattoo Age Requirements by Popular States -->
      <div style="margin-bottom: 4rem;">
        <h2 style="color: #1f2937; font-size: 2rem; margin-bottom: 1.5rem; text-align: center;">Legal Age to Get a Tattoo in Popular States</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          
          <div style="background: white; border: 2px solid #e5e7eb; padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: #2563eb; font-size: 1.125rem; margin-bottom: 0.5rem;">🌴 California Tattoo Age</h3>
            <p style="color: #1f2937; font-weight: 600; font-size: 1.25rem; margin-bottom: 0.5rem;">18 years old</p>
            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">No exceptions. Tattooing minors is illegal in California, even with parental consent. Penalties include fines up to $5,000 and license revocation.</p>
            <a href="states/california.html" style="color: #2563eb; font-size: 0.9rem; font-weight: 600; text-decoration: none;">Learn more →</a>
          </div>
          
          <div style="background: white; border: 2px solid #e5e7eb; padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: #2563eb; font-size: 1.125rem; margin-bottom: 0.5rem;">🤠 Texas Tattoo Age</h3>
            <p style="color: #1f2937; font-weight: 600; font-size: 1.25rem; margin-bottom: 0.5rem;">18 years old</p>
            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">No exceptions. Texas law prohibits tattooing anyone under 18, regardless of parental consent. Violations result in Class A misdemeanor charges.</p>
            <a href="states/texas.html" style="color: #2563eb; font-size: 0.9rem; font-weight: 600; text-decoration: none;">Learn more →</a>
          </div>
          
          <div style="background: white; border: 2px solid #e5e7eb; padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: #2563eb; font-size: 1.125rem; margin-bottom: 0.5rem;">🌴 Florida Tattoo Age</h3>
            <p style="color: #1f2937; font-weight: 600; font-size: 1.25rem; margin-bottom: 0.5rem;">16+ with consent</p>
            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">Florida allows tattoos at 16 with written parental consent. Parent/guardian must be present during procedure with valid ID verification.</p>
            <a href="states/florida.html" style="color: #2563eb; font-size: 0.9rem; font-weight: 600; text-decoration: none;">Learn more →</a>
          </div>
          
          <div style="background: white; border: 2px solid #e5e7eb; padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: #2563eb; font-size: 1.125rem; margin-bottom: 0.5rem;">🗽 New York Tattoo Age</h3>
            <p style="color: #1f2937; font-weight: 600; font-size: 1.25rem; margin-bottom: 0.5rem;">18 years old</p>
            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">New York prohibits all tattoos on minors under 18. No parental consent exceptions. Violations can result in criminal charges and fines.</p>
            <a href="states/newyork.html" style="color: #2563eb; font-size: 0.9rem; font-weight: 600; text-decoration: none;">Learn more →</a>
          </div>
          
          <div style="background: white; border: 2px solid #e5e7eb; padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: #2563eb; font-size: 1.125rem; margin-bottom: 0.5rem;">🌲 Illinois Tattoo Age</h3>
            <p style="color: #1f2937; font-weight: 600; font-size: 1.25rem; margin-bottom: 0.5rem;">18 years old</p>
            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">Illinois requires individuals to be 18 to get tattoos. Parental consent does not change the age requirement. Strict enforcement statewide.</p>
            <a href="states/illinois.html" style="color: #2563eb; font-size: 0.9rem; font-weight: 600; text-decoration: none;">Learn more →</a>
          </div>
          
          <div style="background: white; border: 2px solid #e5e7eb; padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: #2563eb; font-size: 1.125rem; margin-bottom: 0.5rem;">🌄 Georgia Tattoo Age</h3>
            <p style="color: #1f2937; font-weight: 600; font-size: 1.25rem; margin-bottom: 0.5rem;">18 years old</p>
            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">Georgia law prohibits tattooing minors under 18 without exceptions. Medical tattoos for reconstructive purposes may be considered on case-by-case basis.</p>
            <a href="states/georgia.html" style="color: #2563eb; font-size: 0.9rem; font-weight: 600; text-decoration: none;">Learn more →</a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <a href="map.html" style="display: inline-block; background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 6px; font-weight: 600; text-decoration: none; transition: all 0.2s;">View Interactive Map of All 50 States →</a>
        </div>
      </div>
      
      <!-- Parental Consent Guide -->
      <div style="margin-bottom: 4rem; background: #eff6ff; padding: 3rem; border-radius: 12px;">
        <h2 style="color: #1f2937; font-size: 2rem; margin-bottom: 1.5rem; text-align: center;">Tattoo with Parental Consent: What You Need to Know</h2>
        <div style="max-width: 800px; margin: 0 auto;">
          <p style="color: #374151; line-height: 1.8; font-size: 1.125rem; margin-bottom: 1.5rem;">If you're wondering <strong>"can I get a tattoo at 16 with parental consent"</strong> or <strong>"what states can you get a tattoo at 16"</strong>, the answer varies significantly by location.</p>
          
          <h3 style="color: #2563eb; font-size: 1.5rem; margin-bottom: 1rem; margin-top: 2rem;">States That Allow Tattoos at 16 with Parental Consent:</h3>
          <ul style="color: #4b5563; line-height: 2; margin-left: 2rem; margin-bottom: 1.5rem;">
            <li><strong>Arkansas:</strong> 16+ with written and notarized parental consent</li>
            <li><strong>Colorado:</strong> 16+ with parent/guardian present during procedure</li>
            <li><strong>Nevada:</strong> 16+ with written parental consent and ID verification</li>
            <li><strong>Florida:</strong> 16+ with parental consent and parental presence required</li>
            <li><strong>Montana:</strong> 16+ with written parental/guardian authorization</li>
          </ul>
          
          <h3 style="color: #dc2626; font-size: 1.5rem; margin-bottom: 1rem;">States with Strict 18+ Laws (No Exceptions):</h3>
          <ul style="color: #4b5563; line-height: 2; margin-left: 2rem; margin-bottom: 1.5rem;">
            <li><strong>California, Alabama, Georgia:</strong> Complete ban on minor tattoos</li>
            <li><strong>Texas, New York, Illinois:</strong> No parental consent exceptions</li>
            <li><strong>North Carolina, Virginia, Massachusetts:</strong> Strictly 18 years old</li>
          </ul>
          
          <div style="background: white; border-left: 4px solid #ef4444; padding: 1.5rem; margin-top: 2rem; border-radius: 4px;">
            <h4 style="color: #dc2626; font-weight: 600; margin-bottom: 0.75rem;">⚠️ Is It Illegal to Get a Tattoo Under 18?</h4>
            <p style="color: #4b5563; line-height: 1.7;">In most states, <strong>yes</strong>. Getting a tattoo under 18 is illegal in the majority of US states. Tattoo artists face penalties ranging from $500 to $10,000 in fines, license suspension, and even criminal charges. Minors and parents can also face legal consequences.</p>
          </div>
          
          <div style="text-align: center; margin-top: 2rem;">
            <a href="blog/parental-consent-guide.html" style="display: inline-block; background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 6px; font-weight: 600; text-decoration: none;">Read Complete Parental Consent Guide →</a>
          </div>
        </div>
      </div>
      
      <!-- Minimum Age Requirements -->
      <div style="margin-bottom: 4rem;">
        <h2 style="color: #1f2937; font-size: 2rem; margin-bottom: 1.5rem; text-align: center;">Minimum Age to Get a Tattoo: Complete Breakdown</h2>
        <div style="max-width: 900px; margin: 0 auto;">
          <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #2563eb; color: white;">
                <th style="padding: 1rem; text-align: left; font-weight: 600;">Minimum Age</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600;">Requirements</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600;">Number of States</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 1rem; font-weight: 600; color: #2563eb;">18 years old</td>
                <td style="padding: 1rem; color: #4b5563;">No parental consent accepted</td>
                <td style="padding: 1rem; color: #4b5563;"><strong>35+ states</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
                <td style="padding: 1rem; font-weight: 600; color: #059669;">16-17 years old</td>
                <td style="padding: 1rem; color: #4b5563;">Written parental consent + ID</td>
                <td style="padding: 1rem; color: #4b5563;"><strong>10+ states</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 1rem; font-weight: 600; color: #dc2626;">Under 16 years</td>
                <td style="padding: 1rem; color: #4b5563;">Prohibited in all states</td>
                <td style="padding: 1rem; color: #4b5563;"><strong>50 states</strong></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 1rem; font-weight: 600; color: #7c3aed;">Medical Exception</td>
                <td style="padding: 1rem; color: #4b5563;">Reconstructive/medical procedures</td>
                <td style="padding: 1rem; color: #4b5563;"><strong>5+ states</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 2rem; text-align: center;">
            <p style="color: #64748b; line-height: 1.7; margin-bottom: 1rem;">Looking for specific state requirements? Use our interactive comparison tool to find age limits, consent requirements, and penalties in your state.</p>
            <a href="comparison.html" style="display: inline-block; background: #10b981; color: white; padding: 1rem 2rem; border-radius: 6px; font-weight: 600; text-decoration: none;">Compare All 50 States →</a>
          </div>
        </div>
      </div>
      
      <!-- Common Questions -->
      <div style="margin-bottom: 4rem; background: #fef3c7; padding: 3rem; border-radius: 12px;">
        <h2 style="color: #92400e; font-size: 2rem; margin-bottom: 2rem; text-align: center;">Most Searched Tattoo Age Questions</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto;">
          
          <div>
            <h3 style="color: #b45309; font-size: 1.125rem; margin-bottom: 0.75rem;">Can you get a tattoo at 17?</h3>
            <p style="color: #78350f; line-height: 1.7;">In most states, <strong>no</strong>. Only states with parental consent laws (like Florida, Arkansas, Colorado) allow 17-year-olds to get tattoos with proper authorization.</p>
          </div>
          
          <div>
            <h3 style="color: #b45309; font-size: 1.125rem; margin-bottom: 0.75rem;">What age can u get a tattoo?</h3>
            <p style="color: #78350f; line-height: 1.7;">The legal tattoo age is <strong>18 years old</strong> in most US states. A few states allow 16-17 year olds with written parental consent and parental presence.</p>
          </div>
          
          <div>
            <h3 style="color: #b45309; font-size: 1.125rem; margin-bottom: 0.75rem;">Can you get a tattoo at 15?</h3>
            <p style="color: #78350f; line-height: 1.7;"><strong>No</strong>. All 50 US states prohibit tattooing 15-year-olds, even with parental consent. The youngest legal age is 16 in select states.</p>
          </div>
          
          <div>
            <h3 style="color: #b45309; font-size: 1.125rem; margin-bottom: 0.75rem;">Do you have to be 18 to get a tattoo?</h3>
            <p style="color: #78350f; line-height: 1.7;">In <strong>35+ states, yes</strong>. However, about 10-15 states allow minors aged 16-17 to get tattoos with documented parental consent and supervision.</p>
          </div>
          
          <div>
            <h3 style="color: #b45309; font-size: 1.125rem; margin-bottom: 0.75rem;">When can you legally get a tattoo?</h3>
            <p style="color: #78350f; line-height: 1.7;">You can legally get a tattoo at <strong>18 years old</strong> nationwide without restrictions. Some states allow 16+ with parental consent.</p>
          </div>
          
          <div>
            <h3 style="color: #b45309; font-size: 1.125rem; margin-bottom: 0.75rem;">Tattoo age by state?</h3>
            <p style="color: #78350f; line-height: 1.7;">Tattoo age requirements vary from 16 to 18 years old depending on state laws. Use our <a href="tool.html" style="color: #b45309; font-weight: 600;">age checker tool</a> for your specific state.</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <a href="faq.html" style="display: inline-block; background: #d97706; color: white; padding: 1rem 2rem; border-radius: 6px; font-weight: 600; text-decoration: none;">View All 50+ FAQs →</a>
        </div>
      </div>
      
      <!-- Interlinking Section -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem; border-radius: 12px; text-align: center;">
        <h2 style="color: white; font-size: 2rem; margin-bottom: 1.5rem;">Explore More Legal Age Resources</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; max-width: 1000px; margin: 2rem auto;">
          
          <a href="piercing/index.html" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 8px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👂</div>
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Piercing Age Laws</h3>
            <p style="font-size: 0.9rem; opacity: 0.9;">50 states covered</p>
          </a>
          
          <a href="body-modification.html" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 8px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✨</div>
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Body Modification Laws</h3>
            <p style="font-size: 0.9rem; opacity: 0.9;">8 types explained</p>
          </a>
          
          <a href="tattoo-directory.html" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 8px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏪</div>
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Licensed Tattoo Parlors</h3>
            <p style="font-size: 0.9rem; opacity: 0.9;">240+ verified shops</p>
          </a>
          
          <a href="resources.html" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 8px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Legal Resources</h3>
            <p style="font-size: 0.9rem; opacity: 0.9;">Expert guidance</p>
          </a>
          
          <a href="map.html" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 8px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗺️</div>
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Interactive Map</h3>
            <p style="font-size: 0.9rem; opacity: 0.9;">Visual comparison</p>
          </a>
        </div>
      </div>
      
    </div>
  </section>
  
`;

// Find the FAQ section and insert SEO content before it
const faqIndex = html.indexOf('<!-- FAQ Section -->');
if (faqIndex > -1) {
    html = html.slice(0, faqIndex) + seoContentSection + html.slice(faqIndex);
    fs.writeFileSync(htmlPath, html);
    console.log('✅ Comprehensive SEO content added to homepage');
    console.log('✅ Content includes:');
    console.log('   - What age can you get a tattoo section');
    console.log('   - Tattoo age requirements by popular states');
    console.log('   - Parental consent guide');
    console.log('   - Minimum age requirements table');
    console.log('   - Common questions with keywords');
    console.log('   - Strong interlinking to inner pages');
} else {
    console.log('❌ Could not find FAQ section marker');
}
