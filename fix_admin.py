import re

with open('src/pages/admin/ConstructionManager.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("className={ + '' + px-6 py-2 rounded-xl font-medium transition-colors  + '' + }", "className={px-6 py-2 rounded-xl font-medium transition-colors }")
content = content.replace("className={ + '' + px-6 py-2 rounded-xl font-medium transition-colors  + '' + }", "className={px-6 py-2 rounded-xl font-medium transition-colors }")

with open('src/pages/admin/ConstructionManager.jsx', 'w', encoding='utf-8') as f:
    f.write(content)