#!/bin/bash

# Update all HTML files to:
# 1. Remove FAQ from header
# 2. Add Consent Form to header
# 3. Update footer with proper menu structure

for file in *.html states/*.html piercing/*.html blog/*.html guides/*.html 2>/dev/null; do
  if [ -f "$file" ]; then
    # Remove FAQ link from nav-menu if it exists
    sed -i 's/<li><a href="[^"]*faq.html"[^>]*>FAQ<\/a><\/li>//g' "$file"
    
    # Add consent-form.html if not present in navigation
    if ! grep -q "consent-form.html" "$file"; then
      sed -i 's/<li><a href="\([^"]*\)tattoo-directory.html"/<li><a href="\1consent-form.html">Consent Form<\/a><\/li>\n        <li><a href="\1tattoo-directory.html"/g' "$file"
    fi
  fi
done

echo "✓ Navigation updated across all pages"
