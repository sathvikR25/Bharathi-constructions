import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change 6rem to 8rem for desktop
content = content.replace('padding: "8rem 5rem 6rem",', 'padding: "8rem 5rem 8rem",')

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)