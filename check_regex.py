import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace the WavyHorizonLogo function entirely.
# Let's find the function block.
pattern = re.compile(r'function WavyHorizonLogo\(\{.*?\}\, \[\]\);\n\n  const meshRef = useRef\(\);.*?return \(\n.*?<group ref=\{groupRef\} position=\{\[0, -4, -12\]\}>\n.*?<WavyHorizonLogo isLight=\{isLight\} position=\{\[0, 5, 4\]\} />\n.*?</group>\n  \);\n\}', re.DOTALL)

# Wait, the component is named WavyHorizonLogo and inside it returns another WavyHorizonLogo?
# Let's check the code block again.