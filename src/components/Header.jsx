import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export default function Header({ theme = "dark", navOpen, setNavOpen }) {
  const headerRef = useRef(null);
  let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  useEffect(() => {
    const handleScroll = () => {
      if (navOpen) return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: "power2.inOut" });
        } else {
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out" });
        }
      } else {
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navOpen]);

  const isLight = theme === "light";
  
  // Bulletproof logo rendering for logos that might have baked-in white backgrounds
  const logoStyle = isLight 
    ? { filter: "none", mixBlendMode: "multiply" } 
    : { filter: "invert(1) grayscale(1) brightness(2)", mixBlendMode: "screen" };

  const textColor = isLight ? "#000" : "#fff";

  return (
    <header ref={headerRef} style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      zIndex: 90, 
      background: isLight ? "rgba(253, 251, 247, 0.85)" : "rgba(5, 5, 5, 0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
      transform: "translateY(0)"
    }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2.5rem", height: "90px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" className="hover-target" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{ height: "45px", ...logoStyle }} />
        </Link>
        <button className="hover-target" onClick={() => setNavOpen(true)} style={{ 
          background: "transparent", 
          border: "none", 
          color: textColor, 
          fontSize: "0.75rem", 
          letterSpacing: "0.25em", 
          textTransform: "uppercase",
          transition: "color 0.3s",
          cursor: "pointer",
          padding: "1rem"
        }}>
          Menu
        </button>
      </div>
    </header>
  );
}
