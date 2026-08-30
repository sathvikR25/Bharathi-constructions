import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ImageCarousel({ images, id, theme = "dark" }) {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);
  
  // Drag states
  const startX = useRef(0);
  const isDragging = useRef(false);

  const isLight = theme === "light";
  const fg = isLight ? "#0a0a0a" : "#fff";
  const bgActive = isLight ? "#0a0a0a" : "#fff";
  const bgInactive = isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";
  const borderCol = isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";
  
  const next = useCallback(() => { setCurrent(prev => (prev + 1) % images.length); }, [images.length]);
  const prev = useCallback(() => { setCurrent(prev => (prev - 1 + images.length) % images.length); }, [images.length]);

  useEffect(() => { 
    autoRef.current = setInterval(next, 4500); 
    return () => clearInterval(autoRef.current); 
  }, [next]);

  const pauseAuto = () => clearInterval(autoRef.current);
  const resumeAuto = () => { autoRef.current = setInterval(next, 4500); };

  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    pauseAuto();
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].pageX : startX.current);
    const diff = startX.current - endX;
    
    if (diff > 50) next();
    else if (diff < -50) prev();
    
    resumeAuto();
  };

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", padding: "2rem 0 4rem 0" }} onMouseEnter={pauseAuto} onMouseLeave={resumeAuto}>
      
      {/* 3D Mesmerizing Stage */}
      <div 
        style={{ 
          position: "relative", 
          height: "80vh", // MASSIVE height
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          perspective: "1800px", 
          transformStyle: "preserve-3d" 
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={(e) => { if (isDragging.current) handleDragEnd(e); }}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {images.map((img, i) => {
          // Calculate offset relative to current, accounting for wrap-around
          let offset = i - current;
          const half = Math.floor(images.length / 2);
          if (offset > half) offset -= images.length;
          if (offset < -half) offset += images.length;

          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          // Mesmerizing 3D Transitions (Cube, Fold, Float, Flip)
          let transform = "";
          let opacity = 0;
          let zIndex = 50 - absOffset;
          let blur = 0;

          if (offset === 0) {
            transform = "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)"; // Spotlight
            opacity = 1;
            zIndex = 100;
          } else if (offset === 1) {
            transform = "translate3d(50%, 0, -300px) rotateY(-60deg) scale(0.9)"; // Cube Right
            opacity = 0.85;
            blur = 2;
          } else if (offset === -1) {
            transform = "translate3d(-50%, 0, -300px) rotateY(60deg) scale(0.9)"; // Cube Left
            opacity = 0.85;
            blur = 2;
          } else if (offset === 2) {
            transform = "translate3d(20%, 35%, -600px) rotateX(75deg) rotateZ(-15deg) scale(0.75)"; // Paper Fold Bottom Right
            opacity = 0.6;
            blur = 5;
          } else if (offset === -2) {
            transform = "translate3d(-20%, -35%, -600px) rotateX(-75deg) rotateZ(15deg) scale(0.75)"; // Paper Fold Top Left
            opacity = 0.6;
            blur = 5;
          } else if (offset === 3) {
            transform = "translate3d(60%, -25%, -900px) rotateY(-20deg) rotateZ(30deg) scale(0.5)"; // Float Away Top Right
            opacity = 0.3;
            blur = 10;
          } else if (offset === -3) {
            transform = "translate3d(-60%, 25%, -900px) rotateY(20deg) rotateZ(-30deg) scale(0.5)"; // Float Away Bottom Left
            opacity = 0.3;
            blur = 10;
          } else {
            // Flip 180 and hide in deep background
            transform = "translate3d(0, 0, -1200px) rotateY(180deg) rotateZ(90deg) scale(0)";
            opacity = 0;
          }

          return (
            <div 
              key={i} 
              onClick={() => setCurrent(i)}
              style={{
                position: "absolute",
                width: "85vw", // MASSIVE width
                maxWidth: "1400px",
                height: "100%",
                borderRadius: "32px", // Softer curves for luxury feel
                background: isLight ? "#fdfbf7" : "#050505",
                boxShadow: isActive ? (isLight ? "0 40px 100px rgba(0,0,0,0.15)" : "0 40px 100px rgba(0,0,0,0.6)") : "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 1.2s cubic-bezier(0.19, 1, 0.22, 1)", // Cinematic ease
                transform: transform,
                zIndex: zIndex,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                cursor: isActive ? "grab" : "pointer",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: isActive ? `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}` : 'none'
              }}
            >
              <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", padding: "1.5rem" }}>
                <img 
                  src={img.src} 
                  alt={img.label} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain", // Absolutely no cropping
                    pointerEvents: "none" 
                  }} 
                  loading="lazy" 
                  draggable="false" 
                />
              </div>
              <div style={{ padding: "1.5rem 3rem", textAlign: "center", background: isLight ? "rgba(253, 251, 247, 0.95)" : "rgba(5, 5, 5, 0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${borderCol}` }}>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)", display: "block", marginBottom: "0.5rem" }}>
                  {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", color: fg, margin: 0, fontWeight: 400 }}>{img.label}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "4rem" }}>
        <button className="hover-target" onClick={prev} style={{ background: "transparent", border: `1px solid ${borderCol}`, borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: fg, transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.background = fg; e.currentTarget.style.color = isLight ? "#fff" : "#000"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = fg; }}><ArrowLeft size={18} /></button>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {images.map((_, i) => (
            <button key={i} className="hover-target" onClick={() => setCurrent(i)} style={{ width: current === i ? "40px" : "10px", height: "10px", borderRadius: "100px", background: current === i ? bgActive : bgInactive, border: "none", transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)", padding: 0 }} />
          ))}
        </div>
        <button className="hover-target" onClick={next} style={{ background: "transparent", border: `1px solid ${borderCol}`, borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: fg, transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.background = fg; e.currentTarget.style.color = isLight ? "#fff" : "#000"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = fg; }}><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
