import os

files_to_update = [
    'src/pages/Policy.jsx',
    'src/pages/Terms.jsx'
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace <Header theme="light" ... /> with <Header theme="light" transparentTheme="light" ... />
        content = content.replace('<Header theme="light" navOpen={navOpen}', '<Header theme="light" transparentTheme="light" navOpen={navOpen}')
        content = content.replace('<Header />', '<Header theme="light" transparentTheme="light" />')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)