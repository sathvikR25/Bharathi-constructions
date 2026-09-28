import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the text refs from GSAP timeline
content = re.sub(
    r'\.to\(textTopRef\.current, \{ y: "-150%", opacity: 0, ease: "power2\.inOut" \}, 0\)\s*\.to\(textBottomRef\.current, \{ y: "150%", opacity: 0, ease: "power2\.inOut" \}, 0\)',
    r'',
    content
)

# 2. Modify the IMMERSIVE HERO section
# Currently it has textTopRef and textBottomRef. We'll strip them out and align the pill to the bottom center.
old_hero = r'''<section ref=\{heroSectionRef\} style=\{\{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" \}\}>
            <div style=\{\{ position: "absolute", zIndex: 5, pointerEvents: "none", width: "100%", textAlign: "center"\}\}>
              <h1 ref=\{textTopRef\} style=\{\{ fontFamily: "Playfair Display, serif", fontSize: "clamp\(4rem, 12vw, 15rem\)", margin: 0, color: "\#123645", WebkitTextStroke: "2px \#123645", lineHeight: 0\.8, textTransform: "uppercase" \}\}>Bharathi</h1>
              <h1 ref=\{textBottomRef\} style=\{\{ fontFamily: "Playfair Display, serif", fontSize: "clamp\(2\.5rem, 8\.5vw, 15rem\)", margin: 0, color: "transparent", WebkitTextStroke: "3px \#c9a96e", lineHeight: 0\.8, fontStyle: "italic", textTransform: "uppercase" \}\}>Constructions</h1>
            </div>
            <div ref=\{heroImgWrapRef\} style=\{\{ position: "relative", zIndex: 1, width: "30vw", height: "40vh", borderRadius: "200px", overflow: "hidden", willChange: "transform, width, height, border-radius" \}\}>
              <img src="/horizon pics/BIRD_VIEW_FFFFFF\.jpg" alt="Horizon Skyline" style=\{\{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness\(0\.7\) contrast\(1\.1\)" \}\} />
            </div>
          </section>'''

new_hero = '''<section ref={heroSectionRef} style={{ height: "100vh", position: "relative", display: "flex", alignItems: "flex-end", paddingBottom: "10vh", justifyContent: "center", overflow: "hidden" }}>
            <div ref={heroImgWrapRef} style={{ position: "relative", zIndex: 1, width: "clamp(250px, 30vw, 400px)", height: "clamp(300px, 45vh, 600px)", borderRadius: "200px", overflow: "hidden", willChange: "width, height, border-radius" }}>
              <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon Skyline" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) contrast(1.1)" }} />
            </div>
          </section>'''

content = re.sub(old_hero, new_hero, content)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)