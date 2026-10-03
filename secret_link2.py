import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to target the specific span in the footer.
# Let's find the footer row first.
footer_marker = 'paddingBottom: "3rem",'
if footer_marker in content:
    parts = content.split(footer_marker)
    footer_part = parts[1]
    
    # In footer_part, replace the first span
    span_pattern = re.compile(r'<span.*?</span>', re.DOTALL)
    
    replacement = r'''<Link to="/admin" onClick={() => setNavOpen(false)} style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none", cursor: "default" }} title="Admin">
              &copy; 2026 Bharathi Constructions
            </Link>'''
            
    new_footer_part = span_pattern.sub(replacement, footer_part, count=1)
    
    content = parts[0] + footer_marker + new_footer_part

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)