import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";

export default function ImageCarousel({ images, id, theme = "dark" }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const isAnimating = useRef(false);

  const isLight = theme === "light";
  const fg = isLight ? "#0a0a0a" : "#fff";
  const accent = "#c9a96e";

  const goTo = useCallback((index, dir = 1) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setPrev(current);
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => { isAnimating.current = false; }, 900);
  }, [current]);

  const goNext = useCallback(() => {
    goTo((current + 1) % images.length, 1);
  }, [current, images.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length, -1);
  }, [current, images.length, goTo]);

  // Auto-advance every 5s
  useEffect(() => {
    autoRef.current = setInterval(goNext, 5000);
    return () => clearInterval(autoRef.current);
  }, [goNext]);

  const pauseAuto = () => clearInterval(autoRef.current);
  const resumeAuto = () => { autoRef.current = setInterval(goNext, 5000); };

  // Swipe / drag
  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    pauseAuto();
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.type.includes("mouse") ? e.pageX : (e.changedTouches?.[0]?.pageX ?? startX.current);
    const diff = startX.current - endX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    resumeAuto();
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>

      {/* ── MAIN STAGE ── */}
      <div
        ref={trackRef}
        style={{ position: "relative", width: "100%", overflow: "hidden", cursor: "grab" }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={(e) => { if (isDragging.current) handleDragEnd(e); }}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {/* Slide strip */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
          {images.map((img, i) => {
            const isActive = i === current;
            const isPrev = i === prev;

            return (
              <div
                key={i}
                style={{
                  position: "absolute", inset: 0,
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : isPrev ? 1 : 0,
                  transition: isActive
                    ? "opacity 0.9s cubic-bezier(0.77, 0, 0.175, 1), transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)"
                    : "opacity 0.9s cubic-bezier(0.77, 0, 0.175, 1)",
                  transform: isActive ? "scale(1)" : "scale(1.04)",
                  willChange: "opacity, transform",
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  draggable="false"
                  loading="lazy"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    transform: isActive ? "scale(1.0)" : "scale(1.06)",
                    transition: "transform 6s ease",
                  }}
                />
              </div>
            );
          })}

          {/* Gradient overlay bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            zIndex: 3, pointerEvents: "none",
          }} />

          {/* Current label */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "2rem clamp(1.5rem, 4vw, 3rem)",
            zIndex: 4, pointerEvents: "none",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          }}>
            <div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: accent, display: "block", marginBottom: "0.4rem" }}>
                {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#fff", margin: 0, fontWeight: 400 }}>
                {images[current].label}
              </h4>
            </div>

            {/* Arrow controls inside image */}
            <div style={{ display: "flex", gap: "0.75rem", pointerEvents: "all" }}>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); pauseAuto(); setTimeout(resumeAuto, 4000); }}
                aria-label="Previous"
                style={{
                  width: "clamp(40px, 5vw, 52px)", height: "clamp(40px, 5vw, 52px)",
                  borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                  color: "#fff", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "background 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); pauseAuto(); setTimeout(resumeAuto, 4000); }}
                aria-label="Next"
                style={{
                  width: "clamp(40px, 5vw, 52px)", height: "clamp(40px, 5vw, 52px)",
                  borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                  color: "#fff", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "background 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", zIndex: 5, background: "rgba(255,255,255,0.1)" }}>
            <div
              key={current}
              style={{
                height: "100%", background: accent,
                animation: "gallery-progress 5s linear forwards",
              }}
            />
          </div>
        </div>

        {/* ── FILMSTRIP THUMBNAILS ── */}
        <div style={{
          display: "flex", gap: "clamp(0.5rem, 1vw, 0.75rem)",
          padding: "clamp(0.75rem, 1.5vw, 1rem) 0",
          overflowX: "auto", scrollbarWidth: "none",
        }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { goTo(i, i > current ? 1 : -1); pauseAuto(); setTimeout(resumeAuto, 5000); }}
              aria-label={img.label}
              style={{
                flexShrink: 0,
                width: "clamp(64px, 10vw, 110px)",
                height: "clamp(40px, 6vw, 68px)",
                borderRadius: "8px",
                overflow: "hidden",
                border: i === current ? `2px solid ${accent}` : "2px solid transparent",
                opacity: i === current ? 1 : 0.45,
                transition: "opacity 0.4s, border-color 0.4s, transform 0.3s",
                cursor: "pointer", padding: 0,
                transform: i === current ? "scale(1)" : "scale(0.95)",
              }}
              onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = "0.45"; }}
            >
              <img src={img.src} alt={img.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gallery-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        /* Hide thumbnail scrollbar */
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
