import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ImageCarousel({ images, id }) {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scrollTo = useCallback((index) => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const card = el.children[index];
    if (!card) return;
    const offset = card.offsetLeft - (el.parentElement.offsetWidth / 2) + (card.offsetWidth / 2);
    el.scrollTo({ left: offset, behavior: "smooth" });
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent(prev => { const n = (prev + 1) % images.length; scrollTo(n); return n; });
  }, [images.length, scrollTo]);

  const prev = useCallback(() => {
    setCurrent(prev => { const n = (prev - 1 + images.length) % images.length; scrollTo(n); return n; });
  }, [images.length, scrollTo]);

  useEffect(() => {
    autoRef.current = setInterval(next, 3500);
    return () => clearInterval(autoRef.current);
  }, [next]);

  const pauseAuto = () => clearInterval(autoRef.current);
  const resumeAuto = () => { autoRef.current = setInterval(next, 3500); };

  const onDragStart = (e) => {
    isDragging.current = true;
    startX.current = (e.touches ? e.touches[0].pageX : e.pageX) - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    pauseAuto();
  };
  const onDragMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onDragEnd = () => {
    isDragging.current = false;
    resumeAuto();
    if (!trackRef.current) return;
    const el = trackRef.current;
    const center = el.scrollLeft + el.parentElement.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    scrollTo(closest);
  };

  return (
    <div style={{ position: "relative", width: "100%" }} onMouseEnter={pauseAuto} onMouseLeave={resumeAuto}>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div ref={trackRef} style={{ display: "flex", gap: "1.5rem", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", paddingBottom: "1rem" }}
          onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
          onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}
        >
          {images.map((img, i) => (
            <div key={i} style={{ flex: "0 0 75vw", maxWidth: "1000px", scrollSnapAlign: "center", borderRadius: "16px", overflow: "hidden", position: "relative", aspectRatio: "16/10", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s", transform: current === i ? "scale(1)" : "scale(0.92)", opacity: current === i ? 1 : 0.4 }}>
              <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)", transform: current === i ? "scale(1)" : "scale(1.08)" }} loading="lazy" draggable="false" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3rem 2.5rem 2rem", background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>{String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
                <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", color: "#fff", margin: "0.5rem 0 0", fontWeight: 400 }}>{img.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "2.5rem" }}>
        <button className="hover-target" onClick={prev} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "border-color 0.3s" }}><ArrowLeft size={18} /></button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {images.map((_, i) => (
            <button key={i} className="hover-target" onClick={() => scrollTo(i)} style={{ width: current === i ? "32px" : "8px", height: "8px", borderRadius: "100px", background: current === i ? "#fff" : "rgba(255,255,255,0.15)", border: "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", padding: 0 }} />
          ))}
        </div>
        <button className="hover-target" onClick={next} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "border-color 0.3s" }}><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
