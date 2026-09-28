import os
import re

replacements = [
    {
        'file': 'src/components/MenuOverlay.jsx',
        'old': 'sub: "The Sanctuary"',
        'new': 'sub: "The Residence"'
    },
    {
        'file': 'src/pages/Home.jsx',
        'old': 'generational sanctuaries.',
        'new': 'generational residences.'
    },
    {
        'file': 'src/pages/Legacy.jsx',
        'old': 'It is a sanctuary that holds',
        'new': 'It is a residence that holds'
    },
    {
        'file': 'src/pages/ProjectHorizon.jsx',
        'old': 'text="Secure Your Sanctuary."',
        'new': 'text="Secure Your Residence."'
    },
    {
        'file': 'src/pages/ProjectLakeWoods.jsx',
        'old': 'text="Secure Your Sanctuary."',
        'new': 'text="Secure Your Residence."'
    }
]

for item in replacements:
    filepath = item['file']
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace(item['old'], item['new'])
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)