#!/bin/bash

# Create age 16 page (copy from 15 and modify)
sed 's/at 15/at 16/g; s/15-year-old/16-year-old/g; s/age 15/age 16/g; s/Age 15/Age 16/g' can-you-get-tattoo-at-15.html > can-you-get-tattoo-at-16.html

# Update title and meta for age 16
sed -i 's/Can You Get a Tattoo at 15/Can You Get a Tattoo at 16/g' can-you-get-tattoo-at-16.html
sed -i 's/can-you-get-tattoo-at-15\.html/can-you-get-tattoo-at-16.html/g' can-you-get-tattoo-at-16.html
sed -i 's/og-tattoo-age-15\.jpg/og-tattoo-age-16.jpg/g' can-you-get-tattoo-at-16.html

# Update the answer badge for age 16 (YES in some states)
sed -i 's/<div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.5rem;">❌ NO<\/div>/<div style="font-size: 3rem; font-weight: bold; margin-bottom: 0.5rem;">✅ YES<\/div>/' can-you-get-tattoo-at-16.html
sed -i 's/Cosmetic Tattoos Not Legal at Age 16/In 10 States with Parental Consent/' can-you-get-tattoo-at-16.html
sed -i 's/background: linear-gradient(135deg, #f5576c 0%, #c62828 100%);/background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);/' can-you-get-tattoo-at-16.html | head -1

# Update executive summary for age 16
sed -i 's/<strong>No US state<\/strong> currently allows cosmetic tattoos for 16-year-olds/<strong>10 US states<\/strong> allow cosmetic tattoos for 16-year-olds with parental consent/' can-you-get-tattoo-at-16.html
sed -i 's/The minimum age for cosmetic tattoos ranges from <strong>16 to 18 years<\/strong>/States like Alabama, Arkansas, Colorado, Connecticut, Indiana, Kansas, Louisiana, Mississippi, Montana, and Ohio permit tattoos at <strong>age 16 with documented parental consent and presence<\/strong>/' can-you-get-tattoo-at-16.html

# Create age 17 page
sed 's/at 16/at 17/g; s/16-year-old/17-year-old/g; s/age 16/age 17/g; s/Age 16/Age 17/g' can-you-get-tattoo-at-16.html > can-you-get-tattoo-at-17.html

# Update specific content for age 17
sed -i 's/can-you-get-tattoo-at-16\.html/can-you-get-tattoo-at-17.html/g' can-you-get-tattoo-at-17.html
sed -i 's/og-tattoo-age-16\.jpg/og-tattoo-age-17.jpg/g' can-you-get-tattoo-at-17.html
sed -i 's/<strong>10 US states<\/strong>/<strong>19 US states<\/strong>/' can-you-get-tattoo-at-17.html
sed -i 's/In 10 States with Parental Consent/In 19 States with Parental Consent/' can-you-get-tattoo-at-17.html

echo "✅ Created age-specific pages: 15, 16, 17"
