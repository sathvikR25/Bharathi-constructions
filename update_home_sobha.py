import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove 1. IMMERSIVE HERO DOM
content = re.sub(
    r'\{\/\* 1\. IMMERSIVE HERO \*\/\}.*?<\/section>',
    r'',
    content,
    flags=re.DOTALL
)

# 2. Remove tlHero GSAP logic
content = re.sub(
    r'// 1\. Hero Pinned Expansion.*?tlHero\.to\(heroImgWrapRef\.current, \{ width: "100vw", height: "100vh", borderRadius: "0px", ease: "power2\.inOut" \}, 0\)\s*;',
    r'// 1. (Removed Immersive Hero Animation)',
    content,
    flags=re.DOTALL
)

# 3. Modify 0. ONBOARDING VIDEO HERO to be sticky
content = re.sub(
    r'style=\{\{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "\#050505", perspective: "1000px" \}\}',
    r'style={{ height: "100vh", position: "sticky", top: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050505", perspective: "1000px" }}',
    content
)

# 4. Modify 2. THE VISION to have the curved reveal
# First, add the ref to the section
content = re.sub(
    r'\{\/\* 2\. THE VISION \*\/\}\s*<section style=\{\{ padding: "clamp\(6rem,15vw,15rem\) clamp\(1\.5rem, 5vw, 4rem\)", background: "transparent", color: "\#123645" \}\}>',
    r'{/* 2. THE VISION */}\n        <section ref={visionSectionRef} style={{ position: "relative", zIndex: 10, padding: "clamp(6rem,15vw,15rem) clamp(1.5rem, 5vw, 4rem)", background: "#fdfbf7", color: "#123645", borderTopLeftRadius: "50% 15vh", borderTopRightRadius: "50% 15vh", marginTop: "-5vh", boxShadow: "0 -20px 50px rgba(0,0,0,0.15)" }}>',
    content
)

# 5. Add GSAP logic for the curved reveal
# We need to insert it right before // 2. The Vision (Text Reveal)
curve_animation = r'''// Arch Reveal Animation
        gsap.to(visionSectionRef.current, {
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          scrollTrigger: {
            trigger: visionSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        });
        
        // 2. The Vision'''

content = re.sub(
    r'// 2\. The Vision',
    curve_animation,
    content
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)