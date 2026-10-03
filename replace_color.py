import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('color={isLight ? "#e87c48" : "#e87c48"}', 'color={isLight ? "#a66d42" : "#a66d42"}')

with open('src/components/Background3D.jsx', 'w', encoding='utf-8') as f:
    f.write(content)