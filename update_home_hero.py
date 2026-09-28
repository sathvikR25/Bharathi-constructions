import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add isMuted state
content = re.sub(
    r'const \[currentSlide, setCurrentSlide\] = useState\(0\);',
    r'const [currentSlide, setCurrentSlide] = useState(0);\n  const [isMuted, setIsMuted] = useState(true);',
    content
)

# 2. Fix opacity from 0.65 to 1
content = re.sub(
    r'opacity: isActive \? 0\.65 : 0',
    r'opacity: isActive ? 1 : 0',
    content
)

# 3. Add muted state to video tag
content = re.sub(
    r'<video id=\{hero-video-\$\{index\}\} key=\{index\} src=\{media\.url\} autoPlay loop=\{heroMedia\.length === 1\} muted playsInline',
    r'<video id={hero-video-} key={index} src={media.url} autoPlay loop={heroMedia.length === 1} muted={isMuted} playsInline',
    content
)

# 4. Lighten the vignette overlay
content = re.sub(
    r'background: "radial-gradient\(circle at center, transparent 0%, rgba\(0,0,0,0\.8\) 100%\)"',
    r'background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)"',
    content
)

# 5. Add Volume toggle button
audio_button = '''          {/* AUDIO TOGGLE */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            className="absolute left-4 md:left-8 bottom-8 md:bottom-12 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all backdrop-blur-md cursor-pointer"
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          {/* SLIDER NAVIGATION ARROWS */}'''

content = re.sub(
    r'\{\/\* SLIDER NAVIGATION ARROWS \*\/\}',
    audio_button,
    content
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)