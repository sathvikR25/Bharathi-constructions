import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the inside of alphaMap useMemo in WavyHorizonLogo
old_code = r'''    ctx.fillStyle = "#ffffff";
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
    }'''

new_code = r'''    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = "#000000";
    const w = (Math.PI * 2) / 1024;
    
    const gaps = [
      { yCenter: 240, tilt: 35, amp: 45, thickness: 15 },
      { yCenter: 380, tilt: 45, amp: 10, thickness: 17 },
      { yCenter: 520, tilt: 45, amp: 45, thickness: 17 },
      { yCenter: 660, tilt: 40, amp: 15, thickness: 15 },
      { yCenter: 800, tilt: 25, amp: 35, thickness: 14 }
    ];
    
    for (let i = 0; i < gaps.length; i++) {
      const g = gaps[i];
      ctx.beginPath();
      // Forward path (top edge)
      for (let x = 0; x <= 1024; x += 16) {
        // -tilt * sin(x*w) creates the diagonal angle (high left, low right)
        // amp * cos(x*w*2) creates the central dip
        const wave = -g.tilt * Math.sin(x * w) + g.amp * Math.cos(x * w * 2);
        const y = g.yCenter + wave;
        if (x === 0) ctx.moveTo(x, y - g.thickness); 
        else ctx.lineTo(x, y - g.thickness);
      }
      // Backward path (bottom edge)
      for (let x = 1024; x >= 0; x -= 16) {
        const wave = -g.tilt * Math.sin(x * w) + g.amp * Math.cos(x * w * 2);
        const y = g.yCenter + wave;
        ctx.lineTo(x, y + g.thickness);
      }
      ctx.fill();
    }'''

if old_code in content:
    content = content.replace(old_code, new_code)
    with open('src/components/Background3D.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully.")
else:
    print("Old code not found.")