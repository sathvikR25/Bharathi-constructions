import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('path="/admin"', 'path="/adminnn"')
content = content.replace('to="/admin"', 'to="/adminnn"') # In case there's any redirects

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)