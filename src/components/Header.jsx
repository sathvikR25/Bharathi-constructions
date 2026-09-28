import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export default function Header({ theme = "dark", transparentTheme = "dark", navOpen, setNavOpen }) {
  const headerRef = useRef(null);
  const [scrollState, setScrollState] = React.useState(0); // 0: top, 1: frosted, 2: solid
  let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

  useEffect(() => {
    const handleScroll = () => {
      if (navOpen) return;
      const currentScrollY = window.scrollY;
      const wh = window.innerHeight;
      if (currentScrollY > wh * 0.85) {
        setScrollState(2);
      } else if (currentScrollY > 50) {
        setScrollState(1);
      } else {
        setScrollState(0);
      }
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

  const activeTheme = navOpen ? "dark" : (scrollState === 0 ? transparentTheme : theme);
  const isLightActive = activeTheme === "light";
  
  const textColor = isLightActive ? "#123645" : "#ffffff";
  const logoStyle = isLightActive ? { filter: "none" } : { filter: "brightness(0) invert(1)" };
  
  let headerBg = "transparent";
  if (!navOpen) {
    if (scrollState === 1) {
      headerBg = theme === "light" ? "rgba(253, 251, 247, 0.25)" : "rgba(10, 10, 10, 0.25)";
    } else if (scrollState === 2) {
      headerBg = theme === "light" ? "rgba(253, 251, 247, 0.98)" : "rgba(10, 10, 10, 0.98)";
    }
  }
  const headerBlur = (scrollState > 0 && !navOpen) ? "blur(16px)" : "none";
  const border = navOpen ? "none" : (scrollState > 0 ? `1px solid ${theme === "light" ? "rgba(18,54,69,0.05)" : "rgba(255,255,255,0.05)"}` : "none");

  return (
    <header ref={headerRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
      background: headerBg, backdropFilter: headerBlur,
      WebkitBackdropFilter: headerBlur, borderBottom: border,
      transform: "translateY(0)", transition: "background 0.5s ease, backdrop-filter 0.5s ease"
    }}>
      <div style={{
        maxWidth: "1600px", margin: "0 auto",
        padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
        height: "clamp(70px, 10vw, 100px)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", height: "clamp(65px, 9.5vw, 95px)" }} onClick={() => setNavOpen(false)}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{ height: "clamp(55px, 8vw, 90px)", width: "auto", objectFit: "contain", ...logoStyle, transition: "filter 0.3s" }} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2.5rem)" }}>
          {/* Hide Contact Us on very small screens */}
          <Link
            to="/contact"
            onClick={() => setNavOpen(false)}
            style={{
              border: `1px solid ${textColor === "#ffffff" ? "rgba(255,255,255,0.3)" : "rgba(18,54,69,0.3)"}`,
              color: textColor,
              padding: "0.8rem clamp(1.5rem, 3vw, 2.5rem)",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s",
              display: "none",
              whiteSpace: "nowrap",
            }}
            className="header-contact-btn"
            onMouseEnter={e => { e.target.style.background = textColor; e.target.style.color = textColor === "#ffffff" ? "#000" : "#fff"; }}
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
              display: "block", width: "30px", height: "1px",
              background: textColor, transition: "transform 0.35s, opacity 0.3s",
              transform: navOpen ? "translateY(7px) rotate(45deg)" : "none"
            }} />
            <span style={{
              display: "block", width: "30px", height: "1px",
              background: textColor, transition: "opacity 0.3s",
              opacity: navOpen ? 0 : 1
            }} />
            <span style={{
              display: "block", width: "30px", height: "1px",
              background: textColor, transition: "transform 0.35s, opacity 0.3s",
              transform: navOpen ? "translateY(-7px) rotate(-45deg)" : "none"
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