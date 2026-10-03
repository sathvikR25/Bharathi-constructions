import re

with open('src/pages/admin/ConstructionManager.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const storageRef = ref(storage,  + '' + construction_updates/_ + '' + );", "const storageRef = ref(storage, 'construction_updates/' + Date.now() + '_' + newUpdate.imageFile.name);")

with open('src/pages/admin/ConstructionManager.jsx', 'w', encoding='utf-8') as f:
    f.write(content)