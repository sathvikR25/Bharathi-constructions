import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add heroSliderRef declaration
content = re.sub(
    r'const mainRef = useRef\(null\);',
    r'const mainRef = useRef(null);\n  const heroSliderRef = useRef(null);',
    content
)

# 2. Add ref to 0. ONBOARDING VIDEO HERO and change position back to relative
content = re.sub(
    r'\{\/\* 0\. ONBOARDING VIDEO HERO \*\/\}\s*<section style=\{\{ height: "100vh", position: "sticky", top: 0, zIndex: 0, display: "flex",',
    r'{/* 0. ONBOARDING VIDEO HERO */}\n        <section ref={heroSliderRef} style={{ height: "100vh", position: "relative", zIndex: 0, display: "flex",',
    content
)

# 3. Insert GSAP pin logic in useEffect
gsap_logic = r'''// Hero Pinned Overlay Effect
        ScrollTrigger.create({
          trigger: heroSliderRef.current,
          start: "top top",
          end: "+=100%", 
          pin: true,
          pinSpacing: false
        });

        // Arch Reveal Animation'''

content = re.sub(
    r'// Arch Reveal Animation',
    gsap_logic,
    content
)

# 4. Refine the curve in 2. THE VISION to match Sobha exactly (50% 150px)
content = re.sub(
    r'borderTopLeftRadius: "50% 15vh", borderTopRightRadius: "50% 15vh", marginTop: "-5vh"',
    r'borderTopLeftRadius: "50% 150px", borderTopRightRadius: "50% 150px", marginTop: "0"',
    content
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)