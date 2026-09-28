import os

files_to_update = [
    'src/pages/Home.jsx',
    'src/pages/ProjectHorizon.jsx',
    'src/pages/ProjectLakeWoods.jsx',
    'src/pages/Legacy.jsx'
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace <Header theme="light" ... /> with <Header theme="light" transparentTheme="dark" ... />
        content = content.replace('<Header theme="light" navOpen={navOpen}', '<Header theme="light" transparentTheme="dark" navOpen={navOpen}')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            