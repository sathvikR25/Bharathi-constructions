import os

replacements = {
    u'\u00e2\u20ac\u0153': '"',
    u'\u00e2\u20ac\x9d': '"',
    u'\u00e2\u20ac\u2122': "'",
    u'\u00e2\u20ac\u201c': "-",
    u'\u00e2\u20ac\u201d': "-",
    u'\u00c2\u00a0': " ",
    u'\u00c2': "",
    u'\u00e2\u20ac': ""
}

def fix_mojibake(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                for bad, good in replacements.items():
                    content = content.replace(bad, good)
                
                if content != original:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print('Fixed ' + path)

fix_mojibake('src')