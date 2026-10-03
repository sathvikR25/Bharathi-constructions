import re

with open('src/pages/ProjectHorizon.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import BrochureDownloadButton from "../components/BrochureDownloadButton";', 'import BrochureDownloadButton from "../components/BrochureDownloadButton";\nimport ConstructionUpdates from "../components/ConstructionUpdates";')
content = content.replace('{/* COMPREHENSIVE PROJECT FOOTER */}', '<ConstructionUpdates project="horizon" />\n\n      {/* COMPREHENSIVE PROJECT FOOTER */}')

with open('src/pages/ProjectHorizon.jsx', 'w', encoding='utf-8') as f:
    f.write(content)