import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<span style={{ fontSize: "0\.65rem".*?}}>.*?2026 Bharathi Constructions\s*</span>', re.DOTALL)

replacement = r'''<Link to="/admin" onClick={() => setNavOpen(false)} style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none", cursor: "default" }} title="">
              &copy; 2026 Bharathi Constructions
            </Link>'''

content = pattern.sub(replacement, content)

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)