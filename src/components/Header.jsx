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
      zIndex: 100, 
      background: headerBg,
      backdropFilter: headerBlur,
      WebkitBackdropFilter: headerBlur,
      borderBottom: border,
      transform: "translateY(0)",
      transition: "background 0.3s, backdrop-filter 0.3s"
    }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2.5rem", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        <Link to="/" className="hover-target" style={{ display: "flex", alignItems: "center", overflow: "hidden", height: "70px", width: "170px", justifyContent: "flex-start" }} onClick={() => setNavOpen(false)}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{ width: "240px", maxWidth: "none", transform: "scale(1.4) translateX(10%)", transformOrigin: "left center", objectFit: "contain", ...logoStyle, transition: "filter 0.3s" }} />
        </Link>
        
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <Link to="/contact" className="hover-target" onClick={() => setNavOpen(false)} style={{
            border: `1px solid ${textColor === "#fff" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}`,
            color: textColor,
            padding: "1rem 2.5rem",
            borderRadius: "100px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
            textDecoration: "none",
            transition: "all 0.3s"
          }}
          onMouseEnter={e => {
            e.target.style.background = textColor;
            e.target.style.color = textColor === "#fff" ? "#000" : "#fff";
          }}
          onMouseLeave={e => {
            e.target.style.background = "transparent";
            e.target.style.color = textColor;
          }}>
            Contact Us
          </Link>
          
          <button className="hover-target" onClick={() => setNavOpen(!navOpen)} style={{ 
            background: "transparent", 
            border: "none", 
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
            width: "40px",
            height: "40px"
          }}>
            <span style={{ 
              display: "block", 
              width: "30px", 
              height: "2px", 
              background: textColor, 
              transition: "transform 0.3s, opacity 0.3s",
              transform: navOpen ? "translateY(8px) rotate(45deg)" : "none"
            }} />
            <span style={{ 
              display: "block", 
              width: "30px", 
              height: "2px", 
              background: textColor, 
              transition: "opacity 0.3s",
              opacity: navOpen ? 0 : 1
            }} />
            <span style={{ 
              display: "block", 
              width: "30px", 
              height: "2px", 
              background: textColor, 
              transition: "transform 0.3s, opacity 0.3s",
              transform: navOpen ? "translateY(-8px) rotate(-45deg)" : "none"
            }} />
          </button>
        </div>

      </div>
    </header>
  );
}
