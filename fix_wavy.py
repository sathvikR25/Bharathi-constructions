import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Using regex to find the function block
pattern = re.compile(r'function WavyHorizonLogo\(\{ isLight, position = \[2, -1, -8\] \}\) \{.*?\},\s*\[\]\);', re.DOTALL)

new_func = '''function WavyHorizonLogo({ isLight, position = [2, -1, -8] }) {
  const alphaMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = "#000000";
    const numGaps = 4;
    const w = (Math.PI * 2) / 1024;
    
    for (let i = 0; i < numGaps; i++) {
      const yCenter = 220 + (i * 190); 
      ctx.beginPath();
      for (let x = 0; x <= 1024; x += 16) {
        const wave = Math.sin(x * w * 1 + i * 0.9) * (30 + i * 5) + Math.cos(x * w * 2) * 15;
        const thickness = 18 + Math.sin(x * w * 1 + i) * 12; 
        const y = yCenter + wave;
        if (x === 0) ctx.moveTo(x, y - thickness); 
        else ctx.lineTo(x, y - thickness);
      }
      for (let x = 1024; x >= 0; x -= 16) {
        const wave = Math.sin(x * w * 1 + i * 0.9) * (30 + i * 5) + Math.cos(x * w * 2) * 15;
        const thickness = 18 + Math.sin(x * w * 1 + i) * 12;
        const y = yCenter + wave;
        ctx.lineTo(x, y + thickness);
      }
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);'''

content = pattern.sub(new_func, content)

with open('src/components/Background3D.jsx', 'w', encoding='utf-8') as f:
    f.write(content)