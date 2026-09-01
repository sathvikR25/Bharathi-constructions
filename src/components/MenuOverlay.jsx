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
  {
    label: "Bharathi Horizon",
    sub: "The Skyline",
    href: "/horizon",
    num: "01",
    img: "/horizon pics/VIEW_04_FFFFFFF.jpg",
  },
  {
    label: "Bharathi Lake Woods",
    sub: "The Sanctuary",
    href: "/lake-woods",
    num: "02",
    img: "/lakewood-media/View 03_FFFFFF copy.jpg",
  },
];

export default function MenuOverlay({ navOpen, setNavOpen }) {
  const location = useLocation();
  const overlayRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const itemsRef = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: "inset(0 0 100% 0)", visibility: "hidden" });
    gsap.set(leftRef.current, { opacity: 0, x: -40 });
    gsap.set(rightRef.current, { opacity: 0, x: 40 });
    gsap.set(itemsRef.current, { y: 60, opacity: 0 });
  }, []);

  useEffect(() => {
    if (navOpen) {
      gsap.set(overlayRef.current, { visibility: "visible" });
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power4.inOut",
      });
      gsap.to(leftRef.current, {
        opacity: 1, x: 0, duration: 0.9, delay: 0.3, ease: "power3.out",
      });
      gsap.to(rightRef.current, {
        opacity: 1, x: 0, duration: 0.9, delay: 0.4, ease: "power3.out",
      });
      gsap.to(itemsRef.current, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.45,
      });
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => gsap.set(overlayRef.current, { visibility: "hidden" }),
      });
      gsap.to([leftRef.current, rightRef.current], { opacity: 0, duration: 0.3 });
      gsap.to(itemsRef.current, { y: 60, opacity: 0, duration: 0.3, stagger: 0.04 });
    }
  }, [navOpen]);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
        zIndex: 95, display: "grid", gridTemplateColumns: "1fr 1.3fr",
        background: "#070707",
        clipPath: "inset(0 0 100% 0)",
      }}
    >
      {/* LEFT PANEL — Project Imagery */}
      <div
        ref={leftRef}
        style={{
          position: "relative", overflow: "hidden",
          background: "#0a0a0a",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "3rem",
        }}
      >
        {/* Background image that morphs on project hover */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {PROJECTS.map((p) => (
            <img
              key={p.href}
              src={p.img}
              alt={p.label}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", opacity: hoveredProject === p.href ? 0.35 : 0,
                transition: "opacity 0.6s ease",
                transform: "scale(1.05)",
              }}
            />
          ))}
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #070707 20%, transparent 80%)",
          }} />
        </div>

        {/* Projects block */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{
            fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "2rem",
          }}>
            Our Projects
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {PROJECTS.map((p) => {
              const isActive = location.pathname === p.href;
              return (
                <Link
                  ref={addToRefs}
                  key={p.href}
                  to={p.href}
                  onClick={() => setNavOpen(false)}
                  onMouseEnter={() => setHoveredProject(p.href)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1.25rem 1.5rem", borderRadius: "12px", textDecoration: "none",
                    background: isActive ? "rgba(201,169,110,0.08)" : hoveredProject === p.href ? "rgba(255,255,255,0.04)" : "transparent",
                    border: isActive ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <span style={{
                      fontSize: "0.6rem", letterSpacing: "0.25em",
                      color: "#c9a96e", display: "block", marginBottom: "0.3rem",
                      textTransform: "uppercase",
                    }}>
                      {p.num} — {p.sub}
                    </span>
                    <span style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      color: isActive ? "#c9a96e" : "#fff",
                      fontStyle: "italic",
                      lineHeight: 1,
                    }}>
                      {p.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    color={isActive ? "#c9a96e" : "rgba(255,255,255,0.3)"}
                    style={{ flexShrink: 0, transition: "transform 0.3s" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Bottom contact strip */}
          <div style={{
            marginTop: "3rem", paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <Phone size={14} color="rgba(255,255,255,0.3)" />
            <a
              href="tel:+917997992051"
              style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.05em", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = "#c9a96e"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
            >
              +91 79979 92051
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Main Navigation */}
      <div
        ref={rightRef}
        style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "8rem 5rem 3rem",
          background: "#070707",
        }}
      >
        {/* Main nav links */}
        <nav>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV_ITEMS.map((item, i) => {
              const isActive = location.pathname === item.href;
              return (
                <div
                  key={item.href}
                  ref={addToRefs}
                  style={{ overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setNavOpen(false)}
                    style={{
                      display: "flex", alignItems: "baseline",
                      justifyContent: "space-between",
                      padding: "1.5rem 0",
                      textDecoration: "none",
                      color: isActive ? "#c9a96e" : "rgba(255,255,255,0.85)",
                      transition: "color 0.3s, padding 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.paddingLeft = "1rem";
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                      <span style={{
                        fontSize: "0.6rem", letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.2)", fontVariantNumeric: "tabular-nums",
                      }}>
                        {item.num}
                      </span>
                      <span style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                        fontWeight: 400,
                        lineHeight: 1,
                      }}>
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={20}
                      style={{ opacity: isActive ? 1 : 0.2, flexShrink: 0, transition: "opacity 0.3s" }}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom footer row */}
        <div ref={addToRefs} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            © 2026 Bharathi Constructions
          </span>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <a
              href="https://www.instagram.com/bharathiconstructionshyd"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a
              href="https://www.youtube.com/@bharathiconstructionshyd"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
