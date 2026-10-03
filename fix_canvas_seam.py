import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = r'''      // Black = cutouts/gaps
      ctx.fillStyle = "\#000000";
      const numGaps = 4;
      for \(let i = 0; i < numGaps; i\+\+\) \{
        const yCenter = 220 \+ \(i \* 190\); 
        ctx.beginPath\(\);
        // Forward path \(top edge of the gap\)
        for \(let x = 0; x <= 1024; x \+= 10\) \{
          const wave = Math.sin\(x \* 0\.006 \+ i \* 0\.9\) \* \(30 \+ i \* 5\) \+ Math.cos\(x \* 0\.01\) \* 15;
          // The thickness varies along the X axis giving that hand-drawn logo feel
          const thickness = 18 \+ Math.sin\(x \* 0\.004 \+ i\) \* 12; 
          const y = yCenter \+ wave;
          if \(x === 0\) ctx.moveTo\(x, y - thickness\); 
          else ctx.lineTo\(x, y - thickness\);
        \}
        // Backward path \(bottom edge of the gap\)
        for \(let x = 1024; x >= 0; x -= 10\) \{
          const wave = Math.sin\(x \* 0\.006 \+ i \* 0\.9\) \* \(30 \+ i \* 5\) \+ Math.cos\(x \* 0\.01\) \* 15;
          const thickness = 18 \+ Math.sin\(x \* 0\.004 \+ i\) \* 12;
          const y = yCenter \+ wave;
          ctx.lineTo\(x, y \+ thickness\);
        \}
        ctx.fill\(\);
      \}'''

new_block = '''      // Black = cutouts/gaps
      ctx.fillStyle = "#000000";
      const numGaps = 4;
      const w = (Math.PI * 2) / 1024; // exact frequency for seamless 1024px wrap
      for (let i = 0; i < numGaps; i++) {
        const yCenter = 220 + (i * 190); 
        ctx.beginPath();
        // Forward path (top edge of the gap)
        for (let x = 0; x <= 1024; x += 16) {
          const wave = Math.sin(x * w * 1 + i * 0.9) * (30 + i * 5) + Math.cos(x * w * 2) * 15;
          const thickness = 18 + Math.sin(x * w * 1 + i) * 12; 
          const y = yCenter + wave;
          if (x === 0) ctx.moveTo(x, y - thickness); 
          else ctx.lineTo(x, y - thickness);
        }
        // Backward path (bottom edge of the gap)
        for (let x = 1024; x >= 0; x -= 16) {
          const wave = Math.sin(x * w * 1 + i * 0.9) * (30 + i * 5) + Math.cos(x * w * 2) * 15;
          const thickness = 18 + Math.sin(x * w * 1 + i) * 12;
          const y = yCenter + wave;
          ctx.lineTo(x, y + thickness);
        }
        ctx.fill();
      }'''

content = re.sub(old_block, new_block, content)

with open('src/components/Background3D.jsx', 'w', encoding='utf-8') as f:
    f.write(content)