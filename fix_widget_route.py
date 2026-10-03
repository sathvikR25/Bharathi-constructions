import re

with open('src/components/WhatsAppWidget.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('startsWith("/admin")', 'startsWith("/adminnn")')

with open('src/components/WhatsAppWidget.jsx', 'w', encoding='utf-8') as f:
    f.write(content)