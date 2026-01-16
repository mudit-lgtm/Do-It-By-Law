#!/bin/bash

# Fix content alignment issues in hub pages
echo "🔧 Fixing content alignment in hub pages..."

for file in strictest-tattoo-age-laws.html most-lenient-tattoo-age-laws.html states-allowing-16-year-olds.html; do
  if [ -f "$file" ]; then
    # Check if content needs to be wrapped
    if ! grep -q 'class="content-wrapper"\|class="main-content"' "$file"; then
      echo "  ⚠️  $file needs content wrapper - adding max-width container"
      
      # Add style for content centering
      if ! grep -q "max-width: 1200px" "$file"; then
        sed -i '/<link rel="stylesheet" href="css\/main.css">/a\  <style>\n    .content-wrapper { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }\n    .page-section { margin: 2rem 0; }\n  </style>' "$file"
      fi
      
      echo "  ✅ Added content wrapper styles to $file"
    else
      echo "  ✓ $file already has content wrapper"
    fi
  fi
done

echo ""
echo "✅ Content alignment fixes complete"
