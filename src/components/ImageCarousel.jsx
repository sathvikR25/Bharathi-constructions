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
    autoRef.current = setInterval(next, 4000); 
    return () => clearInterval(autoRef.current); 
  }, [next]);

  const pauseAuto = () => clearInterval(autoRef.current);
  const resumeAuto = () => { autoRef.current = setInterval(next, 4000); };

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
    <div style={{ position: "relative", width: "100%", overflow: "hidden", padding: "4rem 0" }} onMouseEnter={pauseAuto} onMouseLeave={resumeAuto}>
      
      {/* 3D Stage */}
      <div 
        style={{ 
          position: "relative", 
          height: "65vh", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          perspective: "1200px", 
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

          // 3D Math for Mesmerizing Effect
          const translateX = offset * 55; // percentage
          const translateZ = isActive ? 0 : -absOffset * 150;
          const rotateY = offset === 0 ? 0 : (offset > 0 ? -25 : 25);
          const scale = isActive ? 1 : Math.max(0.6, 1 - absOffset * 0.15);
          const opacity = isActive ? 1 : Math.max(0, 1 - absOffset * 0.3);
          const blur = isActive ? 0 : absOffset * 4;

          return (
            <div 
              key={i} 
              onClick={() => setCurrent(i)}
              style={{
                position: "absolute",
                width: "60vw",
                maxWidth: "900px",
                height: "100%",
                borderRadius: "24px",
                background: isLight ? "#fff" : "#111",
                boxShadow: isActive ? "0 40px 80px rgba(0,0,0,0.2)" : "0 20px 40px rgba(0,0,0,0.1)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: 100 - absOffset,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                cursor: isActive ? "grab" : "pointer",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                <img 
                  src={img.src} 
                  alt={img.label} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain", // CRITICAL: Never crop
                    pointerEvents: "none" 
                  }} 
                  loading="lazy" 
                  draggable="false" 
                />
              </div>
              <div style={{ padding: "2rem", textAlign: "center", background: isLight ? "rgba(255,255,255,0.9)" : "rgba(17,17,17,0.9)", backdropFilter: "blur(10px)" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" }}>
                  {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", color: fg, margin: "0.5rem 0 0" }}>{img.label}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "3rem" }}>
        <button className="hover-target" onClick={prev} style={{ background: "transparent", border: `1px solid ${borderCol}`, borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: fg, transition: "border-color 0.3s" }}><ArrowLeft size={18} /></button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {images.map((_, i) => (
            <button key={i} className="hover-target" onClick={() => setCurrent(i)} style={{ width: current === i ? "32px" : "8px", height: "8px", borderRadius: "100px", background: current === i ? bgActive : bgInactive, border: "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", padding: 0 }} />
          ))}
        </div>
        <button className="hover-target" onClick={next} style={{ background: "transparent", border: `1px solid ${borderCol}`, borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: fg, transition: "border-color 0.3s" }}><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
