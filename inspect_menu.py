import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's extract the left panel phone section and the right panel footer section
left_phone = re.search(r'(<div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba\(255,255,255,0\.06\)".*?</div>\s*</div>)', content, re.DOTALL)
if left_phone:
    print("--- LEFT PHONE ---")
    print(left_phone.group(1))

right_footer = re.search(r'({\/\* Footer row \*\/}.*?</div>\s*</div>)', content, re.DOTALL)
if right_footer:
    print("--- RIGHT FOOTER ---")
    print(right_footer.group(1))