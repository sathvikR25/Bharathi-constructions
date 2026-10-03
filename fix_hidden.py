import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_div = '<div className="md:hidden" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>'
new_div = '<div className="flex md:hidden items-center gap-[1.5rem]">'

if old_div in content:
    content = content.replace(old_div, new_div)
    with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully.")
else:
    print("Not found.")