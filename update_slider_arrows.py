import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Slider Navigation Arrows (Remove circles, increase arrow size)
old_arrows = r'''          \{\/\* SLIDER NAVIGATION ARROWS \*\/\}\s*\{heroMedia\.length > 1 && \(\s*<>\s*<button \s*onClick=\{\(\) => setCurrentSlide\(prev => \(prev === 0 \? heroMedia\.length - 1 : prev - 1\)\)\}\s*className="hero-onboarding-text absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white transition-all backdrop-blur-md cursor-pointer group"\s*>\s*<ChevronLeft size=\{24\} className="group-hover:-translate-x-1 transition-transform" />\s*</button>\s*<button \s*onClick=\{\(\) => setCurrentSlide\(prev => \(prev \+ 1\) % heroMedia\.length\)\}\s*className="hero-onboarding-text absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white transition-all backdrop-blur-md cursor-pointer group"\s*>\s*<ChevronRight size=\{24\} className="group-hover:translate-x-1 transition-transform" />\s*</button>\s*</>\s*\)\}'''

new_arrows = r'''          {/* SLIDER NAVIGATION ARROWS */}
          {heroMedia.length > 1 && (
            <>
              <button 
                onClick={() => setCurrentSlide(prev => (prev === 0 ? heroMedia.length - 1 : prev - 1))}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-all cursor-pointer group"
              >
                <ChevronLeft size={48} className="group-hover:-translate-x-2 transition-transform drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
              </button>
              <button 
                onClick={() => setCurrentSlide(prev => (prev + 1) % heroMedia.length)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-all cursor-pointer group"
              >
                <ChevronRight size={48} className="group-hover:translate-x-2 transition-transform drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
              </button>
            </>
          )}'''

content = re.sub(old_arrows, new_arrows, content)

# 2. Also remove circles from Audio Toggle for consistency
old_audio = r'''          \{\/\* AUDIO TOGGLE \*\/\}\s*<button \s*onClick=\{\(e\) => \{ e\.stopPropagation\(\); setIsMuted\(!isMuted\); \}\}\s*className="absolute left-4 md:left-8 bottom-8 md:bottom-12 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all backdrop-blur-md cursor-pointer"\s*title=\{isMuted \? "Unmute video" : "Mute video"\}\s*>\s*\{isMuted \? <VolumeX size=\{20\} /> : <Volume2 size=\{20\} />\}\s*</button>'''

new_audio = r'''          {/* AUDIO TOGGLE */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            className="absolute left-4 md:left-8 bottom-8 md:bottom-12 z-20 p-2 text-white/60 hover:text-white transition-all cursor-pointer drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
          </button>'''

content = re.sub(old_audio, new_audio, content)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)