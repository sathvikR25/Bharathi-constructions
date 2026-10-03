import re

with open('src/components/WhatsAppWidget.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace bottom-8 with bottom-[38px] for the desktop widget
old_class = 'className="hidden md:flex fixed bottom-8 right-8'
new_class = 'className="hidden md:flex fixed bottom-[38px] right-8'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open('src/components/WhatsAppWidget.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully.")
else:
    print("Class not found.")