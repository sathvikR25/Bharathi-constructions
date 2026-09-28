import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove onMouseMove from 0. ONBOARDING VIDEO HERO
content = re.sub(
    r'<section onMouseMove=\{.*?\}\s*style=\{\{ height: "100vh"',
    r'<section style={{ height: "100vh"',
    content,
    flags=re.DOTALL
)

# 2. Remove transform and simplify transition in heroMedia map
content = re.sub(
    r'transform: scale\(1\.05\) translate\(\$\{mousePos\.x\}px, \$\{mousePos\.y\}px\),\s*transition: "opacity 1\.5s ease-in-out, transform 0\.2s cubic-bezier\(0\.16, 1, 0\.3, 1\)",',
    r'transition: "opacity 1.5s ease-in-out",',
    content
)

# 3. Unhide 1. IMMERSIVE HERO
content = re.sub(
    r'\{\/\* 1\. IMMERSIVE HERO \*\/\}\s*\{false && \(\s*<section ref=\{heroSectionRef\}',
    r'{/* 1. IMMERSIVE HERO */}\n        <section ref={heroSectionRef}',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<\/section>\s*\)\}\s*\{\/\* 2\. THE VISION \*\/\}',
    r'</section>\n  \n        {/* 2. THE VISION */}',
    content,
    flags=re.DOTALL
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)