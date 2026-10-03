import re
import os

def replace_in_file(filepath, old_str, new_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Replaced in {filepath}")

# App.jsx replacements
replace_in_file('src/App.jsx', 'path="/admin/*"', 'path="/adminnn/*"')
replace_in_file('src/App.jsx', "startsWith('/admin')", "startsWith('/adminnn')")

# AdminShell.jsx replacements
admin_shell_path = 'src/pages/admin/AdminShell.jsx'
with open(admin_shell_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("pathname === '/admin'", "pathname === '/adminnn'")
content = content.replace("pathname === '/admin/'", "pathname === '/adminnn/'")
content = content.replace("navigate('/admin/dashboard'", "navigate('/adminnn/dashboard'")
content = content.replace("navigate('/admin'", "navigate('/adminnn'")
content = content.replace("path: '/admin/", "path: '/adminnn/")

with open(admin_shell_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Replaced strings in {admin_shell_path}")