import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowUpRight, Phone } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", num: "00" },
  { label: "Our Legacy", href: "/legacy", num: "01" },
  { label: "Builder Profile", href: "/builder-profile", num: "02" },
  { label: "Contact Us", href: "/contact", num: "03" },
];

const PROJECTS = [
  { label: "Bharathi Horizon", sub: "The Skyline", href: "/horizon", num: "01", img: "/horizon pics/VIEW_04_FFFFFFF.jpg" },
  { label: "Bharathi Lake Woods", sub: "The Sanctuary", href: "/lake-woods", num: "02", img: "/lakewood-media/View 03_FFFFFF copy.jpg" },
];

export default function MenuOverlay({ navOpen, setNavOpen }) {
  const location = useLocation();
  const overlayRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const itemsRef = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: "inset(0 0 100% 0)", visibility: "hidden" });
    gsap.set(leftRef.current, { opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 });
    gsap.set(rightRef.current, { opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 });
    gsap.set(itemsRef.current, { y: 50, opacity: 0 });
  }, [isMobile]);

  useEffect(() => {
    if (navOpen) {
      gsap.set(overlayRef.current, { visibility: "visible" });
      gsap.to(overlayRef.current, { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" });
      gsap.to(leftRef.current, { opacity: 1, x: 0, y: 0, duration: 0.85, delay: 0.25, ease: "power3.out" });
      gsap.to(rightRef.current, { opacity: 1, x: 0, y: 0, duration: 0.85, delay: 0.35, ease: "power3.out" });
      gsap.to(itemsRef.current, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.4 });
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)", duration: 0.65, ease: "power4.inOut",
        onComplete: () => gsap.set(overlayRef.current, { visibility: "hidden" }),
      });
      gsap.to([leftRef.current, rightRef.current], { opacity: 0, duration: 0.25 });
      gsap.to(itemsRef.current, { y: 50, opacity: 0, duration: 0.25, stagger: 0.03 });
    }
  }, [navOpen]);

  const addToRefs = (el) => { if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el); };

  return (
    <>
      <style>{`
        .menu-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
        }
        @media (max-width: 767px) {
          .menu-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            overflow-y: auto;
          }
          .menu-left-panel {
            display: none !important;
          }
          .menu-right-panel {
            padding: 7rem 2rem 3rem !important;
            justify-content: flex-start !important;
            gap: 2rem !important;
          }
          .menu-nav-link {
            font-size: clamp(2.2rem, 10vw, 3rem) !important;
          }
          .menu-project-block {
            display: block !important;
          }
        }
        @media (max-width: 380px) {
          .menu-nav-link { font-size: 1.9rem !important; }
          .menu-right-panel { padding: 6rem 1.5rem 2rem !important; }
        }
      `}</style>

      <div
        ref={overlayRef}
        className="menu-grid"
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
          zIndex: 95, background: "#070707",
          clipPath: "inset(0 0 100% 0)",
        }}
      >
        {/* LEFT PANEL — hidden on mobile */}
        <div
          ref={leftRef}
          className="menu-left-panel"
          style={{
            position: "relative", overflow: "hidden",
            background: "#0a0a0a",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            display: "flex", flexDirection: "column",
            justifyContent: "flex-end", padding: "3rem",
          }}
        >
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {PROJECTS.map((p) => (
              <img
                key={p.href} src={p.img} alt={p.label}
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", opacity: hoveredProject === p.href ? 0.35 : 0,
                  transition: "opacity 0.6s ease", transform: "scale(1.05)",
                }}
              />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #070707 20%, transparent 80%)" }} />
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "2rem" }}>
              Our Projects
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {PROJECTS.map((p) => {
                const isActive = location.pathname === p.href;
                return (
                  <Link
                    ref={addToRefs} key={p.href} to={p.href}
                    onClick={() => setNavOpen(false)}
                    onMouseEnter={() => setHoveredProject(p.href)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "1.25rem 1.5rem", borderRadius: "12px", textDecoration: "none",
                      background: isActive ? "rgba(201,169,110,0.08)" : hoveredProject === p.href ? "rgba(255,255,255,0.04)" : "transparent",
                      border: isActive ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "#c9a96e", display: "block", marginBottom: "0.3rem", textTransform: "uppercase" }}>
                        {p.num} — {p.sub}
                      </span>
                      <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: isActive ? "#c9a96e" : "#fff", fontStyle: "italic", lineHeight: 1 }}>
                        {p.label}
                      </span>
                    </div>
                    <ArrowUpRight size={18} color={isActive ? "#c9a96e" : "rgba(255,255,255,0.3)"} style={{ flexShrink: 0 }} />
                  </Link>
                );
              })}
            </div>

            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <Phone size={14} color="rgba(255,255,255,0.3)" />
              <a href="tel:+917997992051" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.05em", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#c9a96e"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
              >
                +91 79979 92051
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — full width on mobile */}
        <div
          ref={rightRef}
          className="menu-right-panel"
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "8rem 5rem 3rem",
            background: "#070707",
            overflowY: "auto",
          }}
        >
          <nav style={{ flex: 1 }}>
            {/* Mobile-only projects section */}
            <div className="menu-project-block" style={{ display: "none", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "1rem" }}>Our Projects</span>
              {PROJECTS.map((p) => {
                const isActive = location.pathname === p.href;
                return (
                  <Link
                    ref={addToRefs} key={p.href} to={p.href}
                    onClick={() => setNavOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "0.9rem 0", textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", color: isActive ? "#c9a96e" : "#fff", fontStyle: "italic" }}>
                      {p.label}
                    </span>
                    <ArrowUpRight size={16} color={isActive ? "#c9a96e" : "rgba(255,255,255,0.3)"} />
                  </Link>
                );
              })}
            </div>

            {/* Main nav links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <div key={item.href} ref={addToRefs} style={{ overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <Link
                      to={item.href}
                      onClick={() => setNavOpen(false)}
                      className="menu-nav-link"
                      style={{
                        display: "flex", alignItems: "baseline", justifyContent: "space-between",
                        padding: "1.2rem 0", textDecoration: "none",
                        color: isActive ? "#c9a96e" : "rgba(255,255,255,0.85)",
                        transition: "color 0.3s, padding-left 0.3s",
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: 400, lineHeight: 1,
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.color = "#fff";
                        if (window.innerWidth > 767) e.currentTarget.style.paddingLeft = "1rem";
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                        <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>{item.num}</span>
                        {item.label}
                      </div>
                      <ArrowUpRight size={18} style={{ opacity: isActive ? 1 : 0.15, flexShrink: 0 }} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer row */}
          <div ref={addToRefs} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem",
            marginTop: "2rem", flexWrap: "wrap", gap: "1rem",
          }}>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              © 2026 Bharathi Constructions
            </span>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <a href="https://www.instagram.com/bharathiconstructionshyd" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@bharathiconstructionshyd" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              {/* Mobile phone link */}
              <a href="tel:+917997992051" style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.3s", display: "flex", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                <Phone size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
