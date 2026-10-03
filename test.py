import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the copyright text span with a Link to /admin
old_copyright = r'''<span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
               2026 Bharathi Constructions
            </span>'''

# Note: The copyright symbol might be mangled in Python script output. Let's use a regex instead.