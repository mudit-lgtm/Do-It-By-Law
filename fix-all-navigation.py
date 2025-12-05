#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Standard navigation HTML
STANDARD_NAV = '''      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="tool.html">Age Checker</a></li>
        <li><a href="map.html">Interactive Map</a></li>
        <li><a href="search.html">Search</a></li>
        <li><a href="comparison.html">Compare</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="blog/index.html">Blog</a></li>
      </ul>'''

def fix_navigation(file_path, is_state_page=False, is_blog=False, is_guide=False):
    """Fix navigation in a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Adjust paths for subdirectories
        nav = STANDARD_NAV
        if is_blog or is_guide:
            nav = nav.replace('href="', 'href="../')
            nav = nav.replace('href="../index.html"', 'href="../index.html"')  # Already correct
            nav = nav.replace('href="../blog/index.html"', 'href="index.html"' if is_blog else 'href="../blog/index.html"')
        
        # Find and replace nav-links ul section
        pattern = r'<ul class="nav-links">.*?</ul>'
        if re.search(pattern, content, re.DOTALL):
            new_content = re.sub(pattern, nav, content, flags=re.DOTALL)
            
            # Write back only if changed
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True
    except Exception as e:
        print(f"Error fixing {file_path}: {e}")
    return False

# Fix all HTML files
fixed_count = 0

# Root level pages
for html_file in Path('.').glob('*.html'):
    if html_file.name not in ['state-grid-snippet.html']:
        if fix_navigation(html_file):
            fixed_count += 1
            print(f"✓ Fixed: {html_file.name}")

# Blog pages
blog_dir = Path('blog')
if blog_dir.exists():
    for html_file in blog_dir.glob('*.html'):
        if fix_navigation(html_file, is_blog=True):
            fixed_count += 1
            print(f"✓ Fixed: blog/{html_file.name}")

# Guide pages
guides_dir = Path('guides')
if guides_dir.exists():
    for html_file in guides_dir.glob('*.html'):
        if fix_navigation(html_file, is_guide=True):
            fixed_count += 1
            print(f"✓ Fixed: guides/{html_file.name}")

print(f"\n✅ Total files updated: {fixed_count}")
