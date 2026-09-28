import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add a slight scale-down and darken effect to the hero slider as the next section rolls over it
gsap_logic_old = r'''// Hero Pinned Overlay Effect
        ScrollTrigger.create\(\{
          trigger: heroSliderRef.current,
          start: "top top",
          end: "\+=100%", 
          pin: true,
          pinSpacing: false
        \}\);'''

gsap_logic_new = '''// Hero Pinned Overlay Effect
        ScrollTrigger.create({
          trigger: heroSliderRef.current,
          start: "top top",
          end: "+=100%", 
          pin: true,
          pinSpacing: false,
          animation: gsap.to(heroSliderRef.current, {
            scale: 0.95,
            opacity: 0.5,
            ease: "none"
          }),
          scrub: true
        });'''

content = re.sub(gsap_logic_old, gsap_logic_new, content)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)