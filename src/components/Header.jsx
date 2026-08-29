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
  
  // If nav is open, force light mode text so it contrasts against the dark menu overlay
  const forceDarkMenu = navOpen;
  
  const logoStyle = (isLight && !forceDarkMenu)
    ? { filter: "none", mixBlendMode: "multiply" } 
    : { filter: "invert(1) grayscale(1) brightness(2)", mixBlendMode: "screen" };

  const textColor = (isLight && !forceDarkMenu) ? "#000" : "#fff";
  const headerBg = navOpen ? "transparent" : (isLight ? "rgba(253, 251, 247, 0.85)" : "rgba(5, 5, 5, 0.85)");
  const headerBlur = navOpen ? "none" : "blur(12px)";
  const border = navOpen ? "none" : `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`;

  return (
    <header ref={headerRef} style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      zIndex: 100, // Highest z-index to stay above the menu
      background: headerBg,
      backdropFilter: headerBlur,
      WebkitBackdropFilter: headerBlur,
      borderBottom: border,
      transform: "translateY(0)",
      transition: "background 0.3s, backdrop-filter 0.3s"
    }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2.5rem", height: "110px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" className="hover-target" style={{ display: "flex", alignItems: "center" }} onClick={() => setNavOpen(false)}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{ height: "70px", ...logoStyle, transition: "filter 0.3s" }} />
        </Link>
        <button className="hover-target" onClick={() => setNavOpen(!navOpen)} style={{ 
          background: "transparent", 
          border: "none", 
          color: textColor, 
          fontSize: "0.85rem", 
          letterSpacing: "0.3em", 
          textTransform: "uppercase",
          transition: "color 0.3s",
          cursor: "pointer",
          padding: "1rem"
        }}>
          {navOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
