const fs = require('fs');
const glob = require('glob');

console.log('========== COMPREHENSIVE PAGE VALIDATION ==========\n');

const files = glob.sync('**/*.html', {
  ignore: ['node_modules/**', 'dist/**', '.wrangler/**']
});

console.log(`Validating ${files.length} HTML files...\n`);

const issues = {
  multipleH1: [],
  noH1: [],
  missingTitle: [],
  titleH1Mismatch: [],
  invalidSchema: [],
  brokenLinks: [],
  placeholders: [],
  noAuthorityLinks: []
};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check H1 count
  const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    issues.noH1.push(file);
  } else if (h1Matches.length > 1) {
    issues.multipleH1.push(`${file} (${h1Matches.length} H1s)`);
  }
  
  // Check title tag
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) {
    issues.missingTitle.push(file);
  }
  
  // Check for placeholder text
  const placeholders = ['lorem ipsum', 'TODO', 'PLACEHOLDER', 'due to length'];
  placeholders.forEach(placeholder => {
    if (content.toLowerCase().includes(placeholder.toLowerCase())) {
      issues.placeholders.push(`${file} - "${placeholder}"`);
    }
  });
  
  // Check for broken internal links (basic check)
  const linkMatches = content.match(/href="([^"]*\.html)"/g) || [];
  linkMatches.forEach(link => {
    const href = link.match(/href="([^"]*)"/)[1];
    if (!href.startsWith('http') && !href.startsWith('//')) {
      const linkPath = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
      if (!fs.existsSync(linkPath) && !linkPath.startsWith('#')) {
        issues.brokenLinks.push(`${file} -> ${href}`);
      }
    }
  });
  
  // Check for invalid JSON-LD
  const schemaMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  schemaMatches.forEach(schema => {
    try {
      const jsonStr = schema.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      JSON.parse(jsonStr);
    } catch (e) {
      issues.invalidSchema.push(`${file} - ${e.message}`);
    }
  });
  
  // Check state pages for authority links
  if (file.startsWith('states/') && file.endsWith('.html')) {
    const hasJustia = content.includes('law.justia') || content.includes('legis');
    const hasHealthDept = content.includes('health.') || content.includes('publichealth');
    if (!hasJustia && !hasHealthDept) {
      issues.noAuthorityLinks.push(file);
    }
  }
});

// Print results
console.log('=== VALIDATION RESULTS ===\n');

if (issues.multipleH1.length > 0) {
  console.log(`❌ Multiple H1 tags (${issues.multipleH1.length} files):`);
  issues.multipleH1.slice(0, 5).forEach(f => console.log(`   - ${f}`));
  if (issues.multipleH1.length > 5) console.log(`   ... and ${issues.multipleH1.length - 5} more`);
  console.log('');
}

if (issues.noH1.length > 0) {
  console.log(`⚠️  No H1 tag (${issues.noH1.length} files):`);
  issues.noH1.slice(0, 5).forEach(f => console.log(`   - ${f}`));
  if (issues.noH1.length > 5) console.log(`   ... and ${issues.noH1.length - 5} more`);
  console.log('');
}

if (issues.missingTitle.length > 0) {
  console.log(`❌ Missing <title> tag (${issues.missingTitle.length} files):`);
  issues.missingTitle.forEach(f => console.log(`   - ${f}`));
  console.log('');
}

if (issues.placeholders.length > 0) {
  console.log(`⚠️  Placeholder text found (${issues.placeholders.length} instances):`);
  issues.placeholders.slice(0, 5).forEach(f => console.log(`   - ${f}`));
  if (issues.placeholders.length > 5) console.log(`   ... and ${issues.placeholders.length - 5} more`);
  console.log('');
}

if (issues.invalidSchema.length > 0) {
  console.log(`❌ Invalid JSON-LD schema (${issues.invalidSchema.length} files):`);
  issues.invalidSchema.forEach(f => console.log(`   - ${f}`));
  console.log('');
}

if (issues.brokenLinks.length > 0) {
  console.log(`⚠️  Potentially broken internal links (${issues.brokenLinks.length} links):`);
  issues.brokenLinks.slice(0, 10).forEach(f => console.log(`   - ${f}`));
  if (issues.brokenLinks.length > 10) console.log(`   ... and ${issues.brokenLinks.length - 10} more`);
  console.log('');
}

if (issues.noAuthorityLinks.length > 0) {
  console.log(`⚠️  State pages without authority links (${issues.noAuthorityLinks.length} files):`);
  issues.noAuthorityLinks.slice(0, 5).forEach(f => console.log(`   - ${f}`));
  if (issues.noAuthorityLinks.length > 5) console.log(`   ... and ${issues.noAuthorityLinks.length - 5} more`);
  console.log('');
}

// Summary
const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);

if (totalIssues === 0) {
  console.log('✅ All pages passed validation!');
} else {
  console.log(`\n📊 Total issues found: ${totalIssues}`);
  console.log(`   Critical (❌): ${issues.missingTitle.length + issues.invalidSchema.length}`);
  console.log(`   Warnings (⚠️): ${totalIssues - issues.missingTitle.length - issues.invalidSchema.length}`);
}

console.log('\n========== VALIDATION COMPLETE ==========');
