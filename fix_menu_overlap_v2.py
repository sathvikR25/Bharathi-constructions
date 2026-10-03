import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add paddingBottom to the footer row to defeat the overflow-y quirk
content = content.replace('marginTop: "2rem", flexWrap: "wrap", gap: "1rem",', 'marginTop: "2rem", flexWrap: "wrap", gap: "1rem", paddingBottom: "8rem",')

# Fix 2: Increase marginRight of the social icons dramatically on desktop to avoid the right corner entirely
old_icons = '<div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginRight: "clamp(0rem, 10vw, 2rem)" }}>'
new_icons = '<div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginRight: "clamp(1rem, 25vw, 18rem)" }}>'

if old_icons in content:
    content = content.replace(old_icons, new_icons)
else:
    # Just in case my previous replace failed or format changed
    content = content.replace('<div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>', new_icons)

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)