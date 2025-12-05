#!/usr/bin/env python3
import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Read state grid snippet
with open('state-grid-snippet.html', 'r', encoding='utf-8') as f:
    state_grid_html = f.read()

# Find the state-grid div section in index.html
# Pattern: <div class="state-grid"> ... </div> (closing the state-grid div)
pattern = r'(<div class="state-grid">)(.*?)(</div>\s*</div>\s*</section>)'

# Extract just the article cards from state-grid-snippet
articles_match = re.search(r'<div class="state-grid">(.*?)</div>', state_grid_html, re.DOTALL)
if articles_match:
    new_articles = articles_match.group(1)
    # Replace the content in index.html
    replacement = r'\1' + new_articles + r'\3'
    new_index_html = re.sub(pattern, replacement, index_html, flags=re.DOTALL)
    
    # Write back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_index_html)
    
    # Count state cards
    count = new_index_html.count('state-card')
    print(f'✓ Updated index.html with {count} state cards')
else:
    print('✗ Could not extract articles from state-grid-snippet.html')

