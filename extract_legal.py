import re

def extract_content(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract everything inside the main text container
    match = re.search(r'<div style=\{\{\s*fontSize:\s*"1rem".*?\}\}>(.*?)</div>\s*</main>', content, re.DOTALL)
    if match:
        html = match.group(1).strip()
        # Clean up React style objects and replace with plain HTML tags if needed,
        # but honestly we can just extract the inner text and convert to simple HTML
        html = re.sub(r'style=\{\{.*?\}\}', '', html)
        html = re.sub(r'className=".*?"', '', html)
        # Fix self-closing tags or weird formatting
        return html
    return "Content not found"

policy = extract_content('old_policy.txt')
terms = extract_content('old_terms.txt')

with open('extracted_policy.txt', 'w', encoding='utf-8') as f:
    f.write(policy)
    
with open('extracted_terms.txt', 'w', encoding='utf-8') as f:
    f.write(terms)