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
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
      background: headerBg, backdropFilter: headerBlur,
      WebkitBackdropFilter: headerBlur, borderBottom: border,
      transform: "translateY(0)", transition: "background 0.3s, backdrop-filter 0.3s"
    }}>
      <div style={{
        maxWidth: "1600px", margin: "0 auto",
        padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
        height: "clamp(70px, 10vw, 100px)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", height: "clamp(60px, 9vw, 90px)" }} onClick={() => setNavOpen(false)}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{ height: "100%", width: "auto", objectFit: "contain", ...logoStyle, transition: "filter 0.3s" }} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2.5rem)" }}>
          {/* Hide Contact Us on very small screens */}
          <Link
            to="/contact"
            onClick={() => setNavOpen(false)}
            style={{
              border: `1px solid ${textColor === "#fff" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}`,
              color: textColor,
              padding: "0.7rem clamp(1rem, 2vw, 2rem)",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
              textDecoration: "none",
              transition: "all 0.3s",
              display: "none",
              whiteSpace: "nowrap",
            }}
            className="header-contact-btn"
            onMouseEnter={e => { e.target.style.background = textColor; e.target.style.color = textColor === "#fff" ? "#000" : "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = textColor; }}
          >
            Contact Us
          </Link>

          <button
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "0.5rem",
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: "6px", width: "44px", height: "44px",
            }}
          >
            <span style={{
              display: "block", width: "26px", height: "2px",
              background: textColor, transition: "transform 0.35s, opacity 0.3s",
              transform: navOpen ? "translateY(8px) rotate(45deg)" : "none"
            }} />
            <span style={{
              display: "block", width: "26px", height: "2px",
              background: textColor, transition: "opacity 0.3s",
              opacity: navOpen ? 0 : 1
            }} />
            <span style={{
              display: "block", width: "26px", height: "2px",
              background: textColor, transition: "transform 0.35s, opacity 0.3s",
              transform: navOpen ? "translateY(-8px) rotate(-45deg)" : "none"
            }} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .header-contact-btn { display: inline-block !important; }
        }
      `}</style>
    </header>
  );
}
