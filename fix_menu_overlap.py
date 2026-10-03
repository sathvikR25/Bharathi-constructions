import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the bottom padding on the right panel to push the footer above the widget
content = content.replace('padding: "8rem 5rem 3rem",', 'padding: "8rem 5rem 6rem",')
content = content.replace('padding: 7rem 2rem 3rem !important;', 'padding: 7rem 2rem 6rem !important;')
content = content.replace('padding: 6rem 1.5rem 2rem !important;', 'padding: 6rem 1.5rem 6rem !important;')

# 2. As an extra precaution, let's also add a margin-right to the icons container so it doesn't touch the right edge
# The div holding the icons is: <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
# There is only one matching this exactly in the footer.
content = content.replace('<div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>', '<div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginRight: "clamp(0rem, 10vw, 2rem)" }}>')

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)