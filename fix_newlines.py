import re
with open('src/pages/admin/AdminShell.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('`n', '\n')
with open('src/pages/admin/AdminShell.jsx', 'w', encoding='utf-8') as f:
    f.write(content)