import re

with open('src/pages/ProjectLakeWoods.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import BrochureDownloadButton from "../components/BrochureDownloadButton";', 'import BrochureDownloadButton from "../components/BrochureDownloadButton";\nimport ConstructionUpdates from "../components/ConstructionUpdates";')

with open('src/pages/ProjectLakeWoods.jsx', 'w', encoding='utf-8') as f:
    f.write(content)